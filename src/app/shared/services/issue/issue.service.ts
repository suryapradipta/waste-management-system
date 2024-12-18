import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/api/issues';

  constructor(private http: HttpClient) {}

  // Add token to headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Report an issue
  reportIssue(issueData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/report`, issueData, { headers: this.getHeaders() });
  }
}
