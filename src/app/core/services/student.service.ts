import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../api-urls';
 
import { User } from '../dto/user.type';
 

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private base = API_URLS.BASE;

  constructor(private http: HttpClient) {}

  getMe(){
    return this.http.get<User[]>(`${this.base}${API_URLS.USER.ME}`);
  }

}
