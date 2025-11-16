import { Routes } from '@angular/router';
import { MessageComponent } from "./message";

export default [
    {
        path: 'button', 
        data: { breadcrumb: 'Button' },
        component: MessageComponent
    }
] as Routes;