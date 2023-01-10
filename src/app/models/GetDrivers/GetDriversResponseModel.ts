import { ErrorModel } from '../Common/ErrorModel';
import { DriverInfo } from '../Drivers/DriverInfo';

export class GetDriversResponseModel {
  Drivers!: DriverInfo[];
  Error!: ErrorModel;
}
