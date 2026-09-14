import fs from 'node:fs/promises';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------

const urls = (process.env.LIGHTHOUSE_URLS ?? process.env.LIGHTHOUSE_URL ?? 'http://127.0.0.1:4200')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

const THRESHOLDS = {
  performance: Number(process.env.LH_MIN_PERFORMANCE ?? 80),
  accessibility: Number(process.env.LH_MIN_ACCESSIBILITY ?? 90),
  bestPractices: Number(process.env.LH_MIN_BEST_PRACTICES ?? 85),
  seo: Number(process.env.LH_MIN_SEO ?? 90),
};

const RUNS_PER_URL = Number(process.env.LH_RUNS ?? 1); // subir a 2-3 para reducir ruido (mediana)
const OUTPUT_DIR = 'reports';

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
    return `Todos los checks pasaron (${report.url}). Scores: ${Object.entries(report.scores)
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

  return `Fallos en ${report.url}:\n${lines.join('\n\n')}`;
}

async function runOnce(chrome, url) {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  if (!result?.lhr) {
    throw new Error(`Lighthouse no devolvió un reporte válido para ${url}.`);
  }

  const { lhr } = result;
  if (lhr.runtimeError) {
    throw new Error(`Lighthouse no pudo cargar ${url}: ${lhr.runtimeError.message}`);
  }

  return lhr;
}

async function auditUrl(chrome, url) {
  const runs = [];
  for (let i = 0; i < RUNS_PER_URL; i += 1) {
    runs.push(await runOnce(chrome, url));
  }

  const pickLhr = runs[runs.length - 1];
  const scores = {
    performance: Math.round(median(runs.map((r) => score(r, 'performance')))),
    accessibility: Math.round(median(runs.map((r) => score(r, 'accessibility')))),
    bestPractices: Math.round(median(runs.map((r) => score(r, 'best-practices')))),
    seo: Math.round(median(runs.map((r) => score(r, 'seo')))),
  };

  const report = {
    url,
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
  };

  report.diagnostics.bestPractices = report.diagnostics['best-practices'];
  delete report.diagnostics['best-practices'];

  report.verdict = buildVerdict(scores);
  report.agentSummary = toAgentSummary(report);

  return report;
}

function slugify(url) {
  return url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

let chrome;
let allPassed = true;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
  });

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const reports = [];

  for (const url of urls) {
    console.log(`\nAuditando: ${url} (${RUNS_PER_URL} corrida${RUNS_PER_URL > 1 ? 's' : ''})`);
    const report = await auditUrl(chrome, url);
    reports.push(report);

    const slug = slugify(url);
    await fs.writeFile(
      `${OUTPUT_DIR}/lighthouse-${slug}.json`,
      `${JSON.stringify(report, null, 2)}\n`,
    );

    console.table(report.scores);
    console.table(report.metrics);
    console.log(report.agentSummary);

    if (!report.verdict.passed) allPassed = false;
  }

  const aggregate = {
    generatedAt: new Date().toISOString(),
    thresholds: THRESHOLDS,
    passed: allPassed,
    reports: reports.map((r) => ({
      url: r.url,
      scores: r.scores,
      verdict: r.verdict,
      agentSummary: r.agentSummary,
    })),
  };

  await fs.writeFile(`${OUTPUT_DIR}/lighthouse-summary.json`, `${JSON.stringify(aggregate, null, 2)}\n`);
  await fs.writeFile(
    `${OUTPUT_DIR}/lighthouse-summary.txt`,
    `${reports.map((r) => r.agentSummary).join('\n\n')}\n`,
  );

  console.log(`\nReportes guardados en ${OUTPUT_DIR}/`);
  console.log(allPassed ? 'Todos los umbrales se cumplieron.' : 'Hay categorías por debajo del umbral.');

  process.exitCode = allPassed ? 0 : 1;
} finally {
  if (chrome) {
    await chrome.kill();
  }
}