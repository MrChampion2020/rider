

"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Modal } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"
import { useOrder } from "../../contexts/OrderContext"
import pp from "../../assets/images/pp.png"
import { colors } from "../../constants/colors"

type RideSummaryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RideSummary">

export default function RidesSummary({
  route,
}: { route: { params: { rider: any; amount: string; paymentStatus?: string } } }) {
  const navigation = useNavigation<RideSummaryNavigationProp>()
  const { rider, amount, paymentStatus } = route.params
  const { deliveryDetails } = useOrder()

  const [isDeliverySummaryExpanded, setIsDeliverySummaryExpanded] = useState(true)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  useEffect(() => {
    if (paymentStatus === "success") {
      setPaymentComplete(true)
    }
  }, [paymentStatus])

  const handleProceed = () => {
    // If payment is required but not completed, navigate to bank details
    if (deliveryDetails.paymentMethod === "bank_transfer" && !paymentComplete && deliveryDetails.payer === "sender") {
      navigation.navigate("BankDetails", { rider, amount })
      return
    }

    // Otherwise show confirmation modal
    setShowConfirmationModal(true)
  }

  const handleTrackRider = () => {
    setShowConfirmationModal(false)
    navigation.navigate("RideHistory")
  }

  // Format the amount for display
  const formattedAmount = typeof amount === "string" ? amount : deliveryDetails.delivery.toString()

  // Determine payment status message and color
  const getPaymentStatusUI = () => {
    if (deliveryDetails.payer === "receiver") {
      return {
        icon: <View style={[styles.statusDot, { backgroundColor: "#F5A623" }]} />,
        message: "Delivery fee to be paid by receiver",
        color: "#F5A623",
      }
    } else if (deliveryDetails.paymentMethod === "bank_transfer") {
      if (paymentComplete) {
        return {
          icon: <View style={[styles.statusDot, { backgroundColor: "#00A651" }]} />,
          message: "Delivery fee paid via bank transfer",
          color: "#00A651",
        }
      } else {
        return {
          icon: <View style={[styles.statusDot, { backgroundColor: "#FF0000" }]} />,
          message: "Delivery fee & POD fee Not Paid",
          color: "#FF0000",
        }
      }
    } else {
      return {
        icon: <View style={[styles.statusDot, { backgroundColor: "#00A651" }]} />,
        message: `Delivery fee paid via ${deliveryDetails.paymentMethod || "wallet"}`,
        color: "#00A651",
      }
    }
  }

  const paymentStatus_UI = getPaymentStatusUI()

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

         

          <View>
           <Text style={styles.totalLabel}>Total</Text>

          <View style={styles.deliveryFeeNote}>
            {paymentStatus_UI.icon}
            <Text style={[styles.deliveryFeeText, { color: paymentStatus_UI.color }]}>{paymentStatus_UI.message}</Text>
          </View>
          
          </View>

         

          <View>
          <Text style={styles.totalAmount}>N{formattedAmount}</Text>
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
                    {deliveryDetails.senderAddress || "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo"}
                  </Text>
                </View>
              </View>
              <View style={styles.addressDivider} />
              <View style={styles.addressItem}>
                <Icon name="location" size={20} color="#FF0000" />
                <View style={styles.addressContent}>
                  <Text style={styles.addressLabel}>Receiver Address</Text>
                  <Text style={styles.addressText}>
                    {deliveryDetails.receiverAddress ||
                      "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sender Name</Text>
                <Text style={styles.detailValue}>{deliveryDetails.senderName || "Qamardeen Malik"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sender Phone</Text>
                <Text style={styles.detailValue}>{deliveryDetails.senderPhone || "07030123456"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Receiver Name</Text>
                <Text style={styles.detailValue}>{deliveryDetails.receiverName || "Adebisi Lateefat"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Receiver Phone</Text>
                <Text style={styles.detailValue}>{deliveryDetails.receiverPhone || "07031234567"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Name</Text>
                <Text style={styles.detailValue}>{deliveryDetails.parcelName || "Samsung Phone"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Category</Text>
                <Text style={styles.detailValue}>{deliveryDetails.parcelCategory || "Electronics"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Parcel Value</Text>
                <Text style={styles.detailValue}>{deliveryDetails.parcelValue || "100,000 - 200,000"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>{deliveryDetails.description || "Nil"}</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payer</Text>
                <Text style={styles.detailValue}>
                  {deliveryDetails.payer
                    ? `${deliveryDetails.payer === "sender" ? "Sender" : "Receiver"} - ${deliveryDetails.payer === "sender" ? deliveryDetails.senderName : deliveryDetails.receiverName}`
                    : "Sender - Qamardeen Malik"}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment method</Text>
                <Text style={styles.detailValue}>{deliveryDetails.paymentMethod || "Wallet"}</Text>
              </View>
              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pay on delivery</Text>
                <Text style={styles.detailValue}>{deliveryDetails.payOnDelivery ? "Yes" : "No"}</Text>
              </View>
              {deliveryDetails.payOnDelivery && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Pay on delivery amount</Text>
                  <Text style={styles.detailValue}>
                    {deliveryDetails.amount > 0 ? `₦${deliveryDetails.amount.toLocaleString()}` : "NA"}
                  </Text>
                </View>
              )}
              {!deliveryDetails.payOnDelivery && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Pay on delivery amount</Text>
                  <Text style={styles.detailValue}>NA</Text>
                </View>
              )}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Delivery fee for rider</Text>
                <Text style={styles.detailValue}>N{formattedAmount}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.riderCard}>
          <View style={styles.riderInfo}>
            <Image
              source={{ uri: rider.image }}
              style={styles.riderImage}
              defaultSource={pp}
            />
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>{rider.name}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" size={16} color={star <= rider.rating ? colors.primary : "#CCCCCC"} />
                ))}
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>N {rider.price}</Text>
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
          <Text style={styles.proceedButtonText}>
            {deliveryDetails.paymentMethod === "bank_transfer" && !paymentComplete && deliveryDetails.payer === "sender"
              ? "Proceed to Payment"
              : "Proceed"}
          </Text>
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
  totalSection: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    gap: 40
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: "900",
    color: "#800080",
    marginBottom: 8,
  },
  deliveryFeeNote: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deliveryFeeText: {
    fontSize: 14,
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
    paddingTop: 440,
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

