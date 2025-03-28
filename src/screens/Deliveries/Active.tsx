
"use client"

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"

// Define the delivery item type
interface DeliveryItem {
  id: string
  status: "In transit" | "Picked up" | "Order"
  fromAddress: string
  toAddress: string
  orderTime: string
  deliveryTime: string
  rider: {
    name: string
    avatar: any
    rating: number
  }
}

const ActiveDeliveries = () => {
  const navigation = useNavigation()

  // Sample data
  const deliveries: DeliveryItem[] = [
    {
      id: "ORD-12ESCJK3K",
      status: "In transit",
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street, saki....",
      orderTime: "11:24 AM",
      deliveryTime: "01:22 PM",
      rider: {
        name: "Maleek Oladimeji",
        avatar: require("../../assets/images/pp.png"),
        rating: 5,
      },
    },
    {
      id: "ORD-21JWD23JFEKNK2WNRK",
      status: "Picked up",
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street, saki....",
      orderTime: "11:24 AM",
      deliveryTime: "01:22 PM",
      rider: {
        name: "Afeez Wale",
        avatar: require("../../assets/images/pp.png"),
        rating: 4,
      },
    },
  ]

  const handleDeliveryPress = (delivery: DeliveryItem) => {
    // Navigate to RideDetailsMap screen with the delivery ID
    navigation.navigate("RideDetailsMap", { deliveryId: delivery.id })
  }

  const renderDeliveryItem = ({ item }: { item: DeliveryItem }) => (
    <TouchableOpacity style={styles.deliveryCard} onPress={() => handleDeliveryPress(item)}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressColumn}>
          <Text style={styles.addressLabel}>From</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {item.fromAddress}
          </Text>

          <Text style={styles.timeLabel}>Time of Order</Text>
          <Text style={styles.timeText}>{item.orderTime}</Text>
        </View>

        <View style={styles.addressColumn}>
          <Text style={styles.addressLabel}>To</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {item.toAddress}
          </Text>

          <Text style={styles.timeLabel}>Estimated Delivery</Text>
          <Text style={styles.timeText}>{item.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <Text style={styles.progressText}>Order</Text>
        </View>
        <View style={[styles.progressLine, styles.activeLine]} />
        <View style={styles.progressStep}>
          <View style={[styles.progressDot, item.status !== "Order" ? styles.activeDot : styles.inactiveDot]} />
          <Text style={styles.progressText}>Picked up</Text>
        </View>
        <View style={[styles.progressLine, item.status === "In transit" ? styles.activeLine : styles.inactiveLine]} />
        <View style={styles.progressStep}>
          <View style={[styles.progressDot, item.status === "In transit" ? styles.activeDot : styles.inactiveDot]} />
          <Text style={styles.progressText}>In transit</Text>
        </View>
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={styles.progressStep}>
          <View style={[styles.progressDot, styles.inactiveDot]} />
          <Text style={styles.progressText}>Delivered</Text>
        </View>
      </View>

      <View style={styles.riderContainer}>
        <Image source={item.rider.avatar} style={styles.riderAvatar} />
        <View style={styles.riderInfo}>
          <Text style={styles.riderName}>{item.rider.name}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= item.rider.rating ? "star" : "star-outline"}
                size={16}
                color={colors.primary}
              />
            ))}
          </View>
        </View>
        <View style={styles.riderActions}>
          <TouchableOpacity style={styles.riderAction}>
            <Icon name="chatbubble-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.riderAction}>
            <Icon name="phone-portrait-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.trackButton} onPress={() => handleDeliveryPress(item)}>
        <Text style={styles.trackButtonText}>Track Delivery</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={deliveries}
      renderItem={renderDeliveryItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryHeader: {
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
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  addressContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  addressColumn: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#000000",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  progressStep: {
    alignItems: "center",
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: "#E0E0E0",
  },
  progressLine: {
    flex: 1,
    height: 0.3,
    marginBottom: 15,
  },
  activeLine: {
    backgroundColor: colors.primary,
  },
  inactiveLine: {
    backgroundColor: "#E0E0E0",
  },
  progressText: {
    fontSize: 10,
    color: "#666666",
  },
  riderContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 16,
    marginBottom: 16,
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  riderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  riderName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  riderActions: {
    flexDirection: "row",
  },
  riderAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  trackButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default ActiveDeliveries

