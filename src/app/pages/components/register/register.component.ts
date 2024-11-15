import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";

interface PickupSchedule {
  day: string;
  time: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  contactNumber = '';
  email = '';
  communityName = '';
  address = '';
  role = 'user';
  pickupDay = '';
  pickupTime = '';
  pickupSchedule: PickupSchedule[] = [];

  constructor(private authService: AuthService) {
  }

  addPickupSchedule() {
    this.pickupSchedule.push({day: this.pickupDay, time: this.pickupTime});
    this.pickupDay = '';
    this.pickupTime = '';
  }

  onRegister() {
    const userData = {
      fullName: this.fullName,
      contactNumber: this.contactNumber,
      email: this.email,
      communityName: this.communityName,
      address: this.address,
      role: this.role,
      pickupSchedule: this.pickupSchedule
    };

    this.authService.register(userData).subscribe({
      next: (response) => alert(response.message),
      error: (error) => alert(error.error.message)
    });
  }
}
