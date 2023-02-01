import { DeliveredLocationsResponseModel } from './../../requests/HeatMap/DeliveredLocationsResponseModel';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { UserInfoModel } from './../../models/Common/UserInfoModel';
import { DriverInfo } from './../../models/Drivers/DriverInfo';
import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/demo/api/product';
// import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { apiImage } from './../../../environments/environment';
import { } from 'googlemaps';
import {GMapModule} from 'primeng/gmap';

@Component({
  selector: 'app-orders-heat-map',
  templateUrl: './orders-heat-map.component.html',
  styleUrls: ['./orders-heat-map.component.scss'],
  providers: [DialogService, MessageService]
})
export class OrdersHeatMapComponent implements OnInit {

    // products: Product[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    heatMapLoaded: boolean = false;
    public apiImage = apiImage;

    userInfo!: UserInfoModel;
    errorMessage: string = "";
    drivers: DriverInfo[] = [];

    items!: MenuItem[];
    home!: MenuItem;
    ref!: DynamicDialogRef;

    overlays!: any[];
    heatmapData!: any[];
    deliveryLoc!: string[];
    options: any;
    delevierdLocations!: any[];

    heatMapPins!: any[];

    constructor(
        // private productService: ProductService,
            private router: Router,
            private appService: AppService,
            private formBuilder: FormBuilder,
            private digiDeliveryApi: DigiDeliveryApiService,
            public messageService: MessageService,
            public dialogService: DialogService,
    ) { }

    ngOnInit(): void {
        this.items = [
            {label: 'Heat Map'},
        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.userInfo = this.appService.getUserInfo().UserInfo;

        this.initMap();

    }

    initMap() {

        this.digiDeliveryApi.GetDeliveredLocations().subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.delevierdLocations = response.delevierdLocations;

                    this.heatMapPins = this.delevierdLocations.map((delevierdLocation) => {
                        let deliveryLoc = delevierdLocation.Location.split(",");
                        return new google.maps.LatLng({lat: parseFloat(deliveryLoc[0]), lng: parseFloat(deliveryLoc[1])})
                    });

                    this.heatmapData = this.heatMapPins;

                    this.overlays = [
                        new google.maps.visualization.HeatmapLayer({
                            data: this.heatmapData
                        }),
                    ];

                    this.options = {
                        center: {lat: 15.611795, lng: 32.5554807},
                        zoom: 12,
                        // mapTypeId: 'satellite'
                    };
                } else {
                    this.messageService.add({severity:'error', summary: 'Heat Map', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Heat Map', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.heatMapLoaded = true;
            },
        })


    }

    getDeliveredLocations() {

        this.digiDeliveryApi.GetDeliveredLocations().subscribe({
            next: (response) => {
                if (response.Error.ErrorCode == "200") {
                    this.delevierdLocations = response.delevierdLocations;

                    this.initMap();
                } else {
                    this.messageService.add({severity:'error', summary: 'Heat Map', detail: response.Error.ErrorMessage, life: 3000});
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Heat Map', detail: 'Connection Error', life: 3000});
            },
            complete: () => {
                this.heatMapLoaded = true;
            },
        })

    }

}
