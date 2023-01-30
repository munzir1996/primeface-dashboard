import { AddSalesOrderRequestModel } from './../../requests/GetSalesOrders/AddSalesOrderRequestModel';
import { GetSalesOrderBySoNoRequestModel } from './../../requests/GetSalesOrders/GetSalesOrderBySoNoRequestModel';
import { CityModel } from './../../models/City/CityModel';
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
import { GetCitiesResponseModel } from 'src/app/requests/GetCities/GetCitiesResponseModel';

@Component({
  selector: 'app-so-request-delivery-modal',
  templateUrl: './so-request-delivery-modal.component.html',
  styleUrls: ['./so-request-delivery-modal.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class SoRequestDeliveryModalComponent implements OnInit {

    sonoLoaded: boolean = false;

    salesOrderSoNoForm: FormGroup;
    salesOrderForm!: FormGroup;
    selectedOrderDetails: SalesOrderInfoDetailModel[] = [];
    orderInfo!: Partial<SalesOrderInfoModel>;
    OrderDetailsResponse!: SalesOrderInfoDetailModel[];
    OrderDetails!: SalesOrderInfoDetailModel[];
    closeResult!: string;
    isSalesOrderInfoEmpty: boolean = true;
    isSalesOrderInfoLoaded!: boolean;
    isCitiesLoaded!: boolean;
    errorMessageSalesOrderInfo!: string;
    errorMessageCities!: string;
    loginResp!: LoginResponseModel;
    CitiesResponse!: GetCitiesResponseModel;
    address!: string;
    deliveryType!: string;
    city!: CityModel[];
    selectedSoiSysId!: boolean;
    proceedDeliveryLoaded!: boolean;

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
        this.salesOrderSoNoForm = new FormGroup({
            sono: new FormControl(null, Validators.required),
        });

        this.salesOrderForm = this.formBuilder.group({
            deliveryType: new FormControl(null, Validators.required),
            city: new FormControl(null, Validators.required),
            address: new FormControl(null),
            delivers: this.formBuilder.array([], [Validators.required]),
            comment: new FormControl(null),
        });
    }

    ngOnInit(): void {
        this.loginResp = this.appService.getUserInfo();
    }

    getSalesOrderBySoNo() {

        if (this.salesOrderSoNoForm.valid) {
          this.isSalesOrderInfoLoaded = false;
          this.sonoLoaded = true;

          let getSalesOrderBySoNoRequest = new GetSalesOrderBySoNoRequestModel
          getSalesOrderBySoNoRequest.SoNo = this.salesOrderSoNoForm.get('sono')!.value;

          this.digiDeliveryApiService.GetSalesOrderBySoNo(getSalesOrderBySoNoRequest).subscribe({
            next: async (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.orderInfo = response.orderInfo;
                    this.OrderDetailsResponse = response.orderInfo.OrderDetails;
                    this.OrderDetails = response.orderInfo.OrderDetails;

                    delete this.orderInfo['OrderDetails'];

                    await this.getCities();

                    this.isSalesOrderInfoEmpty = false;
                    this.messageService.add({severity:'success', summary: 'Get Sale Order', detail: response.Error.ErrorMessage, life: 3000});

                } else {
                    this.messageService.add({severity:'error', summary: 'Get Sale Order', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: () => {
                this.messageService.add({severity:'error', summary: 'Get Sale Order', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.isSalesOrderInfoLoaded = true;
                this.sonoLoaded = false;
            },
          })

        } else {
            this.messageService.add({severity:'error', summary: 'Add Sale Order', detail: 'Please fill So.No field', life: 3000});
        }

    }

    getCities() {

        this.digiDeliveryApiService.GetCities().subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.CitiesResponse = response;

                } else {
                    this.messageService.add({severity:'error', summary: 'Get Cities', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Get Cities', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.isCitiesLoaded = true;
            },
        })

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

    async addSalesOrder() {

        if (this.salesOrderForm.valid) {
            this.isSalesOrderInfoEmpty = true;
            this.isSalesOrderInfoLoaded = false;
            this.proceedDeliveryLoaded = true;

            let addSalesOrderRequest = new AddSalesOrderRequestModel;
            addSalesOrderRequest.SalesOrderInfo = this.orderInfo
            addSalesOrderRequest.SalesOrderInfo.CityNo = parseInt(this.salesOrderForm.get('city')!.value)
            addSalesOrderRequest.SalesOrderInfoDetails = this.selectedOrderDetails;
            addSalesOrderRequest.EmpCode = this.loginResp.UserInfo.EmpCode;
            addSalesOrderRequest.Comment = this.salesOrderForm.get('comment')!.value;

            if (this.salesOrderForm.get('deliveryType')!.value == 'address') {
                addSalesOrderRequest.SalesOrderInfo.Address = this.salesOrderForm.get('address')!.value;
            } else {
                addSalesOrderRequest.SalesOrderInfo.Address = 'NA';
            }

            this.digiDeliveryApiService.AddSalesOrder(addSalesOrderRequest).subscribe({
                next: (response) => {
                    if (response.Error.ErrorCode == "200") {

                        this.isSalesOrderInfoEmpty = true;

                        this.messageService.add({severity:'success', summary: 'Add Sale Order Delivery Request', detail: 'Request Delivery Sended', life: 3000});

                        this.selectedOrderDetails = [];
                        // this.salesOrderSoNoForm.reset();
                        // this.salesOrderForm.reset();

                    } else {

                        this.selectedOrderDetails = [];
                        this.messageService.add({severity:'error', summary: 'Add Sale Order Delivery Request', detail: response.Error.ErrorMessage, life: 3000});

                        this.errorMessageSalesOrderInfo = response.Error.ErrorMessage;
                    }
                },
                error: (error) => {
                    this.selectedOrderDetails = [];
                    this.messageService.add({severity:'error', summary: 'Add Sale Order Delivery Request', detail: 'Connection Error', life: 3000});
                },
                complete: () => {
                    this.isSalesOrderInfoLoaded = true;
                    this.proceedDeliveryLoaded = false;
                    this.salesOrderSoNoForm.reset();
                    this.salesOrderForm.reset();
                }
            })
        } else {
            this.messageService.add({severity:'error', summary: 'Add Sale Order Delivery Request', detail: 'Please fill Address field', life: 3000});
        }

    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target!,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.addSalesOrder();
            },
            reject: () => {
                this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
            }
        });
    }

}
