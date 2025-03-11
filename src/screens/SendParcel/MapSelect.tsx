
"use client"

import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"
import MapView, { Marker } from "react-native-maps"
import { useOrder } from "../../contexts/OrderContext"

const { width, height } = Dimensions.get("window")

export default function MapSelect() {
  const navigation = useNavigation()
  const route = useRoute()
  const { updateDeliveryDetails } = useOrder()
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 40.7128,
    longitude: -74.006,
  })

  const handleClose = () => {
    navigation.goBack()
  }

  const handleSelect = () => {
    const address = `${selectedLocation.latitude.toFixed(6)}, ${selectedLocation.longitude.toFixed(6)}`
    const type = route.params?.type || "sender"

    updateDeliveryDetails({
      [type === "sender" ? "senderAddress" : "receiverAddress"]: address,
    })

    navigation.navigate("LocationSelect", {
      selectedAddress: address,
      type,
      fromMap: true,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Icon name="close" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            setSelectedLocation(e.nativeEvent.coordinate)
          }}
        >
          <Marker coordinate={selectedLocation} pinColor={colors.primary} />
        </MapView>
      </View>

      <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
        <Text style={styles.selectButtonText}>Select Location</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width,
    height: height - 150,
  },
  selectButton: {
    backgroundColor: colors.primary,
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  selectButtonText: {
    color: colors.white,
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    textAlign: "center",
  },
})

