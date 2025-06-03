import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';

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
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./watchlist/watchlist.component').then(
        (m) => m.WatchlistComponent
      ),
    canActivate: [authGuard],
  },
];
