import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';
import { GetOrderBySoNoResponseModel } from './../requests/GetOrderBySoNo/GetOrderBySoNoResponseModel';
import { GetOrderBySoNoRequestModel } from './../requests/GetOrderBySoNo/GetOrderBySoNoRequestModel';
import { LoginResponseModel } from './../requests/Account/LoginResponseModel';
import { AppService } from './../utils/services/app.service';
import { DigiDeliveryApiService } from './../utils/services/digi-delivery-api.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [DialogService, MessageService]
})
export class AppTopBarComponent {

    items!: MenuItem[];
    public searchForm!: FormGroup;
    userInfo!: LoginResponseModel;
    orderInfo!: GetOrderBySoNoResponseModel;
    soNoLoaded: boolean = true;
    errorMessageSoNo!: string;
    ref!: DynamicDialogRef;
    visibleSidebar3!: boolean;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private digiDeliveryApi: DigiDeliveryApiService,
        private appService: AppService,
        public messageService: MessageService,
        public dialogService: DialogService,
        ) { }

    ngOnInit() {

        this.userInfo = this.appService.getUserInfo();

        this.searchForm = new FormGroup({
            search: new FormControl('', Validators.required),
        });

    }

    logout() {
        this.appService.logout();
    }

    searchSoNumber() {
        if (this.searchForm.valid) {

            this.soNoLoaded = false;

            var getOrderBySoNoRequest = new GetOrderBySoNoRequestModel();
            getOrderBySoNoRequest.soNo = this.searchForm.get('search')!.value;
            getOrderBySoNoRequest.empCode = this.userInfo.UserInfo.EmpCode;

            this.digiDeliveryApi.GetOrderBySoNo(getOrderBySoNoRequest).subscribe({
                next: (response) => {
                    if (response.Error.ErrorCode == "200") {

                        this.orderInfo = response;

                        this.ref = this.dialogService.open(OrderDetailsModalComponent, {
                            data: {
                                orderInfo: this.orderInfo.orderInfo,
                            },
                            header: 'Delivery No#' + this.orderInfo.orderInfo.DeliveryNo,
                            width: '70%',
                            maximizable: true,
                            // contentStyle: {"max-height": "500px", "overflow": "auto"},
                            // baseZIndex: 10000
                        });

                        this.ref.onMaximize.subscribe((value: any) => {
                            this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
                        });

                    } else {
                        this.messageService.add({severity:'error', summary: 'Search S.O Number', detail: response.Error.ErrorMessage, life: 3000});
                        this.errorMessageSoNo = response.Error.ErrorMessage;
                    }
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Search S.O Number', detail: 'Connection Error', life: 3000});
                    this.errorMessageSoNo = 'Search S.O Number';
                },
                complete: () => {
                    this.soNoLoaded = true;
                },
            })

        } else {
            this.messageService.add({severity:'error', summary: 'Search S.O Number', detail: 'Please fill All Fields', life: 3000});
        }

    }
}
