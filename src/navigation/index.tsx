import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideSummary from '../screens/RiderSummary';
import RideDetails from '../screens/RiderDetails';
import RideDetailsMap from '../screens/RideDetailsMap';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="RideSummary" component={RideSummary} />
        <Stack.Screen name="RideDetails" component={RideDetails} />
        <Stack.Screen name="RideDetailsMap" component={RideDetailsMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}