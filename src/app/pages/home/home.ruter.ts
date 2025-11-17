import { Routes } from '@angular/router';
import { AppHome } from './app.home';



export default [
  {
    path: 'inicio',
    data: { breadcrumb: 'Button' },
    component: AppHome
  }
] as Routes;