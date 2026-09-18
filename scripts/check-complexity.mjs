import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src', 'app');

const MAX_COMPLEXITY = 8; // Umbral estándar recomendado: 8 - 10

function getAllTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsFiles(filePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
      results.push(filePath);
    }
  }

  return results;
}

function calculateCyclomaticComplexity(node) {
  let complexity = 1;

  function walk(n) {
    switch (n.kind) {
      case ts.SyntaxKind.IfStatement:
      case ts.SyntaxKind.ConditionalExpression: // Ternary ? :
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.ForOfStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
      case ts.SyntaxKind.CaseClause:
      case ts.SyntaxKind.CatchClause:
        complexity++;
        break;

      case ts.SyntaxKind.BinaryExpression: {
        const op = n.operatorToken.kind;
        if (
          op === ts.SyntaxKind.AmpersandAmpersandToken ||
          op === ts.SyntaxKind.BarBarToken ||
          op === ts.SyntaxKind.QuestionQuestionToken
        ) {
          complexity++;
        }
        break;
      }
    }

    ts.forEachChild(n, (child) => {
      // Don't recurse into nested function definitions (they are evaluated separately)
      if (
        !ts.isFunctionDeclaration(child) &&
        !ts.isMethodDeclaration(child) &&
        !ts.isArrowFunction(child) &&
        !ts.isFunctionExpression(child)
      ) {
        walk(child);
      }
    });
  }

  // Walk child nodes of the function body
  if (node.body) {
    walk(node.body);
  }

  return complexity;
}

function getFunctionName(node, sourceFile) {
  if (node.name) {
    return node.name.getText(sourceFile);
  }
  if (ts.isVariableDeclaration(node.parent) && node.parent.name) {
    return node.parent.name.getText(sourceFile);
  }
  if (ts.isPropertyDeclaration(node.parent) && node.parent.name) {
    return node.parent.name.getText(sourceFile);
  }
  const lineAndChar = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return `anonymous (L${lineAndChar.line + 1})`;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
  const issues = [];

  function visit(node) {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isGetAccessor(node) ||
      ts.isSetAccessor(node)
    ) {
      const complexity = calculateCyclomaticComplexity(node);
      if (complexity > MAX_COMPLEXITY) {
        const lineAndChar = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        const fnName = getFunctionName(node, sourceFile);
        issues.push({
          line: lineAndChar.line + 1,
          fnName,
          complexity,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return issues;
}

console.log(`======================================================`);
console.log(`🧠 TOEFL Exam App — Auditoría de Complejidad Ciclomática`);
console.log(`======================================================`);
console.log(`Umbral máximo permitido: ${MAX_COMPLEXITY}\n`);

const tsFiles = getAllTsFiles(srcDir);
const report = new Map();
let totalViolations = 0;

for (const file of tsFiles) {
  const issues = analyzeFile(file);
  if (issues.length > 0) {
    const relPath = path.relative(projectRoot, file);
    report.set(relPath, issues);
    totalViolations += issues.length;
  }
}

if (totalViolations === 0) {
  console.log(`✅ [PASS] Todas las funciones cumplen con el umbral de complejidad ciclomática (<= ${MAX_COMPLEXITY}).\n`);
  process.exit(0);
} else {
  console.log(`❌ [FAIL] Se encontraron ${totalViolations} funcion(es) que exceden la complejidad ciclomática permitida:\n`);
  for (const [file, issues] of report.entries()) {
    console.log(`[FILE] ${file}`);
    for (const issue of issues) {
      console.log(`  - L${issue.line} '${issue.fnName}' -> Complejidad Ciclomática: ${issue.complexity} (Max: ${MAX_COMPLEXITY})`);
    }
    console.log('');
  }
  process.exit(1);
}
