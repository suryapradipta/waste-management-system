import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./pages/components/register/register.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {DashboardComponent} from "./pages/components/dashboard/dashboard.component"; //
import {authGuard} from './shared/guards/auth.guard';
import {SchedulePickupComponent} from "./pages/components/schedule-pickup/schedule-pickup.component";
import {ReportIssueComponent} from "./pages/components/report-issue/report-issue.component";
import {NotificationComponent} from "./pages/components/notification/notification.component";
import {LayoutComponent} from "./pages/layout/layout.component";
import {PickupHistoryComponent} from "./pages/components/pickup-history/pickup-history.component";
import {
  BroadcastAnnouncementComponent
} from "./pages/components/broadcast-announcement/broadcast-announcement.component";
import {ReportsComponent} from "./pages/components/reports/reports.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
      {path: 'schedule-pickup', component: SchedulePickupComponent, canActivate: [authGuard]},
      {path: 'report-issue', component: ReportIssueComponent, canActivate: [authGuard]}, // New Route
      {path: 'notifications', component: NotificationComponent, canActivate: [authGuard]},
      {path: 'pickup-history', component: PickupHistoryComponent, canActivate: [authGuard]},
      {path: 'broadcast-announcement', component: BroadcastAnnouncementComponent, canActivate: [authGuard]},
      {path: 'reports', component: ReportsComponent, canActivate: [authGuard]},


    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Redirect to login by default
  {path: '**', redirectTo: '/login'}, // Wildcard route for a 404 page (redirects to login)


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
