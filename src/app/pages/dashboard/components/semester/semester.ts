import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentCoursesService } from '../../../../core/services/student-course.service';
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';
import { StudentCourse } from '../../../../core/dto/student-course.type';
 
 
 

@Component({
  selector: 'app-semester',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="p-4 text-black">
      <h1 class="text-xl font-bold mb-3">Materias</h1>

      <div *ngFor="let c of courses" class="border rounded p-3 mb-2 text-black">
        <p class="font-semibold">{{ c.name }}</p>
        <p class="text-sm">Código: {{ c.code }}</p>
        <p class="text-sm">Semestre: {{ c.semester }}</p>
        <p class="text-sm">Créditos: {{ c.credits }}</p>
        <p class="text-sm">Aprobada: {{ c.isAproved ? 'Sí' : 'No' }}</p>
      </div>
    </div>
  `,
})
export class Semester implements OnInit{
   courses: StudentCourse[] = [];

  constructor(
    private studentCourses: StudentCoursesService,
    private profile: ProfileSelectionService
  ) {}

 ngOnInit(): void {
  this.profile.state$.subscribe(state => {
    if (!state.studentCurriculumId) return;

    this.studentCourses
      .findMeStudentCurriculumId(state.studentCurriculumId)
      .subscribe(res => {
        this.courses = res;
      });
  });
}

}
