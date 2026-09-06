import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorSpottingRepository } from '@features/error-spotting/domain/repository/error-spotting.repository';
import { Question, } from '@features/error-spotting/domain/models/';

@Injectable() 
export class ErrorSpottingUseCase {
  private readonly repository = inject(ErrorSpottingRepository);


  getQuestions(): Observable<Question[]> {
    return this.repository.fetchQuestions();
  }
}