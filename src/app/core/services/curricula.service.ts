import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
 
import { Observable } from 'rxjs';
import { Curriculum } from '../dto/curriculum.type';

@Injectable({
  providedIn: 'root',
})
export class CurriculaService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.base}${API_URLS.CURRICULA.GET_ALL}`);
  }

  getOne(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${this.base}${API_URLS.CURRICULA.GET_ONE(id)}`);
  }

  findByProgram(programId: number): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(
      `${this.base}${API_URLS.CURRICULA.FIND_BY_PROGRAM(programId)}`
    );
  }


  create(data: Partial<Curriculum>): Observable<Curriculum> {
    return this.http.post<Curriculum>(`${this.base}${API_URLS.CURRICULA.CREATE}`, data);
  }

  update(id: number, data: Partial<Curriculum>): Observable<Curriculum> {
    return this.http.patch<Curriculum>(`${this.base}${API_URLS.CURRICULA.UPDATE(id)}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${API_URLS.CURRICULA.DELETE(id)}`);
  }
}
