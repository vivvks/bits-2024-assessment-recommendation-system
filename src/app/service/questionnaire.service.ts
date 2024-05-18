// questionnaire.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiUrl = 'http://localhost:3000'; // Update with your backend server URL

  constructor(private http: HttpClient) { }

  // Function to get questionnaire data from the backend
  getQuestionnaireData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questionnaire`);
  }
}
