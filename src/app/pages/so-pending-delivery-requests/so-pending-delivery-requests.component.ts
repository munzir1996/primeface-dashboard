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

@Component({
  selector: 'app-so-pending-delivery-requests',
  templateUrl: './so-pending-delivery-requests.component.html',
  styleUrls: ['./so-pending-delivery-requests.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SoPendingDeliveryRequestsComponent implements OnInit {

    loginResponse!: LoginResponseModel;
    salesOrdersResponse!: SalesOrderModel[];
    salesOrders!: SalesOrderModel[];
    total$!: Observable<number>;
    isSalesOrdersLoaded!: boolean;
    isRefreshSalesOrders!: boolean;
    emojy: string = '&#x1F605';
    requestChannels!: RequestChannelModel[];
    cities!: CityModel[];
    ///
    items!: MenuItem[];
    home!: MenuItem;
    statuses: any[] = [];
    activityValues: number[] = [0, 100];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        private digiDeliveryApiService: DigiDeliveryApiService,
        public router: Router,
        public appService: AppService,
        public messageService: MessageService,
    ) { }

    ngOnInit(): void {

        this.items = [
            {label: 'S.O Pending Delivery Requests'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        //
        this.loginResponse = this.appService.getUserInfo();
        this.getSalesOrderRequests();
        // this.customerService.getCustomersLarge().then(customers => {
        //     this.customers1 = customers;
        //     this.loading = false;

        //     // @ts-ignore
        //     this.customers1.forEach(customer => customer.date = new Date(customer.date));
        // });

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
        salesOrdersRequest.Status = "N";
        salesOrdersRequest.EmpCode = this.loginResponse.UserInfo.EmpCode;

        this.digiDeliveryApiService.GetSalesOrders(salesOrdersRequest).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    // this.salesOrdersResponse = response.salesOrders;
                    this.salesOrders = response.salesOrders;
                    this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: response.Error.ErrorMessage, life: 3000});

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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
