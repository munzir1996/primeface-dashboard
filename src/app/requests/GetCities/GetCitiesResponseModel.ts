import { CityModel } from './../../models/City/CityModel';
import { ErrorModel } from './../../models/Common/ErrorModel';

export class GetCitiesResponseModel {
  Cities!: CityModel[];
  Error!: ErrorModel;
}

