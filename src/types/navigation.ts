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
    Address: undefined
    SavedAddresses: undefined
    EditAddress: { addressId: string }
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
    SearchRider: { amount: string }
    RideConfirmation: { amount: string }
    RideDetails: {
      orderId: string
      status: "in_transit" | "delivered"
      amount: string
    }
    RiderBids: { amount: string }
    RidersBid: { amount: string }
    RideSummary: { rider: any; amount: string }
    RideHistory: undefined
    DeliveryDetails: { rideId: string }
    DeliveredSummary: { rideId: string }
    BankDetails: { rider: any; amount: string }

  }
  
  export type SettingsStackParamList = {
    SettingsMain: undefined
    Wallet: undefined
    Support: undefined
    Address: undefined
    Notifications: undefined
    FAQs: undefined
    EditProfile: undefined
    SavedAddresses: undefined
  }
  
export type DeliveriesStackParamList = {
  DeliveryMain: undefined
  OngoingDeliveries: undefined
  CompletedDeliveries: undefined
  DeliveryTracking: { deliveryId: string }
  DeliveryDetails: { deliveryId: string }
  DeliveryFeedback: { deliveryId: string }
  DeliveryIssue: { deliveryId: string }
  DeliveryRating: { deliveryId: string }
  RideHistory: undefined
  RidesDetails: { rideId: string }
  RideSummary: { rider: any; amount: string }
}


  
 
  
  
  
  