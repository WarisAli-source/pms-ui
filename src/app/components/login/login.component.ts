import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

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
  role: string = 'ADMIN';

  constructor(private http: HttpClient, private router: Router,private authService:AuthServiceService) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post<any>('http://localhost:8080/pms/login', loginData).subscribe(
      (response) => {
        // Save the JWT token to localStorage
        debugger
        console.log('Login response:', response);  
        this.authService.setToken(response.jwtToken);
        this.router.navigate(['/app-dashboard']);
        // Navigate based on role
        // if (this.role === 'ADMIN') {
        //   this.router.navigate(['/app-dashboard']);
        // } else if (this.role === 'PATIENT') {
        //   this.router.navigate(['/app-dashboard']);
        // } else if (this.role === 'DOCTOR') {
        //   this.router.navigate(['/app-dashboard']);
        // }
      },
      (error) => {
        alert('Login failed: ' + error.error.message);
      }
    );
  }
}
