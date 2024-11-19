import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupData = {
    username: '',
    email: '',
    password: '',
    roles: [] as string[]
  };

  constructor(private http: HttpClient, private router: Router,private toastService : ToastService) {}

  onSignup() {
    const transformedData = {
      username: this.signupData.username,
      email: this.signupData.email,
      password: this.signupData.password,
      roles: [this.signupData.roles] 
    };
    this.http.post('http://localhost:8080/pms/register', transformedData).subscribe(
      (response) => {
        this.toastService.showToast('Signup successful! You can now log in.', 'success', 3000);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastService.showToast('Unknown error occurred.', 'danger', 3000);
      }
    );
  }

  @Output() navigateToLogin = new EventEmitter<void>();
  triggerLoginNavigation() {
    this.navigateToLogin.emit();
  }
}
