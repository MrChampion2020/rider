


"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"
import pp from "../../assets/pp.png"
import { useOrder } from "../../contexts/OrderContext"
import { icons } from "../../constants/icons"

type RiderBidsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RiderBid">

interface Rider {
  id: string
  name: string
  rating: number
  vehicleType: string
  vehicleColor: string
  distance: string
  price: string
}

export default function RiderBids() {
  const navigation = useNavigation<RiderBidsNavigationProp>()
  const route = useRoute<any>()
  const { deliveryDetails } = useOrder()

  // Get amount from route params or use default
  const amount = route.params?.amount || "2,500"

  const [riders, setRiders] = useState<Rider[]>([
    {
      id: "1",
      name: "Maleek Oladimeji",
      rating: 5,
      vehicleType: "Bike",
      vehicleColor: "Black",
      distance: "3 min away",
      price: amount,
    },
    {
      id: "2",
      name: "Maleek Oladimeji",
      rating: 5,
      vehicleType: "Bike",
      vehicleColor: "Black",
      distance: "3 min away",
      price: amount,
    },
    {
      id: "3",
      name: "Maleek Oladimeji",
      rating: 5,
      vehicleType: "Bike",
      vehicleColor: "Black",
      distance: "3 min away",
      price: amount,
    },
  ])

  // Update rider prices when amount changes
  useEffect(() => {
    if (amount) {
      setRiders((prevRiders) =>
        prevRiders.map((rider) => ({
          ...rider,
          price: amount,
        })),
      )
    }
  }, [amount])

  const handleBookRider = (rider: Rider) => {
    navigation.navigate("RidesSummary", {
      rider,
      amount,
    })
  }

  const handleSendBid = (rider: Rider) => {
    // Navigate to the same screen as Book Rider
    navigation.navigate("RidesSummary", {
      rider,
      amount,
      fromBid: true, // Optional flag to indicate it came from a bid
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rider Bids</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.myBidSection}>
          <Text style={styles.myBidTitle}>My Bid</Text>
          <View style={styles.myBidAmount}>
            <Text style={styles.bidAmountText}>N {amount}</Text>
          </View>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressItem}>
            <View style={styles.addressIconContainer}>
              <Image source={icons.senderLocation} style={styles.locationIcon} />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>Sender Address</Text>
              <Text style={styles.addressText}>
                {deliveryDetails.senderAddress || "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo"}
              </Text>
            </View>
          </View>

          {/* Dotted line connector */}
          <View style={styles.dottedLineContainer}>
            <View style={styles.dottedLine} />
          </View>

          <View style={styles.addressItem}>
            <View style={styles.addressIconContainer}>
              <Image source={icons.receiverLocation} style={styles.locationIcon} />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>Receiver Address</Text>
              <Text style={styles.addressText}>
                {deliveryDetails.receiverAddress || "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ridersSection}>
          {riders.map((rider) => (
            <View key={rider.id} style={styles.riderCard}>
              <View style={styles.riderInfo}>
                <Image
                  source={pp}
                  style={styles.riderImage}
                  defaultSource={{ uri: "/placeholder.svg?height=60&width=60" }}
                />
                <View style={styles.riderDetails}>
                  <Text style={styles.riderName}>{rider.name}</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} name="star" size={16} color="#800080" />
                    ))}
                  </View>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>N {rider.price}</Text>
                </View>
              </View>

              <View style={styles.riderVehicleInfo}>
                <View style={styles.vehicleDetail}>
                  <Icon name="bicycle-outline" size={20} color="#000000" />
                  <Text style={styles.vehicleDetailText}>{rider.vehicleType}</Text>
                </View>
                <View style={styles.vehicleDetail}>
                  <Icon name="color-palette-outline" size={20} color="#000000" />
                  <Text style={styles.vehicleDetailText}>{rider.vehicleColor}</Text>
                </View>
                <View style={styles.vehicleDetail}>
                  <Icon name="time-outline" size={20} color="#000000" />
                  <Text style={styles.vehicleDetailText}>{rider.distance}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.sendBidButton} onPress={() => handleSendBid(rider)}>
                  <Text style={styles.sendBidButtonText}>Send Bid</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookRiderButton} onPress={() => handleBookRider(rider)}>
                  <Text style={styles.bookRiderButtonText}>Book Rider</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  myBidSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  myBidTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  myBidAmount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#800080",
  },
  bidAmountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#800080",
  },
  addressSection: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    position: "relative",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingLeft: 8,
  },
  addressIconContainer: {
    marginRight: 12,
    marginTop: 6,
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  dottedLineContainer: {
    position: "absolute",
    left: 24,
    top: 30,
    bottom: 30,
    alignItems: "center",
  },
  dottedLine: {
    height: "55%",
    width: 0.5,
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: "#CCCCCC",
    borderRadius: 1,
    marginLeft: 9,
    marginTop: 3,
  },
  ridersSection: {
    padding: 16,
  },
  riderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  priceTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#800080",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#800080",
  },
  riderVehicleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  vehicleDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666666",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendBidButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#800080",
    alignItems: "center",
    marginRight: 8,
  },
  sendBidButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#800080",
  },
  bookRiderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#800080",
    alignItems: "center",
    marginLeft: 8,
  },
  bookRiderButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  locationIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
})

