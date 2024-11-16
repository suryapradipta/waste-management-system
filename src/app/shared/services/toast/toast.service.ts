import {Injectable} from '@angular/core';
import {Subject} from "rxjs";


interface Toast {
  title: string;
  message: string;
  time: string;
  show: boolean;
  type: 'success' | 'info' | 'warning' | 'danger';
}


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toasts$ = this.toastSubject.asObservable();

  showToast(title: string, message: string, type: 'success' | 'info' | 'warning' | 'danger') {
    const toast: Toast = { title, message, time: 'Just now', show: true, type };
    this.toastSubject.next(toast);
  }
}
