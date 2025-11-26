import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DashboardFilters, DashboardService, SelectionsMap } from '../../services/dashboard.service';
import { CoursesInCurriculumService } from '../../../../core/services/courses-in-curriculum.service';
import { Modal } from '../modal/modal';
 
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [PanelModule, CheckboxModule, CardModule, FormsModule, CommonModule, HttpClientModule, ButtonModule, Modal],
  template: `
    <div class="grid grid-cols-2 gap-3 ">
      <div class="col-span-1 container-options-pensum ">
        <p-card 
          class=" cursor-pointer transition-shadow hover:shadow-lg p-4 hover:bg-green-100 "
          (click)="openProfileModal()">
            <div class="text-xl font-semibold text-primary pb-2">Perfil académico</div>
          <p class="text-sm text-gray-600 mb-4">
            Completa tus datos de facultad, programa, semestre y pensum para
            personalizar las materias sugeridas.
          </p>
          <div class="flex items-center gap-2 text-primary font-semibold">
            <span>Configurar ahora</span>
            <i class="pi pi-arrow-right text-sm"></i>
          </div>
        </p-card>
      </div>
      <div class="col-span-1">
        <h1>Agregar semestre</h1>
      </div>
    </div>
     
    <app-modal></app-modal>
  `,
})
export class Semester implements OnInit, OnDestroy {
  semesters: Array<{ title: string; value: string }> = [];
  subjectsBySemester: { [key: string]: Subject[] } = {};
  selectedSubjects: { [key: string]: Subject[] } = {};
  subjectCheckboxes: { [key: string]: boolean } = {};
  isExpanded: { [key: string]: boolean } = {};
  private subscription?: Subscription;
  @ViewChild(Modal) profileModal?: Modal;

  constructor(
    private dashboardService: DashboardService,
    private coursesInCurriculumService: CoursesInCurriculumService
  ) {}

  ngOnInit() {
    const curriculumId = 1;  
    this.coursesInCurriculumService.getByCurriculum(curriculumId).subscribe(apiSubjects => {
    
      this.subjectsBySemester = {};
      const semestersSet = new Set<string>();
      apiSubjects.forEach((sub: any) => {
        const semValue = String(sub.semester);
        semestersSet.add(semValue);
        if (!this.subjectsBySemester[semValue]) this.subjectsBySemester[semValue] = [];
        this.subjectsBySemester[semValue].push({
          name: sub.name,
          code: sub.code,
          credits: sub.credits || 0,
          academicPeriod: (sub.calendar || '').trim()
        });
      });
      // Generar array de semestres dinámicamente
      this.semesters = Array.from(semestersSet).sort().map(val => ({ title: `Semestre ${val}`, value: val }));

      // Inicializar selectedSubjects, checkboxes y estado de expansión para cada semestre
      this.semesters.forEach(semester => {
        this.selectedSubjects[semester.value] = [];
        this.isExpanded[semester.value] = false;
        (this.subjectsBySemester[semester.value] || []).forEach(subject => {
          const key = `${semester.value}_${subject.code}`;
          this.subjectCheckboxes[key] = false;
        });
      });
    });

    // Suscribirse a las selecciones del servicio
    this.subscription = this.dashboardService.selections$.subscribe((selections: SelectionsMap) => {
      this.semesters.forEach(semester => {
        const selected = selections && selections[semester.value] ? [...selections[semester.value]] : [];
        this.selectedSubjects[semester.value] = selected;
        (this.subjectsBySemester[semester.value] || []).forEach(subject => {
          const key = `${semester.value}_${subject.code}`;
          this.subjectCheckboxes[key] = selected.some(s => s.code === subject.code);
        });
      });
    });

    this.dashboardService.filters$.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  getSelectedCount(semesterValue: string): number {
    return this.selectedSubjects[semesterValue]?.length || 0;
  }

  getCreditsCount(semesterValue: string): number {
    return (this.selectedSubjects[semesterValue] || []).reduce((acc, subj) => acc + subj.credits, 0);
  }

  getTotalCredits(semesterValue: string): number {
    return (this.subjectsBySemester[semesterValue] || []).reduce((acc, subj) => acc + subj.credits, 0);
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

  toggleSemester(semesterValue: string) {
    this.isExpanded[semesterValue] = !this.isExpanded[semesterValue];
  }

  onPanelAfterToggle(semesterValue: string, event: any) {
    if (event) {
      this.isExpanded[semesterValue] = !event.collapsed;
    }
  }

  clearAllSelections() {
    this.semesters.forEach(semester => {
      this.selectedSubjects[semester.value] = [];
      (this.subjectsBySemester[semester.value] || []).forEach(subject => {
        const key = `${semester.value}_${subject.code}`;
        this.subjectCheckboxes[key] = false;
      });
      this.dashboardService.updateSelection(semester.value, []);
    });
  }

  openProfileModal() {
    this.profileModal?.open();
  }

  applyFilters(filters: DashboardFilters) {
    // Si quieres filtrar materias, puedes hacerlo aquí por semestre
    Object.keys(this.subjectsBySemester).forEach(sem => {
      this.subjectsBySemester[sem] = this.subjectsBySemester[sem]
        .filter(sub =>
          sub.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          sub.code.toLowerCase().includes(filters.search.toLowerCase())
        )
        .filter(sub =>
          !filters.calendar || sub.academicPeriod === filters.calendar
        )
        .filter(sub =>
          filters.onlyRemaining ? sub.status === 'Disponible' : true
        );
    });
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
