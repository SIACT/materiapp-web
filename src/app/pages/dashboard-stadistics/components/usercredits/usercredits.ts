import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
 
import { StudentCoursesService } from '../../../../core/services/student-course.service';
import { StudentCurriculaService } from '../../../../core/services/student-curricula.service';
import { ProfileSelectionService } from '../../../../core/services/profile-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usercredits',
  standalone: true,
  imports: [AvatarModule, CardModule, DividerModule],
  template: `
    <div class="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

      <!-- Banner -->
      <div class="h-24 w-full overflow-hidden">
        <img [src]="imageUrl" alt="banner"
             class="w-full h-full object-cover" />
      </div>

      <!-- Avatar -->
      <div class="flex justify-center -mt-10">
        <p-avatar 
          [image]="imageProfile"
          shape="circle"
          size="xlarge"
          class="border-4 border-white shadow-md">
        </p-avatar>
      </div>

      <!-- Profile info -->
      <div class="text-center mt-3 mb-6">
        <h3 class="text-xl font-semibold text-black">{{ userName }}</h3>
        <p class="text-gray-500 text-sm">{{ userEmail }}</p>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-2 gap-3 px-6 pb-6">
        
        <!-- Courses -->
        <div class="bg-purple-50 rounded-2xl p-4 flex flex-col justify-center items-center">
          <i class="pi pi-book text-purple-500 text-xl mb-1"></i>
          <span class="text-2xl font-bold text-purple-600">{{ totalCourses }}</span>
          <span class="text-gray-600 text-sm">Courses</span>
        </div>

        <!-- Curriculum Version -->
        <div class="bg-purple-50 rounded-2xl p-4 flex flex-col justify-center items-center">
          <i class="pi pi-id-card text-purple-500 text-xl mb-1"></i>
          <span class="text-2xl font-bold text-purple-600">{{ curriculumVersion }}</span>
          <span class="text-gray-600 text-sm">Curriculum</span>
        </div>

      </div>
    </div>
  `,
})
export class Usercredits implements OnInit {
 

  // Default images
  imageUrl =
    'https://img.freepik.com/foto-gratis/vista-superior-surtido-suministros-oficina-espacio-copia_23-2148543746.jpg?semt=ais_hybrid&w=740&q=80';

  imageProfile = 'https://avatars.githubusercontent.com/u/92270218?v=4';

  // Values bound to the template
  userName = 'Guest User';
  userEmail = 'guest@example.com';
  totalCourses = 0;
  curriculumVersion = 'N/A';

  private profileSub?: Subscription;

  constructor(
    private studentCoursesService: StudentCoursesService,
    private studentCurriculaService: StudentCurriculaService,
    private profileSelection: ProfileSelectionService
  ) {}

   
  ngOnInit(): void {
    // Subscribe to profileSelection to react to the studentCurriculumId
    this.profileSub = this.profileSelection.state$.subscribe(state => {
      const id = state?.studentCurriculumId;
      if (!id) return;

      this.studentCurriculaService.getOne(id).subscribe({
        next: (sc) => {
          if (sc) {
            this.curriculumVersion = sc.curriculum?.version ?? 'N/A';
            this.userName = sc.student?.names ?? this.userName;
            this.userEmail = sc.student?.email ?? this.userEmail;
            this.totalCourses = (sc.studentCourses || []).length;
          }
        },
        error: (err) => {
          console.warn('Failed to load student curriculum', err);
          // fallback to counting courses
          this.loadStudentCoursesFallback(id);
        }
      });

      this.loadStudentCoursesFallback(id);
    });
  }

  private loadStudentCoursesFallback(id: number) {
    this.studentCoursesService.findByStudentCurriculumId(id).subscribe({
      next: (list) => {
        if (Array.isArray(list)) {
          this.totalCourses = list.length;
        }
      },
      error: (err) => {
        console.warn('Failed to load student courses', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.profileSub?.unsubscribe();
  }
}
