import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
import { Observable } from 'rxjs';
import { Campus } from '../dto/campus.type';
 

@Injectable({
  providedIn: 'root',
})
export class CampusesService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.base}${API_URLS.CAMPUSES.GET_ALL}`);
  }

  getOne(id: number): Observable<Campus> {
    return this.http.get<Campus>(`${this.base}${API_URLS.CAMPUSES.GET_ONE(id)}`);
  }

  create(data: Partial<Campus>): Observable<Campus> {
    return this.http.post<Campus>(`${this.base}${API_URLS.CAMPUSES.CREATE}`, data);
  }

  update(id: number, data: Partial<Campus>): Observable<Campus> {
    return this.http.patch<Campus>(`${this.base}${API_URLS.CAMPUSES.UPDATE(id)}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}${API_URLS.CAMPUSES.DELETE(id)}`);
  }
}
