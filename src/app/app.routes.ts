import { Routes } from '@angular/router';
import { AppLayout } from './layout/components/app.layout/app.layout';
import { AppFooter } from './layout/components/app.footer/app.footer';
import { Notfound } from './pages/notfound/notfound';
import { AppHome } from './pages/home/app.home';
import { LoginRedirect } from './pages/auth/login-redirect';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Public home page
  { path: '', component: AppHome },
  // Login entry that triggers Keycloak
  { path: 'login', component: LoginRedirect },
  // Protected/layouted area under /app
  {
    path: 'app',
    component: AppLayout,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'pensum', pathMatch: 'full' },
      { path: 'pensum', loadChildren: () => import('./pages/dashboard/dashboard.routes') },
      { path: 'recommendation', loadChildren: () => import('./pages/recommendation/recommendation.routes') },
      { path: 'stadistics', loadChildren: () => import('./pages/dashboard-stadistics/stadistics.routes') },

      
      { path: 'footer', component: AppFooter }
    ]
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '' }
];
 
  