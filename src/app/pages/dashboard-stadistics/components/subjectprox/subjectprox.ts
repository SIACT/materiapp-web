import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { StudentCoursesService } from '../../../../core/services/student-course.service';
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';
import { StudentCourse } from '../../../../core/dto/student-course.type';

interface CourseDisplay {
  id: number;
  title: string;
  code: string;
  credits: number;
  semester: number;
  calendar: string;
  type: string;
  progress: number;
  img: string;
}

@Component({
  selector: 'app-subjectprox',
  standalone: true,
  imports: [CardModule, CommonModule],
  template: `
    <p-card styleClass="shadow-lg">
      <ng-template pTemplate="header">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 container-header-table">
          <div class="flex items-center gap-3">
            <i class="pi pi-clock text-white text-2xl"></i>
            <div>
              <h2 class="text-lg font-bold text-white">Materias Próximo Semestre</h2>
              <p class="text-white/80 text-sm">Materias pendientes por cursar</p>
            </div>
          </div>
        </div>
      </ng-template>

      <div class="space-y-4">
        <div *ngFor="let c of nextSemesterCourses" 
             class="course-card bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
          
          <div class="flex items-center gap-4">
            <!-- Progress Circle -->
            <div class="progress-wrapper flex-shrink-0">
              <div class="circle relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ c.progress }}%</span>
              </div>
            </div>

            <!-- Course Info -->
            <div class="flex-1">
              <h3 class="course-title font-bold text-gray-800 mb-1">{{ c.title }}</h3>
              <div class="details flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span class="flex items-center gap-1">
                  <i class="pi pi-hashtag text-xs"></i>
                  {{ c.code }}
                </span>
                <span class="text-gray-400">•</span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-star-fill text-xs"></i>
                  {{ c.credits }} créditos
                </span>
                <span class="text-gray-400">•</span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-calendar text-xs"></i>
                  Sem. {{ c.semester }}
                </span>
                <span class="text-gray-400">•</span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-tag text-xs"></i>
                  {{ c.type }}
                </span>
              </div>
            </div>

            <!-- Course Icon/Image -->
            <div class="course-img-wrapper flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <i class="pi pi-book text-3xl text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="nextSemesterCourses.length === 0" class="text-center py-12">
        <i class="pi pi-check-circle text-6xl text-green-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">¡Excelente progreso!</h3>
        <p class="text-gray-500">No hay materias pendientes para mostrar</p>
      </div>

      <ng-template pTemplate="footer">
        <div class="bg-gray-50 p-3 flex items-center justify-between border-t">
          <span class="text-gray-600 text-sm">Total materias pendientes:</span>
          <span class="font-bold text-blue-600 text-lg">{{ nextSemesterCourses.length }}</span>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [`
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
  `]
})
export class Subjectprox implements OnInit {
  allCourses: StudentCourse[] = [];
  nextSemesterCourses: CourseDisplay[] = [];

  constructor(
    private studentCourses: StudentCoursesService,
    private profile: ProfileSelectionService
  ) {}

  ngOnInit(): void {
    this.loadPendingCourses();
  }

  loadPendingCourses(): void {
    this.profile.state$.subscribe(state => {
      if (!state.studentCurriculumId) return;

      this.studentCourses
        .findMeStudentCurriculumId(state.studentCurriculumId)
        .subscribe(res => {
          this.allCourses = res;
          this.filterNextSemesterCourses();
        });
    });
  }

filterNextSemesterCourses(): void {
 
    const pendingCourses = this.allCourses.filter(course => !course.isApproved);
 
    const currentSemester = pendingCourses.length > 0
      ? Math.min(...pendingCourses.map(c => c.semester))
      : 0;
 
    const nextSemesterNumber = currentSemester;
    
    this.nextSemesterCourses = pendingCourses
      .filter(course => course.semester === nextSemesterNumber)
      .slice(0, 4)  
      .map(course => ({
        id: course.id,
        title: course.name,
        code: course.code,
        credits: course.credits,
        semester: course.semester,
        calendar: course.calendar,
        type: course.type,
        progress: 0,  
        img: this.getCourseImage(course.type)
      }));
  }

  getCourseImage(type: string): string {
   
    const imageMap: { [key: string]: string } = {
      'P': '/assets/code.png',       
      'T': '/assets/design.png',      
      'L': '/assets/microbio.png',   
    };
    return imageMap[type] || '/assets/default.png';
  }
}