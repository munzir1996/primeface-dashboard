import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

    public user!: LoginResponseModel;

    constructor(private router: Router) {
    }

    setUserInfo(userInfo: string)
    {
        localStorage.setItem("userInfo", userInfo);
    }

    getUserInfo(){
        this.user = JSON.parse(localStorage.getItem("userInfo") || '{}');

        return this.user;
    }

    getUserDepartment(){
        this.user = JSON.parse(localStorage.getItem("userInfo") || '{}');
        return this.user.UserInfo.EmpDepartment;
    }

    login(userInfo: string) {
        localStorage.setItem("userInfo", userInfo);
        localStorage.setItem("isLoggedIn", "truee");
    }

    register() {
        localStorage.setItem('token', 'LOGGED_IN');
        this.router.navigate(['/']);
    }

    logout() {
        localStorage.setItem("userInfo", "");
        localStorage.setItem("isLoggedIn", "false");
        this.router.navigate(['/login']);
    }
}
