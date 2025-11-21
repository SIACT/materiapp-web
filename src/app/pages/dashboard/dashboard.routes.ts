import { Routes } from '@angular/router';
 
import { Dashboard } from './dashboard';



export default [
  {
    path: 'materias',
    data: { breadcrumb: 'Button' },
    component: Dashboard
  }
] as Routes;