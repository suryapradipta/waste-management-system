import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  private apiUrl = 'http://localhost:3000/api/pickups';


  constructor(private http: HttpClient) {
  }

  // Add token to headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPickupSchedule(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedule`, {headers: this.getHeaders()});
  }

  schedulePickup(pickupData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedule`, pickupData, {headers: this.getHeaders()});
  }
}
