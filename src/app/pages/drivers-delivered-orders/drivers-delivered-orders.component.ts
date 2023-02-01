import { LocationModel } from './../../models/locations/LocationModel';
import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { DatePipe } from '@angular/common';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { LoginResponseModel } from 'src/app/requests/Account/LoginResponseModel';
import { OrderInfo } from './../../models/Order/OrderInfo';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
// import { Product } from 'src/app/demo/api/product';
// import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { SelectItem, PrimeNGConfig} from 'primeng/api';
import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-drivers-delivered-orders',
  templateUrl: './drivers-delivered-orders.component.html',
  styleUrls: ['./drivers-delivered-orders.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversDeliveredOrdersComponent implements OnInit {

    driverInfo!: DriverInfo;
    loading: boolean = false;
    receivedOrders: OrderInfo[] = [];
    receivedOrdersLoaded: boolean = false;
    deliveredOrdersLoaded: boolean = false;
    deliveredOrders: OrderInfo[] = [];
    tempDeliveredOrders: OrderInfo[] = [];
    resetDeliveredOrders: OrderInfo[] = [];

    userInfo!: LoginResponseModel;
    noDeliveredOrders: boolean = false;
    noReceivedOrders: boolean = false;
    errorMessageReceivedOrders: string = "";
    errorMessageDeliveredOrders: string = "";
    pendingOrders: OrderInfo[] = [];
    noPendingOrders: boolean = false;
    pendingOrdersLoaded: boolean = false;
    errorMessagePendingOrders: string = "";

    filterDeliveredOrdersForm!: FormGroup;

    DriversInfo: DriverInfo[] = [];

    driverCode: string = "";
    DeliveryNo: string = "";
    SoNo: string = "";
    DeliveryLocation: string = "";
    fromDate: string = "";
    toDate: string = "";

    showHideFilterText: string = "Show Filter";
    showHideFilterIcon: string = "ion-arrow-expand";
    filterFlag: boolean = false;
    today = new Date(Date.now());
    //
    items!: MenuItem[];
    home!: MenuItem;
    sortOrder: number = 0;
    sortField: string = '';
    ordersLoaded: boolean = false;
    locations!: LocationModel[];

    ref!: DynamicDialogRef;

    constructor(
        // private productService: ProductService,
        private primengConfig: PrimeNGConfig,
        public dialogService: DialogService,
        public messageService: MessageService,
        private router: Router,
        private digiDeliveryApi: DigiDeliveryApiService,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private datePipe: DatePipe
    ) {
        this.locations = [
            {name: 'KN3', code: '01KN3'},
            {name: 'KNON', code: '01KNON'},
        ];
    }

    ngOnInit(): void {
        this.items = [
            {label: 'Drivers Delivered Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.filterDeliveredOrdersForm = this.formBuilder.group({

            SoNo: [
              ""
            ],
            DeliveryNo: [
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
            this.getDriverDeliveredOrders("", "", "", "", "", "");
            this.getDrivers();
        }
        // this.productService.getProducts().then(data => this.orders = data);
        // this.ordersLoaded = true;
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

    getDriverDeliveredOrders(driverCode: string, fromDate: string, toDate: string, soNo: string, deliveryNo: string, DeliveryLocation: string) {
        var req = new GetDriverDeliveredOrdersRequestModel();
        req.DriverCode = driverCode;
        req.FromDate = fromDate;
        req.ToDate = toDate;
        req.SoNo = soNo;
        req.DeliveryNo = deliveryNo;
        req.DeliveryLocation = DeliveryLocation;
        req.Empcode = this.userInfo.UserInfo.EmpCode;

        this.digiDeliveryApi.GetDeliveredOrders(req).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.deliveredOrders = response.Orders;
                    this.messageService.add({severity:'success', summary: 'Driver Delivered Orders', detail: response.Error.ErrorMessage, life: 3000});
                    // this.deliveredOrdersLoaded = true;
                    // this.noDeliveredOrders = this.deliveredOrders.length > 0 ? true : false;

                } else {
                    this.messageService.add({severity:'error', summary: 'Driver Delivered Orders', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessageDeliveredOrders = response.Error.ErrorMessage;
                    // this.deliveredOrdersLoaded = true;
                    // this.noDeliveredOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'river Details Delivered Orders', detail: 'Connection Error', life: 3000});

                this.errorMessageDeliveredOrders = 'Driver Details Delivered Orders';
                // this.deliveredOrdersLoaded = true;
                // this.noDeliveredOrders = false;
            },
            complete: () => {
                this.ordersLoaded = true;
            }
        });

    }

    openDeliveredOrderDetails(order: OrderInfo) {
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

    }

    filterByDriver() {
        this.tempDeliveredOrders = this.resetDeliveredOrders;
        this.deliveredOrders = this.driverCode != "Select a Driver" ? this.tempDeliveredOrders.filter(emp => emp.DriverID == this.driverCode) : this.resetDeliveredOrders;
    }

    clear() {
        this.filterDeliveredOrdersForm.reset();

        this.deliveredOrdersLoaded = false;
        this.getDriverDeliveredOrders("", "", "", "", "", "");

        // this.fromDate = Date.parse(this.fromDate).toString() != "NaN" ? this.fromDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
        // this.toDate = Date.parse(this.toDate).toString() != "NaN" ? this.toDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
    }

    filterDeliveredOrders() {
        this.deliveredOrdersLoaded = false;
        this.getDriverDeliveredOrders(this.driverCode == null ? "" : this.driverCode, this.fromDate, this.toDate, this.SoNo == null ? "" : this.SoNo, this.DeliveryNo == null ? "" : this.DeliveryNo, this.DeliveryLocation == null ? "" : this.DeliveryLocation);
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
