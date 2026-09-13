import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src', 'app');

function getAllFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extensions));
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      results.push(filePath);
    }
  }

  return results;
}

function checkHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (line.includes('*ngIf')) {
      issues.push({
        line: lineNum,
        type: 'Control Flow Legado',
        message: 'Uso de *ngIf detectado. Reemplazar por sintaxis moderna @if (...) { }',
      });
    }

    if (line.includes('*ngFor')) {
      issues.push({
        line: lineNum,
        type: 'Control Flow Legado',
        message: 'Uso de *ngFor detectado. Reemplazar por sintaxis moderna @for (item of list; track item.id) { }',
      });
    }

    if (line.includes('*ngSwitch')) {
      issues.push({
        line: lineNum,
        type: 'Control Flow Legado',
        message: 'Uso de *ngSwitch detectado. Reemplazar por sintaxis moderna @switch (val) { }',
      });
    }

    if (line.includes('@for') && !line.includes('track')) {
      issues.push({
        line: lineNum,
        type: 'Falta de track en @for',
        message: 'Bloque @for sin parametro track. Siempre incluir track para optimizar Change Detection.',
      });
    }

    if (line.includes('| async')) {
      issues.push({
        line: lineNum,
        type: 'Pipe Async Legado',
        message: 'Uso de pipe async detectado. Evaluar migración a rxResource() o Signals.',
      });
    }
  }

  return issues;
}

function checkTsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (line.includes('@NgModule')) {
      issues.push({
        line: lineNum,
        type: 'NgModule Legado',
        message: 'Uso de @NgModule detectado. Usar componentes standalone (standalone: true).',
      });
    }

    if (line.includes('@HostListener') || line.includes('@HostBinding')) {
      issues.push({
        line: lineNum,
        type: 'Decoradores Host Legados',
        message: 'Uso de @HostListener / @HostBinding. Usar propiedad host: { } en el decorador @Component / @Directive.',
      });
    }

    if (line.includes('BehaviorSubject') || line.includes('ReplaySubject')) {
      issues.push({
        line: lineNum,
        type: 'RxJS Subject para Estado',
        message: 'Uso de BehaviorSubject / ReplaySubject para estado. Usar signal() de Angular.',
      });
    }
  }

  return issues;
}

console.log('Auditando sintaxis y compatibilidad con Angular 21...\n');

const htmlFiles = getAllFiles(srcDir, ['.html']);
const tsFiles = getAllFiles(srcDir, ['.ts']);

const report = new Map();
let totalIssues = 0;

for (const file of htmlFiles) {
  const issues = checkHtmlFile(file);
  if (issues.length > 0) {
    const relPath = path.relative(projectRoot, file);
    report.set(relPath, issues);
    totalIssues += issues.length;
  }
}

for (const file of tsFiles) {
  const issues = checkTsFile(file);
  if (issues.length > 0) {
    const relPath = path.relative(projectRoot, file);
    report.set(relPath, issues);
    totalIssues += issues.length;
  }
}

if (totalIssues === 0) {
  console.log('Sin desviaciones sintacticas. El codigo cumple al 100% con los estandares modernos de Angular 21.\n');
  process.exit(0);
}

console.log(`Se encontraron ${totalIssues} observacion(es) de compatibilidad:\n`);

for (const [file, issues] of report.entries()) {
  console.log(`[FILE] ${file}`);
  for (const issue of issues) {
    console.log(`  L${issue.line} [${issue.type}] - ${issue.message}`);
  }
  console.log('');
}
