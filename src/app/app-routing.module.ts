import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./pages/components/register/register.component";
import {LoginComponent} from "./pages/components/login/login.component";
import {DashboardComponent} from "./pages/components/dashboard/dashboard.component"; //
import {authGuard} from './shared/guards/auth.guard';
import {SchedulePickupComponent} from "./pages/components/schedule-pickup/schedule-pickup.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]}, // Protected route
  { path: 'schedule-pickup', component: SchedulePickupComponent, canActivate: [authGuard] },
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Redirect to login by default
  {path: '**', redirectTo: '/login'} // Wildcard route for a 404 page (redirects to login)
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
