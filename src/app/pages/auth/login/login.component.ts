import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DigiDeliveryApiService } from '../../../utils/services/digi-delivery-api.service';
import { EncryptServiceService } from '../../../utils/services/encrypt-service.service';
import { LoginRequestModel } from '../../../requests/Account/LoginRequestModel';
import { AppService } from '../../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoModel } from 'src/app/models/Common/UserInfoModel';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {

    public loginForm!: FormGroup;
    public isAuthLoading = false;
    publicKey!: string;
    userInfo!: UserInfoModel;

    constructor(
        public layoutService: LayoutService,
        private digiDeliveryApi: DigiDeliveryApiService,
        private appService: AppService,
        private router: Router,
        private encryptService: EncryptServiceService,
        public messageService: MessageService
    ) { }

    ngOnInit() {

        this.loginForm = new FormGroup({
          empCode: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required),
          rememberMe: new FormControl(false),
        });

    }

    login() {
        if (this.loginForm.valid) {

            this.isAuthLoading = true;

            this.digiDeliveryApi.GetPublicKey().subscribe({
                next: (response) => {
                    if (response.Error.ErrorCode == "200") {

                        var loginReq = new LoginRequestModel();
                        this.publicKey = response.PublicKey;
                        loginReq.EmpCode = this.loginForm.get('empCode')!.value;
                        loginReq.Password = this.encryptService.EncryptText(this.loginForm.get('password')!.value, response.PublicKey);

                        this.doLogin(loginReq);

                    } else {

                        this.isAuthLoading = false;
                        this.messageService.add({severity:'error', summary: 'Login', detail: response.Error.ErrorMessage, life: 3000});

                    }
                },
                error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Login', detail: 'ConnectionError', life: 3000});
                },
                complete: () => {
                    this.isAuthLoading = false;
                },
            });

            // this.digiDeliveryApi.GetPublicKey().subscribe(async response => {
            //   if (response.Error.ErrorCode == "200") {

            //     this.isAuthLoading = false;
            //     var loginReq = new LoginRequestModel();
            //     this.publicKey = response.PublicKey;
            //     loginReq.EmpCode = this.loginForm.get('empCode')!.value;
            //     loginReq.Password = this.encryptService.EncryptText(this.loginForm.get('password')!.value, response.PublicKey);

            //     // this.doLogin(loginReq);

            //   } else {
            //     this.isAuthLoading = false;
            //     this.messageService.add({severity:'error', summary: 'Login', detail: response.Error.ErrorMessage, life: 3000});

            //   }
            // },
            //   async error => {
            //     this.isAuthLoading = false;
            //     this.messageService.add({severity:'error', summary: 'Login', detail: 'ConnectionError', life: 3000});

            //   });
        } else {
            this.messageService.add({severity:'error', summary: 'Login', detail: 'Please fill login fields', life: 3000});
        }
    }

    private doLogin(loginReq: LoginRequestModel) {

        this.digiDeliveryApi.Login(loginReq).subscribe({

            next: (response) => {
                if (response.Error.ErrorCode == "200") {

                    this.appService.login(JSON.stringify(response));
                    this.messageService.add({severity:'success', summary: 'Logged in Successfully', life: 3000});

                    console.log('router');

                    this.router.navigate(['']);

                } else {
                    this.messageService.add({severity:'error', summary: response.Error.ErrorMessage, life: 3000});
                    this.isAuthLoading = false;
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary: 'Connection Error', detail: 'please try login again', life: 3000});
                this.isAuthLoading = false;
            },
            complete: () => {
                this.isAuthLoading = false;
            }

        });

        // this.digiDeliveryApi.Login(loginReq).subscribe(async (response) => {

        //   if (response.Error.ErrorCode == "200") {

        //     this.appService.login(JSON.stringify(response));
        //     // localStorage.setItem("userInfo", JSON.stringify(response));
        //     // localStorage.setItem("isLoggedIn", "true");
        //     this.toastr.success("Logged in Successfully","", { positionClass: 'toast-top-right',timeOut :  2000, });

        //     // let userDepartment = this.appService.getUserDepartment();

        //     this.router.navigate(['/']);

        //   } else {
        //     this.toastr.error(response.Error.ErrorMessage,"", { positionClass: 'toast-top-right',timeOut :  2000  });
        //   }
        // },
        //   async error => {
        //     this.toastr.error("Connection Error, please try login again","", { positionClass: 'toast-top-right',timeOut :  2000  });
        //   });
      }

}
