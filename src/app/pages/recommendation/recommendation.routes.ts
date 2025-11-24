import { Routes } from '@angular/router';
 
import { LayoutRecommedation } from './layout.recommedation';
 

export default [
    {
        path: 'ia', 
        data: { breadcrumb: 'Button' },
        component: LayoutRecommedation
    }
] as Routes;