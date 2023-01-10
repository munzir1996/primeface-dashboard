import { GetDriverDeliveredOrdersResponseModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersResponseModel';
import { GetDriverDeliveredOrdersRequestModel } from './../../requests/GetDriverDeliveredOrders/GetDriverDeliveredOrdersRequestModel';
import { GetDriversResponseModel } from '../../models/GetDrivers/GetDriversResponseModel';
import { GetOrderBySoNoResponseModel } from './../../requests/GetOrderBySoNo/GetOrderBySoNoResponseModel';
import { GetOrderBySoNoRequestModel } from './../../requests/GetOrderBySoNo/GetOrderBySoNoRequestModel';
import { DashboardCounterResponseModel } from './../../requests/Dashboard/DashboardCounterResponseModel';
import { DashboardCounterRequestModel } from './../../requests/Dashboard/DashboardCounterRequestModel';
import { LoginResponseModel } from './../../requests/Account/LoginResponseModel';
import { LoginRequestModel } from './../../requests/Account/LoginRequestModel';
import { GetPublicKeyResponseModel } from './../../requests/GetPublicKey/GetPublicKeyResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { timeOutTime } from './../../models/GlobalConsts';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class DigiDeliveryApiService {

    httpOptions: any;
    httpAuthOptions: any;
    token!: string;

    constructor(public http: HttpClient) {
        this.httpOptions = {
        'Content-Type': 'application/json'
        };
        this.httpAuthOptions = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
        };
    }

    public GetPublicKey(): Observable<GetPublicKeyResponseModel> {
        return this.http.get<GetPublicKeyResponseModel>(
        apiURL + 'common/GetPublicKey',
        {
            headers: this.httpOptions
        }).pipe(timeout(timeOutTime));
    }

    public Login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
        return this.http.post<LoginResponseModel>(
        apiURL + 'Account/MgmtLogin',
        JSON.stringify(loginRequest),
        {
            headers: this.httpOptions
        }).pipe(timeout(timeOutTime));
    }

    public GetDashboardCounter(req: DashboardCounterRequestModel): Observable<DashboardCounterResponseModel> {
        return this.http.post<DashboardCounterResponseModel>(
        apiURL + 'Common/GetDashboardCounter',
        JSON.stringify(req),
        {
            headers: this.httpOptions
        }).pipe(timeout(timeOutTime));
    }

    public GetOrderBySoNo(req: GetOrderBySoNoRequestModel): Observable<GetOrderBySoNoResponseModel> {

        return this.http.post<GetOrderBySoNoResponseModel>(
        apiURL + 'MgmtReports/GetOrderBySoNo',
        JSON.stringify(req),
        {
            headers: this.httpOptions
        }).pipe(timeout(timeOutTime));
    }

    public GetDrivers(): Observable<GetDriversResponseModel> {
        return this.http.get<GetDriversResponseModel>(
          apiURL + 'MgmtReports/GetDrivers',
          {
            headers: this.httpOptions
          }).pipe(timeout(timeOutTime));
    }

    public GetDeliveredOrders(req: GetDriverDeliveredOrdersRequestModel): Observable<GetDriverDeliveredOrdersResponseModel> {
        return this.http.post<GetDriverDeliveredOrdersResponseModel>(
          apiURL + 'MgmtReports/GetDriverDeliveredOrders',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(timeout(timeOutTime));
    }

    public GetReceivedOrders(req: GetDriverDeliveredOrdersRequestModel): Observable<GetDriverDeliveredOrdersResponseModel> {
        return this.http.post<GetDriverDeliveredOrdersResponseModel>(
          apiURL + 'MgmtReports/GetDriverReceivedOrders',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public GetPendingOrders(req: GetDriverDeliveredOrdersRequestModel): Observable<GetDriverDeliveredOrdersResponseModel> {
        return this.http.post<GetDriverDeliveredOrdersResponseModel>(
          apiURL + 'MgmtReports/GetDriversPendingOrders',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

}
