import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../services/toast/toast.service";

interface Toast {
  title: string;
  message: string;
  time: string;
  show: boolean;
  type: 'success' | 'info' | 'warning' | 'danger';
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit{
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.closeToast(toast), 3000);
    });
  }

  closeToast(toast: Toast) {
    toast.show = false;
  }

  getIcon(type: 'success' | 'info' | 'warning' | 'danger'): string {
    switch (type) {
      case 'success': return 'check';
      case 'info': return 'notifications';
      case 'warning': return 'travel_explore';
      case 'danger': return 'campaign';
      default: return '';
    }
  }
}
