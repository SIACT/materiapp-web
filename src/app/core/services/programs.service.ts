import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
import { Program } from '../dto/program.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.base}${API_URLS.PROGRAMS.GET_ALL}`);
  }

  getOne(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.base}${API_URLS.PROGRAMS.GET_ONE(id)}`);
  }

  getBySchoolId(schoolId: number): Observable<Program[]> {
    const url = `${this.base}${API_URLS.PROGRAMS.GET_BY_SCHOOL(schoolId)}`;
  
    console.log('[ProgramsService] 🚀 Making request to:', url);
    return this.http.get<Program[]>(url);
  }

  create(program: Partial<Program>): Observable<Program> {
    return this.http.post<Program>(
      `${this.base}${API_URLS.PROGRAMS.CREATE}`,
      program
    );
  }

  update(id: number, program: Partial<Program>): Observable<Program> {
    return this.http.patch<Program>(
      `${this.base}${API_URLS.PROGRAMS.UPDATE(id)}`,
      program
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}${API_URLS.PROGRAMS.DELETE(id)}`
    );
  }
}
