import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentCourse } from '../../../../../core/dto/student-course.type';
import { StudentCoursesService } from '../../../../../core/services/student-course.service';
import { ProfileSelectionService } from '../../../../../core/services/profile-selection.service';
import { Card } from "primeng/card";

@Component({
  selector: 'app-prueba2',
  standalone: true,
  imports: [CommonModule, Card],
  template: `
   
    <div *ngFor="let sem of semesters" class="mb-6 my-4 flex flex-col">
 
      <div
        class="  flex items-center  justify-between cursor-pointer p-3 mb-2 rounded bg-primary border border-gray-300"
        (click)="toggleSemester(sem)"
        [attr.aria-expanded]="isSemesterOpen(sem)"
      >
        <div class="flex items-center gap-2">
          <h2 class="text-base px-2 font-bold text-base-tertiary  ">Semestre {{ sem }}</h2>
          <span class="text-sm text-subtitle">({{ subjectsBySemester[sem]?.length || 0 }} materias)</span>
          <!-- selected count and credits for semester -->
          <span class="text-sm text-gray-600 ml-3">•</span>
          <span class="text-sm text-subtitle ml-3">{{ getSelectedCountForSemester(sem) }}/{{ subjectsBySemester[sem]?.length || 0 }}</span>
          <span class="text-sm text-gray-600 ml-2">|</span>
          <span class="text-sm text-subtitle ml-2">{{ getSelectedCreditsForSemester(sem) }}/{{ getTotalCreditsForSemester(sem) }} cr</span>
        </div>
 
        <div class="text-base-secondary flex items-center gap-3">
          <span *ngIf="isSemesterOpen(sem)">▾</span>
          <span *ngIf="!isSemesterOpen(sem)">▸</span>
          <!-- select all toggle for semester -->
          <button
            class="p-1 text-sm rounded text-base-tertiary hover:opacity-90 select-all-btn"
            (click)="$event.stopPropagation(); toggleSelectAllForSemester(sem)"
            [attr.aria-pressed]="getSelectedCountForSemester(sem) === (subjectsBySemester[sem]?.length || 0)"
            title="Seleccionar todas las materias del semestre"
          >
            {{ getSelectedCountForSemester(sem) === (subjectsBySemester[sem]?.length || 0) ? 'Deseleccionar todo' : 'Seleccionar todo' }}
          </button>
        </div>
      </div>
 
      <div *ngIf="isSemesterOpen(sem)" >
        <div *ngIf="(subjectsBySemester[sem]?.length || 0) === 0" class="text-sm text-black p-0">No hay materias en este semestre.</div>

        <div class=" text-primary mb-2" *ngFor="let course of subjectsBySemester[sem]">
          <p-card
            class="course-card-square subject-card w-full  border-none shadow-none cursor-pointer"
            (click)="toggleCourse(course)"
            role="button"
            [class.course-selected]="selectedCourses.has(course.code)"
            [attr.aria-pressed]="selectedCourses.has(course.code)"
          >
            <div class="flex items-center p-0  ">
              <div class="flex items-center justify-between w-full ">
                <p class="course-title">{{ course.name }}</p>
                <div class="details pr-9">
                  <span class="text-sm text-gray-600">{{ course.code }}</span>
                  <span class="text-sm text-gray-600 dot">•</span>
                  <span class="text-sm text-gray-600">{{ course.credits != null ? course.credits : '-' }} cr</span>
                </div>
              </div>

                <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  [checked]="selectedCourses.has(course.code)"
                  class="w-4 h-5"
                  (click)="$event.stopPropagation(); toggleCourse(course)"
                  aria-label="Marcar como visto"
                />
              </div>
            </div>
          </p-card>
        </div>
      </div>

    </div>
  `,
})
export class Prueba2 implements OnInit, OnDestroy {
  // keep minimal state: we group courses by semester in subjectsBySemester

  subjectsBySemester: { [semester: string]: StudentCourse[] } = {};
  semesters: string[] = [];

  selectedCourses = new Set<string>(); // trackeamos materias clickeadas

  // control de semestres abiertos (expand/collapse)
  openSemesters = new Set<string>();

  private profileSub?: Subscription;

  constructor(
    private studentCourses: StudentCoursesService,
    private profile: ProfileSelectionService
  ) {}

  ngOnInit() {
    // subscribe to profile state and load student courses once studentCurriculumId is available
    this.profileSub = this.profile.state$.subscribe(profile => {
      if (!profile?.studentCurriculumId) return;

      this.studentCourses.findMyByStudentCurriculumId(profile.studentCurriculumId).subscribe(res => {
        this.organizeBySemester(res);
      });
    });
  }

  // Toggle mostrar/ocultar el grupo de materias de un semestre
  toggleSemester(semester: string) {
    if (this.openSemesters.has(semester)) {
      this.openSemesters.delete(semester);
    } else {
      this.openSemesters.add(semester);
    }
  }

  ngOnDestroy(): void {
    // unsubscribe from profile stream if still active
    if (this.profileSub && typeof this.profileSub.unsubscribe === 'function') {
      this.profileSub.unsubscribe();
    }
  }

  // devuelve true si el semestre está expandido
  isSemesterOpen(semester: string) {
    return this.openSemesters.has(semester);
  }

  // Organiza las materias en objetos por semestre
  organizeBySemester(courses: StudentCourse[]) {
    const semestersMap: { [key: string]: StudentCourse[] } = {};

    courses.forEach(course => {
      const sem = String(course.semester ?? "0");

      if (!semestersMap[sem]) semestersMap[sem] = [];
      semestersMap[sem].push(course);
    });

    this.subjectsBySemester = semestersMap;
    this.semesters = Object.keys(semestersMap).sort();
  }

  // Marca/desmarca materia como vista
  toggleCourse(course: StudentCourse) {
    

    if (this.selectedCourses.has(course.code)) {
      this.selectedCourses.delete(course.code);
    } else {
      this.selectedCourses.add(course.code);
    }

    // selection changed; keep state only (no debug logs in production)
  }

  // Devuelve el número de materias seleccionadas para un semestre
  getSelectedCountForSemester(semester: string) {
    const courses = this.subjectsBySemester[semester] ?? [];
    return courses.filter(c => this.selectedCourses.has(c.code)).length;
  }

  // Devuelve el total de créditos seleccionados para un semestre
  getSelectedCreditsForSemester(semester: string) {
    const courses = this.subjectsBySemester[semester] ?? [];
    return courses
      .filter(c => this.selectedCourses.has(c.code))
      .reduce((sum, c) => sum + (c.credits ?? 0), 0);
  }

  // Devuelve el total de créditos del semestre (suma de créditos de sus materias)
  getTotalCreditsForSemester(semester: string) {
    const courses = this.subjectsBySemester[semester] ?? [];
    return courses.reduce((sum, c) => sum + (c.credits ?? 0), 0);
  }

  // Alterna selección de todas las materias de un semestre
  toggleSelectAllForSemester(semester: string) {
    const courses = this.subjectsBySemester[semester] ?? [];
    const allSelected = courses.length > 0 && this.getSelectedCountForSemester(semester) === courses.length;

    if (allSelected) {
      // deselect all
      courses.forEach(c => this.selectedCourses.delete(c.code));
    } else {
      // select all
      courses.forEach(c => this.selectedCourses.add(c.code));
    }
  }
}
