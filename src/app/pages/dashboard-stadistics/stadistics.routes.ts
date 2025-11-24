import { Routes } from '@angular/router';
import { StadisticsLayout } from '../dashboard-stadistics/stadistics.layout';



export default [
  {
    path: 'mypensum-stadistics',
    data: { breadcrumb: 'Button' },
    component: StadisticsLayout
  }
] as Routes;