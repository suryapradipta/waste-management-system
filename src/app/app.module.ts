import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/components/register/register.component';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './pages/components/login/login.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SchedulePickupComponent } from './pages/components/schedule-pickup/schedule-pickup.component';

import { ReportIssueComponent } from './pages/components/report-issue/report-issue.component';
import { NotificationComponent } from './pages/components/notification/notification.component';
import {PickupService} from "./shared/services/pickup/pickup.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SchedulePickupComponent,
    ReportIssueComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
