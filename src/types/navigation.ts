export type RootStackParamList = {
    Auth: undefined
    MainApp: undefined
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
  
  
  export type TabNavigatorParamList = {
    Home: undefined
    Deliveries: undefined
    Add: undefined
    Chat: undefined
    Settings: undefined
    
  }
  

  
  export type ScheduleStackParamList = {
    ScheduleParcel: undefined
    PaymentDetails: undefined
  }
    

  
  export type SendParcelStackParamList = {
    SendParcel: undefined
    LocationSelect: undefined
    AddressSelect: {
      type: "home" | "work"
      addressType: "sender" | "receiver"
    }
    MapSelect: {
      type: "sender" | "receiver"
    }
    ScheduleParcel: undefined
    SenderReceiverDetails: undefined
    ParcelDetails: undefined
    DeliverySummary: {
      orderId: string
      status: "delivered"
      amount: string
    },
    Home: undefined
    PaymentDetails: undefined
    SearchRiders: { amount: string }
    RideConfirmation: { amount: string }
    RideDetails: {
      orderId: string
      status: "in_transit" | "delivered"
      amount: string
    }
    RiderBids: { amount: string }
    RideSummary: { rider: any; amount: string }
    RideHistory: undefined
    DeliveryDetails: { rideId: string }
    DeliveredSummary: { rideId: string }
  
  }

  
  
   

  
  
  
  
  
 
  
  
  
  