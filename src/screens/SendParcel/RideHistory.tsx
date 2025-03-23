
"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"
import pp from "../../assets/images/pp.png"

type RideHistoryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RideHistory">

interface RideHistoryItem {
  id: string
  orderId: string
  status: "Order" | "Picked up" | "In transit" | "Delivered"
  from: string
  to: string
  orderTime: string
  deliveryTime: string
  riderName: string
  riderImage: string
  riderRating: number
}

export default function RideHistory() {
  const navigation = useNavigation<RideHistoryNavigationProp>()
  const [activeTab, setActiveTab] = useState<"Scheduled" | "Active" | "Delivered">("Active")

  const [rides, setRides] = useState<RideHistoryItem[]>([
    {
      id: "1",
      orderId: "ORD-12ESCJK3K",
      status: "In transit",
      from: "No 1, abcd street...",
      to: "No 1, abcd street...",
      orderTime: "11:24 AM",
      deliveryTime: "01:22 PM",
      riderName: "Maleek Oladimeji",
      riderImage:
       pp,
      riderRating: 5,
    },
    {
      id: "2",
      orderId: "ORD-12ESCJK3K",
      status: "In transit",
      from: "No 1, abcd street...",
      to: "No 1, abcd street...",
      orderTime: "11:24 AM",
      deliveryTime: "01:22 PM",
      riderName: "Maleek Oladimeji",
      riderImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2064-JyHllSe6QIfG3bCAR91gxzI12naOcC.png",
      riderRating: 5,
    },
  ])

  const handleRidePress = (ride: RideHistoryItem) => {
    navigation.navigate("RidesDetails", { rideId: ride.id })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.tabsWrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Scheduled" && styles.activeTab]}
            onPress={() => setActiveTab("Scheduled")}
          >
            <Text style={[styles.tabText, activeTab === "Scheduled" && styles.activeTabText]}>Scheduled</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Active" && styles.activeTab]}
            onPress={() => setActiveTab("Active")}
          >
            <Text style={[styles.tabText, activeTab === "Active" && styles.activeTabText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Delivered" && styles.activeTab]}
            onPress={() => setActiveTab("Delivered")}
          >
            <Text style={[styles.tabText, activeTab === "Delivered" && styles.activeTabText]}>Delivered</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {rides.map((ride) => (
          <TouchableOpacity key={ride.id} style={styles.rideCard} onPress={() => handleRidePress(ride)}>
            <View style={styles.rideHeader}>
              <Text style={styles.orderId}>{ride.orderId}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>In Transit</Text>
              </View>
            </View>

            <View style={styles.rideDetails}>
              {/* Address section with columns */}
              <View style={styles.addressSection}>
                <View style={styles.addressColumns}>
                  <View style={styles.addressColumn}>
                    <Text style={styles.addressLabel}>From</Text>
                    <Text style={styles.addressValue}>{ride.from}</Text>
                  </View>
                  <View style={styles.addressColumn}>
                    <Text style={styles.addressLabel}>To</Text>
                    <Text style={styles.addressValue}>{ride.to}</Text>
                  </View>
                </View>
              </View>

              {/* Time section with columns */}
              <View style={styles.timeSection}>
                <View style={styles.timeColumns}>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeLabel}>Time of Order</Text>
                    <Text style={styles.timeValue}>{ride.orderTime}</Text>
                  </View>
                  <View style={styles.timeColumn}>
                    <Text style={styles.timeLabel}>Estimated Delivery</Text>
                    <Text style={styles.timeValue}>{ride.deliveryTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.progressContainer}>
              {/* Continuous progress line */}
              <View style={styles.progressLineContainer}>
                <View style={styles.activeLine} />
                <View style={styles.inactiveLine} />
              </View>

              {/* Progress steps */}
              <View style={styles.progressTracker}>
                <View style={styles.progressStepContainer}>
                  <View style={styles.progressDotOuter}>
                    <View style={styles.progressDotInner} />
                  </View>
                  <Text style={styles.progressLabel}>Order</Text>
                </View>
                <View style={styles.progressStepContainer}>
                  <View style={styles.progressDotOuter}>
                    <View style={styles.progressDotInner} />
                  </View>
                  <Text style={styles.progressLabel}>Picked up</Text>
                </View>
                <View style={styles.progressStepContainer}>
                  <View style={styles.progressDotOuter}>
                    <View style={styles.progressDotInner} />
                  </View>
                  <Text style={styles.progressLabel}>In transit</Text>
                </View>
                <View style={styles.progressStepContainer}>
                  <View style={[styles.progressDotOuter, styles.inactiveDotOuter]}>
                    <View style={[styles.progressDotInner, styles.inactiveDotInner]} />
                  </View>
                  <Text style={styles.progressLabel}>Delivered</Text>
                </View>
              </View>
            </View>

            <View style={styles.riderSection}>
              <Image
                source={pp}
                style={styles.riderImage}
                defaultSource={{ uri: "/placeholder.svg?height=50&width=50" }}
              />
              <View style={styles.riderInfo}>
                <Text style={styles.riderName}>{ride.riderName}</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="star" size={14} color="#800080" />
                  ))}
                </View>
              </View>
              <View style={styles.riderActions}>
                <TouchableOpacity style={styles.riderActionButton}>
                  <Icon name="chatbubble-ellipses" size={24} color="#800080" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.riderActionButton}>
                  <Icon name="call" size={24} color="#800080" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  headerRight: {
    width: 40,
  },
  tabsWrapper: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: "#800080",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  rideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  statusBadge: {
    backgroundColor: "#800080",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  rideDetails: {
    marginBottom: 16,
  },
  addressSection: {
    marginBottom: 12,
  },
  addressColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressColumn: {
    flex: 1,
    marginRight: 8,
  },
  addressLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 14,
    color: "#000000",
  },
  timeSection: {
    marginBottom: 12,
  },
  timeColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeColumn: {
    flex: 1,
    marginRight: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  progressContainer: {
    marginBottom: 16,
    height: 40,
    position: "relative",
  },
  progressLineContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 8,
    left: 8,
    right: 8,
    height: 1,
    zIndex: 1,
  },
  activeLine: {
    flex: 3,
    height: 1,
    backgroundColor: "#800080",
  },
  inactiveLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  progressTracker: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 2,
  },
  progressStepContainer: {
    alignItems: "center",
    width: 70,
  },
  progressDotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  progressDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  inactiveDotOuter: {
    backgroundColor: "#CCCCCC",
  },
  inactiveDotInner: {
    backgroundColor: "#FFFFFF",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
  riderSection: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 16,
  },
  riderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  riderActions: {
    flexDirection: "row",
  },
  riderActionButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
})

