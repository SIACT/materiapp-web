import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { Usercredits } from "../usercredits/usercredits";
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';
import { GlobalStatsService, GlobalStats } from '../../../../core/services/global-stats.service';
import { Subject, takeUntil } from 'rxjs';

interface StatCard {
  title: string;
  percent: number;
  current: number;
  total: number;
  icon?: string;
}

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [CardModule, ProgressBarModule, CommonModule, Usercredits, FormsModule, Knob],
  template: `
    <div class="grid grid-cols-5 gap-5">
      <div class="col-span-2">
        <app-usercredits></app-usercredits>
      </div>
     
      <div class="col-span-3 grid grid-cols-2 gap-4">
        <p-card
          *ngFor="let item of stats"
          class="rounded-2xl shadow-sm p-2 bg-white flex flex-col gap-3"
        >
          <h3 class="text-sm font-semibold text-gray-700 text-center">
            {{ item.title }}
          </h3>

          <h1 class="text-3xl font-bold text-gray-900 text-center">
            {{ item.percent }}%
          </h1>

          <p class="text-xs text-gray-500 text-center pb-2">
            {{ item.current }} / {{ item.total }}
          </p>

          <p-progressBar
            [value]="item.percent"
            [style]="{ height: '18px' }"
            class="rounded-full"
          ></p-progressBar>
        </p-card>
      </div>
    </div>

    <p-card class="mt-5 p-5 rounded-2xl shadow-md">
      <div class="grid grid-cols-2 gap-4 items-center">

     
        <div class="flex justify-center">
          <p-knob
            [(ngModel)]="globalStats.completionPercentage"
            valueTemplate="{value}%"
            [size]="200"
            [strokeWidth]="16"
            [readonly]="true"
            [valueColor]="getKnobColor()"
            class="text-green-500"
          />
        </div>

    
        <div class="text-black space-y-2">
          <h1 class="text-xl font-bold">Estadísticas Académicas</h1>

          <div class="space-y-1 mt-3">

            <p class="flex justify-between border-b pb-1">
              <span class="font-semibold text-gray-600">Total de Materias:</span>
              <span class="font-medium">{{ globalStats.totalCourses }}</span>
            </p>

            <p class="flex justify-between border-b pb-1">
              <span class="font-semibold text-gray-600">Materias Completadas:</span>
              <span class="font-medium text-green-600">{{ globalStats.completedCourses }}</span>
            </p>

            <p class="flex justify-between border-b pb-1">
              <span class="font-semibold text-gray-600">Materias Restantes:</span>
              <span class="font-medium text-amber-600">{{ globalStats.remainingCourses }}</span>
            </p>

            <p class="flex justify-between border-b pb-1">
              <span class="font-semibold text-gray-600">Créditos Totales:</span>
              <span class="font-medium">{{ globalStats.totalCredits }}</span>
            </p>

            <p class="flex justify-between border-b pb-1">
              <span class="font-semibold text-gray-600">Créditos Completados:</span>
              <span class="font-medium text-green-600">{{ globalStats.completedCredits }}</span>
            </p>

            <p class="flex justify-between">
              <span class="font-semibold text-gray-600">Créditos Restantes:</span>
              <span class="font-medium text-amber-600">{{ globalStats.remainingCredits }}</span>
            </p>

          </div>

       
          <div class="mt-4 p-3 rounded-lg" [ngClass]="getMotivationalStyle()">
            <p class="text-sm font-medium">
              {{ getMotivationalMessage() }}
            </p>
          </div>
        </div>

      </div>
    </p-card>
  `
})
export class Stadistics implements OnInit, OnDestroy {
  globalStats: GlobalStats = {
    totalCredits: 0,
    completedCredits: 0,
    remainingCredits: 0,
    totalCourses: 0,
    completedCourses: 0,
    remainingCourses: 0,
    completionPercentage: 0,
    creditsPercentage: 0
  };

  stats: StatCard[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(private globalStatsService: GlobalStatsService) {}

  ngOnInit(): void {
    
    this.globalStatsService.stats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => {
        this.globalStats = stats;
        this.updateStatCards();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateStatCards(): void {
    this.stats = [
      {
        title: 'Progreso General',
        percent: this.globalStats.completionPercentage,
        current: this.globalStats.completedCourses,
        total: this.globalStats.totalCourses
      },
      {
        title: 'Créditos',
        percent: this.globalStats.creditsPercentage,
        current: this.globalStats.completedCredits,
        total: this.globalStats.totalCredits
      },
      {
        title: 'Materias Pendientes',
        percent: this.calculateRemainingPercentage(),
        current: this.globalStats.remainingCourses,
        total: this.globalStats.totalCourses
      },
      {
        title: 'Créditos Restantes',
        percent: this.calculateRemainingCreditsPercentage(),
        current: this.globalStats.remainingCredits,
        total: this.globalStats.totalCredits
      }
    ];
  }

  private calculateRemainingPercentage(): number {
    if (this.globalStats.totalCourses === 0) return 0;
    return Math.round((this.globalStats.remainingCourses / this.globalStats.totalCourses) * 100);
  }

  private calculateRemainingCreditsPercentage(): number {
    if (this.globalStats.totalCredits === 0) return 0;
    return Math.round((this.globalStats.remainingCredits / this.globalStats.totalCredits) * 100);
  }

  getKnobColor(): string {
    const percent = this.globalStats.completionPercentage;
    if (percent >= 75) return '#10b981'; // green
    if (percent >= 50) return '#8b5cf6'; // purple
    if (percent >= 25) return '#f59e0b'; // amber
    return '#6b7280'; // gray
  }

  getMotivationalMessage(): string {
    const percent = this.globalStats.completionPercentage;
    
    if (percent === 100) {
      return '🎉 ¡Felicitaciones! Has completado todas las materias.';
    } else if (percent >= 75) {
      return `🚀 ¡Excelente! Solo te faltan ${this.globalStats.remainingCourses} materias.`;
    } else if (percent >= 50) {
      return '💪 ¡Vas por buen camino! Ya superaste la mitad.';
    } else if (percent >= 25) {
      return `📚 Sigue adelante, llevas un ${percent}% completado.`;
    } else if (percent > 0) {
      return '🌟 Cada materia aprobada es un logro importante.';
    } else {
      return '🎯 Comienza marcando tus materias aprobadas.';
    }
  }

  getMotivationalStyle(): string {
    const percent = this.globalStats.completionPercentage;
    
    if (percent === 100) {
      return 'bg-green-50 border border-green-200 text-green-800';
    } else if (percent >= 75) {
      return 'bg-blue-50 border border-blue-200 text-blue-800';
    } else if (percent >= 50) {
      return 'bg-purple-50 border border-purple-200 text-purple-800';
    } else if (percent >= 25) {
      return 'bg-amber-50 border border-amber-200 text-amber-800';
    } else {
      return 'bg-gray-50 border border-gray-200 text-gray-800';
    }
  }
}