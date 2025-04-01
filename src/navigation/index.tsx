
"use client"

import { useState, useRef } from "react"
import { StyleSheet, View, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Import the TabBar component
import { TabBar } from "../components/TabBar"

// Import Auth Context
import { useAuth } from "../contexts/AuthContext"

// Registration Screens
import Onboard from "../screens/register/Onboard"
import Login from "../screens/register/Login"
import SignUp from "../screens/register/SignUp"
import Verify from "../screens/register/Verify"
import ChangePassword from "../screens/register/ChangePassword"

// Home Screens
import User from "../screens/Home/User"
import ActiveDeliveries from "../screens/Home/ActiveDeliveries"
import UserDetails from "../screens/Home/UserDetails"

// Ride Details Screens
import RideSummary from "../screens/SendParcel/RideDetails/RiderSummary"
import DeliveryDetails from "../screens/SendParcel/RideDetails/DeliveryDetails"
import RideDetailsMap from "../screens/SendParcel/RideDetails/RideDetailsMap"
import RidesDetails from "../screens/SendParcel/RideDetails/RidesDetails"

// Send Parcel Screens
import LocationSelect from "../screens/SendParcel/LocationSelect"
import AddressSelect from "../screens/SendParcel/AddressSelect"
import MapSelect from "../screens/SendParcel/MapSelect"
import ScheduleParcel from "../screens/SendParcel/ScheduleParcel"
import SendParcel from "../screens/SendParcel/SendParcel"
import SenderReceiverDetails from "../screens/SendParcel/SenderReceiverDetails"
import ParcelDetails from "../screens/SendParcel/ParcelDetails"
import PaymentDetails from "../screens/SendParcel/PaymentDetails"
import DeliverySummary from "../screens/SendParcel/DeliverySummary"
import SearchRidersScreen from "../screens/SendParcel/SearchRider"
import RideConfirmationScreen from "../screens/SendParcel/RideConfirmation"
import RiderBids from "../screens/SendParcel/RiderBid"
import RidesSummary from "../screens/SendParcel/RideSummary"
import RideHistory from "../screens/SendParcel/RideHistory"
import SearchRider from "../screens/SendParcel/SearchRider"
import BankDetails from "../screens/SendParcel/BankDetails"

// Track Parcel and Delivered
import DeliveredSummary from "../screens/SendParcel/DeliveredSummary"
import ChatScreen from "../screens/Chat"
import SettingsScreen from "../screens/Settings"

// Settings Screens
import WalletScreen from "../screens/Settings/Wallet"
import SupportScreen from "../screens/Settings/Support"
import AddressScreen from "../screens/Settings/Address"
import NotificationsScreen from "../screens/Settings/Notification"
import FAQsScreen from "../screens/Settings/FAQs"
import EditProfileScreen from "../screens/Settings/EditProfile"

// Delivery Screens
import DeliveredHistory from "../screens/Deliveries/index"

import type {
  RootStackParamList,
  TabNavigatorParamList,
  SendParcelStackParamList,
  SettingsStackParamList,
  DeliveriesStackParamList,
} from "../types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const SendParcelStack = createNativeStackNavigator<SendParcelStackParamList>()
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()
const DeliveriesStack = createNativeStackNavigator<DeliveriesStackParamList>()

function SendParcelNavigator() {
  return (
    <SendParcelStack.Navigator screenOptions={{ headerShown: false }}>
      <SendParcelStack.Screen name="SendParcel" component={SendParcel} />
      <SendParcelStack.Screen name="LocationSelect" component={LocationSelect} />
      <SendParcelStack.Screen name="AddressSelect" component={AddressSelect} />
      <SendParcelStack.Screen name="MapSelect" component={MapSelect} />
      <SendParcelStack.Screen name="ScheduleParcel" component={ScheduleParcel} />
      <SendParcelStack.Screen name="SenderReceiverDetails" component={SenderReceiverDetails} />
      <SendParcelStack.Screen name="ParcelDetails" component={ParcelDetails} />
      <SendParcelStack.Screen name="PaymentDetails" component={PaymentDetails} />
      <SendParcelStack.Screen name="DeliverySummary" component={DeliverySummary} />
      <SendParcelStack.Screen name="SearchRiders" component={SearchRidersScreen} />
      <SendParcelStack.Screen name="SearchRider" component={SearchRider} />
      <SendParcelStack.Screen name="BankDetails" component={BankDetails} />
      <SendParcelStack.Screen name="RideConfirmation" component={RideConfirmationScreen} />
      <SendParcelStack.Screen name="RiderBid" component={RiderBids} />
      <SendParcelStack.Screen name="RidesSummary" component={RidesSummary} />
      <SendParcelStack.Screen name="RideHistory" component={RideHistory} />
      <SendParcelStack.Screen name="RidesDetails" component={RidesDetails} />
      <SendParcelStack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <SendParcelStack.Screen name="DeliveredSummary" component={DeliveredSummary} />
    </SendParcelStack.Navigator>
  )
}

function SettingsNavigator() {
  const { logout } = useAuth()

  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain">
        {(props) => <SettingsScreen {...props} onLogout={logout} />}
      </SettingsStack.Screen>
      <SettingsStack.Screen name="Wallet" component={WalletScreen} />
      <SettingsStack.Screen name="Support" component={SupportScreen} />
      <SettingsStack.Screen name="Address" component={AddressScreen} />
      <SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
      <SettingsStack.Screen name="FAQs" component={FAQsScreen} />
      <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
      <SettingsStack.Screen name="RidesSummary" component={RidesSummary} />
    </SettingsStack.Navigator>
  )
}


function DeliveriesNavigator() {
  return (
    <DeliveriesStack.Navigator screenOptions={{ headerShown: false }}>
      <DeliveriesStack.Screen name="DeliveryMain" component={DeliveredHistory} />
      <DeliveriesStack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <DeliveriesStack.Screen name="RideHistory" component={RideHistory} />
      <DeliveriesStack.Screen name="RidesDetails" component={RidesDetails} />
      <DeliveriesStack.Screen name="RideSummary" component={RideSummary} />
      <DeliveriesStack.Screen name="LocationSelect" component={LocationSelect} />
      <DeliveriesStack.Screen name="AddressSelect" component={AddressSelect} />
      <DeliveriesStack.Screen name="MapSelect" component={MapSelect} />
      <DeliveriesStack.Screen name="ScheduleParcel" component={ScheduleParcel} />
      <DeliveriesStack.Screen name="PaymentDetails" component={PaymentDetails} />
      <DeliveriesStack.Screen  name="SenderReceiverDetails" component={SenderReceiverDetails} />
      <DeliveriesStack.Screen name="ParcelDetails" component={ParcelDetails} />
      <DeliveriesStack.Screen  name="DeliverySummary" component={DeliverySummary} />
      <DeliveriesStack.Screen  name="SearchRiders" component={SearchRidersScreen} />
      <DeliveriesStack.Screen  name="SearchRider" component={SearchRider} />
      <DeliveriesStack.Screen  name="BankDetails" component={BankDetails} />
      <DeliveriesStack.Screen  name="RideConfirmation" component={RideConfirmationScreen} />
      <DeliveriesStack.Screen  name="RiderBid" component={RiderBids} />
      <DeliveriesStack.Screen name="RidesSummary" component={RidesSummary} />
      <DeliveriesStack.Screen  name="DeliveredSummary" component={DeliveredSummary} />
    </DeliveriesStack.Navigator>
  )
}


function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Notification" component={NotificationsScreen} />
      <Stack.Screen name="ActiveDeliveries" component={ActiveDeliveries} />
      <Stack.Screen name="RideSummary" component={RideSummary} />
      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="RideDetailsMap" component={RideDetailsMap} />
      <Stack.Screen name="RidesDetails" component={RidesDetails} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Hide the default tab bar
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Deliveries" component={DeliveriesNavigator} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Add" component={SendParcelNavigator} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Settings" component={SettingsNavigator} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/" component={Onboard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  )
}

export function Navigation() {
  const { isAuthenticated } = useAuth()
  const [currentTab, setCurrentTab] = useState("Home")
  const [hideTabBar, setHideTabBar] = useState(false)
  const navigationRef = useRef<any>(null)

  // Function to handle tab press
  const handleTabPress = (tabName: string) => {
    setCurrentTab(tabName)
    if (navigationRef.current) {
      navigationRef.current.navigate(tabName)
    }
  }


  // This function will determine if we should hide the tab bar based on the current route
const shouldHideTabBar = (state: any): boolean => {
  if (!state) return false

  // Get the current active route
  const routes = state.routes
  const currentRoute = routes[state.index]

  // Check if we're in the Add (SendParcel) tab
  if (currentRoute.name === "Add") {
    return true
  }

  // Check if we're in the Deliveries tab
  if (currentRoute.name === "Deliveries") {
    return true
  }

  // Check if the current screen is RidesDetails
  if (currentRoute.name === "RidesDetails") {
    return true
  }

  // For nested navigators, we need to check their state too
  if (currentRoute.state) {
    // Check if any screen in the nested navigator is RidesDetails
    const nestedRoutes = currentRoute.state.routes
    const nestedCurrentRoute = nestedRoutes[currentRoute.state.index]
    
    if (nestedCurrentRoute.name === "RidesDetails") {
      return true
    }
    
    // Continue checking deeper nested states
    return shouldHideTabBar(currentRoute.state)
  }

  return false
}





  // Function to handle navigation state changes
  const handleNavigationStateChange = (state: any) => {
    if (!state) return

    // Get the current active route
    const currentRoute = state.routes[state.index]

    // Update the current tab if it's a main tab
    if (["Home", "Deliveries", "Add", "Chat", "Settings"].includes(currentRoute.name)) {
      setCurrentTab(currentRoute.name)
    }

    // Determine if we should hide the tab bar
    setHideTabBar(shouldHideTabBar(state))
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleNavigationStateChange}
      onReady={() => {
        // Initial state check when navigation is ready
        const state = navigationRef.current?.getRootState()
        if (state) {
          setHideTabBar(shouldHideTabBar(state))
        }
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" options={{ headerShown: false }}>
            {() => (
              <View style={styles.container}>
                <TabNavigator />
                {!hideTabBar && (
                  <View style={styles.tabBarWrapper}>
                    <TabBar activeTab={currentTab} onTabPress={handleTabPress} />
                  </View>
                )}
              </View>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    backgroundColor: "transparent",
    zIndex: 999,
  },
})

