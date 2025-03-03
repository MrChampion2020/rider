"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import User from "./Home/User"
import UserDetails from "./Home/UserDetails"
import ActiveDeliveries from "./Home/ActiveDeliveries"
import { TabBar } from "../components/TabBar"
import { colors } from "../constants/colors"
import type { RootStackParamList, TabNavigatorParamList } from "../types"

// Placeholder screens
const DeliveriesScreen = () => <View style={styles.placeholder} />
const AddScreen = () => <View style={styles.placeholder} />
const ChatScreen = () => <View style={styles.placeholder} />
const SettingsScreen = () => <View style={styles.placeholder} />

const Tab = createBottomTabNavigator<TabNavigatorParamList>()
const Stack = createNativeStackNavigator<RootStackParamList>()

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="ActiveDeliveries" component={ActiveDeliveries} />
    </Stack.Navigator>
  )
}

export default function Index() {
  const [activeTab, setActiveTab] = useState("Home")

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Deliveries" component={DeliveriesScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

      <View style={styles.tabBarContainer}>
        <TabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
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
  placeholder: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
})

