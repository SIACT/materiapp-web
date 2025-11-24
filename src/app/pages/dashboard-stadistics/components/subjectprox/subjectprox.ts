import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-subjectprox',
  standalone: true,
  imports: [CardModule,CommonModule],
  template: `
      <p-card class="flex flex-col gap-2 p-0">
      <h2 class="title text-xs pb-5 pt-2">materias prox semestre</h2>

      <div *ngFor="let c of courses" class="course-card ">

        <div class="progress-wrapper ">
          <div class="circle">
            <span>{{ c.progress }}%</span>
          </div>
          <span class="progress-text">{{ c.progress }}%</span>
        </div>

        <div class="w-full">
          <h3 class="course-title">{{ c.title }}</h3>
          <div class="details">
            <span>{{ c.lessons }} lessons</span>
  
            <span> <span>•</span> {{ c.duration }}</span>
           
            <span> <span>•</span> {{ c.assignments }} assignments</span>
            
            <span> <span>•</span> {{ c.students }} students</span>
          </div>
         
        </div>

        <img [src]="c.img" class="course-img" />

      </div>
    </p-card>


  `,
 
})
export class Subjectprox {


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
