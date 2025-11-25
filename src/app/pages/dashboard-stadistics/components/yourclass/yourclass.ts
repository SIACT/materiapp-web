import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { Subjectprox } from "../subjectprox/subjectprox";
import { StudentCoursesService } from '../../../../core/services/student-course.service';
import { CoursesInCurriculumService } from '../../../../core/services/courses-in-curriculum.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-yourclass',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    BadgeModule,
    AvatarModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    Subjectprox
  ],
  template: `
    <p-card styleClass="hello-card">
      <div class="header-content">
        <div class="header-left">
          <h1 class="hello-title">Hola, {{ name() }} 👋</h1>
          <p class="hello-description">
            ¿Como estas? conoce el progreso de tu materia y creditos completados.
          </p>
          <p-tag [value]="major()" severity="info" class="hello-major-tag"></p-tag>
        </div>
      </div>
    </p-card>

    <app-subjectprox></app-subjectprox>

    <section class="your-class-container text-black">

      <h2 class="title">Materias</h2>

      <!-- FILTER TABS -->
      <div class="tabs">
        <button 
          *ngFor="let t of tabs"
          class="tab"
          [ngClass]="{ 'active-tab': t === activeTab }"
          (click)="activeTab = t"
        >
          {{ t }}
        </button>
      </div>

      <!-- LOADING SPINNER -->
      <div class="flex justify-center py-10" *ngIf="loading">
        <p-progressSpinner></p-progressSpinner>
      </div>

      <!-- COURSES FROM API -->
      <div class="courses-grid" *ngIf="!loading">
        <p-card *ngFor="let course of courses" styleClass="course-card-square">
          
          <h3 class="course-title">{{ course.courseName }}</h3>

          <div class="details">
            <span>ID: {{ course.courseInCurriculumId }}</span>
            <span> • Créditos: {{ course.credits }}</span>
            <span> • Semestre: {{ course.semester }}</span>
          </div>

        </p-card>
      </div>

    </section>
  `
})
export class Yourclass implements OnInit {

  readonly name = input("Yorth");
  readonly major = input("Ingeniero de Sistemas");

  tabs = ["All", "prerraquisitos", "sinprerre", "creditos"];
  activeTab = "All";

  loading = false;

  courses: any[] = []; // Loaded dynamically from API

  constructor(
    private studentCoursesService: StudentCoursesService,
    private coursesInCurriculumService: CoursesInCurriculumService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

 
  loadCourses() {
    this.loading = true;

    const studentCurriculumId = 1; 

    this.studentCoursesService
      .findByStudentCurriculumId(studentCurriculumId)
      .pipe(
        switchMap((studentCourses: any[]) => {
          
          const ids = Array.from(new Set(studentCourses.map((s: any) => s.courseInCurriculumId)));

          if (!ids.length) {
            return of([]);
          }

        
          const requests = ids.map((id) => this.coursesInCurriculumService.getOne(id).pipe(
            catchError(() => of(null))
          ));

          return forkJoin(requests).pipe(
            map((coursesDetails: any[]) => coursesDetails.filter(Boolean))
          );
        })
      )
      .subscribe({
        next: (coursesDetails: any[]) => {
          // Map backend course model to our UI model
          this.courses = coursesDetails.map((c: any) => ({
            courseInCurriculumId: c.id,
            courseName: c.name,
            credits: c.credits,
            semester: c.semester,
          }));

          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading courses', err);
          this.loading = false;
        },
      });
  }
}
