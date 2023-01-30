import { SalesOrderInfoDetailModel } from './../../models/SalesOrders/SalesOrderInfoDetailModel';
import { SalesOrderInfoRequestModel } from "./SalesOrderInfoRequestModel";

export class AddSalesOrderRequestModel {
  SalesOrderInfo!: Partial<SalesOrderInfoRequestModel>;
  SalesOrderInfoDetails!: SalesOrderInfoDetailModel[];
  EmpCode!: string;
  Comment!: string;
}
