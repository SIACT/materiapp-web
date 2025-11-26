import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { RecommendationService } from '../../../../core/services/recommendation.service';

interface Materia {
  code: string;
  name: string;
  credits: number;
  semester: number;
  calendar: string;
}

@Component({
  selector: 'app-table-results',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule, TagModule, BadgeModule],
  template: `

    <p-card styleClass="shadow-lg container-secondary">
      <ng-template pTemplate="header">
        <div class="bg-gradient-to-r container-header-table from-emerald-500 to-emerald-600 p-6">
          <div class="flex items-center gap-3">
            <i class="pi pi-list text-white text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold text-white">Materias Recomendadas</h2>
              <p class="text-white/80 text-sm mt-1">
                <p-badge [value]="materias.length.toString()" severity="contrast"></p-badge>
                <span class="ml-2">materias sugeridas para tu próximo semestre</span>
              </p>
            </div>
          </div>
        </div>
      </ng-template>

      <p-table 
        [value]="materias" 
        [tableStyle]="{ 'min-width': '100%' }"
        styleClass="p-datatable-striped"
        [paginator]="materias.length > 10"
        [rows]="10">
        
        <ng-template pTemplate="header">
          <tr>
            <th class="bg-gray-50">#</th>
            <th class="bg-gray-50">Materia</th>
            <th class="bg-gray-50 text-center">Créditos</th>
            <th class="bg-gray-50 text-center">Semestre</th>
            <th class="bg-gray-50 text-center">Calendario</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-materia let-rowIndex="rowIndex">
          <tr class="hover:bg-emerald-50 transition-colors">
            <td>
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {{ rowIndex + 1 }}
              </div>
            </td>
            <td>
              <div>
                <p class="font-semibold text-gray-800">{{ materia.name }}</p>
                <p class="text-sm text-gray-500">{{ materia.code }}</p>
              </div>
            </td>
            <td class="text-center">
              <p-tag 
                [value]="materia.credits.toString()" 
                severity="info"
                icon="pi pi-star-fill">
              </p-tag>
            </td>
            <td class="text-center">
              <span class="font-semibold text-gray-800">{{ materia.semester }}°</span>
            </td>
            <td class="text-center">
              <p-tag 
                [value]="materia.calendar" 
                [rounded]="true">
              </p-tag>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="5" class="text-center py-12">
              <i class="pi pi-inbox text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">No hay materias recomendadas</p>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <ng-template pTemplate="footer">
        <div class="bg-gray-50 p-4 flex items-center justify-between border-t">
          <span class="text-gray-600 font-semibold">Total de créditos recomendados:</span>
          <p-badge 
            [value]="getTotalCredits() + ' créditos'" 
            severity="success"
            [style]="{'font-size': '1.1rem', 'padding': '0.5rem 1rem'}">
          </p-badge>
        </div>
      </ng-template>
    </p-card>
  `
})
export class TableResults implements OnInit {
  materias: Materia[] = [];

  constructor(private recomendationsService: RecommendationService) {}

  ngOnInit() {
    this.loadRecomendations(1);
  }

  loadRecomendations(studentCurriculumId: number) {
    this.recomendationsService.getRecomendations(studentCurriculumId)
      .subscribe({
        next: (response) => {
          this.materias = response.courses;
        },
        error: (err) => {
          console.error('Error loading recomendations', err);
        }
      });
  }

  getTotalCredits(): number {
    return this.materias.reduce((sum, materia) => sum + materia.credits, 0);
  }
}