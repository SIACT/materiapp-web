import { Routes } from '@angular/router';
import { AppMessage } from './components/message/message';
 

export default [
    {
        path: 'ia', 
        data: { breadcrumb: 'Button' },
        component: AppMessage
    }
] as Routes;