import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() logoutEvent = new EventEmitter<void>();
  isSidebarVisible = false; 
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  constructor(private router: Router,private toastService :ToastService) {}
  navigateToPatients() {
    this.isSidebarVisible = false; 
    this.router.navigate(['/patients']); 
  }
  navigateToMedicalRecords() {
    this.isSidebarVisible = false; 
    this.router.navigate(['/medical-records']); 
  }
  navigateToDashboard() {
    this.isSidebarVisible = false; 
    this.router.navigate(['/app-dashboard']); 
  }
  logout() {
    localStorage.removeItem('authToken');
    this.isSidebarVisible = false;
    this.toastService.showToast('You have been logged out.', 'success', 3000);
    this.logoutEvent.emit();

  }
 
}

