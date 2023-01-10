import { LoginComponent } from './pages/auth/login/login.component';
import { SoDispatchedOrdersComponent } from './pages/so-dispatched-orders/so-dispatched-orders.component';
import { SoPendingDeliveryRequestsComponent } from './pages/so-pending-delivery-requests/so-pending-delivery-requests.component';
import { DriversReturnedOrdersComponent } from './pages/drivers-returned-orders/drivers-returned-orders.component';
import { DriversDeliveredOrdersComponent } from './pages/drivers-delivered-orders/drivers-delivered-orders.component';
import { DriversPickedOrdersComponent } from './pages/drivers-picked-orders/drivers-picked-orders.component';
import { DriversPendingOrdersComponent } from './pages/drivers-pending-orders/drivers-pending-orders.component';
import { DriverDetailsComponent } from './pages/driver-details/driver-details.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'drivers', component: DriversComponent, },
                    { path: 'driver/details', component: DriverDetailsComponent, },
                    { path: 'drivers/pending/orders', component: DriversPendingOrdersComponent, },
                    { path: 'drivers/picked/orders', component: DriversPickedOrdersComponent, },
                    { path: 'drivers/delivered/orders', component: DriversDeliveredOrdersComponent, },
                    { path: 'drivers/returned/orders', component: DriversReturnedOrdersComponent, },
                    { path: 'sopending/pending/delivery/requests', component: SoPendingDeliveryRequestsComponent, },
                    { path: 'sodispatched/orders', component: SoDispatchedOrdersComponent, },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'login', component: LoginComponent, },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ],
        { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
