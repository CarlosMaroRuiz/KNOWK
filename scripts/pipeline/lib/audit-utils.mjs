/**
 * Utilidades compartidas por los auditores del pipeline.
 * Un unico estilo de salida y un unico contrato: exit 0 = pasa, exit 1 = falla.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..',
);

export const srcRoot = path.join(projectRoot, 'src', 'app');

const DEFAULT_IGNORE = ['node_modules', 'dist', '.git'];

/** Recorre un directorio y devuelve los archivos con las extensiones indicadas. */
export function getFiles(dir, extensions, ignore = DEFAULT_IGNORE) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignore.includes(entry)) {
        results.push(...getFiles(fullPath, extensions, ignore));
      }
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      results.push(fullPath);
    }
  }

  return results;
}

/** Ruta relativa al proyecto con separadores normalizados. */
export function relative(filePath) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/');
}

/** Lee un archivo con manejo de error tolerante. */
export function read(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
}

/** Cabecera uniforme de los auditores. */
export function printHeader(title, subtitle = '') {
  console.log('');
  console.log('='.repeat(60));
  console.log(`[AUDIT] ${title}`);
  if (subtitle) console.log(`        ${subtitle}`);
  console.log('='.repeat(60));
}

/** Hallazgos agrupados por archivo. */
export function printFindings(findings) {
  const grouped = new Map();

  for (const finding of findings) {
    const key = relative(finding.file);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(finding);
  }

  for (const [file, items] of grouped.entries()) {
    console.log(`[FILE] ${file}`);
    for (const item of items) {
      const location = item.line ? `L${item.line}: ` : '';
      console.log(`  ${location}${item.message}`);
    }
    console.log('');
  }
}

/** Veredicto final. Sale con exit 0 o exit 1. */
export function printVerdict(findings, passMessage, failHint) {
  if (findings.length === 0) {
    console.log(`[PASS] ${passMessage}`);
    console.log('');
    return 0;
  }

  console.log(`[FAIL] ${findings.length} hallazgo(s). ${failHint}`);
  console.log('');
  return 1;
}
