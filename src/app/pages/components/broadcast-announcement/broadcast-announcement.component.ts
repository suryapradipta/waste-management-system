import { Component } from '@angular/core';
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Component({
  selector: 'app-broadcast-announcement',
  templateUrl: './broadcast-announcement.component.html',
  styleUrls: ['./broadcast-announcement.component.css']
})
export class BroadcastAnnouncementComponent {
  message: string = '';

  constructor(private notificationService: NotificationService) {}

  onBroadcast() {
    this.notificationService.broadcastAnnouncement({ message: this.message }).subscribe({
      next: (response) => {
        alert(response.message);
        this.message = '';
      },
      error: (error) => {
        console.error('Error broadcasting announcement:', error);
      }
    });
  }
}
