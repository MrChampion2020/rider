import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideSummary from "../screens/RiderSummary";
import RideDetails from "../screens/RiderDetails";
import RideDetailsMap from "../screens/RideDetailsMap";
import Onboard from "../register/Onboard";
import Login from "../register/Login";
import SignUp from "../register/SignUp";
import Verify from "../register/Verify";
import { RootStackParamList } from "../types";
import ChangePassword from "../register/ChangePassword";
const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*Registration Screens  */}
        <Stack.Screen name="/" component={Onboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />

        {/*  */}
        <Stack.Screen name="RideSummary" component={RideSummary} />
        <Stack.Screen name="RideDetails" component={RideDetails} />
        <Stack.Screen name="RideDetailsMap" component={RideDetailsMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
