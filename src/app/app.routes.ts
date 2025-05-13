import { Routes } from '@angular/router';

import { RegisterComponent } from './domains/shared/components/register/register.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/products/pages/home/home.component')
            },
            {
                path: 'list',
                loadComponent: () => import('./domains/products/pages/list/list.component')
            },

            {
                path: 'about',
                loadComponent: () => import('./domains/info/pages/about/about.component')
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
            },
            {
                path: 'orders',
                loadComponent: () => import('./domains/products/pages/orders/orders.component').then(m => m.OrdersComponent),
            },
            {
                path: 'payment',
                loadComponent: () => import('./domains/products/pages/payment/payment.component').then(m => m.PaymentComponent),
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
