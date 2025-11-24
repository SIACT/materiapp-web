import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
 
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { Subjectprox } from "../subjectprox/subjectprox";

@Component({
  selector: 'app-yourclass',
  standalone: true,
  imports: [CommonModule, TagModule, BadgeModule, AvatarModule, CardModule, ProgressSpinnerModule, ButtonModule, Subjectprox],
  template: `
     <p-card styleClass="hello-card">
      <div class="header-content">
        <div class="header-left">
          <h1 class="hello-title">Hola, {{ name() }} 👋</h1>
          <p class="hello-description">Como estas? conoce el progreso de tu materia, materias por matricular, y creditos que has completado hasta el momento.</p>
          <p-tag [value]="major()" severity="info" class="hello-major-tag"></p-tag>
        </div>
      </div>
    </p-card>

    <app-subjectprox></app-subjectprox>
  
    <section class="your-class-container text-black">

      <!-- TITLE -->
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

      <!-- Course cards generated from courses array -->
      <div class="courses-grid">
        <p-card *ngFor="let course of courses" styleClass="course-card-square">
           <div class="w-full">
          <h3 class="course-title">{{ course.title }}</h3>
          <div class="details">
            <span>{{ course.lessons }} lessons</span>
  
            <span> <span>•</span> {{ course.assignments }}</span>
           
            <span> <span>•</span> {{ course.duration }} assignments</span>
            
          </div>
         
        </div>
        </p-card>
      </div>

    </section>
  `
})
export class Yourclass {
  readonly name = input("Yorth");                // Student name
  readonly major = input("Ingeniero de Sistemas"); // Career / description

  tabs = ["All", "prerraquisitos", "sinprerre", "creditos"];
  activeTab = "All";
  

  courses = [
    {
      title: 'Microbiology Society',
      lessons: 10,
      duration: '45 min',
      assignments: 2,
      students: 256,
      progress: 79,
      img: '/assets/microbio.png'
    },
    {
      title: 'Design Basics',
      lessons: 8,
      duration: '35 min',
      assignments: 1,
      students: 120,
       progress: 79,
      img: '/assets/design.png'
    },
    {
      title: 'Intro to Coding',
      lessons: 12,
      duration: '50 min',
      assignments: 3,
      students: 480,
      progress: 79,
      img: '/assets/code.png'
    }
  ];

}
