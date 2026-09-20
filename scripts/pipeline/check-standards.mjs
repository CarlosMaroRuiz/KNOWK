/**
 * Auditor de la "Lista Roja" definida en AGENT.md (tolerancia cero).
 * Cubre las prohibiciones que ningun otro script verifica.
 *
 * Salida: 0 = cumple, 1 = violaciones.
 */
import {
  getFiles,
  printFindings,
  printHeader,
  printVerdict,
  read,
  srcRoot,
} from './lib/audit-utils.mjs';

const EMOJI_PATTERN = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}]/u;
const HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/;
const COLOR_FN_PATTERN = /\b(?:rgb|rgba|hsl|hsla)\s*\(/;
const ANY_PATTERN = /(?::\s*any\b|<any>|\bas\s+any\b|\bany\s*\[\])/;
const ROUTE_LITERAL_PATTERN = /(?:routerLink|navigate|navigateByUrl)\s*[=(]\s*['"`]\//;
const CONSTRUCTOR_INJECTION_PATTERN = /constructor\s*\([^)]*(?:private|protected)\s+\w+/;
const STANDALONE_MISSING_PATTERN = /@(Component|Directive)\s*\(\s*\{(?:(?!standalone)[\s\S])*?\}\)/;

/** Busca un patron linea por linea, ignorando comentarios de linea. */
function findByLine(file, content, pattern, message) {
  const findings = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const withoutComment = lines[i].replace(/\/\/.*$/, '');
    if (pattern.test(withoutComment)) {
      findings.push({ file, line: i + 1, message });
    }
  }

  return findings;
}

function checkTokens() {
  const files = getFiles(srcRoot, ['.css']);
  const findings = [];

  for (const file of files) {
    const content = read(file);
    findings.push(
      ...findByLine(
        file,
        content,
        HEX_PATTERN,
        'Color hexadecimal. Usar var(--token) definido en src/styles.css.',
      ),
      ...findByLine(
        file,
        content,
        COLOR_FN_PATTERN,
        'Funcion rgb()/hsl(). Usar var(--token).',
      ),
    );
  }

  return findings;
}

function checkEmojis() {
  const files = getFiles(srcRoot, ['.ts', '.html', '.css']);
  const findings = [];

  for (const file of files) {
    if (file.endsWith('.spec.ts')) continue;
    const match = read(file).match(EMOJI_PATTERN);
    if (match) {
      findings.push({
        file,
        message: `Emoji "${match[0]}" en codigo. Usar iconos de lucide-angular.`,
      });
    }
  }

  return findings;
}

function checkTypeScript() {
  const files = getFiles(srcRoot, ['.ts']);
  const findings = [];

  for (const file of files) {
    const content = read(file);
    findings.push(
      ...findByLine(
        file,
        content,
        ANY_PATTERN,
        'Uso de "any". Tipar correctamente o justificar con comentario.',
      ),
      ...findByLine(
        file,
        content,
        CONSTRUCTOR_INJECTION_PATTERN,
        'Inyeccion por constructor. Usar inject() (Angular 21).',
      ),
    );
  }

  return findings;
}

function checkRouteLiterals() {
  const files = getFiles(srcRoot, ['.ts', '.html']);
  const findings = [];

  for (const file of files) {
    if (file.includes('routes.config.ts')) continue;
    findings.push(
      ...findByLine(
        file,
        read(file),
        ROUTE_LITERAL_PATTERN,
        'Ruta literal en navegacion. Usar APP_ROUTES.X.path.',
      ),
    );
  }

  return findings;
}

function checkStandalone() {
  const files = getFiles(srcRoot, ['.ts']);
  const findings = [];

  for (const file of files) {
    const content = read(file);
    if (!/@(Component|Directive)\s*\(/.test(content)) continue;

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!/@(Component|Directive)\s*\(/.test(lines[i])) continue;

      // Revisa las siguientes lineas buscando el cierre del decorador.
      let found = false;
      for (let j = i; j < Math.min(i + 40, lines.length); j++) {
        if (/standalone\s*:\s*true/.test(lines[j])) {
          found = true;
          break;
        }
        if (/^\s*\}\)/.test(lines[j])) break;
      }

      if (!found) {
        findings.push({
          file,
          line: i + 1,
          message: 'Decorador sin "standalone: true" (obligatorio en Angular 21).',
        });
      }
      break;
    }
  }

  return findings;
}

printHeader('Lista Roja - AGENT.md', 'tolerancia cero del proyecto');

const findings = [
  ...checkTokens(),
  ...checkEmojis(),
  ...checkTypeScript(),
  ...checkRouteLiterals(),
  ...checkStandalone(),
];

printFindings(findings);

const exitCode = printVerdict(
  findings,
  'Sin violaciones de la Lista Roja.',
  'Corregir antes de cerrar el ticket.',
);

process.exit(exitCode);
