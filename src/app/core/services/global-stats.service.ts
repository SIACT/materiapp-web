import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GlobalStats {
  totalCredits: number;
  completedCredits: number;
  remainingCredits: number;
  totalCourses: number;
  completedCourses: number;
  remainingCourses: number;
  completionPercentage: number;
  creditsPercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStatsService {
  private initialStats: GlobalStats = {
    totalCredits: 0,
    completedCredits: 0,
    remainingCredits: 0,
    totalCourses: 0,
    completedCourses: 0,
    remainingCourses: 0,
    completionPercentage: 0,
    creditsPercentage: 0
  };

  private statsSubject = new BehaviorSubject<GlobalStats>(this.initialStats);
  
 
  public stats$: Observable<GlobalStats> = this.statsSubject.asObservable();

  constructor() { }
 
  updateStats(stats: GlobalStats): void {
    this.statsSubject.next(stats);
  }
 
  getCurrentStats(): GlobalStats {
    return this.statsSubject.getValue();
  }
 
  resetStats(): void {
    this.statsSubject.next(this.initialStats);
  }
}