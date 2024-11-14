import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ message: string; type: string; duration: number }>();

  getToast(): Observable<{ message: string; type: string; duration: number }> {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, type: string = 'info', duration: number = 3000): void {
    console.log('Toast triggered:', { message, type, duration });
    this.toastSubject.next({ message, type, duration });
  }
}
