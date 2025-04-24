import { Routes } from '@angular/router';

import { RegisterComponent } from './domains/products/pages/register/register.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/products/pages/list/list.component')
            },
            {	
                path: 'about',
                loadComponent: () => import('./domains/info/pages/about/about.component')
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
            }
        ]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }


];
