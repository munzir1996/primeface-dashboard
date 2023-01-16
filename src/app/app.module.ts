import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
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

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, DriversComponent, DriverDetailsComponent, OrderDetailsModalComponent, DriversPendingOrdersComponent, DriversPickedOrdersComponent, DriversDeliveredOrdersComponent, DriversReturnedOrdersComponent, SoPendingDeliveryRequestsComponent, SoDispatchedOrdersComponent, LoginComponent
    ],
    imports: [
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
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, DatePipe
    ],
    bootstrap: [AppComponent, DatePipe]
})
export class AppModule { }
