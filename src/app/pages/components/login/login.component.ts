import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ToastService} from "../../../shared/services/toast/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  onLogin() {
    const credentials = {email: this.email, password: this.password};

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.toastService.showToast('Success', response.message, 'success');
        localStorage.setItem('token', response.token); // Ensure token is saved correctly
        this.router.navigate(['/dashboard']);
      },
      error: (error) => this.toastService.showToast('Error', error.error.message, 'danger')
    });
  }
}
