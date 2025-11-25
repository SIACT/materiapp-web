import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
 
import { Observable } from 'rxjs';
import { School } from '../dto/school.type';

@Injectable({
  providedIn: 'root',
})
export class SchoolsService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll(): Observable<School[]> {
    return this.http.get<School[]>(`${this.base}${API_URLS.SCHOOLS.GET_ALL}`);
  }

  getOne(id: number): Observable<School> {
    return this.http.get<School>(`${this.base}${API_URLS.SCHOOLS.GET_ONE(id)}`);
  }

  create(data: Partial<School>): Observable<School> {
    return this.http.post<School>(`${this.base}${API_URLS.SCHOOLS.CREATE}`, data);
  }

  update(id: number, data: Partial<School>): Observable<School> {
    return this.http.patch<School>(`${this.base}${API_URLS.SCHOOLS.UPDATE(id)}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${API_URLS.SCHOOLS.DELETE(id)}`);
  }
}
