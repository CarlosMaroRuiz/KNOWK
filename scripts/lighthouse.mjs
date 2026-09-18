import fs from 'node:fs/promises';
import http from 'node:http';
import lighthouse, { desktopConfig, generateReport } from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

// ---------------------------------------------------------------------------
// Configuración y Flags (Soporta CLI args y Environment Variables)
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const hasArg = (flag) => args.includes(flag);
const getArgVal = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
};

// Rutas oficiales del proyecto para descubrimiento automático
const KNOWN_ROUTES = [
  '',
  'sentence-structure',
  'error-spotting',
  'reading-comprehension',
  'vocabulary',
  'grammar-review',
  'mock-exam',
  'content-manager',
];

const baseUrl = process.env.LIGHTHOUSE_BASE_URL ?? 'http://127.0.0.1:4200';
const auditAllRoutes = hasArg('--all-routes') || process.env.LH_ALL_ROUTES === 'true';

let urls;
if (auditAllRoutes) {
  urls = KNOWN_ROUTES.map((route) => `${baseUrl.replace(/\/$/, '')}/${route}`);
} else {
  const rawUrls =
    getArgVal('--urls') ??
    process.env.LIGHTHOUSE_URLS ??
    process.env.LIGHTHOUSE_URL ??
    'http://127.0.0.1:4200';

  urls = rawUrls
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);
}

// Preset: mobile (default) o desktop
const preset = (
  hasArg('--desktop')
    ? 'desktop'
    : hasArg('--mobile')
      ? 'mobile'
      : (process.env.LH_PRESET ?? process.env.LH_FORM_FACTOR ?? 'mobile')
).toLowerCase();

const generateHtml = !hasArg('--no-html') && process.env.LH_HTML !== 'false';

const THRESHOLDS = {
  performance: Number(getArgVal('--min-perf') ?? process.env.LH_MIN_PERFORMANCE ?? 80),
  accessibility: Number(getArgVal('--min-a11y') ?? process.env.LH_MIN_ACCESSIBILITY ?? 90),
  bestPractices: Number(getArgVal('--min-bp') ?? process.env.LH_MIN_BEST_PRACTICES ?? 85),
  seo: Number(getArgVal('--min-seo') ?? process.env.LH_MIN_SEO ?? 90),
};

const RUNS_PER_URL = Number(getArgVal('--runs') ?? process.env.LH_RUNS ?? 1);
const OUTPUT_DIR = 'reports';

// ---------------------------------------------------------------------------
// Helpers de Red y Servidor
// ---------------------------------------------------------------------------

async function checkServerAvailable(targetUrl, timeoutMs = 4000) {
  const urlObj = new URL(targetUrl);
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const isReady = await new Promise((resolve) => {
      const req = http.request(
        {
          hostname: urlObj.hostname,
          port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
          path: '/',
          method: 'HEAD',
          timeout: 1000,
        },
        (res) => resolve(res.statusCode < 500),
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    });

    if (isReady) return true;
    await new Promise((r) => setTimeout(r, 400));
  }

  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const median = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const score = (lhr, id) => Math.round((lhr.categories[id]?.score ?? 0) * 100);
const metric = (lhr, id) => lhr.audits[id]?.displayValue ?? 'N/A';

// Extrae las filas concretas de audit.details (tabla/opportunity) que Lighthouse
// usa para justificar el score: qué archivo, qué elemento, qué request específico
// causó el problema. Esto es lo que responde "por qué" a nivel de tu página,
// no solo "qué tipo de problema es".
function extractCauses(audit, { limit = 3 } = {}) {
  const items = audit.details?.items;
  if (!Array.isArray(items) || items.length === 0) return [];

  return items.slice(0, limit).map((item) => {
    const target =
      item.node?.snippet ??
      item.url ??
      item.source?.url ??
      item.selector ??
      null;

    const impact =
      item.wastedMs !== undefined
        ? `${Math.round(item.wastedMs)} ms desperdiciados`
        : item.wastedBytes !== undefined
          ? `${Math.round(item.wastedBytes / 1024)} KB desperdiciados`
          : item.totalBytes !== undefined
            ? `${Math.round(item.totalBytes / 1024)} KB`
            : null;

    return { target, impact };
  }).filter((c) => c.target);
}

function getFailingAudits(lhr, categoryId, { limit = 5, minScore = 0.9 } = {}) {
  const category = lhr.categories[categoryId];
  if (!category) return [];

  return category.auditRefs
    .map((ref) => lhr.audits[ref.id])
    .filter((audit) => audit && audit.score !== null && audit.score < minScore)
    .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, limit)
    .map((audit) => ({
      id: audit.id,
      title: audit.title,
      description: (audit.description ?? '').replace(/\[.*?\]\(.*?\)/g, '').trim(),
      score: audit.score,
      displayValue: audit.displayValue ?? null,
      causes: extractCauses(audit),
    }));
}

function buildVerdict(scores) {
  const checks = Object.entries(THRESHOLDS).map(([key, min]) => ({
    category: key,
    score: scores[key],
    threshold: min,
    passed: scores[key] >= min,
  }));
  return { passed: checks.every((c) => c.passed), checks };
}

function toAgentSummary(report) {
  const failed = report.verdict.checks.filter((c) => !c.passed);
  if (failed.length === 0) {
    return `[QA PASS] Todos los checks pasaron (${report.url}) [Preset: ${report.preset}]. Scores: ${Object.entries(
      report.scores,
    )
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')}.`;
  }

  const lines = failed.map((c) => {
    const issues = (report.diagnostics[c.category] ?? [])
      .map((d) => {
        const causeLines = (d.causes ?? [])
          .map((cause) => `      · ${cause.target}${cause.impact ? ` — ${cause.impact}` : ''}`)
          .join('\n');
        return `  - ${d.title}${d.displayValue ? ` (${d.displayValue})` : ''}${causeLines ? `\n${causeLines}` : ''}`;
      })
      .join('\n');
    return `${c.category}: ${c.score}/${c.threshold}\n${issues || '  (sin detalle de audits)'}`;
  });

  return `[QA FAIL] Fallos en ${report.url} [Preset: ${report.preset}]:\n${lines.join('\n\n')}`;
}

async function runOnce(chrome, url, activePreset) {
  const lhConfig = activePreset === 'desktop' ? desktopConfig : undefined;

  const result = await lighthouse(
    url,
    {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    },
    lhConfig,
  );

  if (!result?.lhr) {
    throw new Error(`Lighthouse no devolvió un reporte válido para ${url}.`);
  }

  const { lhr } = result;
  if (lhr.runtimeError) {
    throw new Error(`Lighthouse no pudo cargar ${url}: ${lhr.runtimeError.message}`);
  }

  return { lhr, html: generateHtml ? generateReport(lhr, 'html') : null };
}

async function auditUrl(chrome, url, activePreset) {
  const runs = [];
  for (let i = 0; i < RUNS_PER_URL; i += 1) {
    runs.push(await runOnce(chrome, url, activePreset));
  }

  const pickRun = runs[runs.length - 1];
  const pickLhr = pickRun.lhr;

  const scores = {
    performance: Math.round(median(runs.map((r) => score(r.lhr, 'performance')))),
    accessibility: Math.round(median(runs.map((r) => score(r.lhr, 'accessibility')))),
    bestPractices: Math.round(median(runs.map((r) => score(r.lhr, 'best-practices')))),
    seo: Math.round(median(runs.map((r) => score(r.lhr, 'seo')))),
  };

  const report = {
    url,
    preset: activePreset,
    generatedAt: new Date().toISOString(),
    runs: runs.length,
    scores,
    metrics: {
      firstContentfulPaint: metric(pickLhr, 'first-contentful-paint'),
      largestContentfulPaint: metric(pickLhr, 'largest-contentful-paint'),
      cumulativeLayoutShift: metric(pickLhr, 'cumulative-layout-shift'),
      totalBlockingTime: metric(pickLhr, 'total-blocking-time'),
      speedIndex: metric(pickLhr, 'speed-index'),
    },
    diagnostics: {
      performance: getFailingAudits(pickLhr, 'performance'),
      accessibility: getFailingAudits(pickLhr, 'accessibility'),
      'best-practices': getFailingAudits(pickLhr, 'best-practices'),
      seo: getFailingAudits(pickLhr, 'seo'),
    },
    htmlReport: pickRun.html,
  };

  report.diagnostics.bestPractices = report.diagnostics['best-practices'];
  delete report.diagnostics['best-practices'];

  report.verdict = buildVerdict(scores);
  report.agentSummary = toAgentSummary(report);

  return report;
}

function slugify(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let chrome;
let allPassed = true;

try {
  console.log(`\n======================================================`);
  console.log(`🏎️  TOEFL Exam App — Lighthouse Quality Auditor`);
  console.log(`======================================================`);
  console.log(`Preset:      ${preset.toUpperCase()} (${preset === 'desktop' ? 'Emulación de Escritorio' : 'Emulación Móvil 4G/CPU 4x'})`);
  console.log(`HTML Report: ${generateHtml ? 'Activado (reports/*.html)' : 'Desactivado'}`);
  console.log(`Umbrales:    Perf: ${THRESHOLDS.performance}, A11y: ${THRESHOLDS.accessibility}, BP: ${THRESHOLDS.bestPractices}, SEO: ${THRESHOLDS.seo}`);
  console.log(`URLs:        ${urls.length} objetivo(s)`);

  // Healthcheck previo: verificar si el servidor está activo
  const firstUrl = urls[0];
  console.log(`\nComprobando disponibilidad del servidor en ${firstUrl}...`);
  const isServerReady = await checkServerAvailable(firstUrl, 4000);

  if (!isServerReady) {
    console.error(`\n[ERROR] No se pudo conectar al servidor en ${firstUrl}`);
    console.error(`Asegúrate de que el servidor esté activo antes de ejecutar la auditoría:`);
    console.error(`  - Desarrollo:  npm start (o npx ng serve --host 127.0.0.1 --port 4200)`);
    console.error(`  - Producción:  npm run build && npx serve -s dist/toefl-exam/browser -p 4200`);
    console.error(`  - O define otra URL: LIGHTHOUSE_URLS="http://mi-url"\n`);
    process.exit(1);
  }
  console.log(`Servidor respondiendo correctamente.\n`);

  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
  });

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const reports = [];

  for (const url of urls) {
    console.log(`\nAuditando: ${url} (${RUNS_PER_URL} corrida${RUNS_PER_URL > 1 ? 's' : ''}) [${preset}]`);
    const report = await auditUrl(chrome, url, preset);
    reports.push(report);

    const slug = slugify(url);
    const jsonPath = `${OUTPUT_DIR}/lighthouse-${slug}-${preset}.json`;
    const htmlPath = `${OUTPUT_DIR}/lighthouse-${slug}-${preset}.html`;

    // Guardar JSON (sin htmlReport para mantener limpio el JSON)
    const { htmlReport, ...jsonReport } = report;
    await fs.writeFile(jsonPath, `${JSON.stringify(jsonReport, null, 2)}\n`);

    // Guardar reporte interactivo HTML si está habilitado
    if (htmlReport) {
      await fs.writeFile(htmlPath, htmlReport);
    }

    console.table(report.scores);
    console.table(report.metrics);
    console.log(report.agentSummary);
    if (htmlReport) {
      console.log(`Reporte visual HTML: ${htmlPath}`);
    }

    if (!report.verdict.passed) allPassed = false;
  }

  const aggregate = {
    generatedAt: new Date().toISOString(),
    preset,
    thresholds: THRESHOLDS,
    passed: allPassed,
    reports: reports.map((r) => ({
      url: r.url,
      preset: r.preset,
      scores: r.scores,
      verdict: r.verdict,
      agentSummary: r.agentSummary,
      htmlReportFile: generateHtml ? `${OUTPUT_DIR}/lighthouse-${slugify(r.url)}-${preset}.html` : null,
    })),
  };

  await fs.writeFile(`${OUTPUT_DIR}/lighthouse-summary.json`, `${JSON.stringify(aggregate, null, 2)}\n`);
  await fs.writeFile(
    `${OUTPUT_DIR}/lighthouse-summary.txt`,
    `${reports.map((r) => r.agentSummary).join('\n\n')}\n`,
  );

  console.log(`\n------------------------------------------------------`);
  console.log(`Reportes guardados en directorio: ${OUTPUT_DIR}/`);
  console.log(allPassed ? '[PASS] Todos los umbrales se cumplieron con éxito.' : '[FAIL] Hay categorías por debajo del umbral.');
  console.log(`------------------------------------------------------\n`);

  process.exitCode = allPassed ? 0 : 1;
} finally {
  if (chrome) {
    await chrome.kill();
  }
}