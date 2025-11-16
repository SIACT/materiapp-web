import { Routes } from '@angular/router';
import { AppLayout } from './layout/components/app.layout/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AppFooter } from './layout/components/app.footer/app.footer';
import { Notfound } from './pages/notfound/notfound';
export const routes: Routes = [
    {
        path: '',
        component:AppLayout,
        children: [
            {path: '',component: Dashboard },
            {path: 'recommendation', loadChildren:() => import('./pages/dashboard/components/recommendation/recommendatios.router') },
            {path: 'footer', component: AppFooter }
        
        ]
    },
    {path: 'notfound', component: Notfound}


];
 