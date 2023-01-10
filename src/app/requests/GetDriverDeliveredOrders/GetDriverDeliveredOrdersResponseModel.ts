import { ErrorModel } from './../../models/Common/ErrorModel';
import { OrderInfo } from './../../models/Order/OrderInfo';

export class GetDriverDeliveredOrdersResponseModel {
  Orders!: OrderInfo[];
  Error!: ErrorModel;
}
