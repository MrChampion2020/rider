"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Modal } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"

type RideSummaryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RideSummary">

export default function RidesSummary({ route }: { route: { params: { rider: any; amount: string } } }) {
  const navigation = useNavigation<RideSummaryNavigationProp>()
  const { rider, amount } = route.params

  const [isDeliverySummaryExpanded, setIsDeliverySummaryExpanded] = useState(true)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const handleProceed = () => {
    setShowConfirmationModal(true)
  }

  const handleTrackRider = () => {
    setShowConfirmationModal(false)
    navigation.navigate("RideHistory")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Summary</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₦{amount}</Text>
          <View style={styles.deliveryFeeNote}>
            <View style={styles.greenDot} />
            <Text style={styles.deliveryFeeText}>Delivery fee paid via wallet</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.summarySection}
          onPress={() => setIsDeliverySummaryExpanded(!isDeliverySummaryExpanded)}
        >
          <Text style={styles.summaryTitle}>Delivery Summary</Text>
          <Icon name={isDeliverySummaryExpanded ? "chevron-up" : "chevron-down"} size={24} color="#000000" />
        </TouchableOpacity>

        {isDeliverySummaryExpanded && (
          <View style={styles.summaryContent}>
            <View style={styles.addressSection}>
              <View style={styles.addressItem}>
                <Icon name="location" size={20} color="#00A651" />
                <View style={styles.addressContent}>
                  <Text style={styles.addressLabel}>Sender Address</Text>
                  <Text style={styles.addressText}>
                    No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo
                  </Text>
                </View>
              </View>
              <View style={styles.addressDivider} />
              <View style={styles.addressItem}>
                <Icon name="location" size={20} color="#FF0000" />
                <View style={styles.addressContent}>
                  <Text style={styles.addressLabel}>Receiver Address</Text>
                  <Text style={styles.addressText}>
                    No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sender Name</Text>
                <Text style={styles.detailValue}>Qamardeen Malik</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sender Phone</Text>
                <Text style={styles.detailValue}>07030123456</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Receiver Name</Text>
                <Text style={styles.detailValue}>Adebisi Lateefat</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Receiver Phone</Text>
                <Text style={styles.detailValue}>07031234567</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Name</Text>
                <Text style={styles.detailValue}>Samsung Phone</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Category</Text>
                <Text style={styles.detailValue}>Electronics</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Value</Text>
                <Text style={styles.detailValue}>100,000 - 200,000</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>Nil</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payer</Text>
                <Text style={styles.detailValue}>Sender - Qamardeen Malik</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment method</Text>
                <Text style={styles.detailValue}>Wallet</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pay on delivery</Text>
                <Text style={styles.detailValue}>No</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pay on delivery amount</Text>
                <Text style={styles.detailValue}>NA</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Delivery fee for rider</Text>
                <Text style={styles.detailValue}>₦{amount}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.riderCard}>
          <View style={styles.riderInfo}>
            <Image
              source={{ uri: rider.image }}
              style={styles.riderImage}
              defaultSource={{ uri: "/placeholder.svg?height=60&width=60" }}
            />
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>{rider.name}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" size={16} color={star <= rider.rating ? "#FFD700" : "#CCCCCC"} />
                ))}
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>₦ {rider.price}</Text>
            </View>
          </View>

          <View style={styles.riderVehicleInfo}>
            <View style={styles.vehicleDetail}>
              <Icon name="bicycle" size={20} color="#000000" />
              <Text style={styles.vehicleDetailText}>{rider.vehicleType}</Text>
            </View>
            <View style={styles.vehicleDetail}>
              <Icon name="color-palette" size={20} color="#000000" />
              <Text style={styles.vehicleDetailText}>{rider.vehicleColor}</Text>
            </View>
            <View style={styles.vehicleDetail}>
              <Icon name="time" size={20} color="#000000" />
              <Text style={styles.vehicleDetailText}>{rider.distance}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* Ride Confirmation Modal */}
      <Modal visible={showConfirmationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <View style={styles.successIconContainer}>
              <View style={styles.successIconOuter}>
                <View style={styles.successIconInner}>
                  <Icon name="checkmark" size={40} color="white" />
                </View>
              </View>
            </View>
            <Text style={styles.confirmationTitle}>Ride Confirmation</Text>
            <Text style={styles.confirmationText}>
              Your ride request has been sent successfully, your rider will arrive in approximately 20 mins
            </Text>
            <TouchableOpacity style={styles.trackRiderButton} onPress={handleTrackRider}>
              <Text style={styles.trackRiderButtonText}>Track Rider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 40
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
  totalSection: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#800080",
    marginBottom: 8,
  },
  deliveryFeeNote: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00A651",
    marginRight: 8,
  },
  deliveryFeeText: {
    fontSize: 14,
    color: "#00A651",
  },
  summarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  summaryContent: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 8,
  },
  addressSection: {
    marginBottom: 16,
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  addressContent: {
    flex: 1,
    marginLeft: 8,
  },
  addressLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  addressDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
    marginLeft: 28,
  },
  detailsSection: {
    backgroundColor: "#FFFFFF",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    maxWidth: "60%",
    textAlign: "right",
  },
  detailDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
  },
  riderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
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
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  proceedButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 440
  
  },
  confirmationModal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 128, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  successIconInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  confirmationText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  trackRiderButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  trackRiderButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})




