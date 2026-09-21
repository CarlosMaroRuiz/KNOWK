import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LevelLayout } from '@common/layouts/level-layout/level-layout';
import { ErrorStateComponent } from '@common/components/error-state';
import { SkeletonComponent } from '@common/components/skeleton';
import { Level, LEVELS } from '@common/models';
import { VocabularyCardComponent } from './components/vocabulary-card/vocabulary-card';
import { VocabularyWord } from './domain/models';
import { VocabularyUseCase } from './domain/usecases/vocabulary.use-case';
import { provideVocabulary } from './providers/vocabulary.providers';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [
    VocabularyCardComponent,
    SkeletonComponent,
    ErrorStateComponent,
    LevelLayout,
  ],
  templateUrl: './vocabulary.html',
  styleUrl: './vocabulary.css',
  providers: [provideVocabulary()],
})
export class Vocabulary {
  private readonly useCase = inject(VocabularyUseCase);

 protected readonly levels: Level[] = LEVELS as Level[]; 
  protected readonly selectLevel = signal<Level>('A2');
  protected readonly title = "Vocabulary";
  protected readonly subtitle = "Tarjetas de memoria de vocabulario academico."


  protected readonly wordsResource = rxResource<VocabularyWord[], Level>({
    params: () => this.selectLevel(),
    stream: ({ params }) => this.useCase.getWords(params),
  });


  protected readonly flippedCards = signal<Record<string, boolean>>({});
  protected readonly wordStatus = signal<Record<string, 'learned' | 'review'>>({});


  protected readonly words = computed(() => this.wordsResource.value() ?? []);

  protected readonly learnedCount = computed(() => {
    const statusMap = this.wordStatus();
    return this.words().filter((w) => statusMap[w.id] === 'learned').length;
  });

  protected readonly reviewCount = computed(() => {
    const statusMap = this.wordStatus();
    return this.words().filter((w) => statusMap[w.id] === 'review').length;
  });

  protected changeLevel(level: Level): void {
    this.selectLevel.set(level);
    this.flippedCards.set({});
    this.wordStatus.set({});
  }

  protected toggleFlip(id: string): void {
    this.flippedCards.update((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  protected setStatus(id: string, status: 'learned' | 'review'): void {
    this.wordStatus.update((prev) => {
      const next = { ...prev };
      
      if (next[id] === status) {
        delete next[id];
      } else {
        next[id] = status;
      }
      
      return next;
    });
  }

  protected retryFetch(): void {
    this.wordsResource.reload();
  }
}
