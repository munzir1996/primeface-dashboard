import { LocationModel } from './../../models/locations/LocationModel';
import { EditDriverRequestModel } from './../../requests/EditDriver/EditDriverRequestModel';
import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { AppService } from './../../utils/services/app.service';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { OrderInfo } from './../../models/Order/OrderInfo';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { SelectItem, PrimeNGConfig} from 'primeng/api';
// import { Product } from 'src/app/demo/api/product';
// import { ProductService } from 'src/app/demo/service/product.service';
import { DataView } from 'primeng/dataview';
import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriverDetailsComponent implements OnInit {

    // selectedValue: string = "";
    driverInfo!: DriverInfo;
    loading: boolean = false;
    receivedOrders: OrderInfo[] = [];
    receivedOrdersLoaded: boolean = false;
    deliveredOrdersLoaded: boolean = false;
    deliveredOrders: OrderInfo[] = [];

    userInfo!: LoginResponseModel;
    noDeliveredOrders: boolean = false;
    noReceivedOrders: boolean = false;
    errorMessageReceivedOrders: string = "";
    errorMessageDeliveredOrders: string = "";
    pendingOrders: OrderInfo[] = [];
    noPendingOrders: boolean = false;
    pendingOrdersLoaded: boolean = false;
    errorMessagePendingOrders: string = "";

    showHideFilterText: string = "Show Filter";
    showHideFilterIcon: string = "ion-arrow-expand";
    filterFlag: boolean = false;
    today = new Date(Date.now());

    filterPendingOrdersForm!: FormGroup;
    pendingDriverCode: string = "";
    pendingDeliveryLocation: string = "";
    pendingDeliveryNo: string = "";
    pendingSoNo: string = "";
    pendingFromDate: string = "";
    pendingToDate: string = "";

    filterReceivedOrdersForm!: FormGroup;
    receivedDriverCode: string = "";
    receivedDeliveryLocation: string = "";
    receivedDeliveryNo: string = "";
    receivedSoNo: string = "";
    receivedFromDate: string = "";
    receivedToDate: string = "";

    filterDeliveredOrdersForm!: FormGroup;
    deliveredDriverCode: string = "";
    deliveredDeliveryLocation: string = "";
    deliveredDeliveryNo: string = "";
    deliveredSoNo: string = "";
    deliveredFromDate: string = "";
    deliveredToDate: string = "";

    driverForm!: FormGroup;

    isEdit: boolean = false;

    ////////////////
    sortOrder: number = 0;
    sortField: string = '';
    ordersLoaded: boolean = false;
    isInfo: boolean = true;
    infoOptions: any[];
    ref!: DynamicDialogRef;
    items!: MenuItem[];
    home!: MenuItem;
    locations!: LocationModel[];

    constructor(
        // private productService: ProductService,
        private primengConfig: PrimeNGConfig,
        public dialogService: DialogService,
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private digiDeliveryApi: DigiDeliveryApiService,
        private router: Router,
        ) {
        this.primengConfig.ripple = true;
        this.infoOptions = [
            { label: 'Info', value: true },
            { label: 'Edit', value: false },
        ];

        this.locations = [
            {name: 'KN3', code: '01KN3'},
            {name: 'KNON', code: '01KNON'},
        ];

        if (this.router.getCurrentNavigation()!.extras != null) {
            this.driverInfo = this.router.getCurrentNavigation()?.extras?.state?.['driver'];
        }
        else {
            router.navigate(['/drivers']);
        }
    }

    ngOnInit(): void {
        this.items = [
            {label: 'Drivers', routerLink: '/drivers'},
            {label: 'Driver Details'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.driverForm = this.formBuilder.group({
            newDriverCode: new FormControl('', Validators.required),
            newEmpCode: new FormControl('', Validators.required),
            driverName: new FormControl('', Validators.required),
            driverNameAr: new FormControl('', Validators.required),
            telNo: new FormControl('', Validators.required),
            isActive: new FormControl(this.driverInfo.IsActive, Validators.required),
        });

        this.filterPendingOrdersForm = this.formBuilder.group({

        pendingDeliveryNo: [
            ""
        ],
        pendingSoNo: [
            ""
        ],
        // DriverCode: [
        //   ""
        // ],
        pendingFromDate: [
            ""
        ],
        pendingToDate: [
            ""
        ],
        pendingDeliveryLocation: [
            ""
        ]
        });
        this.filterReceivedOrdersForm = this.formBuilder.group({

        receivedDeliveryNo: [
            ""
        ],
        receivedSoNo: [
            ""
        ],
        // DriverCode: [
        //   ""
        // ],
        receivedFromDate: [
            ""
        ],
        receivedToDate: [
            ""
        ],
        receivedDeliveryLocation: [
            ""
        ]

        });
        this.filterDeliveredOrdersForm = this.formBuilder.group({

        deliveredSoNo: [
            ""
        ],
        deliveredDeliveryNo: [
            ""
        ],
        // DriverCode: [
        //   ""
        // ],
        deliveredFromDate: [
            ""
        ],
        deliveredToDate: [
            ""
        ],
        deliveredDeliveryLocation: [
            ""
        ]
        });

        this.userInfo = this.appService.getUserInfo();

        if (this.userInfo == null) {
            this.appService.logout();
            this.router.navigate(['/login']);
        }
        else {
            this.getDriverPendingOrders(this.driverInfo.DriverCode, this.pendingFromDate, this.pendingToDate, this.pendingSoNo == null ? "" : this.pendingSoNo, this.pendingDeliveryNo == null ? "" : this.pendingDeliveryNo, this.pendingDeliveryLocation == null ? "" : this.pendingDeliveryLocation);
            this.getDriverReceivedOrders(this.driverInfo.DriverCode, this.receivedFromDate, this.receivedToDate, this.receivedSoNo == null ? "" : this.receivedSoNo, this.receivedDeliveryNo == null ? "" : this.receivedDeliveryNo, this.receivedDeliveryLocation == null ? "" : this.receivedDeliveryLocation);
            this.getDriverDeliveredOrders(this.driverInfo.DriverCode, this.deliveredFromDate, this.deliveredToDate, this.deliveredSoNo == null ? "" : this.deliveredSoNo, this.deliveredDeliveryNo == null ? "" : this.deliveredDeliveryNo, this.deliveredDeliveryLocation == null ? "" : this.deliveredDeliveryLocation);
        }
    }

    filterPendingOrders() {
        this.pendingOrdersLoaded = false;

        this.getDriverPendingOrders(this.driverInfo.DriverCode, this.pendingFromDate, this.pendingToDate, this.pendingSoNo == null ? "" : this.pendingSoNo, this.pendingDeliveryNo == null ? "" : this.pendingDeliveryNo, this.pendingDeliveryLocation == null ? "" : this.pendingDeliveryLocation);
    }

    filterReceivedOrders() {
        this.receivedOrdersLoaded = false;
        this.getDriverReceivedOrders(this.driverInfo.DriverCode, this.receivedFromDate, this.receivedToDate, this.receivedSoNo == null ? "" : this.receivedSoNo, this.receivedDeliveryNo == null ? "" : this.receivedDeliveryNo, this.receivedDeliveryLocation == null ? "" : this.receivedDeliveryLocation);
    }

    filterDeliveredOrders() {
        this.deliveredOrdersLoaded = false;
        this.getDriverDeliveredOrders(this.driverInfo.DriverCode, this.deliveredFromDate, this.deliveredToDate, this.deliveredSoNo == null ? "" : this.deliveredSoNo, this.deliveredDeliveryNo == null ? "" : this.deliveredDeliveryNo, this.deliveredDeliveryLocation == null ? "" : this.deliveredDeliveryLocation);
    }

    clearFilterPendingOrders() {
        this.filterPendingOrdersForm.reset();

        this.pendingOrdersLoaded = false;
        this.getDriverPendingOrders("", "", "", "", "", "");

    }

    clearFilterReceivedOrders() {
        this.filterReceivedOrdersForm.reset();

        this.receivedOrdersLoaded =false;

        this.getDriverReceivedOrders("","","","","", "");
    }

    clearFilterDeliveredOrders() {
        this.filterDeliveredOrdersForm.reset();

        this.deliveredOrdersLoaded = false;
        this.getDriverDeliveredOrders("", "", "", "", "", "");
    }

    getDriverDeliveredOrders(driverCode: string, fromDate: string, toDate: string, soNo: string, deliveryNo: string, DeliveryLocation: string) {
        var req = new GetDriverDeliveredOrdersRequestModel();
        req.DriverCode = driverCode;
        req.FromDate = fromDate;
        req.ToDate = toDate;
        req.SoNo = soNo;
        req.DeliveryNo = deliveryNo;
        req.DeliveryLocation = DeliveryLocation;

        this.digiDeliveryApi.GetDeliveredOrders(req).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.deliveredOrders = response.Orders;
                    this.deliveredOrdersLoaded = true;
                    this.noDeliveredOrders = this.deliveredOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Driver Delivered Orders', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessageDeliveredOrders = response.Error.ErrorMessage;
                    this.deliveredOrdersLoaded = true;
                    this.noDeliveredOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Driver Details Delivered Orders', detail: 'Connection Error', life: 3000});
                this.errorMessageDeliveredOrders = 'Driver Details Delivered Orders';
                this.deliveredOrdersLoaded = true;
                this.noDeliveredOrders = false;
            },
            complete: () => {
            },
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
                    this.receivedOrdersLoaded = true;
                    this.noReceivedOrders = this.receivedOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Driver Details Picked Orders', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessageReceivedOrders = response.Error.ErrorMessage;
                    this.receivedOrdersLoaded = true;
                    this.noReceivedOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Driver Details Picked Orders', detail: 'Connection Error', life: 3000});
                this.errorMessageReceivedOrders = 'Connection Error';
                this.receivedOrdersLoaded = false;
                this.noReceivedOrders = false;
            },
            complete: () => {
            },
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

        this.digiDeliveryApi.GetPendingOrders(req).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.pendingOrders = response.Orders;
                    this.pendingOrdersLoaded = true;
                    this.noPendingOrders = this.pendingOrders.length > 0 ? true : false;
                } else {
                    this.messageService.add({severity:'error', summary: 'Driver Details Pending Orders', detail: response.Error.ErrorMessage, life: 3000});
                    this.errorMessagePendingOrders = response.Error.ErrorMessage;
                    this.pendingOrdersLoaded = true;
                    this.noPendingOrders = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Driver Details Pending Orders', detail: 'Connection Error', life: 3000});
                this.errorMessagePendingOrders = 'Connection Error';
                this.pendingOrdersLoaded = false;
                this.noPendingOrders = false;
            },
            complete: () => {
            },
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
            // this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
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

        this.ref.onMaximize.subscribe((value: any) => {
            // this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
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

        this.ref.onMaximize.subscribe((value: any) => {
            // this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    async editDriver(empCode: string, driverCode: string) {

        if (this.driverForm.valid) {

          this.loading = true;

          let editDriverRequestModel = new EditDriverRequestModel;
          editDriverRequestModel.newDriverCode = this.driverForm.get('newDriverCode')!.value;
          editDriverRequestModel.driverCode = driverCode;
          editDriverRequestModel.newEmpCode = this.driverForm.get('newEmpCode')!.value;
          editDriverRequestModel.empCode = empCode;
          editDriverRequestModel.driverName = this.driverForm.get('driverName')!.value;
          editDriverRequestModel.driverNameAr = this.driverForm.get('driverNameAr')!.value;
          editDriverRequestModel.telNo = this.driverForm.get('telNo')!.value;
          editDriverRequestModel.isActive = this.driverForm.get('isActive')!.value;

          this.digiDeliveryApi.EditDriver(editDriverRequestModel).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.driverInfo.DriverCode = response.driverCode;
                    this.driverInfo.EmpCode = response.empCode;
                    this.driverInfo.DriverName = response.driverName;
                    this.driverInfo.DriverNameAr = response.driverNameAr;
                    this.driverInfo.DriverTelNo = response.telNo;
                    this.driverInfo.IsActive = response.isActive;

                    this.messageService.add({severity:'success', summary: 'Edit Driver Request', detail: 'Driver Edited:'+ response.driverName, life: 3000});
                    // this.driverForm.reset();
                } else {

                    this.messageService.add({severity:'error', summary: 'Edit Driver Request', detail: response.Error.ErrorMessage, life: 3000});
                    // this.errorMessageAddDriver = response.Error.ErrorMessage;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Edit Driver Request', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.loading = false;
            },
        });
        } else {
            this.messageService.add({severity:'error', summary: 'Edit Driver Request', detail: 'Please fill All Fields', life: 3000});
        }

    }

}
