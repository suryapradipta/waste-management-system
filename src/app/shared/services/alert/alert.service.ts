import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Alert} from "../../interface/alert";
import {Toast} from "../../interface/toast";


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Toast>();
  alerts$ = this.alertSubject.asObservable();

  showAlert(title: string, message: string, type: 'success' | 'info' | 'warning' | 'danger') {
    const alert: Toast = { title, message, time: 'Just now', show: true, type };
    this.alertSubject.next(alert);
  }
}
