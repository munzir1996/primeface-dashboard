import { OrderInfo } from './../../models/Order/OrderInfo';
import { ErrorModel } from './../../models/Common/ErrorModel';

export class GetOrderBySoNoResponseModel {
  orderInfo!: OrderInfo;
  Error!: ErrorModel;
}
