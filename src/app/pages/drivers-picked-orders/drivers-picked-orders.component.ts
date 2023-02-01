import { LocationModel } from './../../models/locations/LocationModel';
import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { AppService } from './../../utils/services/app.service';
import { DatePipe } from '@angular/common';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { OrderInfo } from './../../models/Order/OrderInfo';
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
import { LoginResponseModel } from 'src/app/requests/Account/LoginResponseModel';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drivers-picked-orders',
  templateUrl: './drivers-picked-orders.component.html',
  styleUrls: ['./drivers-picked-orders.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversPickedOrdersComponent implements OnInit {

    loading: boolean = false;
    receivedOrders: OrderInfo[] = [];
    receivedOrdersLoaded: boolean = false;
    errorMessageReceivedOrders: string = "";

    userInfo!: LoginResponseModel;
    noReceivedOrders: boolean = false;

    driverInfo!: DriverInfo;

    filterReceivedOrdersForm!: FormGroup;

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
    resetReceivedOrders: any;
    tempReceivedOrders: any;

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
            {label: 'Drivers Picked Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
        // this.productService.getProducts().then(data => this.orders = data);
        // this.ordersLoaded = true;
        this.filterReceivedOrdersForm = this.formBuilder.group({

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
            this.getDriverReceivedOrders("", "", "", "", "", "");
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

    getDriverReceivedOrders(driverCode: string, fromDate: string, toDate: string, soNo: string, deliveryNo: string, DeliveryLocation: string) {

        var req = new GetDriverDeliveredOrdersRequestModel();
        req.DriverCode = driverCode;
        req.FromDate = fromDate;
        req.ToDate = toDate;
        req.SoNo = soNo;
        req.DeliveryNo = deliveryNo;
        req.DeliveryLocation = DeliveryLocation;
        req.Empcode = this.userInfo.UserInfo.EmpCode;

        this.digiDeliveryApi.GetReceivedOrders(req).subscribe({
            next: (response) => {

                if (response.Error.ErrorCode == "200") {
                    this.receivedOrders = response.Orders;
                    this.messageService.add({severity:'success', summary: 'Driver Picked Orders', detail: response.Error.ErrorMessage, life: 3000});
                    // this.receivedOrdersLoaded = true;
                    // this.noReceivedOrders = this.receivedOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Driver Picked Orders', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessageReceivedOrders = response.Error.ErrorMessage;
                    // this.receivedOrdersLoaded = true;
                    // this.noReceivedOrders = false;
                }

            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Driver Picked Orders', detail: 'Connection Error', life: 3000});
                this.errorMessageReceivedOrders = 'Connection Error';
                // this.receivedOrdersLoaded = false;
                // this.noReceivedOrders = false;
            },
            complete: () => {
                this.ordersLoaded = true;
            },
        });

    }

    openReceivedOrderDetails(order: OrderInfo) {
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

        // this.ref.onMaximize.subscribe((value: any) => {
        //     this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
        // });
    }

    filterByDriver() {
        this.tempReceivedOrders = this.resetReceivedOrders;
        this.receivedOrders = this.driverCode != "Select a Driver" ? this.tempReceivedOrders.filter((emp: { DriverID: string; }) => emp.DriverID == this.driverCode) : this.resetReceivedOrders;
    }

    clear() {
        this.filterReceivedOrdersForm.reset();

        this.receivedOrdersLoaded =false;

        this.getDriverReceivedOrders("","","","","", "");

        // this.fromDate = Date.parse(this.fromDate).toString() != "NaN" ? this.fromDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
        // this.toDate = Date.parse(this.toDate).toString() != "NaN" ? this.toDate : this.datePipe.transform(this.today, "yyyy-MM-dd").toString();
    }

    filterReceivedOrders() {
        this.receivedOrdersLoaded = false;
        this.getDriverReceivedOrders(this.driverCode == null ? "" : this.driverCode, this.fromDate, this.toDate, this.SoNo == null ? "" : this.SoNo, this.DeliveryNo == null ? "" : this.DeliveryNo, this.DeliveryLocation == null ? "" : this.DeliveryLocation);
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
