import { OrderInfo } from './../../models/Order/OrderInfo';
// import { OrderInfo } from './../../models/OrderInfo/OrderInfo';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { apiImage } from './../../../environments/environment'

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
  providers: [DialogService, MessageService]
})
export class OrderDetailsModalComponent implements OnInit {

    products!: Product[];
    orderInfo!: OrderInfo;
    public apiImage = apiImage;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        this.orderInfo = this.config.data.orderInfo
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }

}
