import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router,private authService:AuthServiceService,private toastService: ToastService) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password, role: this.role };
    this.http.post<any>('http://localhost:8080/pms/login', loginData).subscribe(
      (response) => {
        this.authService.setToken(response.jwtToken);
        this.router.navigate(['/app-dashboard']);
        this.toastService.showToast('Logged in Successfully', 'success', 3000);
      },
      (error) => {
        if (error.status === 401) {
          this.toastService.showToast('Invalid username or password', 'danger', 3000);
        } else if (error.status === 403) {
          this.toastService.showToast('Access denied. Role mismatch.', 'danger', 3000);
        } else {
          this.toastService.showToast('An unexpected error occurred', 'danger', 3000);
        }
      }
    );
  }
  onNavigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
