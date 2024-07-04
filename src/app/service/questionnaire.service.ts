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

//   getQuestionnaireDataById(): Observable<any[]> {
//       return this.http.get<any[]>(`${this.apiUrl}/questionnaire`);
//     }

//
//     async function getQuestionById(id: number): Promise<string | null> {
//       const query = 'SELECT question FROM asmt.ques_dtl WHERE id = $1';
//       try {
//         const res = await pool.query(query, [id]);
//         if (res.rows.length > 0) {
//           return res.rows[0].question;
//         } else {
//           return null;
//         }
//       } catch (err) {
//         console.error('Error executing query', err.stack);
//         throw err;
//       }
//     }
//
//     // Example usage
//     (async () => {
//       const questionId = 1; // Replace with the ID you want to query
//       const question = await getQuestionById(questionId);
//       if (question) {
//         console.log(`Question with ID ${questionId}: ${question}`);
//       } else {
//         console.log(`No question found with ID ${questionId}`);
//       }
//
//       // Close the database pool
//       await pool.end();
//     })();
}
