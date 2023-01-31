import { LocationModel } from './../../models/locations/LocationModel';
import { ErrorModel } from './../../models/Common/ErrorModel';

export class DeliveredLocationsResponseModel {

    delevierdLocations!: LocationModel[];
    Error!: ErrorModel;
    
}