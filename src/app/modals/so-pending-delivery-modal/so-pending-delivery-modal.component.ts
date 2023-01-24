import { UpdateSalesOrderRequestModel } from './../../requests/GetSalesOrders/UpdateSalesOrderRequestModel';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { SalesOrderInfoDetailModel } from './../../models/SalesOrders/SalesOrderInfoDetailModel';
import { SalesOrderInfoModel } from './../../models/SalesOrders/SalesOrderInfoModel';
import { Component, OnInit } from '@angular/core';
import { OrderInfo } from './../../models/Order/OrderInfo';
import { Product } from 'src/app/demo/api/product';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { apiImage } from './../../../environments/environment'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-so-pending-delivery-modal',
  templateUrl: './so-pending-delivery-modal.component.html',
  styleUrls: ['./so-pending-delivery-modal.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class SoPendingDeliveryModalComponent implements OnInit {

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

    proceedDeliverySaleOrder() {

        if (this.salesOrderForm.valid) {
          this.isSalesOrderInfoEmpty = true;
          this.isSalesOrderInfoLoaded = false;
          this.proceedDeliveryLoaded = true;

          let updateSalesOrderRequestModel = new UpdateSalesOrderRequestModel;
          updateSalesOrderRequestModel = this.orderInfo;
          updateSalesOrderRequestModel.EmpCode = this.loginResp.UserInfo.EmpCode;
          updateSalesOrderRequestModel.OrderDetails = this.selectedOrderDetails;

          this.digiDeliveryApiService.UpdateSalesOrder(updateSalesOrderRequestModel).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.isSalesOrderInfoEmpty = true;
                    this.OrderDetails = [];
                    this.selectedOrderDetails = [];
                    this.messageService.add({severity:'success', summary: 'S.O Pending Delivery Requests', detail: response.Error.ErrorMessage, life: 3000});
                    this.ref.close(true);
                  } else {

                    this.selectedOrderDetails = [];

                    this.errorMessageSalesOrderInfo = response.Error.ErrorMessage;
                    this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: response.Error.ErrorMessage, life: 3000});

                }
            },
            error: (error) => {
                this.selectedOrderDetails = [];
                this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.isSalesOrderInfoLoaded = true;
                this.proceedDeliveryLoaded = false;
            },
          })

        } else {
            this.messageService.add({severity:'error', summary: 'S.O Pending Delivery Requests', detail: 'Please fill Address field', life: 3000});
        }

    }

    selectItem(soi_sys_id: string, event: any) {

        // if (event.target.checked == true) {
        if (event.checked.length >= 1) {

          let selectedItem = this.OrderDetailsResponse.filter(orderDetail => orderDetail.soi_sys_id == soi_sys_id)

          this.selectedOrderDetails.push(selectedItem[0]);

        } else {
          this.selectedOrderDetails = this.selectedOrderDetails.filter(orderDetail => orderDetail.soi_sys_id != soi_sys_id)
        }

        const delivers: FormArray = this.salesOrderForm.get('delivers') as FormArray;

        // if (event.target.checked) {
        if (event.checked.length >= 1) {
        //   delivers.push(new FormControl(event.target.value));
          delivers.push(new FormControl(event.checked[0]));
        } else {
          let i: number = 0;
          delivers.controls.forEach((item: any) => {

            // if (item.value == event.target.value) {
            if (item.value == soi_sys_id) {
              delivers.removeAt(i);
              return;
            }
            i++;
          });
        }

    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.proceedDeliverySaleOrder();
            },
            reject: () => {
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            }
        });
    }

    // proceedDeliveryConfirmation() {

    //     if (this.salesOrders.Address == "NA") {
    //       this.deliveryType = 'personalPickup';
    //     } else {
    //       this.deliveryType = 'address';
    //     }

    //     const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg' , scrollable: true });
    //     modalRef.componentInstance.orderInfo = this.orderInfo;
    //     modalRef.componentInstance.deliveryType = this.deliveryType;
    //     modalRef.componentInstance.address = this.salesOrders.Address;

    //     modalRef.result.then((result) => {
    //       if (result == true) {
    //         this.proceedDeliverySaleOrder();
    //         this.activeModal.close(true);
    //       }
    //     });
    // }

}
