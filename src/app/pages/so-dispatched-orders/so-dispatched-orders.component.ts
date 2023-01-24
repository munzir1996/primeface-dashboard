import { SoDispatchedOrdersModalComponent } from './../../modals/so-dispatched-orders-modal/so-dispatched-orders-modal.component';
import { SoPendingDeliveryModalComponent } from './../../modals/so-pending-delivery-modal/so-pending-delivery-modal.component';
import { CityModel } from './../../models/City/CityModel';
import { RequestChannelModel } from './../../models/RequestChannel/RequestChannelModel';
import { GetSalesOrdersRequestModel } from './../../requests/GetSalesOrders/GetSalesOrdersRequestModel';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { Router } from '@angular/router';
import { AppService } from './../../utils/services/app.service';
import { Observable } from 'rxjs';
import { SalesOrderModel } from './../../models/SalesOrders/SalesOrderModel';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-so-dispatched-orders',
  templateUrl: './so-dispatched-orders.component.html',
  styleUrls: ['./so-dispatched-orders.component.scss'],
  providers: [MessageService, DialogService]
})
export class SoDispatchedOrdersComponent implements OnInit {

    requestChannels!: RequestChannelModel[];
    cities!: CityModel[];
    loginResponse!: LoginResponseModel;
    salesOrdersResponse!: SalesOrderModel[];
    salesOrders!: SalesOrderModel[];
    filterSalesOrdersForm!: FormGroup;
    isSalesOrdersLoaded!: boolean;
    isRefreshSalesOrders!: boolean;
    emojy: string = '&#x1F605';
    //
    items!: MenuItem[];
    home!: MenuItem;
    customers1: Customer[] = [];
    representatives: Representative[] = [];
    statuses: any[] = [];
    activityValues: number[] = [0, 100];
    loading: boolean = true;
    ref!: DynamicDialogRef;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private digiDeliveryApiService: DigiDeliveryApiService,
        public router: Router,
        public appService: AppService,
        public messageService: MessageService,
        public dialogService: DialogService,
    ) { }

    ngOnInit(): void {

        this.items = [
            {label: 'S.O Dispatched Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.loginResponse = this.appService.getUserInfo();
        this.getSalesOrderRequests();

        this.requestChannels = [
            { name: 'E-commerce', value: 'E-commerce'},
            { name: 'Region', value: 'Region'},
            { name: 'Dist', value: 'Dist'},
            { name: 'Retail', value: 'Retail'},
            { name: 'Corp', value: 'Corp'},
        ];

        this.cities = [
            { name: 'Khartoum', value: 'Khartoum' },
            { name: 'Khartoum North', value: 'Khartoum North' },
            { name: 'Omdurman', value: 'Omdurman' },
        ];

        this.statuses = [
            { name: 'Requested', value: 'N' },
            { name: 'Dispatched', value: 'Y' },
        ];

    }

    getSalesOrderRequests() {

        let salesOrdersRequest = new GetSalesOrdersRequestModel;
        salesOrdersRequest.Status = "";
        salesOrdersRequest.EmpCode = this.loginResponse.UserInfo.EmpCode;
        this.isSalesOrdersLoaded = false;
        this.isRefreshSalesOrders = false;

        this.digiDeliveryApiService.GetSalesOrders(salesOrdersRequest).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    // this.salesOrdersResponse = response.salesOrders;
                    this.salesOrders = response.salesOrders;
                    this.messageService.add({severity:'success', summary: 'S.O Pending Delivery Requests', detail: response.Error.ErrorMessage, life: 3000});

                } else {
                    this.isSalesOrdersLoaded = true;

                    // this.toastr.error('Pending Delivery Orders', response.Error.ErrorMessage);
                    this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: () => {
                this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                    this.loading = false;
            },
        });
    }

    openShowSalesOrderModal(salesOrders: any) {
        this.ref = this.dialogService.open(SoDispatchedOrdersModalComponent, {
            data: {
                salesOrders: salesOrders,
                ref: this.ref,
            },
            header: 'S.O. Pending Delivery Requests Details',
            width: '70%',
            maximizable: true,
            // contentStyle: {"max-height": "500px", "overflow": "auto"},
            // baseZIndex: 10000
        });

    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

}
