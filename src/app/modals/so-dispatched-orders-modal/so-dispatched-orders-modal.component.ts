import { UpdateSalesOrderRequestModel } from './../../requests/GetSalesOrders/UpdateSalesOrderRequestModel';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { SalesOrderInfoDetailModel } from './../../models/SalesOrders/SalesOrderInfoDetailModel';
import { SalesOrderInfoModel } from './../../models/SalesOrders/SalesOrderInfoModel';
import { Component, OnInit } from '@angular/core';
import { OrderInfo } from './../../models/Order/OrderInfo';
// import { Product } from 'src/app/demo/api/product';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { apiImage } from './../../../environments/environment'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-so-dispatched-orders-modal',
  templateUrl: './so-dispatched-orders-modal.component.html',
  styleUrls: ['./so-dispatched-orders-modal.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class SoDispatchedOrdersModalComponent implements OnInit {

    salesOrderForm!: FormGroup;
    selectedOrderDetails: SalesOrderInfoDetailModel[] = [];
    orderInfo!: SalesOrderInfoModel;
    OrderDetailsResponse!: SalesOrderInfoDetailModel[];
    OrderDetails!: SalesOrderInfoDetailModel[];
    salesOrdersObject!: SalesOrderInfoModel;
    closeResult!: string;
    isSalesOrderInfoEmpty!: boolean;
    isSalesOrderInfoLoaded!: boolean;
    errorMessageSalesOrderInfo!: string;
    loginResp!: LoginResponseModel;
    deliveryType!: string;
    selectedSoiSysId!: boolean;
    proceedDeliveryLoaded!: boolean;
    //
    salesOrders!: SalesOrderInfoModel;
    public apiImage = apiImage;

    constructor(
        public dialogService: DialogService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public formBuilder: FormBuilder,
        public digiDeliveryApiService: DigiDeliveryApiService,
        private appService: AppService,
        public messageService: MessageService,
        public confirmationService: ConfirmationService
    ) {
        this.salesOrderForm = this.formBuilder.group({
            delivers: this.formBuilder.array([], [Validators.required]),
        });
        this.loginResp = this.appService.getUserInfo();
     }

    ngOnInit(): void {

        this.salesOrders = this.config.data.salesOrders

        this.orderInfo = this.salesOrders;
        this.OrderDetailsResponse = this.salesOrders.OrderDetails;
        this.OrderDetails = this.salesOrders.OrderDetails;

    }

}
