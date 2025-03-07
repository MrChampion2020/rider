
"use client"

import React from "react"
import { View, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

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
import RideSummary from "../screens/RideDetails/RiderSummary"
import RideDetails from "../screens/RideDetails/RiderDetails"
import RideDetailsMap from "../screens/RideDetails/RideDetailsMap"

// Send Parcel Screens
import LocationSelect from "../screens/SendParcel/LocationSelect"
import AddressSelect from "../screens/SendParcel/AddressSelect"
import MapSelect from "../screens/SendParcel/MapSelect"

// Tab Screens
import DeliveriesScreen from "../screens/Deliveries"
import ChatScreen from "../screens/Chat"
import SettingsScreen from "../screens/Settings"

import { TabBar } from "../components/TabBar"
import type { RootStackParamList, TabNavigatorParamList, SendParcelStackParamList } from "../types"

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const SendParcelStack = createNativeStackNavigator<SendParcelStackParamList>()

function SendParcelNavigator() {
  return (
    <SendParcelStack.Navigator screenOptions={{ headerShown: false }}>
      <SendParcelStack.Screen name="LocationSelect" component={LocationSelect} />
      <SendParcelStack.Screen name="AddressSelect" component={AddressSelect} />
      <SendParcelStack.Screen name="MapSelect" component={MapSelect} />
    </SendParcelStack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="ActiveDeliveries" component={ActiveDeliveries} />
      <Stack.Screen name="RideSummary" component={RideSummary} />
      <Stack.Screen name="RideDetails" component={RideDetails} />
      <Stack.Screen name="RideDetailsMap" component={RideDetailsMap} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  const [activeTab, setActiveTab] = React.useState("Home")
  const [isSendParcelVisible, setIsSendParcelVisible] = React.useState(false)

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
    if (tabName === "Add") {
      setIsSendParcelVisible(true)
    }
  }

  React.useEffect(() => {
    if (activeTab !== "Add") {
      setIsSendParcelVisible(false)
    }
  }, [activeTab])

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Deliveries" component={DeliveriesScreen} />
        <Tab.Screen
          name="Add"
          component={SendParcelNavigator}
          listeners={{
            focus: () => setIsSendParcelVisible(true),
            blur: () => setIsSendParcelVisible(false),
          }}
        />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

      {!isSendParcelVisible && (
        <View style={styles.tabBarContainer}>
          <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
        </View>
      )}
    </>
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
  const [isAuthenticated] = React.useState(true) // Replace with actual auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
})

