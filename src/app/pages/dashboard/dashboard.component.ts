import { DashboardCounterRequestModel } from './../../requests/Dashboard/DashboardCounterRequestModel';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { DashboardCounterResponseModel } from './../../requests/Dashboard/DashboardCounterResponseModel';
import { DashboardInfo } from './../../models/DashboardInfos';
import { AppService } from './../../utils/services/app.service';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, isEmpty } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
// import {MenuItem} from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    dashboardInfo: DashboardInfo = new DashboardInfo();
    userInfo: LoginResponseModel;
    dashboardCounter!: DashboardCounterResponseModel;
    driversCount: number = 0;
    deliveredOrdersCount: number = 0;
    receivedOrdersCount: number = 0;
    returnedOrdersCount: number = 0;
    pendingOrdersCount: number = 0;
    soRequestDeliveryCount: number = 0;
    pendingSoRequestDeliveryCount: number = 0;
    deliveredSoRequestDeliveryCount: number = 0;

    dashboardCounterLoaded: boolean = false;

    DriversInfo: DriverInfo[] = [];

    driverCode: string = "";

    loading: boolean = false;

    dispatchedOrderNumber!: number;
    requestedOrderNumber!: number;
    // items!: MenuItem[];
    // home!: MenuItem;

    constructor(
        private digiDeliveryApi: DigiDeliveryApiService,
        private router: Router,
        public layoutService: LayoutService,
        private appService: AppService,
        public messageService: MessageService,
        ) {
        var driver = new DriverInfo();
        driver.DriverCode = "Select a Driver";
        driver.DriverName = "Select a Driver";
        this.DriversInfo.push(driver);

        this.userInfo = this.appService.getUserInfo();

        //is Empty
        if (Object.keys(this.userInfo).length === 0) {
          this.appService.logout();
          this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.getDashboardCounter();
    }

    getDashboardCounter(){

        var dashboardCounterRequest = new DashboardCounterRequestModel();
        dashboardCounterRequest.empCode = this.userInfo.UserInfo.EmpCode;

        this.setupCounter();

        this.digiDeliveryApi.GetDashboardCounter(dashboardCounterRequest).subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.dashboardCounter = response;
                    this.dispatchedOrderNumber = parseInt(this.dashboardCounter.dispatchedOrder);
                    this.requestedOrderNumber = parseInt(this.dashboardCounter.dispatchedOrder);

                } else {
                    this.messageService.add({severity:'error', summary: 'Dashboard Counter', detail: response.Error.ErrorMessage, life: 3000});
                }
                this.dashboardCounterLoaded = true;
            },
            error: () => {
                this.messageService.add({severity:'error', summary: 'Dashboard Counter', detail: 'Connection Error', life: 3000});

                this.dashboardCounterLoaded = false;
            },
        });

      }

    setupCounter() {
        this.dashboardCounter = new DashboardCounterResponseModel();
        this.dashboardCounter.deliveredOrdersCount = "0";
        this.dashboardCounter.dispatchedOrder = "0";
        this.dashboardCounter.driversCount = "0";
        this.dashboardCounter.pendingOrdersCount = "0";
        this.dashboardCounter.receivedOrdersCount = "0";
        this.dashboardCounter.returnedOrdersCount = "0";
        this.dashboardCounter.requestedOrder = "0";
    }

    ngOnDestroy() {
    }
}
