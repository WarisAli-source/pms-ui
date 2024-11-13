import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import {CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: { message: string; type: string; duration: number }[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe((toast) => {
      this.toasts.push(toast);
      if (toast.duration > 0) {
        setTimeout(() => this.dismissToast(toast), toast.duration);
      }
    });
  }

  dismissToast(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'info':
        return 'fa-info-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'danger':
        return 'fa-times-circle';
      case 'success':
        return 'fa-check-circle';
      default:
        return 'fa-info-circle';
    }
  }
}
