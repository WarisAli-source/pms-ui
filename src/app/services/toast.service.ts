import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastMessage$ = new BehaviorSubject<{ message: string, type: 'success' | 'error' } | null>(null);

  showToast(message: string, type: 'success' | 'error', duration: number = 3000) {
    this.toastMessage$.next({ message, type });
    setTimeout(() => this.hideToast(), duration);
  }

  hideToast() {
    this.toastMessage$.next(null);
  }
}
