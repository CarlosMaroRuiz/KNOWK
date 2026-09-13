import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const UNUSED_CODES = new Set([6133, 6138, 6192, 6196]);

console.log('Auditando codigo sin usar en el proyecto...\n');

const configPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, 'tsconfig.json');
if (!configPath) {
  console.error('Error: No se encontro tsconfig.json');
  process.exit(1);
}

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, projectRoot);

parsed.options.noUnusedLocals = true;
parsed.options.noUnusedParameters = true;

const program = ts.createProgram(parsed.fileNames, parsed.options);
const allDiagnostics = ts.getPreEmitDiagnostics(program);

const unusedDiagnostics = allDiagnostics.filter(
  (d) => UNUSED_CODES.has(d.code) && d.file && !d.file.fileName.includes('node_modules')
);

if (unusedDiagnostics.length === 0) {
  console.log('Sin codigo muerto ni variables/imports sin usar.\n');
  process.exit(0);
}

console.log(`Se encontraron ${unusedDiagnostics.length} elemento(s) sin usar:\n`);

const grouped = new Map();

for (const d of unusedDiagnostics) {
  const relPath = path.relative(projectRoot, d.file.fileName);
  if (!grouped.has(relPath)) {
    grouped.set(relPath, []);
  }

  const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
  const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');

  grouped.get(relPath).push({
    line: line + 1,
    col: character + 1,
    message,
  });
}

for (const [file, items] of grouped.entries()) {
  console.log(`[FILE] ${file}`);
  for (const item of items) {
    console.log(`  L${item.line}:${item.col} - ${item.message}`);
  }
  console.log('');
}
