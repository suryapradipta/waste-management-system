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
import { LayoutComponent } from './pages/layout/layout.component';
import {NgOptimizedImage} from "@angular/common";
import { ToastComponent } from './shared/components/toast/toast.component';
import { PickupHistoryComponent } from './pages/components/pickup-history/pickup-history.component';
import { BroadcastAnnouncementComponent } from './pages/components/broadcast-announcement/broadcast-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SchedulePickupComponent,
    ReportIssueComponent,
    NotificationComponent,
    LayoutComponent,
    ToastComponent,
    PickupHistoryComponent,
    BroadcastAnnouncementComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
