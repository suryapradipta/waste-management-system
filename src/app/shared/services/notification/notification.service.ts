import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch notifications
  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.getHeaders()});
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${notificationId}/read`, {}, { headers: this.getHeaders() });
  }

  // Broadcast an announcement (Admin only)
  broadcastAnnouncement(data: { message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/broadcast`, data, { headers: this.getHeaders() });
  }
}
