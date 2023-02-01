import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { DriversComponent } from './pages/drivers/drivers.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';
import { DriverDetailsComponent } from './pages/driver-details/driver-details.component';
import {PanelModule} from 'primeng/panel';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { OrderDetailsModalComponent } from './modals/order-details-modal/order-details-modal.component';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import { DriversPendingOrdersComponent } from './pages/drivers-pending-orders/drivers-pending-orders.component';
import { DriversPickedOrdersComponent } from './pages/drivers-picked-orders/drivers-picked-orders.component';
import { DriversDeliveredOrdersComponent } from './pages/drivers-delivered-orders/drivers-delivered-orders.component';
import { DriversReturnedOrdersComponent } from './pages/drivers-returned-orders/drivers-returned-orders.component';
import { SoPendingDeliveryRequestsComponent } from './pages/so-pending-delivery-requests/so-pending-delivery-requests.component';
import { SoDispatchedOrdersComponent } from './pages/so-dispatched-orders/so-dispatched-orders.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoginComponent } from './pages/auth/login/login.component';
import {PasswordModule} from 'primeng/password';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { SoPendingDeliveryModalComponent } from './modals/so-pending-delivery-modal/so-pending-delivery-modal.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { SoDispatchedOrdersModalComponent } from './modals/so-dispatched-orders-modal/so-dispatched-orders-modal.component';
import { SoRequestDeliveryComponent } from './pages/so-request-delivery/so-request-delivery.component';
import { SoRequestDeliveryModalComponent } from './modals/so-request-delivery-modal/so-request-delivery-modal.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { AddDriverModalComponent } from './modals/add-driver-modal/add-driver-modal.component';
import {GMapModule} from 'primeng/gmap';
import { OrdersHeatMapComponent } from './pages/orders-heat-map/orders-heat-map.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        NotfoundComponent, AppComponent, DriversComponent, DriverDetailsComponent, OrderDetailsModalComponent, DriversPendingOrdersComponent,
        DriversPickedOrdersComponent, DriversDeliveredOrdersComponent, DriversReturnedOrdersComponent,
        SoPendingDeliveryRequestsComponent, SoDispatchedOrdersComponent, LoginComponent,
        SoPendingDeliveryModalComponent, SoDispatchedOrdersModalComponent, SoRequestDeliveryComponent,
        SoRequestDeliveryModalComponent, AddDriverModalComponent, OrdersHeatMapComponent
    ],
    imports: [
        GMapModule,
        FormsModule,
        ReactiveFormsModule ,
        AppRoutingModule,
        AppLayoutModule,
        DataViewModule,
        ButtonModule,
        CommonModule,
        FormsModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        SkeletonModule,
        PanelModule,
        BreadcrumbModule,
        ToggleButtonModule,
        BrowserAnimationsModule,
        TagModule,
        RadioButtonModule,
        AccordionModule,
        TabViewModule,
        CalendarModule,
        SelectButtonModule,
        DynamicDialogModule,
        ToastModule,
        TableModule,
        CardModule,
        ImageModule,
        MultiSelectModule,
        SliderModule,
        ProgressBarModule,
        PasswordModule,
        ProgressSpinnerModule,
        CheckboxModule,
        ConfirmPopupModule,
        InputTextareaModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DatePipe
    ],
    bootstrap: [AppComponent, DatePipe]
})
export class AppModule { }
