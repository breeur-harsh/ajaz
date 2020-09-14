// This file contains all the routing paths and logic

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: "", component: WelcomeComponent
  },
  {
    path: "welcome", component: WelcomeComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "dashboard",canActivate: [AuthGuard], component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }