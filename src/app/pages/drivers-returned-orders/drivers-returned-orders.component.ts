import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { DatePipe } from '@angular/common';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { OrderInfo } from './../../models/Order/OrderInfo';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { SelectItem, PrimeNGConfig} from 'primeng/api';
import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drivers-returned-orders',
  templateUrl: './drivers-returned-orders.component.html',
  styleUrls: ['./drivers-returned-orders.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversReturnedOrdersComponent implements OnInit {

    loading: boolean = false;
    returnedOrders: OrderInfo[] = [];
    returnedOrdersLoaded: boolean = false;
    errorMessageReturnedOrders: string = "";

    userInfo!: LoginResponseModel;
    noReturnedOrders: boolean = false;

    driverInfo!: DriverInfo;

    filterReturnedOrdersForm!: FormGroup;

    DriversInfo: DriverInfo[] = [];

    driverCode: string = "";
    DeliveryNo: string = "";
    SoNo: string = "";
    fromDate: string = "";
    toDate: string = "";
    DeliveryLocation: string = "";


    showHideFilterText: string = "Show Filter";
    showHideFilterIcon: string = "ion-arrow-expand";
    filterFlag: boolean = false;
    today = new Date(Date.now());
    resetReturnedOrders: any;
    tempReturnedOrders: any;

    //
    items!: MenuItem[];
    home!: MenuItem;
    orders: Product[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    ordersLoaded: boolean = false;

    ref!: DynamicDialogRef;

    constructor(
        private productService: ProductService,
        private primengConfig: PrimeNGConfig,
        public dialogService: DialogService,
        public messageService: MessageService,
        private router: Router,
        private digiDeliveryApi: DigiDeliveryApiService,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        this.items = [
            {label: 'Drivers Returned Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
        // this.productService.getProducts().then(data => this.orders = data);
        // this.ordersLoaded = true;
        this.filterReturnedOrdersForm = this.formBuilder.group({

            DeliveryNo: [
              ""
            ],
            SoNo: [
              ""
            ],
            DriverCode: [
              ""
            ],
            FromDate: [
              ""
            ],
            ToDate: [
              ""
            ],
            DeliveryLocation: [
              ""
            ]

        });

        this.userInfo = this.appService.getUserInfo();

        if (this.userInfo == null) {
            this.appService.logout();
            this.router.navigate(['/login']);
        }
        else {
            this.getDriverReturnedOrders("", "", "", "", "", "");
            this.getDrivers();
        }
    }

    getDrivers() {

        this.digiDeliveryApi.GetDrivers().subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    var dummyDriver = new DriverInfo();
                    dummyDriver.DriverCode = "Select a Driver";
                    dummyDriver.DriverName = "Select a Driver";

                    this.DriversInfo = [dummyDriver].concat(response.Drivers);
                } else {
                    this.messageService.add({severity:'error', summary: 'Driver', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Dashboard', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
            }
        })

    }

    getDriverReturnedOrders(driverCode: string, fromDate: string, toDate: string, soNo: string, deliveryNo: string, DeliveryLocation: string) {
        var req = new GetDriverDeliveredOrdersRequestModel();
        req.DriverCode = driverCode;
        req.FromDate = fromDate;
        req.ToDate = toDate;
        req.SoNo = soNo;
        req.DeliveryNo = deliveryNo;
        req.DeliveryLocation = DeliveryLocation;
        req.Empcode = this.userInfo.UserInfo.EmpCode;

        this.digiDeliveryApi.GetReturnedOrders(req).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.returnedOrders = response.Orders;
                    this.resetReturnedOrders = this.returnedOrders
                    // this.pendingOrdersLoaded = true;
                    // this.noPendingOrders = this.pendingOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Returned for Delivery', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessageReturnedOrders = response.Error.ErrorMessage;
                    // this.pendingOrdersLoaded = true;
                    // this.noPendingOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Returned for Delivery', detail: 'Connection Error', life: 3000});
                this.errorMessageReturnedOrders = 'Connection Error';
                // this.pendingOrdersLoaded = false;
                // this.noPendingOrders = false;
            },
            complete: () => {
                this.ordersLoaded = true;
            }
        })

    }

    openReturnedOrderDetails(order: OrderInfo) {
        this.ref = this.dialogService.open(OrderDetailsModalComponent, {
            data: {
                orderInfo: order,
            },
            header: 'Delivery No#' + order.DeliveryNo,
            width: '70%',
            maximizable: true,
            // contentStyle: {"max-height": "500px", "overflow": "auto"},
            // baseZIndex: 10000
        });

        this.ref.onMaximize.subscribe((value: any) => {
            this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
        });
    }


    filterByDriver() {
        this.tempReturnedOrders = this.resetReturnedOrders;
        this.returnedOrders = this.driverCode != "Select a Driver" ? this.tempReturnedOrders.filter((emp: { DriverID: string; }) => emp.DriverID == this.driverCode) : this.resetReturnedOrders;
    }

    clear() {
        this.filterReturnedOrdersForm.reset();

        this.returnedOrdersLoaded =false;

        this.getDriverReturnedOrders("","","","","", "");

        // this.fromDate = Date.parse(this.fromDate).toString() != "NaN" ? this.fromDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
        // this.toDate = Date.parse(this.toDate).toString() != "NaN" ? this.toDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
    }

    filterReturnedOrders() {
        this.returnedOrdersLoaded = false;
        this.getDriverReturnedOrders(this.driverCode == null ? "" : this.driverCode, this.fromDate, this.toDate, this.SoNo == null ? "" : this.SoNo, this.DeliveryNo == null ? "" : this.DeliveryNo, this.DeliveryLocation == null ? "" : this.DeliveryLocation);
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

}
