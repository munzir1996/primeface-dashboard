import { LoginResponseModel } from 'src/app/requests/Account/LoginResponseModel';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppService } from '../utils/services/app.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userInfo: LoginResponseModel;

    constructor(
        public layoutService: LayoutService,
        private appService: AppService,
        ) {
        this.userInfo = this.appService.getUserInfo();
     }

    ngOnInit() {
        if (this.userInfo.UserInfo.EmpDepartment == 'SC') {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Features',
                    items: [
                        { label: 'Drivers', icon: 'pi pi-fw pi-user', routerLink: ['/drivers'] },
                        { label: 'Drivers Pending Orders', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/drivers/pending/orders'] },
                        { label: 'Drivers Picked Orders', icon: 'pi pi-fw pi-cart-plus', routerLink: ['/drivers/picked/orders'] },
                        { label: 'Drivers Delivered Orders', icon: 'pi pi-fw pi-map-marker', routerLink: ['/drivers/delivered/orders'] },
                        { label: 'Drivers Returned Orders', icon: 'pi pi-fw pi-sync', routerLink: ['/drivers/returned/orders'] },
                        { label: 'S.O Pending Delivery Requests', icon: 'pi pi-fw pi-inbox', routerLink: ['/sopending/pending/delivery/requests'] },
                        { label: 'S.O Dispatched Orders', icon: 'pi pi-fw pi-truck', routerLink: ['/sodispatched/orders'] },
                        { label: 'Heat Map', icon: 'pi pi-fw pi-compass', routerLink: ['/orders/heatmap'] },
                    ]
                },
            ];
        } else if (this.userInfo.UserInfo.EmpDepartment ==  'SALES') {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Features',
                    items: [
                        { label: 'Drivers Picked Orders', icon: 'pi pi-fw pi-cart-plus', routerLink: ['/drivers/picked/orders'] },
                        { label: 'Drivers Delivered Orders', icon: 'pi pi-fw pi-map-marker', routerLink: ['/drivers/delivered/orders'] },
                        { label: 'Drivers Returned Orders', icon: 'pi pi-fw pi-sync', routerLink: ['/drivers/returned/orders'] },
                        { label: 'S.O Request Delivery', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/sorequest/delivery'] },
                    ]
                },
            ];
        }
    }
}
