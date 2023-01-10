import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { SelectItem, PrimeNGConfig} from 'primeng/api';
import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-drivers-pending-orders',
  templateUrl: './drivers-pending-orders.component.html',
  styleUrls: ['./drivers-pending-orders.component.scss'],
  providers: [DialogService, MessageService]
})
export class DriversPendingOrdersComponent implements OnInit {

    items!: MenuItem[];
    home!: MenuItem;
    orders: Product[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    ordersLoaded: boolean = false;

    ref!: DynamicDialogRef;

    constructor(
        private productService: ProductService,
        private primengConfig: PrimeNGConfig,
        public dialogService: DialogService,
        public messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.items = [
            {label: 'Drivers Pending Orders'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
        this.productService.getProducts().then(data => this.orders = data);
        this.ordersLoaded = true;
    }

    show() {
        this.ref = this.dialogService.open(OrderDetailsModalComponent, {
            header: 'Delivery No #01KNID-2022005196',
            width: '70%',
            maximizable: true,
        });

        this.ref.onClose.subscribe((product: Product) =>{
            if (product) {
                this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
            }
        });
        this.ref.onMaximize.subscribe((value: any) => {
            this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
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

}
