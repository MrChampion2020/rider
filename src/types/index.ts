
  export type RootStackParamList = {
    MainApp: undefined
    Auth: undefined
    "/": undefined
    Login: undefined
    SignUp: undefined
    Verify: undefined
    ChangePassword: undefined
    User: undefined
    UserDetails: undefined
    ActiveDeliveries: undefined
    RideSummary: undefined
    RideDetails: undefined
    RideDetailsMap: undefined
  }

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


  export interface DeliveryStatus {
    date: string
    time: string
    status: string
    location: string
  }
  
  export interface RiderProfile {
    name: string
    rating: number
    image: string
  }
  
  export interface DeliveryDetails {
    orderId: string
    total: number
    senderAddress: string
    receiverAddress: string
    senderName: string
    senderPhone: string
    receiverName: string
    receiverPhone: string
    parcelName: string
    parcelCategory: string
    parcelValue: string
    description: string
    payer: string
    paymentMethod: string
    payOnDelivery: boolean
    amount: number
    delivery: number
  }
  

  export interface DeliveryDetails {
    orderId: string
    total: number
    senderAddress: string
    receiverAddress: string
    senderName: string
    senderPhone: string
    receiverName: string
    receiverPhone: string
    parcelName: string
    parcelCategory: string
    parcelValue: string
    description: string
    payer: string
    paymentMethod: string
    payOnDelivery: boolean
    amount: number
    delivery: number
  }

  export type TabNavigatorParamList = {
    Home: undefined
    Deliveries: undefined
    Add: undefined
    Chat: undefined
    Settings: undefined
  }
  
 
 
  export type SendParcelStackParamList = {
    LocationSelect: undefined
    AddressSelect: {
      type: "home" | "work"
      addressType: "sender" | "receiver"
    }
    MapSelect: {
      type: "sender" | "receiver"
    }
  }
  
 
  
  