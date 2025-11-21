import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { API_URLS } from '../../../core/api-urls';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private http: HttpClient) {}

  getCoursesInCurriculum(curriculumId: number): Observable<any[]> {
    const url = API_URLS.BASE + API_URLS.SEMESTER.GET_COURSES_IN_CURRICULUM(curriculumId);
    return this.http.get<any[]>(url);
  }

  getCoursesInCurriculumWithDetails(curriculumId: number): Observable<any[]> {
    const curriculumUrl = API_URLS.BASE + API_URLS.SEMESTER.GET_COURSES_IN_CURRICULUM(curriculumId);
    const coursesUrl = API_URLS.BASE + '/courses';
    return this.http.get<any[]>(curriculumUrl).pipe(
      switchMap(curriculumSubjects =>
        this.http.get<any[]>(coursesUrl).pipe(
          map(courses => {
            // Merge subjects with course details
            return curriculumSubjects.map(sub => {
              const course = courses.find(c => c.id === sub.courseId);
              return {
                ...sub,
                name: course ? course.name : `Materia ${sub.courseId}`,
                code: course ? course.code : String(sub.courseId)
              };
            });
          })
        )
      )
    );
  }
}
