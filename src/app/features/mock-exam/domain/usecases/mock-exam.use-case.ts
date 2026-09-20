import { inject, Injectable } from '@angular/core';
import { Level } from '@common/models';
import { percentage as toPercentage } from '@core/utils/scoring';
import { Observable } from 'rxjs';
import { CategoryResult, MockExamQuestion, MockExamResult, UserAnswer } from '../models';
import { MockExamRepository } from '../repository/mock-exam.repository';

@Injectable()
export class MockExamUseCase {
  private readonly repository = inject(MockExamRepository);

  getExamQuestions(level: Level): Observable<MockExamQuestion[]> {
    return this.repository.fetchExamQuestions(level);
  }

  evaluateExam(
    questions: MockExamQuestion[],
    userAnswers: Map<number, string>,
    timeSpentSeconds: number
  ): MockExamResult {
    let correctCount = 0;
    const categoryStats: Record<string, { total: number; correct: number }> = {};
    const answersList: UserAnswer[] = [];

    for (const q of questions) {
      const selected = userAnswers.get(q.id) ?? '';
      const isCorrect = selected === q.correctLabel;

      if (isCorrect) {
        correctCount++;
      }

      answersList.push({
        questionId: q.id,
        selectedLabel: selected,
      });

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0 };
      }
      categoryStats[q.category].total++;
      if (isCorrect) {
        categoryStats[q.category].correct++;
      }
    }

    const totalQuestions = questions.length || 1;
    const percentage = toPercentage(correctCount, questions.length);

    // Official TOEFL ITP Section 2 conversion scale: 31 to 68 points
    const toeflScore = Math.round(31 + (correctCount / totalQuestions) * 37);

    const categoryBreakdown: CategoryResult[] = Object.entries(categoryStats).map(
      ([category, stats]) => ({
        category,
        total: stats.total,
        correct: stats.correct,
        percentage: toPercentage(stats.correct, stats.total),
      })
    );

    return {
      totalQuestions,
      correctAnswersCount: correctCount,
      toeflScore,
      percentage,
      timeSpentSeconds,
      categoryBreakdown,
      userAnswers: answersList,
      questions,
    };
  }
}
