import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastService } from './services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Patient Management System';
  isSidebarVisible = true;

  constructor(private router: Router,private toastService: ToastService) {}

  onSidebarVisibilityChanged(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }
  toastMessage: string | null = null;
  toastClass: string = '';

  ngOnInit() {
    this.toastService.toastMessage$.subscribe((toast) => {
      if (toast) {
        this.toastMessage = toast.message;
        this.toastClass = toast.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';
      } else {
        this.toastMessage = null;
      }
    });
  }

  hideToast() {
    this.toastService.hideToast();
  }
}
