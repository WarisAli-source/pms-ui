import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarVisible = false; 
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  constructor(private router: Router) {}
  navigateToPatients() {
    this.isSidebarVisible = false; 
    this.router.navigate(['/patients']); 
  }
  navigateToMedicalRecords() {
    this.isSidebarVisible = false; 
    this.router.navigate(['/medical-records']); 
  }
 
}

