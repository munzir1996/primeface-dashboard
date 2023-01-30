import { AddDriverResponseModel } from './../../requests/Driver/AddDriverResponseModel';
import { AddDriverRequestModel } from './../../requests/Driver/AddDriverRequestModel';
import { AddSalesOrderRequestModel } from './../../requests/GetSalesOrders/AddSalesOrderRequestModel';
import { GetCitiesResponseModel } from 'src/app/requests/GetCities/GetCitiesResponseModel';
import { GetSalesOrderBySoNoResponseModel } from './../../requests/GetSalesOrders/GetSalesOrderBySoNoResponseModel';
import { GetSalesOrderBySoNoRequestModel } from './../../requests/GetSalesOrders/GetSalesOrderBySoNoRequestModel';
import { GetUpdateSaleOrderDetailsResponseModel } from './../../requests/GetSalesOrders/GetUpdateSaleOrderDetailsResponseModel';
import { UpdateSalesOrderRequestModel } from './../../requests/GetSalesOrders/UpdateSalesOrderRequestModel';
import { GetSalesOrdersResponseModel } from './../../requests/GetSalesOrders/GetSalesOrdersResponseModel';
import { GetSalesOrdersRequestModel } from './../../requests/GetSalesOrders/GetSalesOrdersRequestModel';
import { EditDriverResponseModel } from './../../requests/EditDriver/EditDriverResponseModel';
import { EditDriverRequestModel } from './../../requests/EditDriver/EditDriverRequestModel';
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

    public GetReturnedOrders(req: GetDriverDeliveredOrdersRequestModel): Observable<GetDriverDeliveredOrdersResponseModel> {
        return this.http.post<GetDriverDeliveredOrdersResponseModel>(
          apiURL + 'MgmtReports/GetDriverReturnedOrders',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public EditDriver(req: EditDriverRequestModel): Observable<EditDriverResponseModel> {

        return this.http.post<EditDriverResponseModel>(
          apiURL + 'MgmtReports/EditDriver',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public GetSalesOrders(req: GetSalesOrdersRequestModel): Observable<GetSalesOrdersResponseModel> {
        return this.http.post<GetSalesOrdersResponseModel>(
          apiURL + 'DeliveryRequest/GetSalesOrderRequests',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public UpdateSalesOrder(req: UpdateSalesOrderRequestModel): Observable<GetUpdateSaleOrderDetailsResponseModel> {

        return this.http.post<GetUpdateSaleOrderDetailsResponseModel>(
        apiURL + 'DeliveryRequest/UpdateSaleOrderDetails',
        JSON.stringify(req),
        {
            headers: this.httpOptions
        }).pipe(
            timeout(timeOutTime));
    }

    public GetSalesOrderBySoNo(req: GetSalesOrderBySoNoRequestModel): Observable<GetSalesOrderBySoNoResponseModel> {
        return this.http.post<GetSalesOrderBySoNoResponseModel>(
          apiURL + 'DeliveryRequest/GetSalesOrderBySoNo',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public GetCities(): Observable<GetCitiesResponseModel> {
        return this.http.get<GetCitiesResponseModel>(
          apiURL + 'Common/GetAllCities',
          {
            headers: this.httpOptions
          }).pipe(timeout(timeOutTime));
    }
    public AddSalesOrder(req: AddSalesOrderRequestModel): Observable<GetSalesOrderBySoNoResponseModel> {

        return this.http.post<GetSalesOrderBySoNoResponseModel>(
          apiURL + 'DeliveryRequest/AddSalesOrder',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

    public AddDriver(req: AddDriverRequestModel): Observable<AddDriverResponseModel> {

        return this.http.post<AddDriverResponseModel>(
          apiURL + 'MgmtReports/AddDriver',
          JSON.stringify(req),
          {
            headers: this.httpOptions
          }).pipe(
            timeout(timeOutTime));
    }

}
