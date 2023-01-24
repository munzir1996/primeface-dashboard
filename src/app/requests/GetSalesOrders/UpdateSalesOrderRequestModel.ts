import { SalesOrderInfoDetailModel } from './../../models/SalesOrders/SalesOrderInfoDetailModel';

export class UpdateSalesOrderRequestModel {
  so_sys_id!: string;
  So_Date!: string;
  SO_No!: string;
  DocLocn!: string;
  CustomerName!: string;
  Address!: string;
  TelNo!: string;
  SalesPersonCode!: string;
  SalesPersonName!: string;
  DelivaryMethod!: string;
  DelivaryWithin!: string;
  Status!: string;
  DeliverdedDate!: string;
  ScUser!: string;
  RequiestDate!: string;
  RequiestChanale!: string;
  CrName!: string;
  ApprUID!: string;
  ApprDT!: string;
  EmpCode!: string;
  OrderDetails!: SalesOrderInfoDetailModel[];
}
