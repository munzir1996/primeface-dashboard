export class OrderInfo {
    OrderId!: string;
    DeliveryDate!: string;
    DeliveryNo!: string;
    InvoiceNo!: string;
    CustomerName!: string;
    CustomerPhone!: string;
    CustomerAddress!: string;
    DriverID!: string;
    DriverName!: string;
    DriverNameAr!: string;
    DriverPhone!: string;
    InternalAuditPhone!: string;
    Delivered!: string;
    Received!: string;
    Returned!: string;
    Delivered_Date!: string;
    Received_Date!: string;
    Returned_Date!: string;
    CustomerIdImage!: string;
    OrderImage!: string;
    CustomerSignature!: string;
    OrderDetails!: OrderDetail[];
    DeliveryLocation !: string;
}

export class OrderDetail {
    OrderDetailId!: string;
    OrderId!: string;
    ItemCode!: string;
    ItemDesc!: string;
    ItemQty!: number;
    DeliveredItemsQty!: string;
    ReceivedItemsQty!: string;
    ReturnedItemQty!: string;
    Delivered!: string;
    Received!: string;
    Returned!: string;
    Delivered_Date!: string;
    Received_Date!: string;
    Returned_Date!: string;
    DeliveryLocation!: string;
    ReturnReasonCode!: string;
    ReasonCodeEN!: string;
    ReasonCodeAR!: string;
}
