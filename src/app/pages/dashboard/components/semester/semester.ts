import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentCoursesService } from '../../../../core/services/student-course.service';
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';
import { StudentCourse } from '../../../../core/dto/student-course.type';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

interface SemesterGroup {
  semester: number;
  courses: StudentCourse[];
  totalCredits: number;
  completedCredits: number;
  totalCourses: number;
  completedCourses: number;
  isOpen: boolean;
  allSelected: boolean;
}

interface GlobalStats {
  totalCredits: number;
  completedCredits: number;
  remainingCredits: number;
  totalCourses: number;
  completedCourses: number;
  remainingCourses: number;
  completionPercentage: number;
  creditsPercentage: number;
}

@Component({
  selector: 'app-semester',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Mis Materias</h1>
        <p class="text-gray-600">Gestiona el estado de tus materias por semestre</p>
      </div>

      <!-- Panel de Estadísticas Globales -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total de Créditos -->
        <div class="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Créditos Totales</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ globalStats.totalCredits }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Créditos Completados -->
        <div class="bg-white rounded-xl shadow-lg p-5 border-l-4 border-emerald-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Créditos Completados</p>
              <p class="text-3xl font-bold text-emerald-600 mt-1">{{ globalStats.completedCredits }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ globalStats.creditsPercentage }}% del total</p>
            </div>
            <div class="bg-emerald-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <!-- Barra de progreso -->
          <div class="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-emerald-500 h-full transition-all duration-500 ease-out"
              [style.width.%]="globalStats.creditsPercentage">
            </div>
          </div>
        </div>

        <!-- Materias Completadas -->
        <div class="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Materias Completadas</p>
              <p class="text-3xl font-bold text-purple-600 mt-1">
                {{ globalStats.completedCourses }}/{{ globalStats.totalCourses }}
              </p>
              <p class="text-xs text-gray-500 mt-1">{{ globalStats.completionPercentage }}% del total</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
          </div>
          <!-- Barra de progreso -->
          <div class="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              class="bg-purple-500 h-full transition-all duration-500 ease-out"
              [style.width.%]="globalStats.completionPercentage">
            </div>
          </div>
        </div>

        <!-- Créditos Restantes -->
        <div class="bg-white rounded-xl shadow-lg p-5 border-l-4 border-amber-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 font-medium">Créditos Restantes</p>
              <p class="text-3xl font-bold text-amber-600 mt-1">{{ globalStats.remainingCredits }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ globalStats.remainingCourses }} materias pendientes</p>
            </div>
            <div class="bg-amber-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div *ngFor="let group of semesterGroups" class="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
       
          <div 
            class="p-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white cursor-pointer hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
            [class.border-b-4]="group.isOpen"
            [class.border-gray-700]="group.isOpen"
            (click)="toggleSemester(group)">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <svg 
                  class="w-5 h-5 transition-transform duration-300"
                  [class.rotate-90]="group.isOpen"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <span class="font-semibold text-lg">Semestre {{ group.semester }}</span>
                <span class="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {{ group.completedCourses }}/{{ group.totalCourses }}
                </span>
              </div>
              <div class="flex items-center gap-4 text-sm">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  {{ group.completedCourses }}/{{ group.totalCourses }} materias
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ group.completedCredits }}/{{ group.totalCredits }} créditos
                </span>
              </div>
            </div>
          </div>

        
          <div 
            *ngIf="group.isOpen" 
            class="p-6 bg-gray-50 animate-slideDown">
         
            <div class="mb-4 p-4 bg-white rounded-lg border border-gray-200">
              <div class="flex items-center gap-3">
                <input 
                  type="checkbox"
                  [id]="'select-all-' + group.semester"
                  [checked]="group.allSelected"
                  (change)="toggleAllCourses(group)"
                  class="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                />
                <label 
                  [for]="'select-all-' + group.semester" 
                  class="font-semibold text-gray-800 cursor-pointer">
                  {{ group.allSelected ? 'Desmarcar todas' : 'Marcar todas como aprobadas' }}
                </label>
                <span 
                  *ngIf="group.allSelected"
                  class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold ml-auto">
                  Todas aprobadas
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <div 
                *ngFor="let course of group.courses" 
                class="bg-white rounded-lg p-4 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                [class.border-gray-200]="!course.isApproved"
                [class.border-emerald-500]="course.isApproved"
                [class.bg-gradient-to-r]="course.isApproved"
                [class.from-emerald-50]="course.isApproved"
                [class.to-green-50]="course.isApproved"
                (click)="toggleCourseApproval(course)">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-3 flex-1">
                    <input 
                      type="checkbox"
                      [(ngModel)]="course.isApproved"
                      (click)="$event.stopPropagation()"
                      (change)="onApproveChange(course)"
                      class="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800 mb-2">{{ course.name }}</h3>
                      <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                          </svg>
                          {{ course.code }}
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          {{ course.credits }} créditos
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          {{ course.calendar }}
                        </span>
                        <span class="flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                          </svg>
                          {{ course.type }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span 
                    *ngIf="course.isApproved"
                    class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Aprobada
                  </span>
                  <span 
                    *ngIf="!course.isApproved"
                    class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Pendiente
                  </span>
                </div>
              </div>
            </div>

            <div *ngIf="group.courses.length === 0" class="text-center py-12 text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
              </svg>
              <p>No hay materias en este semestre</p>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="semesterGroups.length === 0" class="text-center py-16">
        <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No hay materias para mostrar</h3>
        <p class="text-gray-500">Selecciona un curriculum para ver tus materias</p>
      </div>
    </div>
  `,
  styles: [`
    .space-y-4 > * + * {
      margin-top: 1rem;
    }

    .space-y-3 > * + * {
      margin-top: 0.75rem;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slideDown {
      animation: slideDown 0.3s ease-out;
    }
  `]
})
export class Semester implements OnInit {
  courses: StudentCourse[] = [];
  semesterGroups: SemesterGroup[] = [];
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
  private openSemesters = new Set<number>([1]);  

  constructor(
    private studentCourses: StudentCoursesService,
    private profile: ProfileSelectionService
  ) { }

  ngOnInit(): void {
    this.profile.state$.subscribe(state => {
      if (!state.studentCurriculumId) return;
      this.loadCoursesFromBackend(state.studentCurriculumId);
    });
  }

  private removeDuplicates(courses: StudentCourse[]): StudentCourse[] {
    const seen = new Map<number, StudentCourse>();
    
    courses.forEach(course => {
      const existing = seen.get(course.id);
      if (!existing || (course.isApproved && !existing.isApproved)) {
        seen.set(course.id, course);
      }
    });
    
    return Array.from(seen.values());
  }

  private loadCoursesFromBackend(studentCurriculumId: number): void {
    this.studentCourses
      .findMeStudentCurriculumId(studentCurriculumId)
      .subscribe(res => {
        this.courses = this.removeDuplicates(res);
        this.organizeBySemester();
        this.calculateGlobalStats();
      });
  }

  organizeBySemester(): void {
    const semesterMap = new Map<number, StudentCourse[]>();

    this.courses.forEach(course => {
      if (!semesterMap.has(course.semester)) {
        semesterMap.set(course.semester, []);
      }
      semesterMap.get(course.semester)!.push(course);
    });

    this.semesterGroups = Array.from(semesterMap.entries())
      .map(([semester, courses]) => {
        const completedCourses = courses.filter(c => c.isApproved).length;
        const allSelected = courses.length > 0 && completedCourses === courses.length;
        
        return {
          semester,
          courses,
          totalCredits: courses.reduce((sum, c) => sum + (c.credits || 0), 0),
          completedCredits: courses
            .filter(c => c.isApproved)
            .reduce((sum, c) => sum + (c.credits || 0), 0),
          totalCourses: courses.length,
          completedCourses,
          isOpen: this.openSemesters.has(semester),
          allSelected
        };
      })
      .sort((a, b) => a.semester - b.semester);
  }

  // NUEVA FUNCIÓN: Calcula las estadísticas globales
  private calculateGlobalStats(): void {
    // Calcular totales
    this.globalStats.totalCourses = this.courses.length;
    this.globalStats.totalCredits = this.courses.reduce((sum, c) => sum + (c.credits || 0), 0);
    
    // Calcular completados
    this.globalStats.completedCourses = this.courses.filter(c => c.isApproved).length;
    this.globalStats.completedCredits = this.courses
      .filter(c => c.isApproved)
      .reduce((sum, c) => sum + (c.credits || 0), 0);
    
    // Calcular restantes
    this.globalStats.remainingCourses = this.globalStats.totalCourses - this.globalStats.completedCourses;
    this.globalStats.remainingCredits = this.globalStats.totalCredits - this.globalStats.completedCredits;
    
    // Calcular porcentajes
    this.globalStats.completionPercentage = this.globalStats.totalCourses > 0
      ? Math.round((this.globalStats.completedCourses / this.globalStats.totalCourses) * 100)
      : 0;
      
    this.globalStats.creditsPercentage = this.globalStats.totalCredits > 0
      ? Math.round((this.globalStats.completedCredits / this.globalStats.totalCredits) * 100)
      : 0;
  }

  toggleSemester(group: SemesterGroup): void {
    group.isOpen = !group.isOpen;
     
    if (group.isOpen) {
      this.openSemesters.add(group.semester);
    } else {
      this.openSemesters.delete(group.semester);
    }
  }

  toggleCourseApproval(course: StudentCourse): void {
    course.isApproved = !course.isApproved;
    this.onApproveChange(course);
  }

  onApproveChange(course: StudentCourse): void {
    const studentCurriculumId = this.profile.getSnapshot().studentCurriculumId;

    if (!studentCurriculumId) {
      console.error('No hay studentCurriculumId');
      course.isApproved = !course.isApproved;
      this.updateGroupStats();
      this.calculateGlobalStats(); // Actualizar estadísticas globales
      return;
    }

    const previousState = !course.isApproved;

    this.studentCourses.approveUnApprove({
      studentCurriculumId: studentCurriculumId,
      courseInCurriculumId: course.id,
      isApproved: course.isApproved
    }).subscribe({
      next: () => {
        console.log(`Materia ${course.isApproved ? 'aprobada' : 'desaprobada'} correctamente`);
        this.updateGroupStats();
        this.calculateGlobalStats(); // Actualizar estadísticas globales
      },
      error: (error) => {
        console.error('Error al actualizar materia:', error);
        course.isApproved = previousState;
        this.updateGroupStats();
        this.calculateGlobalStats(); // Actualizar estadísticas globales
      }
    });
  }

  toggleAllCourses(group: SemesterGroup): void {
    const newState = !group.allSelected;
    const studentCurriculumId = this.profile.getSnapshot().studentCurriculumId;

    if (!studentCurriculumId) {
      console.error('No hay studentCurriculumId');
      return;
    }

    const previousStates = group.courses.map(c => c.isApproved);
 
    group.courses.forEach(course => {
      course.isApproved = newState;
    });
    group.allSelected = newState;
    this.updateGroupStats();
    this.calculateGlobalStats(); // Actualizar estadísticas globales

    const updateRequests = group.courses.map(course => 
      this.studentCourses.approveUnApprove({
        studentCurriculumId: studentCurriculumId,
        courseInCurriculumId: course.id,
        isApproved: newState
      })
    );
 
    forkJoin(updateRequests).subscribe({
      next: () => {
        console.log(`Todas las materias del semestre ${group.semester} ${newState ? 'aprobadas' : 'desaprobadas'}`);
      },
      error: (error) => {
        console.error('Error al actualizar materias:', error);
        group.courses.forEach((course, index) => {
          course.isApproved = previousStates[index];
        });
        this.updateGroupStats();
        this.calculateGlobalStats(); // Actualizar estadísticas globales
      }
    });
  }

  private updateGroupStats(): void {
    this.semesterGroups.forEach(group => {
      group.completedCourses = group.courses.filter(c => c.isApproved).length;
      group.completedCredits = group.courses
        .filter(c => c.isApproved)
        .reduce((sum, c) => sum + (c.credits || 0), 0);
      group.allSelected = group.courses.length > 0 && group.completedCourses === group.courses.length;
    });
  }
}