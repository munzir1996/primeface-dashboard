import { SalesOrderInfoDetailModel } from './SalesOrderInfoDetailModel';

export class SalesOrderInfoModel {
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
  OrderDetails!: SalesOrderInfoDetailModel[];
  RequiestDate!: string;
  RequiestChanale!: string;
  CrName!: string;
  ApprUID!: string;
  ApprDT!: string;
  ApprName!: string;
  EmpCode!: string;
  Comment!: string;
  CityNo!: number;
  CityName!: number;
}
