import { ErrorModel } from './../../models/Common/ErrorModel';

export class EditDriverResponseModel {
  driverCode!: string;
  driverName!: string;
  driverNameAr!: string;
  empCode!: string;
  isActive!: string;
  telNo!: string;
  pass!: string;
  Error!: ErrorModel;
}
