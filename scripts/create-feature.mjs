import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function getArgValue() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--name=')) {
      return args[i].split('=')[1];
    }
    if (args[i] === '--name' && args[i + 1]) {
      return args[i + 1];
    }
    if (!args[i].startsWith('--')) {
      return args[i];
    }
  }
  return null;
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toUpperSnakeCase(str) {
  return str.replace(/-/g, '_').toUpperCase();
}

const rawName = getArgValue();

if (!rawName) {
  console.error('Error: Debe especificar el nombre de la feature.');
  console.error('Uso: npm run create:feature -- mi-feature');
  console.error('     node scripts/create-feature.mjs mi-feature');
  process.exit(1);
}

const kebabName = toKebabCase(rawName);
const pascalName = toPascalCase(kebabName);
const upperSnakeName = toUpperSnakeCase(kebabName);

const targetDir = path.join(projectRoot, 'src', 'app', 'features', kebabName);

if (fs.existsSync(targetDir)) {
  console.error(`Error: La feature "${kebabName}" ya existe en ${targetDir}`);
  process.exit(1);
}

console.log(`[INFO] Generando estructura para la feature: ${kebabName} (${pascalName})...`);

const filesToCreate = [
  {
    filePath: path.join(targetDir, 'domain', 'models', 'index.ts'),
    content: `export interface ${pascalName}Item {
  id: string;
  title: string;
}
`,
  },
  {
    filePath: path.join(targetDir, 'domain', 'repository', `${kebabName}.repository.ts`),
    content: `import { Observable } from 'rxjs';
import { ${pascalName}Item } from '../models';

export abstract class ${pascalName}Repository {
  abstract fetchItems(level: string): Observable<${pascalName}Item[]>;
}
`,
  },
  {
    filePath: path.join(targetDir, 'domain', 'usecases', `${kebabName}.use-case.ts`),
    content: `import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ${pascalName}Item } from '../models';
import { ${pascalName}Repository } from '../repository/${kebabName}.repository';

@Injectable()
export class ${pascalName}UseCase {
  private readonly repository = inject(${pascalName}Repository);

  getItems(level: string): Observable<${pascalName}Item[]> {
    return this.repository.fetchItems(level);
  }
}
`,
  },
  {
    filePath: path.join(targetDir, 'data', 'mocks', `${kebabName}-a2.mock.ts`),
    content: `import { ${pascalName}Item } from '../../domain/models';

export const ${upperSnakeName}_MOCK_DATA_A2: ${pascalName}Item[] = [
  {
    id: '1',
    title: 'Ejemplo 1',
  },
];
`,
  },
  {
    filePath: path.join(targetDir, 'data', 'repositories', `${kebabName}-mock.repository.ts`),
    content: `import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ${pascalName}Item } from '../../domain/models';
import { ${pascalName}Repository } from '../../domain/repository/${kebabName}.repository';
import { ${upperSnakeName}_MOCK_DATA_A2 } from '../mocks/${kebabName}-a2.mock';

@Injectable()
export class ${pascalName}MockRepository implements ${pascalName}Repository {
  fetchItems(_level: string): Observable<${pascalName}Item[]> {
    return of(${upperSnakeName}_MOCK_DATA_A2).pipe(delay(500));
  }
}
`,
  },
  {
    filePath: path.join(targetDir, 'providers', `${kebabName}.providers.ts`),
    content: `import { Provider } from '@angular/core';
import { ${pascalName}MockRepository } from '../data/repositories/${kebabName}-mock.repository';
import { ${pascalName}Repository } from '../domain/repository/${kebabName}.repository';
import { ${pascalName}UseCase } from '../domain/usecases/${kebabName}.use-case';

export const provide${pascalName} = (): Provider[] => [
  ${pascalName}UseCase,
  ${pascalName}MockRepository,
  {
    provide: ${pascalName}Repository,
    useExisting: ${pascalName}MockRepository,
  },
];
`,
  },
  {
    filePath: path.join(targetDir, `${kebabName}.ts`),
    content: `import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { ${pascalName}Item } from './domain/models';
import { ${pascalName}UseCase } from './domain/usecases/${kebabName}.use-case';
import { provide${pascalName} } from './providers/${kebabName}.providers';

@Component({
  selector: 'app-${kebabName}',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './${kebabName}.html',
  styleUrl: './${kebabName}.css',
  providers: [provide${pascalName}()],
})
export class ${pascalName} {
  private readonly useCase = inject(${pascalName}UseCase);
  protected readonly selectLevel = signal<string>('A2');

  protected readonly itemsResource = rxResource<${pascalName}Item[], string>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getItems(params),
  });
}
`,
  },
  {
    filePath: path.join(targetDir, `${kebabName}.html`),
    content: `<div class="${kebabName}-container">
  <h2>${pascalName}</h2>
  @if (itemsResource.isLoading()) {
    <p>Cargando...</p>
  } @else {
    <ul>
      @for (item of itemsResource.value(); track item.id) {
        <li>{{ item.title }}</li>
      }
    </ul>
  }
</div>
`,
  },
  {
    filePath: path.join(targetDir, `${kebabName}.css`),
    content: `.${kebabName}-container {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}
`,
  },
];

for (const file of filesToCreate) {
  const dir = path.dirname(file.filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(file.filePath, file.content, 'utf-8');
  const relPath = path.relative(projectRoot, file.filePath);
  console.log(`[CREATE] ${relPath}`);
}

console.log(`\n[SUCCESS] Feature "${kebabName}" generada exitosamente.`);
console.log(`[INFO] Siguiente paso: Agregar la ruta en core/routes/routes.config.ts y app.routes.ts.`);
