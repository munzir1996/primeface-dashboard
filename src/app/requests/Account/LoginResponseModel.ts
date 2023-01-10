import { UserInfoModel } from './../../models/Common/UserInfoModel';
import { ErrorModel } from './../../models/Common/ErrorModel';
export class LoginResponseModel {
  UserInfo!: UserInfoModel;
  Token!: string;
  Error!: ErrorModel;
}
