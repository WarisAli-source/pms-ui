import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastService } from './services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./components/toast/toast.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthServiceService } from './services/auth-service.service';
import { SignupComponent } from "./components/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, ToastComponent, LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Patient Management System';
  isSidebarVisible = true;
  toastMessage: string | null = null;
  toastClass: string = '';
  isLoggedIn = false; 
  isLoginView = true; 


  constructor(private router: Router,private toastService: ToastService,private authService:AuthServiceService) {}

  onSidebarVisibilityChanged(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }
  
  ngOnInit() {
    this.checkAuthentication();
  }
  
  showSignup() {
    this.isLoginView = false;
  }

  showLogin() {
    this.isLoginView = true;
  }

  onLoginSuccess() {
    this.isLoggedIn = true; 
    this.router.navigate(['/app-dashboard']); 
  }

  checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
  
  handleLogout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']); 
  }

  
}
