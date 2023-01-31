import { OrderInfo } from './../../models/Order/OrderInfo';
// import { OrderInfo } from './../../models/OrderInfo/OrderInfo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/demo/api/product';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { apiImage } from './../../../environments/environment'
import { } from 'googlemaps';
import {GMapModule} from 'primeng/gmap';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
  providers: [DialogService, MessageService]
})
export class OrderDetailsModalComponent implements OnInit {

    orderInfo!: OrderInfo;
    public apiImage = apiImage;
    options: any;
    overlays!: any[];
    heatmapData!: any[];
    deliveryLoc!: string[];


    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        
        this.orderInfo = this.config.data.orderInfo
        
        this.initMap();

    }

    initMap() {

        this.deliveryLoc = this.orderInfo.DeliveryLocation.split(",");

        // this.heatmapData = [
        //     new google.maps.LatLng(37.782, -122.447),
        //     new google.maps.LatLng(37.782, -122.445),
        //     new google.maps.LatLng(37.782, -122.443),
        //     new google.maps.LatLng(37.782, -122.441),
        //     new google.maps.LatLng(37.782, -122.439),
        //     new google.maps.LatLng(37.782, -122.437),
        //     new google.maps.LatLng(37.782, -122.435),
        //     new google.maps.LatLng(37.785, -122.447),
        //     new google.maps.LatLng(37.785, -122.445),
        //     new google.maps.LatLng(37.785, -122.443),
        //     new google.maps.LatLng(37.785, -122.441),
        //     new google.maps.LatLng(37.785, -122.439),
        //     new google.maps.LatLng(37.785, -122.437),
        //     new google.maps.LatLng(37.785, -122.435)
        // ];

        this.overlays = [
            // new google.maps.visualization.HeatmapLayer({
            //     data: this.heatmapData
            // }),
            new google.maps.Marker({position: {lat: parseFloat(this.deliveryLoc[0]), lng: parseFloat(this.deliveryLoc[1])}, title: this.orderInfo.DeliveryNo}),
        ];

        this.options = {
            // center: {lat: 37.774546, lng: -122.433523},
            center: {lat: parseFloat(this.deliveryLoc[0]), lng: parseFloat(this.deliveryLoc[1])},
            zoom: 15,
            mapTypeId: 'satellite'
        };
    }   

}
