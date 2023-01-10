import { ErrorModel } from './../../models/Common/ErrorModel';

export class GetOrderBySoNoRequestModel {
  soNo!: string;
  empCode!: string;
  Error!: ErrorModel;
}
