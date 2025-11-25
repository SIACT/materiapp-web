// import { Injectable } from '@angular/core';
// import { API_URLS } from '../../../core/api-urls';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface RecomendationResponse {
//   courses: any[];
//   rationale: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class RecommendationService {
//    private baseUrl = API_URLS.BASE;

//   constructor(private http: HttpClient) {}

//   getRecomendations(studentCurriculumId: number): Observable<RecomendationResponse> {
//     const url = this.baseUrl + API_URLS.RECOMENDATIONS.GENERATE(studentCurriculumId);
//     return this.http.get<RecomendationResponse>(url);
// }

  
// }
