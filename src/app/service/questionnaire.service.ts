// questionnaire.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiUrl = 'http://localhost:3000'; // Update with your backend server URL

  constructor(private http: HttpClient) { }

  // Function to get questionnaire data from the backend
  getQuestionnaireData(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<any[]>(`${this.apiUrl}/questionnaire`, { params });
  }

  getQuestionsByIds(ids:string): Observable<any[]> {
  console.log("idstes",ids)
    let newurl="http://127.0.0.1:5000/recommendItems/"
    const url = `${newurl}${ids}?train=false`;
    console.log(url)
     const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });

        return this.http.get<any[]>(url, { headers })


//     const hardcodedResponse = [
//       "30510", "30511", "30512", "30513", "30514", "30515",
//       "30516", "30517", "30518", "30519", "30520", "30521",
//       "30522", "30523", "30524"
//     ];

    // Return the hardcoded response
    //return of(hardcodedResponse);
  }

  getRecommendedQuestions(ids:string): Observable<any[]> {
    const params = new HttpParams().set('ids', ids);
    return this.http.get<any[]>(`${this.apiUrl}/recommendedQuestions`, { params });
  }
}
