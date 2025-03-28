
"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Import the TabBar component
import { TabBar } from "../components/TabBar"

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
      <SendParcelStack.Screen
        name="SendParcel"
        component={SendParcel}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="LocationSelect"
        component={LocationSelect}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="AddressSelect"
        component={AddressSelect}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="MapSelect"
        component={MapSelect}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="ScheduleParcel"
        component={ScheduleParcel}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="SenderReceiverDetails"
        component={SenderReceiverDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="ParcelDetails"
        component={ParcelDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="DeliverySummary"
        component={DeliverySummary}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="SearchRiders"
        component={SearchRidersScreen}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="SearchRider"
        component={SearchRider}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="BankDetails"
        component={BankDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="RideConfirmation"
        component={RideConfirmationScreen}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="RiderBid"
        component={RiderBids}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="RidesSummary"
        component={RidesSummary}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="RideHistory"
        component={RideHistory}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="RidesDetails"
        component={RidesDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <SendParcelStack.Screen
        name="DeliveredSummary"
        component={DeliveredSummary}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
    </SendParcelStack.Navigator>
  )
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen name="Wallet" component={WalletScreen} />
      <SettingsStack.Screen name="Support" component={SupportScreen} />
      <SettingsStack.Screen name="Address" component={AddressScreen} />
      <SettingsStack.Screen name="Notifications" component={NotificationsScreen} />
      <SettingsStack.Screen name="FAQs" component={FAQsScreen} />
      <SettingsStack.Screen name="EditProfile" component={EditProfileScreen} />
    </SettingsStack.Navigator>
  )
}

function DeliveriesNavigator() {
  return (
    <DeliveriesStack.Navigator screenOptions={{ headerShown: false }}>
      <DeliveriesStack.Screen
        name="DeliveryMain"
        component={DeliveredHistory}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <DeliveriesStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <DeliveriesStack.Screen
        name="RideHistory"
        component={RideHistory}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <DeliveriesStack.Screen
        name="RidesDetails"
        component={RidesDetails}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
      <DeliveriesStack.Screen
        name="RideSummary"
        component={RideSummary}
        listeners={({ navigation }) => ({
          focus: () => {
            navigation.getParent()?.setParams({ hideTabBar: true })
          },
        })}
      />
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
    </Stack.Navigator>
  )
}

export function Navigation() {
  const [isAuthenticated] = useState(true) // Replace with actual auth state
  const [currentTab, setCurrentTab] = useState("Home")
  const [hideTabBar, setHideTabBar] = useState(false)
  const navigationRef = useRef<any>(null)

  // Function to handle tab press
  const handleTabPress = (tabName: string) => {
    // Update the current tab immediately for UI feedback
    setCurrentTab(tabName)

    // Navigate to the selected tab
    if (navigationRef.current) {
      navigationRef.current.navigate(tabName)
    }
  }

  // Function to handle navigation state changes
  const handleNavigationStateChange = (state: any) => {
    if (!state) return

    // Get the current active route
    const currentRoute = state.routes[state.index]

    // Update the current tab
    if (["Home", "Deliveries", "Add", "Chat", "Settings"].includes(currentRoute.name)) {
      setCurrentTab(currentRoute.name)
    }

    // Check if we're in the Add tab (SendParcel stack)
    if (currentRoute.name === "Add") {
      // We're in the SendParcel stack, so hide the tab bar
      setHideTabBar(true)
    } else if (currentRoute.name === "Deliveries") {
      // We're in the Deliveries stack, so hide the tab bar
      setHideTabBar(true)
    } else {
      // We're not in the SendParcel or Deliveries stack, so show the tab bar
      setHideTabBar(false)
    }

    // Also check for params that might indicate we should hide the tab bar
    if (currentRoute.params && currentRoute.params.hideTabBar) {
      setHideTabBar(true)
    }
  }

  // Listen for route params changes
  useEffect(() => {
    if (navigationRef.current) {
      const unsubscribe = navigationRef.current.addListener("state", (e: any) => {
        const state = e.data.state
        if (state && state.routes && state.routes[state.index]) {
          const currentRoute = state.routes[state.index]
          if (currentRoute.params && currentRoute.params.hideTabBar) {
            setHideTabBar(true)
          }
        }
      })

      return unsubscribe
    }
  }, [navigationRef.current])

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleNavigationStateChange}>
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

