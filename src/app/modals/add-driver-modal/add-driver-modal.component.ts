import { AddDriverRequestModel } from './../../requests/Driver/AddDriverRequestModel';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../utils/services/app.service';
import { DigiDeliveryApiService } from './../../utils/services/digi-delivery-api.service';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-add-driver-modal',
  templateUrl: './add-driver-modal.component.html',
  styleUrls: ['./add-driver-modal.component.scss'],
  providers: [ConfirmationService, DialogService, MessageService]
})
export class AddDriverModalComponent implements OnInit {

    driverForm!: FormGroup;
    isAddDriverLoaded!: boolean;
    errorMessageAddDriver!: string;

    constructor(
            public dialogService: DialogService,
            public ref: DynamicDialogRef,
            public config: DynamicDialogConfig,
            public formBuilder: FormBuilder,
            public digiDeliveryApiService: DigiDeliveryApiService,
            private appService: AppService,
            public messageService: MessageService,
            public confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.driverForm = this.formBuilder.group({
            driverCode: new FormControl('', Validators.required),
            empCode: new FormControl('', Validators.required),
            driverName: new FormControl('', Validators.required),
            driverNameAr: new FormControl('', Validators.required),
            telNo: new FormControl('', Validators.required),
        });
    }

    async addDriver() {

        if (this.driverForm.valid) {
            this.isAddDriverLoaded = true;

            let addDriverRequestModel = new AddDriverRequestModel;
            addDriverRequestModel.driverCode = this.driverForm.get('driverCode')!.value;
            addDriverRequestModel.empCode = this.driverForm.get('empCode')!.value;
            addDriverRequestModel.driverName = this.driverForm.get('driverName')!.value;
            addDriverRequestModel.driverNameAr = this.driverForm.get('driverNameAr')!.value;
            addDriverRequestModel.telNo = this.driverForm.get('telNo')!.value;

            this.digiDeliveryApiService.AddDriver(addDriverRequestModel).subscribe({
                next: (response) => {
                    if (response.Error.ErrorCode == "200") {

                        this.messageService.add({severity:'success', summary: 'Add Driver Request', detail: 'Driver Added:'+ response.driverName + 'Password:' + response.pass, life: 3000});
                        this.ref.close(response);
                    } else {

                        this.messageService.add({severity:'error', summary: 'Add Driver Request', detail: response.Error.ErrorMessage, life: 3000});
                    }
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Add Driver Request', detail: 'Connection Error', life: 3000});
                },
                complete: () => {
                    this.isAddDriverLoaded = false;

                    this.driverForm.reset();
                },
            });
            } else {
                this.messageService.add({severity:'error', summary: 'Add Driver Request', detail: 'Please fill Address field', life: 3000});
            }

    }

}
