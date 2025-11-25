import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationService } from '../../../../core/services/recommendation.service';
 

interface Column {
    field: string;
    header: string;
}

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
  imports: [
    TableModule,
    CommonModule,
    FormsModule
 ],
  template: `
    <div class="container-table-results">
        <h1>tabladescomentar</h1>
    <p-table 
        [columns]="cols" 
        [value]="materias" 
        [tableStyle]="{ 'min-width': '50rem' }">

         
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
 
        <ng-template pTemplate="body" let-rowData let-columns="columns">
            <tr>
                <td *ngFor="let col of columns">
                    {{ rowData[col.field] }}
                </td>
            </tr>
        </ng-template>

      </p-table> 
    </div>
  `
}) //implements OnInit
export class TableResults implements OnInit  {
      materias: Materia[] = [];
    cols: Column[] = [];

    constructor(private recomendationsService: RecommendationService) {}

    ngOnInit() {

        // ============================
        // 📌 DEFINIR COLUMNAS
        // ============================
        this.cols = [
     
            { field: 'name', header: 'Nombre de la Materia' },
            { field: 'credits', header: 'Créditos' },
            { field: 'semester', header: 'Semestre' },
            { field: 'calendar', header: 'Calendario' }
        ];

        // ============================
        // 📌 CONSUMIR API
        // ============================
        this.loadRecomendations(1); 
    }

    loadRecomendations(studentCurriculumId: number) {
        this.recomendationsService.getRecomendations(studentCurriculumId)
            .subscribe({
                next: (response) => {
                    // El endpoint te entrega: { courses: [...] }
                    this.materias = response.courses;
                },
                error: (err) => {
                    console.error('Error loading recomendations', err);
                }
            });
    }
}
