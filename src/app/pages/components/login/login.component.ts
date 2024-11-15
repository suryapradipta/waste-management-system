import { Component } from '@angular/core';
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        alert(response.message);
        localStorage.setItem('token', response.token); // Ensure token is saved correctly
        this.router.navigate(['/dashboard']);
      },
      error: (error) => alert(error.error.message)
    });
  }
}
