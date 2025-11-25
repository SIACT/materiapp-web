import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProfileSelectionState {
  schoolId: number | null;
  programId: number | null;
  semester: number | null;
  curriculumId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectionService {
  private readonly initialState: ProfileSelectionState = {
    schoolId: null,
    programId: null,
    semester: null,
    curriculumId: null
  };

  private stateSubject = new BehaviorSubject<ProfileSelectionState>(this.initialState);
  state$ = this.stateSubject.asObservable();

  getSnapshot(): ProfileSelectionState {
    return this.stateSubject.value;
  }

  setState(nextState: ProfileSelectionState): void {
    this.stateSubject.next({ ...nextState });
  }

  patchState(partial: Partial<ProfileSelectionState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial
    });
  }

  reset(): void {
    this.stateSubject.next(this.initialState);
  }
}

