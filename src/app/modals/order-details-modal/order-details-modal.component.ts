import { OrderInfo } from './../../models/Order/OrderInfo';
// import { OrderInfo } from './../../models/OrderInfo/OrderInfo';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { apiImage } from './../../../environments/environment'
import { ILoadEventArgs } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
  providers: [DialogService, MessageService]
})
export class OrderDetailsModalComponent implements OnInit {

    orderInfo!: OrderInfo;
    public apiImage = apiImage;
    public load = (args: ILoadEventArgs) : void => {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Aerial?output=json&uriScheme=https&key=?").then(function(url) {
          args.maps.layers[0].urlTemplate= url;
        });
    };
    
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        this.orderInfo = this.config.data.orderInfo
    }

    // selectProduct(product: Product) {
    //     this.ref.close(product);
    // }

}
