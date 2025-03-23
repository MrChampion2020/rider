"use client"

import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface TrackParcelProps {
  orderId: string
  status: "order" | "picked_up" | "in_transit" | "delivered"
  fromAddress: string
  toAddress: string
  orderTime: string
  estimatedDelivery: string
  amount: number
  paymentMethod: string
  rider: {
    name: string
    image: string
    rating: number
  }
  onTrackRider: () => void
  onContactRider: () => void
  onCallRider: () => void
}

export function TrackParcel({
  orderId,
  status,
  fromAddress,
  toAddress,
  orderTime,
  estimatedDelivery,
  amount,
  paymentMethod,
  rider,
  onTrackRider,
  onContactRider,
  onCallRider,
}: TrackParcelProps) {
  const statusText = {
    order: "Order Received",
    picked_up: "Picked up",
    in_transit: "In transit",
    delivered: "Delivered",
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image source={{ uri: "/placeholder.svg?height=200&width=400" }} style={styles.map} />
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status === "delivered" ? "Delivered" : "In Transit"}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.orderId}>Order id</Text>
        <Text style={styles.orderIdValue}>{orderId}</Text>

        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Text style={styles.addressLabel}>From</Text>
            <Text style={styles.addressValue}>{fromAddress}</Text>
          </View>
          <View style={styles.addressRow}>
            <Text style={styles.addressLabel}>To</Text>
            <Text style={styles.addressValue}>{toAddress}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time of Order</Text>
            <Text style={styles.detailValue}>{orderTime}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>{estimatedDelivery}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Sub total</Text>
            <Text style={styles.detailValue}>N {amount.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.historyLink}>
          <Text style={styles.historyLinkText}>View full history</Text>
        </TouchableOpacity>

        <View style={styles.progressTrack}>
          {["order", "picked_up", "in_transit", "delivered"].map((step, index) => (
            <React.Fragment key={step}>
              <View style={[styles.progressPoint, status === step ? styles.activePoint : styles.completedPoint]} />
              {index < 3 && (
                <View style={[styles.progressLine, status === step ? styles.activeLine : styles.completedLine]} />
              )}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.statusLabels}>
          {Object.entries(statusText).map(([key, text]) => (
            <Text key={key} style={[styles.statusLabel, status === key && styles.activeStatusLabel]}>
              {text}
            </Text>
          ))}
        </View>

        <View style={styles.riderInfo}>
          <Image source={{ uri: rider.image }} style={styles.riderImage} />
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>{rider.name}</Text>
            <View style={styles.ratingContainer}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Icon key={index} name={index < rider.rating ? "star" : "star-outline"} size={16} color="#FFD700" />
                ))}
            </View>
          </View>
          <View style={styles.riderActions}>
            <TouchableOpacity style={styles.riderAction} onPress={onContactRider}>
              <Icon name="chatbubble-outline" size={24} color="#800080" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.riderAction} onPress={onCallRider}>
              <Icon name="call-outline" size={24} color="#800080" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.trackButton} onPress={onTrackRider}>
          <View style={styles.trackButtonContent}>
            <Icon name="bicycle" size={24} color="#800080" />
            <Text style={styles.trackButtonText}>Track Rider</Text>
          </View>
          <Icon name="chevron-forward" size={24} color="#800080" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mapContainer: {
    height: 200,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#800080",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 16,
  },
  orderId: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  orderIdValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  addressContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  addressRow: {
    marginBottom: 12,
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
  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
  },
  detailValue: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  historyLink: {
    alignItems: "center",
    marginBottom: 24,
  },
  historyLinkText: {
    color: "#800080",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activePoint: {
    backgroundColor: "#800080",
  },
  completedPoint: {
    backgroundColor: "#DDDDDD",
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  activeLine: {
    backgroundColor: "#800080",
  },
  completedLine: {
    backgroundColor: "#DDDDDD",
  },
  statusLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statusLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    flex: 1,
  },
  activeStatusLabel: {
    color: "#800080",
    fontWeight: "500",
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  riderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  riderActions: {
    flexDirection: "row",
    gap: 12,
  },
  riderAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  trackButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#800080",
  },
})

