import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../api-urls';
import { StudentCourse } from '../dto/student-course.type';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}
 
  create(data: {
    studentCurriculumId: number;
    courseInCurriculumId: number;
  }): Observable<StudentCourse> {
    return this.http.post<StudentCourse>(
      `${this.base}${API_URLS.STUDENT_COURSES.CREATE}`,
      data
    );
  }
 
  sync(data: {
    studentCurriculumId: number;
    courseInCurriculumId: number;
    approve: boolean;
  }): Observable<any> {
    return this.http.post(
      `${this.base}${API_URLS.STUDENT_COURSES.SYNC}`,
      data
    );
  }
 
  findAll(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.base}${API_URLS.STUDENT_COURSES.GET_ALL}`
    );
  }
 
  findMyByStudentCurriculumId(studentCurriculumId: number): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.base}${API_URLS.STUDENT_COURSES.GET_MY_BY_STUDENT(studentCurriculumId)}`
    );
  }
 
  findByStudentCurriculumId(studentCurriculumId: number): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(
      `${this.base}${API_URLS.STUDENT_COURSES.GET_BY_STUDENT(studentCurriculumId)}`
    );
  }
 
  findOne(studentCurriculumId: number, courseInCurriculumId: number): Observable<StudentCourse> {
    return this.http.get<StudentCourse>(
      `${this.base}${API_URLS.STUDENT_COURSES.GET_ONE(studentCurriculumId, courseInCurriculumId)}`
    );
  }
 
  update(
    studentCurriculumId: number,
    courseInCurriculumId: number,
    data: Partial<StudentCourse>
  ): Observable<StudentCourse> {
    return this.http.patch<StudentCourse>(
      `${this.base}${API_URLS.STUDENT_COURSES.UPDATE(studentCurriculumId, courseInCurriculumId)}`,
      data
    );
  }
 
  remove(studentCurriculumId: number, courseInCurriculumId: number): Observable<any> {
    return this.http.delete(
      `${this.base}${API_URLS.STUDENT_COURSES.DELETE(studentCurriculumId, courseInCurriculumId)}`
    );
  }
}
