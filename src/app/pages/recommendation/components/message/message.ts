import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { RecommendationService } from '../../../../core/services/recommendation.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule, MessageModule],
  template: `
    <div class="space-y-4 sticky top-4 container-header-table">
      <!-- Card Principal -->
      <p-card styleClass="shadow-lg container-header-table">
        <ng-template pTemplate="header">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-4 container-header-table">
            <div class="flex items-center gap-3">
              <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <i class="pi pi-sparkles text-white text-2xl"></i>
              </div>
              <h3 class="text-lg font-bold text-white">Análisis IA</h3>
            </div>
          </div>
        </ng-template>

        <div *ngIf="rationale" class="space-y-4">
          <p-message 
            severity="info" 
            [text]="rationale"
            styleClass="w-full">
            <ng-template pTemplate="icon">
              <i class="pi pi-info-circle text-2xl"></i>
            </ng-template>
          </p-message>
        </div>

        <div *ngIf="!rationale" class="text-center py-8">
          <p-progressSpinner 
            styleClass="w-12 h-12"
            strokeWidth="4"
            animationDuration="1s">
          </p-progressSpinner>
          <p class="text-gray-500 mt-4">Analizando tu perfil académico...</p>
        </div>
      </p-card>

      

      <!-- Stats Card -->
      <p-card styleClass="shadow-lg">
        <ng-template pTemplate="header">
          <div class="bg-gray-100 p-4">
            <h4 class="font-bold text-gray-800 flex items-center gap-2">
              <i class="pi pi-chart-bar"></i>
              Resumen Rápido
            </h4>
          </div>
        </ng-template>

        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span class="text-gray-700 text-sm">Materias sugeridas</span>
            <span class="font-bold text-blue-600">5</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <span class="text-gray-700 text-sm">Total créditos</span>
            <span class="font-bold text-emerald-600">18</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <span class="text-gray-700 text-sm">Nivel de dificultad</span>
            <span class="font-bold text-purple-600">Moderado</span>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: [`
    .space-y-4 > * + * {
      margin-top: 1rem;
    }

    .space-y-3 > * + * {
      margin-top: 0.75rem;
    }
  `]
})
export class AppMessage implements OnInit {
  rationale: string = '';

  constructor(private recomendationsService: RecommendationService) {}

  ngOnInit() {
    this.loadRationale(1);
  }

  loadRationale(curriculumId: number) {
    this.recomendationsService.getRecomendations(curriculumId).subscribe({
      next: (response) => {
        this.rationale = response.rationale;
      },
      error: (err) => console.error(err)
    });
  }
}