import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { DashboardService, SelectionsMap } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

interface Subject {
  name: string;
  code: string;
  credits: number;
  status?: string;
  academicPeriod?: string;
}

@Component({
  selector: 'app-semester',
  standalone: true,
  imports: [PanelModule, CheckboxModule, CardModule, FormsModule, CommonModule],
  template: `
    <div class="w-full flex flex-col gap-3">
      <div class="flex items-center justify-between w-full py-3">
        <h1 class="m-0">Materias</h1>
        <button 
          class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors" 
          (click)="clearAllSelections()">
          Limpiar
        </button>
      </div>
      
      <p-panel 
        *ngFor="let semester of semesters" 
        [toggleable]="true"
        [collapsed]="true"
        styleClass="mb-2">
        <ng-template pTemplate="header">
          <div class="flex items-center justify-between w-full pr-4">
            <span class="font-semibold">Semestre {{ semester.value }}</span>
            <span class="text-sm opacity-60 ml-auto">
              {{ getSelectedCount(semester.value) }}/{{ subjects.length }} materias seleccionadas
            </span>
          </div>
        </ng-template>
        <div class="p-4">
          <div class="flex flex-col gap-3">
            <div 
              *ngFor="let subject of subjects" 
              class="subject-card flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer"
              [class.bg-primary-light]="isSelected(semester.value, subject)"
              (click)="toggleSubject(semester.value, subject)">
              <p-checkbox 
                [binary]="true"
                [(ngModel)]="subjectCheckboxes[semester.value + '_' + subject.code]"
                (onChange)="onCheckboxChange(semester.value, subject, $event.checked)"
                (click)="$event.stopPropagation()">
              </p-checkbox>
              
              <div class="flex-1 flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-gray-600">{{ subject.code }}</span>
                  <span class="text-sm font-semibold">{{ subject.name }}</span>
                </div>
                <span class="text-xs text-gray-500" *ngIf="subject.status">
                  {{ subject.status }}
                </span>
              </div>
              
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="text-sm font-semibold">{{ subject.credits }}</div>
                  <div class="text-xs text-gray-500">créditos</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-primary-dark text-white flex items-center justify-center font-bold text-lg" *ngIf="subject.academicPeriod">
                  {{ subject.academicPeriod }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </p-panel>
    </div>
  `,
})
export class Semester implements OnInit, OnDestroy {
  semesters = [
    { title: 'Semestre 1', value: '1' },
    { title: 'Semestre 2', value: '2' },
    { title: 'Semestre 3', value: '3' },
    { title: 'Semestre 4', value: '4' },
    { title: 'Semestre 5', value: '5' },
    { title: 'Semestre 6', value: '6' },
    { title: 'Semestre 7', value: '7' },
    { title: 'Semestre 8', value: '8' },
    { title: 'Semestre 9', value: '9' },
    { title: 'Semestre 10', value: '10' }
  ];

  subjects!: Subject[];
  selectedSubjects: { [key: string]: Subject[] } = {};
  subjectCheckboxes: { [key: string]: boolean } = {};
  private subscription?: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    // Obtener lista de materias del servicio y agregar datos por defecto si no existen
    this.subjects = this.dashboardService.subjects.map(subject => {
      const extendedSubject: Subject = {
        ...subject,
        status: 'Disponible',
        academicPeriod: this.getRandomPeriod()
      };
      return extendedSubject;
    });

    // Inicializar selectedSubjects y checkboxes para cada semestre
    this.semesters.forEach(semester => {
      this.selectedSubjects[semester.value] = [];
      this.subjects.forEach(subject => {
        const key = `${semester.value}_${subject.code}`;
        this.subjectCheckboxes[key] = false;
      });
    });

    // Suscribirse a las selecciones del servicio
    this.subscription = this.dashboardService.selections$.subscribe((selections: SelectionsMap) => {
      // Sincronizar el estado local con el servicio
      this.semesters.forEach(semester => {
        const selected = selections && selections[semester.value] ? [...selections[semester.value]] : [];
        this.selectedSubjects[semester.value] = selected;
        
        // Actualizar checkboxes
        this.subjects.forEach(subject => {
          const key = `${semester.value}_${subject.code}`;
          this.subjectCheckboxes[key] = selected.some(s => s.code === subject.code);
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getSelectedCount(semesterValue: string): number {
    return this.selectedSubjects[semesterValue]?.length || 0;
  }

  isSelected(semesterValue: string, subject: Subject): boolean {
    const selected = this.selectedSubjects[semesterValue] || [];
    return selected.some(s => s.code === subject.code);
  }

  toggleSubject(semesterValue: string, subject: Subject) {
    const selected = this.selectedSubjects[semesterValue] || [];
    const index = selected.findIndex(s => s.code === subject.code);
    
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(subject);
    }
    
    this.selectedSubjects[semesterValue] = selected;
    this.updateCheckboxState(semesterValue, subject);
    this.dashboardService.updateSelection(semesterValue, this.selectedSubjects[semesterValue]);
  }

  onCheckboxChange(semesterValue: string, subject: Subject, checked: boolean) {
    const selected = this.selectedSubjects[semesterValue] || [];
    
    if (checked) {
      if (!selected.some(s => s.code === subject.code)) {
        selected.push(subject);
      }
    } else {
      const index = selected.findIndex(s => s.code === subject.code);
      if (index >= 0) {
        selected.splice(index, 1);
      }
    }
    
    this.selectedSubjects[semesterValue] = selected;
    this.dashboardService.updateSelection(semesterValue, this.selectedSubjects[semesterValue]);
  }

  updateCheckboxState(semesterValue: string, subject: Subject) {
    const key = `${semesterValue}_${subject.code}`;
    this.subjectCheckboxes[key] = this.isSelected(semesterValue, subject);
  }

  clearAllSelections() {
    this.semesters.forEach(semester => {
      this.selectedSubjects[semester.value] = [];
      this.subjects.forEach(subject => {
        const key = `${semester.value}_${subject.code}`;
        this.subjectCheckboxes[key] = false;
      });
      this.dashboardService.updateSelection(semester.value, []);
    });
  }

  private getRandomPeriod(): string {
    const periods = ['A', 'B', 'C', 'D', 'E'];
    return periods[Math.floor(Math.random() * periods.length)];
  }
}
