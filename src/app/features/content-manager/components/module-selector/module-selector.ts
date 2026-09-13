import { Component, input, output } from '@angular/core';
import { ContentModuleOption, ContentModuleType } from '../../domain/models';

@Component({
  selector: 'app-module-selector',
  standalone: true,
  templateUrl: './module-selector.html',
  styleUrl: './module-selector.css',
})
export class ModuleSelectorComponent {
  readonly selectedModule = input.required<ContentModuleType>();
  readonly moduleSelected = output<ContentModuleType>();

  readonly modules: ContentModuleOption[] = [
    {
      id: 'vocabulary',
      title: 'Vocabulary Builder',
      description: 'Tarjetas de vocabulario académico, términos y definiciones.',
      iconName: 'BookA',
    },
    {
      id: 'sentence-structure',
      title: 'Sentence Structure',
      description: 'Preguntas de completar la estructura de la oración (Part A).',
      iconName: 'Puzzle',
    },
    {
      id: 'error-spotting',
      title: 'Error Spotting',
      description: 'Preguntas de identificación de errores gramaticales (Part B).',
      iconName: 'SpellCheck',
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension',
      description: 'Pasajes de lectura académica y sus baterías de preguntas.',
      iconName: 'BookOpen',
    },
    {
      id: 'grammar-review',
      title: 'Grammar Review',
      description: 'Lecciones teóricas interactivas y temas gramaticales.',
      iconName: 'PenTool',
    },
  ];

  onSelect(modId: ContentModuleType): void {
    this.moduleSelected.emit(modId);
  }
}
