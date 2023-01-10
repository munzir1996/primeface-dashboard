import { ErrorModel } from './../../models/Common/ErrorModel';
export class DashboardCounterResponseModel{
    requestedOrder!: string;
    dispatchedOrder!: string;
    deliveredOrdersCount!: string;
    receivedOrdersCount!: string;
    pendingOrdersCount!: string;
    returnedOrdersCount!: string;
    driversCount!: string;
    Error!: ErrorModel;
}
