import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from '../constants/colors';

interface MapViewProps {
  orderId: string;
}

export default function CustomMapView({ orderId }: MapViewProps) {
  // In a real app, you would fetch the route data based on the orderId
  const route = {
    origin: { latitude: 40.7128, longitude: -74.006 },
    destination: { latitude: 40.7648, longitude: -73.9808 },
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: (route.origin.latitude + route.destination.latitude) / 2,
        longitude: (route.origin.longitude + route.destination.longitude) / 2,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={route.origin} title="Origin" />
      <Marker coordinate={route.destination} title="Destination" />
      <Polyline
        coordinates={[route.origin, route.destination]}
        strokeColor={colors.primary}
        strokeWidth={3}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});