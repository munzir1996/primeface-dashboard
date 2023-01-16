import { SalesOrderModel } from './../../models/SalesOrders/SalesOrderModel';
import { ErrorModel } from './../../models/Common/ErrorModel';

export class GetSalesOrdersResponseModel {
  salesOrders!: SalesOrderModel[];
  Error!: ErrorModel;
}
