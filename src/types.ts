export type RootStackParamList = {
    RideSummary: undefined;
    RideDetails: undefined;
    RideDetailsMap: undefined;
  };
  
  export interface DeliveryStatus {
    date: string;
    time: string;
    status: string;
    location: string;
  }
  
  export interface RiderProfile {
    name: string;
    rating: number;
    image: string;
  }
  
  export interface DeliveryDetails {
    orderId: string;
    total: number;
    senderAddress: string;
    receiverAddress: string;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    parcelName: string;
    parcelCategory: string;
    parcelValue: string;
    description: string;
    payer: string;
    paymentMethod: string;
    payOnDelivery: boolean;
    amount: number;
    delivery: number;
  }