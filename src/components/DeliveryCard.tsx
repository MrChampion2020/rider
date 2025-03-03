
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"
import { formatTime } from "../utils/Fomatters"

interface DeliveryCardProps {
  orderId: string
  status: "In Transit" | "Delivered" | "Picked up" | "Order Received"
  fromAddress: string
  toAddress: string
  orderTime: Date
  estimatedDelivery: Date
  riderName: string
  riderRating: number
  onPress?: () => void
  onChatPress?: () => void
  onCallPress?: () => void
}

export function DeliveryCard({
  orderId,
  status,
  fromAddress,
  toAddress,
  orderTime,
  estimatedDelivery,
  riderName,
  riderRating,
  onPress,
  onChatPress,
  onCallPress,
}: DeliveryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderId}>{orderId}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.column}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>{fromAddress}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>{toAddress}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.column}>
          <Text style={styles.label}>Time of Order</Text>
          <Text style={styles.value}>{formatTime(orderTime)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Estimated Delivery</Text>
          <Text style={styles.value}>{formatTime(estimatedDelivery)}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          {["Order Received", "Picked up", "In transit", "Delivered"].map((step, index) => (
            <React.Fragment key={step}>
              <View
                style={[
                  styles.progressDot,
                  (status === "In Transit" && index <= 2) ||
                  (status === "Picked up" && index <= 1) ||
                  (status === "Delivered" && index <= 3)
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              >
                {((status === "In Transit" && index <= 2) ||
                  (status === "Picked up" && index <= 1) ||
                  (status === "Delivered" && index <= 3)) && <View style={styles.innerDot} />}
              </View>
              {index < 3 && (
                <View
                  style={[
                    styles.progressLine,
                    (status === "In Transit" && index <= 1) ||
                    (status === "Picked up" && index === 0) ||
                    (status === "Delivered" && index <= 2)
                      ? styles.activeLine
                      : styles.inactiveLine,
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Order{"\n"}Received</Text>
          <Text style={styles.progressLabel}>Picked up</Text>
          <Text style={styles.progressLabel}>In transit</Text>
          <Text style={styles.progressLabel}>Delivered</Text>
        </View>
      </View>

      <View style={styles.riderContainer}>
        <View style={styles.riderInfo}>
          <Image source={require("../assets/images/pp.png")} style={styles.riderImage} />
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>{riderName}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name={index < riderRating ? "star" : "star-outline"}
                  size={16}
                  color={colors.primary}
                />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onChatPress}>
            <Icon name="chatbubble-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onCallPress}>
            <Icon name="call-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  orderId: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
  },
  statusBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },
  statusText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: "500",
  },
  progressContainer: {
    marginBottom: theme.spacing.lg,
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDot: {
    borderColor: colors.primary,
  },
  inactiveDot: {
    borderColor: colors.grey,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  activeLine: {
    backgroundColor: colors.primary,
  },
  inactiveLine: {
    backgroundColor: colors.grey,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: "center",
    width: 70,
  },
  riderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  riderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  riderDetails: {
    gap: 4,
  },
  riderName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
})

