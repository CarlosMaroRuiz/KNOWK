/**
 * Auditor de nomenclatura segun 03 - Estandares de Codificacion.md.
 *
 * Reglas:
 *  - Archivos en kebab-case.
 *  - Repositorios: <feature>.repository.ts (abstracto) / <feature>-http.repository.ts.
 *  - Casos de uso: <feature>.use-case.ts.
 *  - Providers: <feature>.providers.ts.
 *  - Clases en PascalCase; sin prefijo "I" en interfaces.
 *  - Componentes con selector app- o nombre descriptivo.
 *
 * Salida: 0 = cumple, 1 = violaciones.
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

const KEBAB_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9-]+)*$/;
const CLASS_PATTERN = /export\s+class\s+([A-Za-z0-9_]+)/g;
const INTERFACE_PATTERN = /export\s+interface\s+(I[A-Z][A-Za-z0-9_]*)/g;
const SELECTOR_PATTERN = /selector\s*:\s*['"`]([^'"`]+)['"`]/;

function checkFileNames(files) {
  const findings = [];

  for (const file of files) {
    const name = path.basename(file);
    if (!KEBAB_PATTERN.test(name)) {
      findings.push({
        file,
        message: `Nombre de archivo "${name}" no esta en kebab-case.`,
      });
    }
  }

  return findings;
}

function checkRepositorySuffix(files) {
  const findings = [];

  for (const file of files) {
    const name = path.basename(file);
    const inRepositoryFolder = file.replace(/\\/g, '/').includes('/repository/');

    if (!inRepositoryFolder) continue;

    const isValidName =
      name.endsWith('.repository.ts') && !name.endsWith('-repository.ts');

    if (!isValidName) {
      findings.push({
        file,
        message:
          'Repositorio abstracto debe llamarse <feature>.repository.ts (sin "repository" en kebab).',
      });
    }
  }

  return findings;
}

function checkUseCaseSuffix(files) {
  const findings = [];

  for (const file of files) {
    if (!file.replace(/\\/g, '/').includes('/usecases/')) continue;

    if (!path.basename(file).endsWith('.use-case.ts')) {
      findings.push({
        file,
        message: 'Caso de uso debe llamarse <feature>.use-case.ts.',
      });
    }
  }

  return findings;
}

function checkInterfacesPrefix() {
  const files = getFiles(srcRoot, ['.ts']);
  const findings = [];

  for (const file of files) {
    const content = read(file);
    let match;

    INTERFACE_PATTERN.lastIndex = 0;
    while ((match = INTERFACE_PATTERN.exec(content)) !== null) {
      findings.push({
        file,
        message: `Interface "${match[1]}" usa prefijo "I". El estandar lo prohibe.`,
      });
    }
  }

  return findings;
}

/**
 * Convencion del proyecto (confirmada en el Componente de Referencia):
 *  - El componente RAIZ de la feature va sin sufijo (ErrorSpotting, Index).
 *  - Los SUB-componentes usan sufijo Component (PracticeCardComponent).
 * Por eso NO se reporta el sufijo "Component": ambos estilos son validos.
 */
function checkClassNames(files) {
  const findings = [];

  for (const file of files) {
    const content = read(file);
    let match;

    CLASS_PATTERN.lastIndex = 0;
    while ((match = CLASS_PATTERN.exec(content)) !== null) {
      const className = match[1];
      // Solo se exige PascalCase (primera letra mayuscula).
      if (!/^[A-Z]/.test(className)) {
        findings.push({
          file,
          message: `Clase "${className}" no esta en PascalCase.`,
        });
      }
    }
  }

  return findings;
}

function checkSelectors(files) {
  const findings = [];

  for (const file of files) {
    const content = read(file);
    const match = content.match(SELECTOR_PATTERN);
    if (!match) continue;

    const selector = match[1];
    // Admite: app-x, kebab-case, o selector de atributo button[appButton].
    const isOk =
      selector.startsWith('app-') ||
      /^[a-z][a-z0-9-]*$/.test(selector) ||
      /^[a-z]+\s*\[/.test(selector);

    if (!isOk) {
      findings.push({
        file,
        message: `Selector "${selector}" no sigue la convencion (app-*, kebab-case o elemento[attr]).`,
      });
    }
  }

  return findings;
}

const tsFiles = getFiles(srcRoot, ['.ts']).filter((f) => !f.endsWith('.spec.ts'));

printHeader('Nomenclatura - 03 Estandares', 'archivos, clases, interfaces, selectores');

const findings = [
  ...checkFileNames(tsFiles),
  ...checkRepositorySuffix(tsFiles),
  ...checkUseCaseSuffix(tsFiles),
  ...checkInterfacesPrefix(),
  ...checkClassNames(tsFiles),
  ...checkSelectors(tsFiles),
];

printFindings(findings);

const exitCode = printVerdict(
  findings,
  'Nomenclatura conforme al estandar.',
  'Renombrar los elementos indicados.',
);

process.exit(exitCode);
