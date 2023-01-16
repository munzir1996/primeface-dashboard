import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { OrderInfo } from './../../models/Order/OrderInfo';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { DriverInfo } from './../../models/GetDrivers/DriverInfo';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-drivers-pending-orders',
  templateUrl: './drivers-pending-orders.component.html',
  styleUrls: ['./drivers-pending-orders.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversPendingOrdersComponent implements OnInit {

    driverInfo!: DriverInfo;
    loading: boolean = false;

    userInfo!: LoginResponseModel; resetPendingOrders: any;
    tempPendingOrders!: any;
    permissionDenied: boolean = false;
    pendingOrders: OrderInfo[] = [];
    noPendingOrders: boolean = false;
    pendingOrdersLoaded: boolean = false;
    errorMessagePendingOrders: string = "";


    filterPendingOrdersForm!: FormGroup;

    DriversInfo: DriverInfo[] = [];

    driverCode: string = "";
    DeliveryLocation: string = "";
    DeliveryNo: string = "";
    SoNo: string = "";
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
            {label: 'Drivers Pending Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
        // this.productService.getProducts().then(data => this.orders = data);
        // this.ordersLoaded = true;
        this.filterPendingOrdersForm = this.formBuilder.group({

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

            if (this.userInfo.UserInfo.EmpType == "SALES") {
              this.permissionDenied = true;
            }
            else {
              this.getDrivers();
              this.getDriverPendingOrders("", "", "", "", "", "");
            }
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

    getDriverPendingOrders(driverCode: string, fromDate: string, toDate: string, soNo: string, deliveryNo: string, DeliveryLocation: string) {
        var req = new GetDriverDeliveredOrdersRequestModel();
        req.DriverCode = driverCode;
        req.FromDate = fromDate;
        req.ToDate = toDate;
        req.SoNo = soNo;
        req.DeliveryNo = deliveryNo;
        req.DeliveryLocation = DeliveryLocation;
        req.Empcode = this.userInfo.UserInfo.EmpCode;

        this.digiDeliveryApi.GetPendingOrders(req).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.pendingOrders = response.Orders;
                    this.resetPendingOrders = this.pendingOrders
                    // this.pendingOrdersLoaded = true;
                    // this.noPendingOrders = this.pendingOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Pending for Delivery', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessagePendingOrders = response.Error.ErrorMessage;
                    // this.pendingOrdersLoaded = true;
                    // this.noPendingOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Pending for Delivery', detail: 'Connection Error', life: 3000});
                this.errorMessagePendingOrders = 'Connection Error';
                // this.pendingOrdersLoaded = false;
                // this.noPendingOrders = false;
            },
            complete: () => {
                this.ordersLoaded = true;
            }
        })

    }

    openPendingOrderDetails(order: OrderInfo) {

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
        // const modalRef = this.modalService.open(OrderDetailsModalComponent, { size: 'xl', scrollable: true });
        // modalRef.componentInstance.orderInfo = order;
    }

    filterByDriver() {
        this.tempPendingOrders = this.resetPendingOrders;
        this.pendingOrders = this.driverCode != "Select a Driver" ? this.tempPendingOrders.filter((emp: { DriverID: string; }) => emp.DriverID == this.driverCode) : this.resetPendingOrders;
    }

    clear() {
        this.filterPendingOrdersForm.reset();

        this.pendingOrdersLoaded = false;
        this.getDriverPendingOrders("", "", "", "", "", "");

        // this.fromDate = Date.parse(this.fromDate).toString() != "NaN" ? this.fromDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
        // this.toDate = Date.parse(this.toDate).toString() != "NaN" ? this.toDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
    }

    filterPendingOrders() {
        this.pendingOrdersLoaded = false;

        this.getDriverPendingOrders(this.driverCode == null ? "" : this.driverCode, this.fromDate, this.toDate, this.SoNo == null ? "" : this.SoNo, this.DeliveryNo == null ? "" : this.DeliveryNo, this.DeliveryLocation == null ? "" : this.DeliveryLocation);

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
