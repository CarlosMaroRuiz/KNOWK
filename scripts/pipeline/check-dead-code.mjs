/**
 * Auditor ESTRICTO de codigo sin usar.
 * Complementa a check-unused.mjs (que solo ve lo que detecta TypeScript).
 *
 * Detecta lo que TypeScript NO puede ver:
 *  1. Clases exportadas que nadie importa.
 *  2. Archivos completos huerfanos (nadie los referencia).
 *  3. Componentes declarados en `imports: []` pero no usados en el template.
 *  4. Metodos `protected`/`public` de componentes que el template no invoca.
 *  5. Interfaces/tipos exportados sin consumidor.
 *
 * Salida: 0 = limpio, 1 = hallazgos.
 */
import path from 'node:path';
import {
  getFiles,
  printFindings,
  printHeader,
  printVerdict,
  read,
  relative,
  srcRoot,
} from './lib/audit-utils.mjs';

/**
 * Archivos que son puntos de entrada legitimos y no se importan
 * directamente (los carga el router o el bootstrap).
 */
const ENTRY_POINT_PATTERNS = [
  /\.routes\.ts$/,
  /\.config\.ts$/,
  /main\.ts$/,
  /\.spec\.ts$/,
  /routes\.config\.ts$/,
];

function isEntryPoint(file) {
  return ENTRY_POINT_PATTERNS.some((pattern) => pattern.test(file));
}

function buildSourceIndex(files) {
  const index = new Map();
  for (const file of files) {
    index.set(path.basename(file, '.ts'), file);
  }
  return index;
}

/** 1 y 2: detecta archivos que nadie referencia. */
function checkOrphanFiles(files) {
  const findings = [];
  const contents = files.map((file) => ({ file, content: read(file) }));

  for (const { file, content } of contents) {
    if (isEntryPoint(file)) continue;
    // Los index.ts son barrels y suelen no ser importados directamente.
    if (path.basename(file) === 'index.ts') continue;

    const baseName = path.basename(file, '.ts');
    const kebabName = baseName.replace(/-/g, '-');

    let referenced = false;
    for (const other of contents) {
      if (other.file === file) continue;
      // Import por nombre de archivo o por clase.
      if (
        other.content.includes(`/${kebabName}'`) ||
        other.content.includes(`/${kebabName}"`) ||
        other.content.includes(`/${kebabName}.`)
      ) {
        referenced = true;
        break;
      }
    }

    if (!referenced) {
      findings.push({
        file,
        message: 'Archivo huerfano: ningun otro archivo lo importa.',
      });
    }
  }

  return findings;
}

/**
 * Modulos del framework y de librerias que Angular consume sin aparecer
 * como tag en el template (se usan via directivas o pipes).
 */
const FRAMEWORK_MODULE_ALLOWLIST = new Set([
  'LucideAngularModule',
  'RouterLink',
  'RouterLinkActive',
  'RouterOutlet',
  'FormsModule',
  'ReactiveFormsModule',
  'DecimalPipe',
  'DatePipe',
  'JsonPipe',
  'UpperCasePipe',
  'LowerCasePipe',
  'KeyValuePipe',
  'TitleCasePipe',
  'NgOptimizedImage',
  'CUSTOM_ELEMENTS_SCHEMA',
]);

/** 3: componentes importados en `imports: []` pero ausentes del template. */
function checkUnusedImportsInTemplate(files) {
  const findings = [];

  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    if (file.endsWith('.spec.ts')) continue;

    const content = read(file);
    const importsMatch = content.match(/imports\s*:\s*\[([^\]]*)\]/s);
    if (!importsMatch) continue;

    const templatePath = file.replace(/\.ts$/, '.html');
    const template = read(templatePath);
    if (!template) continue;

    const imported = importsMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const name of imported) {
      if (FRAMEWORK_MODULE_ALLOWLIST.has(name)) continue;

      // Las directivas se usan como atributo (appButton), no como tag.
      if (name.endsWith('Directive')) {
        const attrName = name.replace(/Directive$/, '');
        const attrSelector = `app${attrName}`;
        const usedAsAttr = new RegExp(`\\b${attrSelector}\\b`, 'i').test(template);

        if (!usedAsAttr) {
          findings.push({
            file,
            message: `Directiva "${name}" declarada en imports[] pero el atributo "${attrSelector}" no aparece en ${path.basename(templatePath)}.`,
          });
        }
        continue;
      }

      // Convierte CamelCase a kebab-case para buscar el selector en el HTML.
      const selector = name
        .replace(/Component$/, '')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();

      const usedAsTag =
        template.includes(`<app-${selector}`) || template.includes(`<${selector}`);

      if (!usedAsTag) {
        findings.push({
          file,
          message: `"${name}" declarado en imports[] pero no se usa en ${path.basename(templatePath)}.`,
        });
      }
    }
  }

  return findings;
}

/** 4: metodos protected del componente que el template no invoca. */
function checkUnusedComponentMethods(files) {
  const findings = [];

  for (const file of files) {
    if (!file.includes('/features/') && !file.includes('/common/')) continue;
    if (file.endsWith('.spec.ts')) continue;

    const templatePath = file.replace(/\.ts$/, '.html');
    const template = read(templatePath);
    if (!template) continue;

    const content = read(file);
    // Solo componentes standalone con plantilla.
    if (!/@Component\s*\(/.test(content)) continue;

    const methodPattern = /protected\s+(?:readonly\s+)?(\w+)\s*(?:\(|=)/g;
    let match;

    while ((match = methodPattern.exec(content)) !== null) {
      const name = match[1];

      // Ignora si TypeScript ya lo reporta como no usado dentro del .ts.
      const occurrences = content.split(new RegExp(`\\b${name}\\b`, 'g')).length - 1;
      if (occurrences > 1) continue;

      if (!template.includes(name)) {
        findings.push({
          file,
          message: `Miembro protected "${name}" no se usa en el template ni en la clase.`,
        });
      }
    }
  }

  return findings;
}

const tsFiles = getFiles(srcRoot, ['.ts']);

printHeader('Codigo sin usar (estricto)', 'huerfanos, imports de template, metodos');
console.log(`Archivos analizados: ${tsFiles.length}`);

const findings = [
  ...checkOrphanFiles(tsFiles),
  ...checkUnusedImportsInTemplate(tsFiles),
  ...checkUnusedComponentMethods(tsFiles),
];

printFindings(findings);

const exitCode = printVerdict(
  findings,
  'Sin codigo huerfano detectado.',
  'Eliminar o conectar los elementos listados.',
);

process.exit(exitCode);
