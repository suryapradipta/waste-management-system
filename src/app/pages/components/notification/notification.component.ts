import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        this.notifications = response.notifications;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      }
    });
  }
}