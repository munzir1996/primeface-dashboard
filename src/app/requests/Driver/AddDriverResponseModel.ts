import { ErrorModel } from './../../models/Common/ErrorModel';
export class AddDriverResponseModel {
  driverCode!: string;
  driverName!: string;
  driverNameAr!: string;
  empCode!: string;
  pass!: string;
  Error!: ErrorModel;
}
