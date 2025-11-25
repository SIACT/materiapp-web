import { Injectable } from '@angular/core';
import { API_URLS } from '../api-urls';
import { HttpClient } from '@angular/common/http';
import { StudentCurriculum } from '../dto/interfaces.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentCurriculaService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

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
}
