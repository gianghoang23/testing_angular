import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
];
