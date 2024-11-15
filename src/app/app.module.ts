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
import {PickupService} from "./shared/pickup/pickup.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SchedulePickupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PickupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
