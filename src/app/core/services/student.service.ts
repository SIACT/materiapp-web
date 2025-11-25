import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
import { Student } from '../dto/student.type';
 

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Student[]>(`${this.base}${API_URLS.STUDENTS.GET_ALL}`);
  }

  getOne(id: string) {
    return this.http.get<Student>(`${this.base}${API_URLS.STUDENTS.GET_ONE(id)}`);
  }

  create(data: any) {
    return this.http.post<Student>(`${this.base}${API_URLS.STUDENTS.CREATE}`, data);
  }

  update(id: string, data: any) {
    return this.http.patch(`${this.base}${API_URLS.STUDENTS.UPDATE(id)}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}${API_URLS.STUDENTS.DELETE(id)}`);
  }
  getByKeycloakId(keycloakId: string) {
  return this.http.get(`${this.base}/students/keycloak/${keycloakId}`);
  }

}
