"use client"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type RideConfirmationNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RideConfirmation">

export default function RideConfirmationScreen({ route }: { route: { params: { amount: string } } }) {
  const navigation = useNavigation<RideConfirmationNavigationProp>()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { amount } = route.params

  const handleConfirmRide = () => {
    setShowConfirmationModal(true)
  }

  const handleTrackRider = () => {
    setShowConfirmationModal(false)
    navigation.navigate("RideDetails", {
      orderId: "ORD-12ESCJK3K",
      status: "in_transit",
      amount,
    })
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

      <View style={styles.content}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentMethodIndicator}>
              <View style={styles.greenDot} />
              <Text style={styles.paymentMethodText}>Delivery fee paid via wallet</Text>
            </View>
          </View>
          <Text style={styles.totalAmount}>₦{amount}</Text>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Delivery Summary</Text>
            <Icon name="chevron-down" size={24} color="#000000" />
          </View>

          <View style={styles.addressSection}>
            <View style={styles.addressRow}>
              <Icon name="location" size={20} color="#00A651" style={styles.addressIcon} />
              <View>
                <Text style={styles.addressLabel}>Sender Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>

            <View style={styles.addressDivider} />

            <View style={styles.addressRow}>
              <Icon name="location" size={20} color="#FF0000" style={styles.addressIcon} />
              <View>
                <Text style={styles.addressLabel}>Receiver Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            {/* Details rows */}
            <DetailRow label="Sender Name" value="Qamardeen Malik" />
            <DetailRow label="Sender Phone" value="07030123456" />
            <DetailRow label="Receiver Name" value="Adebisi Lateefat" />
            <DetailRow label="Receiver Phone" value="07031234567" />
            <DetailRow label="Parcel Name" value="Samsung Phone" />
            <DetailRow label="Parcel Category" value="Electronics" />
            <DetailRow label="Parcel Value" value="100,000 - 200,000" />
            <DetailRow label="Description" value="Nil" />
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide}>
          <Text style={styles.confirmButtonText}>Confirm Ride</Text>
        </TouchableOpacity>
      </View>

      {/* Ride Confirmation Modal */}
      <Modal visible={showConfirmationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowConfirmationModal(false)}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Ride Confirmation</Text>

            <View style={styles.successIconContainer}>
              <View style={styles.successIconOuter}>
                <Icon name="checkmark" size={40} color="white" />
              </View>
            </View>

            <Text style={styles.modalText}>
              Your ride request has been sent successfully, your rider will arrive in approximately 20 mins
            </Text>

            <TouchableOpacity style={styles.trackButton} onPress={handleTrackRider}>
              <Text style={styles.trackButtonText}>Track Rider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

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
    padding: 16,
  },
  totalSection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  paymentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  paymentMethodIndicator: {
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
  paymentMethodText: {
    fontSize: 12,
    color: "#666666",
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#800080",
    marginTop: 8,
  },
  summarySection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  addressSection: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  addressIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666666",
  },
  addressText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  addressDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
    marginLeft: 28,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 16,
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
    color: "#333333",
    fontWeight: "500",
    textAlign: "right",
  },
  confirmButton: {
    backgroundColor: "#800080",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  trackButton: {
    backgroundColor: "#800080",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  trackButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

