import { Routes } from '@angular/router';
import { AppLayout } from './layout/components/app.layout/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AppFooter } from './layout/components/app.footer/app.footer';
import { Notfound } from './pages/notfound/notfound';
import { AppHome } from './pages/home/app.home';
export const routes: Routes = [
    {
        path: '',
        component:AppLayout,
        children: [
            {path: '',component: AppHome },
            {path:'pensum', loadChildren:() => import('./pages/dashboard/dashboard.routes') },
            {path: 'recommendation', loadChildren:() => import('./pages/recommendation/recommendation.routes') },
            {path: 'home', loadChildren:() => import('./pages/home/home.routes') },
            {path: 'footer', component: AppFooter }

        
        ]
    },
    {path: 'notfound', component: Notfound}


];
 