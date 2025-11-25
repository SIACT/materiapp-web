import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
 
import { API_URLS } from '../api-urls';
import { CourseInCurriculum, CreateCourseInCurriculum, UpdateCourseInCurriculum } from '../dto/courses-in-curriculum.type';

@Injectable({
  providedIn: 'root',
})
export class CoursesInCurriculumService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseInCurriculum[]> {
    return this.http.get<CourseInCurriculum[]>(
      `${this.base}${API_URLS.COURSES_IN_CURRICULUM.GET_ALL}`,
    );
  }

  getOne(id: number): Observable<CourseInCurriculum> {
    return this.http.get<CourseInCurriculum>(
      `${this.base}${API_URLS.COURSES_IN_CURRICULUM.GET_ONE(id)}`,
    );
  }

  create(data: CreateCourseInCurriculum): Observable<CourseInCurriculum> {
    return this.http.post<CourseInCurriculum>(
      `${this.base}${API_URLS.COURSES_IN_CURRICULUM.CREATE}`,
      data,
    );
  }

  update(id: number, data: UpdateCourseInCurriculum): Observable<CourseInCurriculum> {
    return this.http.patch<CourseInCurriculum>(
      `${this.base}${API_URLS.COURSES_IN_CURRICULUM.UPDATE(id)}`,
      data,
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}${API_URLS.COURSES_IN_CURRICULUM.DELETE(id)}`,
    );
  }

  /**
   * Fetch courses that belong to a specific curriculum using the
   * semester endpoint (supports query param curriculumId)
   */
  getByCurriculum(curriculumId: string | number) {
    return this.http.get<CourseInCurriculum[]>(
      `${this.base}${API_URLS.SEMESTER.GET_COURSES_IN_CURRICULUM(curriculumId)}`
    );
  }
}
