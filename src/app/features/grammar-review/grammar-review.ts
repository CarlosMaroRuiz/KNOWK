import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ButtonDirective } from '@common/components/button';
import { ErrorStateComponent } from '@common/components/error-state';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level, LEVELS } from '@common/models';
import { GrammarTopicCardComponent } from './iu/components/grammar-topic-card/grammar-topic-card';
import { LessonContainer } from './iu/components/lesson-container/lesson-container';
import { GrammarTopic } from './domain/models';
import { GrammarReviewUseCase } from './domain/usecases/grammar-review.use-case';
import { provideGrammarReview } from './providers/grammar-review.providers';
import { LevelLayout } from '@common/layouts/level-layout/level-layout';

@Component({
  selector: 'app-grammar-review',
  standalone: true,
  imports: [
    GrammarTopicCardComponent,
    SkeletonComponent,
    ErrorStateComponent,
    LevelLayout,
    LessonContainer,
  ],
  templateUrl: './grammar-review.html',
  styleUrl: './grammar-review.css',
  providers: [provideGrammarReview()],
})
export class GrammarReview {
  private readonly useCase = inject(GrammarReviewUseCase);

  protected readonly viewMode = signal<'catalog' | 'lesson'>('catalog');
  protected readonly selectedTopicId = signal<string | null>(null);
  protected readonly levels: Level[] = LEVELS as Level[];
  protected readonly selectLevel = signal<Level>('A2');
  protected readonly title = 'Grammar Review';
  protected readonly subtitle =
    'Repaso teorico e interactivo de reglas clave para el examen TOEFL ITP.';

  protected readonly topicsResource = rxResource<GrammarTopic[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getTopics(params),
  });

  protected readonly topics = computed(() => this.topicsResource.value() ?? []);

  protected readonly selectedTopic = computed(
    () => this.topics().find((t) => t.id === this.selectedTopicId()) ?? null,
  );

  constructor() {
    effect(() => {
      this.selectLevel();
      this.viewMode.set('catalog');
      this.selectedTopicId.set(null);
    });
  }

  protected changeLevel(level: Level): void {
    this.selectLevel.set(level);
  }

  protected selectTopic(id: string): void {
    this.selectedTopicId.set(id);
    this.viewMode.set('lesson');
  }

  protected backToCatalog(): void {
    this.viewMode.set('catalog');
    this.selectedTopicId.set(null);
  }

  protected retryFetch(): void {
    this.topicsResource.reload();
  }
}