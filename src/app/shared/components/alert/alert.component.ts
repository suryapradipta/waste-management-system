import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert/alert.service";
import {Toast} from "../../interface/toast";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Toast[] = [];

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.alerts$.subscribe(alert => {
      this.alerts.push(alert);
      console.log(this.alerts);
      setTimeout(() => this.closeAlert(alert), 3000);
    });
  }

  closeAlert(alert: Toast) {
    alert.show = false;
    this.alerts = this.alerts.filter(a => a !== alert);
  }
}
