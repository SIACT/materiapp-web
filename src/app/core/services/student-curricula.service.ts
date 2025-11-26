import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../api-urls';
import { StudentCurriculum } from '../dto/interfaces.types';

@Injectable({
  providedIn: 'root',
})
export class StudentCurriculaService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}
 
  create(data: Partial<StudentCurriculum>): Observable<StudentCurriculum> {
    return this.http.post<StudentCurriculum>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.CREATE}`,
      data
    );
  }
 
  createByMe(data: Partial<StudentCurriculum>): Observable<StudentCurriculum> {
    return this.http.post<StudentCurriculum>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.CREATE_BY_ME}`,
      data
    );
  }
 
  getAll(): Observable<StudentCurriculum[]> {
    return this.http.get<StudentCurriculum[]>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.GET_ALL}`
    );
  }
 
  getOne(id: number): Observable<StudentCurriculum> {
    return this.http.get<StudentCurriculum>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.GET_ONE(id)}`
    );
  }
 
  findMe(): Observable<StudentCurriculum[]> {
    return this.http.get<StudentCurriculum[]>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.GET_ME}`
    );
  }
 
  findOneByMe(id: number): Observable<StudentCurriculum> {
    return this.http.get<StudentCurriculum>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.GET_ONE_BY_ME(id)}`
    );
  }
 
  update(
    id: number,
    data: Partial<StudentCurriculum>
  ): Observable<StudentCurriculum> {
    return this.http.patch<StudentCurriculum>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.UPDATE(id)}`,
      data
    );
  }
 
  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}${API_URLS.STUDENT_CURRICULA.DELETE(id)}`
    );
  }
}
