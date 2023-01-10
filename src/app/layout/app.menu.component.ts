import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
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
                ]
            },
        ];
    }
}
