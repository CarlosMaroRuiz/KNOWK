/**
 * Orquestador del pipeline de calidad.
 *
 * Ejecuta los auditores en fases (rapido -> lento), mide el tiempo de cada uno
 * y devuelve un unico codigo de salida agregado.
 *
 * Uso:
 *   node scripts/pipeline/run.mjs                 # Pipeline completo
 *   node scripts/pipeline/run.mjs --fast          # Omite build y tests
 *   node scripts/pipeline/run.mjs --list          # Solo lista los checks
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);

const args = process.argv.slice(2);
const isFast = args.includes('--fast');
const isList = args.includes('--list');

/**
 * Cada check declara:
 *  - id: identificador corto
 *  - label: descripcion legible
 *  - script: ruta relativa del script
 *  - phase: 'static' (rapido) | 'build' (lento)
 *  - blocking: si su fallo invalida el pipeline
 *  - npm: si debe ejecutarse via npm run <script>
 */
const CHECKS = [
  // -- Fase 1: estatico (segundos) --
  {
    id: 'standards',
    label: 'Lista Roja (AGENT.md)',
    script: 'scripts/pipeline/check-standards.mjs',
    phase: 'static',
    blocking: true,
  },
  {
    id: 'naming',
    label: 'Nomenclatura',
    script: 'scripts/pipeline/check-naming.mjs',
    phase: 'static',
    blocking: true,
  },
  {
    id: 'ng-compat',
    label: 'Compatibilidad Angular 21',
    npm: 'check:ng-compat',
    phase: 'static',
    blocking: true,
  },
  {
    id: 'complexity',
    label: 'Complejidad ciclomatica',
    npm: 'check:complexity',
    phase: 'static',
    blocking: true,
  },
  {
    id: 'unused',
    label: 'Codigo sin usar (TypeScript)',
    npm: 'check:unused',
    phase: 'static',
    blocking: true,
  },
  {
    id: 'dead-code',
    label: 'Codigo sin usar (estricto)',
    script: 'scripts/pipeline/check-dead-code.mjs',
    phase: 'static',
    blocking: false,
  },

  // -- Fase 2: compilacion (lento) --
  {
    id: 'build',
    label: 'Build de produccion',
    npm: 'build',
    phase: 'build',
    blocking: true,
    skipInFast: true,
  },
];

if (isList) {
  console.log('');
  console.log('Checks del pipeline:');
  console.log('');
  for (const check of CHECKS) {
    const mode = check.skipInFast ? '(se omite con --fast)' : '';
    console.log(`  [${check.phase}] ${check.id.padEnd(12)} ${check.label} ${mode}`);
  }
  console.log('');
  process.exit(0);
}

function runCheck(check) {
  const started = Date.now();

  const result = check.npm
    ? spawnSync('npm', ['run', check.npm], {
        cwd: projectRoot,
        shell: true,
        stdio: 'pipe',
        encoding: 'utf-8',
      })
    : spawnSync('node', [check.script], {
        cwd: projectRoot,
        shell: true,
        stdio: 'pipe',
        encoding: 'utf-8',
      });

  const duration = Date.now() - started;
  const exitCode = result.status === null ? 1 : result.status;
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;

  return { check, duration, exitCode, output };
}

function printSummary(results) {
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  console.log('');
  console.log('='.repeat(60));
  console.log('[PIPELINE] Resumen');
  console.log('='.repeat(60));
  console.log('');

  for (const { check, duration, exitCode } of results) {
    const status = exitCode === 0 ? 'PASS' : 'FAIL';
    const blocking = check.blocking ? '' : ' (no bloqueante)';
    const seconds = `${(duration / 1000).toFixed(2)}s`.padStart(8);
    console.log(`  [${status}] ${check.id.padEnd(12)} ${seconds}${blocking}`);
  }

  console.log('');
  console.log(`  Tiempo total: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log('');
}

function writeJsonReport(results) {
  const reportsDir = path.join(projectRoot, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: isFast ? 'fast' : 'full',
    totalDurationMs: results.reduce((sum, r) => sum + r.duration, 0),
    passed: results.every((r) => r.exitCode === 0 || !r.check.blocking),
    checks: results.map(({ check, duration, exitCode, output }) => ({
      id: check.id,
      label: check.label,
      phase: check.phase,
      blocking: check.blocking,
      status: exitCode === 0 ? 'pass' : 'fail',
      durationMs: duration,
      output: output.slice(-2000),
    })),
  };

  fs.writeFileSync(
    path.join(reportsDir, 'pipeline.json'),
    JSON.stringify(report, null, 2),
    'utf-8',
  );
}

console.log('');
console.log('='.repeat(60));
console.log('[PIPELINE] Auditoria de calidad del proyecto');
console.log(`           Modo: ${isFast ? 'fast (sin build)' : 'completo'}`);
console.log('='.repeat(60));

const checksToRun = CHECKS.filter((c) => !(isFast && c.skipInFast));
const results = [];

for (const check of checksToRun) {
  process.stdout.write(`\n>> ${check.label}...\n`);
  const result = runCheck(check);
  results.push(result);

  // Muestra la salida completa: nada es caja negra.
  if (result.output.trim()) {
    console.log(result.output);
  }
}

printSummary(results);
writeJsonReport(results);

const blockingFailures = results.filter((r) => r.exitCode !== 0 && r.check.blocking);

if (blockingFailures.length > 0) {
  console.log(`[PIPELINE][FAIL] ${blockingFailures.length} check(s) bloqueante(s) fallaron.`);
  console.log('');
  process.exit(1);
}

console.log('[PIPELINE][PASS] Todos los checks bloqueantes pasaron.');
console.log('');
process.exit(0);
