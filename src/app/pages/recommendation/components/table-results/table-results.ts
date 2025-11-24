import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      <p-table 
        [columns]="cols" 
        [value]="materias" 
        [tableStyle]="{ 'min-width': '50rem' }">

        <!-- HEADER -->
        <ng-template pTemplate="header" let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>

        <!-- BODY -->
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
})
export class TableResults {
    materias: Materia[] = [];
    cols: Column[] = [];

    ngOnInit() {

        // ===============================
        // 🔥 DEAD DATA (mock data)
        // ===============================
        this.materias = [
            { code: 'MAT101', name: 'Calculus I', credits: 4, semester: 1, calendar: 'A' },
            { code: 'PHY101', name: 'Physics I', credits: 4, semester: 1, calendar: 'A' },
            { code: 'CS101',  name: 'Introduction to Programming', credits: 3, semester: 1, calendar: 'B' },
            { code: 'ENG101', name: 'English I', credits: 2, semester: 1, calendar: 'B' }
        ];

        // ===============================
        // 🔥 TABLE COLUMNS
        // ===============================
        this.cols = [
           
            { field: 'name', header: 'Nombre de la Materia' },
            { field: 'credits', header: 'Créditos' },
            { field: 'semester', header: 'Semestre' },
            { field: 'calendar', header: 'Calendario' }
        ];
    }
}
