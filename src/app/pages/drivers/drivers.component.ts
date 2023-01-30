import { AddDriverModalComponent } from './../../modals/add-driver-modal/add-driver-modal.component';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { UserInfoModel } from './../../models/Common/UserInfoModel';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { apiImage } from './../../../environments/environment'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversComponent implements OnInit {

    products: Product[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    driversLoaded: boolean = false;
    public apiImage = apiImage;

    userInfo!: UserInfoModel;
    errorMessage: string = "";
    drivers: DriverInfo[] = [];

    items!: MenuItem[];
    home!: MenuItem;
    ref!: DynamicDialogRef;

    constructor(
        private productService: ProductService,
        private router: Router,
        private appService: AppService,
        private formBuilder: FormBuilder,
        private digiDeliveryApi: DigiDeliveryApiService,
        public messageService: MessageService,
        public dialogService: DialogService,
        ) { }

    ngOnInit(): void {
        this.items = [
            {label: 'Drivers'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.userInfo = this.appService.getUserInfo().UserInfo;

        this.getDrivers();
        // this.productService.getProducts().then(data => this.products = data);
        // this.driversLoaded = true;
    }

    getDrivers() {

        this.digiDeliveryApi.GetDrivers().subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.drivers = response.Drivers;
                } else {
                    this.messageService.add({severity:'error', summary: 'Drivers', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Drivers', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.driversLoaded = true;
            },
        })
      }

    onFilter(dv: DataView, event: Event) {
        console.log('dv');
        console.log(dv);
        console.log('event');
        console.log((event.target as HTMLInputElement).value);

        dv.filter((event.target as HTMLInputElement).value);
    }

    // driver: DriverInfo
    openDriverDetail(driver: DriverInfo) {
        this.router.navigate(['/driver/details'], {
            state: { driver: driver }
        });
    }

    openAddDriverModal() {

        this.ref = this.dialogService.open(AddDriverModalComponent, {
            data: {
                // salesOrders: salesOrdersResponse,
                ref: this.ref,
            },
            header: 'Create Driver',
            width: '70%',
            maximizable: true,
            // contentStyle: {"max-height": "500px", "overflow": "auto"},
            // baseZIndex: 10000
        });

        this.ref.onClose.subscribe((data) => {
            if (data) {
                this.getDrivers();
                this.messageService.add({severity:'success', summary: 'Add Driver Request', detail: 'Driver Added: '+ data.driverName + ' Password: ' + data.pass, life: 3000});
            }
        });
    }
}
