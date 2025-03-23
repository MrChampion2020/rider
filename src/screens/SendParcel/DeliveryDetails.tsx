"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Modal } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"

type DeliveryDetailsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "DeliveryDetails">

export default function DeliveryDetails({ route }: { route: { params: { rideId: string } } }) {
  const navigation = useNavigation<DeliveryDetailsNavigationProp>()
  const { rideId } = route.params

  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [showComplaintModal, setShowComplaintModal] = useState(false)

  const handleRateRider = () => {
    setShowRatingModal(true)
  }

  const handleSubmitRating = () => {
    setShowRatingModal(false)
    // Submit rating logic here
  }

  const handleComplaint = () => {
    setShowComplaintModal(true)
  }

  const handleSubmitComplaint = () => {
    setShowComplaintModal(false)
    // Submit complaint logic here
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Text style={styles.deliveryTitle}>Delivery Completed</Text>
            <Icon name="checkmark-circle" size={24} color="#00A651" />
          </View>

          <View style={styles.deliveryInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order ID:</Text>
              <Text style={styles.infoValue}>ORD-12ESCJK3K</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Delivery Date:</Text>
              <Text style={styles.infoValue}>March 15, 2025</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Delivery Time:</Text>
              <Text style={styles.infoValue}>01:22 PM</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.addressSection}>
            <View style={styles.addressItem}>
              <Icon name="location" size={20} color="#00A651" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Sender Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
            <View style={styles.addressDivider} />
            <View style={styles.addressItem}>
              <Icon name="location" size={20} color="#FF0000" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Receiver Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Delivery Fee</Text>
              <Text style={styles.paymentValue}>₦2,000</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Method</Text>
              <Text style={styles.paymentValue}>Wallet</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Status</Text>
              <View style={styles.paymentStatusBadge}>
                <Text style={styles.paymentStatusText}>Paid</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.riderSection}>
            <Text style={styles.sectionTitle}>Rider Details</Text>
            <View style={styles.riderInfo}>
              <Image
                source={{
                  uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2067-jbseVjnDRiEHkz6TLh4RdPP2Lk7H9F.png",
                }}
                style={styles.riderImage}
                defaultSource={{ uri: "/placeholder.svg?height=60&width=60" }}
              />
              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>Maleek Oladimeji</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="star" size={16} color="#FFD700" />
                  ))}
                </View>
                <Text style={styles.riderVehicle}>Bike • Black</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rateButton} onPress={handleRateRider}>
            <Icon name="star" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Rate Rider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.complaintButton} onPress={handleComplaint}>
            <Icon name="alert-circle" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Rating Modal */}
      <Modal visible={showRatingModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.ratingModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Rate Your Experience</Text>
              <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.riderRatingInfo}>
              <Image
                source={{
                  uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2067-jbseVjnDRiEHkz6TLh4RdPP2Lk7H9F.png",
                }}
                style={styles.modalRiderImage}
                defaultSource={{ uri: "/placeholder.svg?height=60&width=60" }}
              />
              <Text style={styles.modalRiderName}>Maleek Oladimeji</Text>
            </View>

            <View style={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starButton}>
                  <Icon name="star" size={36} color={star <= rating ? "#FFD700" : "#CCCCCC"} />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRating}>
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Complaint Modal */}
      <Modal visible={showComplaintModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.complaintModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Report an Issue</Text>
              <TouchableOpacity onPress={() => setShowComplaintModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.complaintText}>Please select the issue you experienced with this delivery:</Text>

            <View style={styles.complaintOptions}>
              <TouchableOpacity style={styles.complaintOption}>
                <Text style={styles.complaintOptionText}>Rider was late</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.complaintOption}>
                <Text style={styles.complaintOptionText}>Package was damaged</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.complaintOption}>
                <Text style={styles.complaintOptionText}>Rider was unprofessional</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.complaintOption}>
                <Text style={styles.complaintOptionText}>Wrong delivery location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.complaintOption}>
                <Text style={styles.complaintOptionText}>Other issue</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComplaint}>
              <Text style={styles.submitButtonText}>Submit Report</Text>
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
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00A651",
  },
  deliveryInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: "#666666",
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
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
  paymentSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666666",
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  paymentStatusBadge: {
    backgroundColor: "#00A651",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  riderSection: {
    marginBottom: 16,
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: 4,
  },
  riderVehicle: {
    fontSize: 14,
    color: "#666666",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rateButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  complaintButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0000",
    paddingVertical: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingModal: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
  },
  complaintModal: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  riderRatingInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalRiderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  modalRiderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  starRating: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  starButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  complaintText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
  },
  complaintOptions: {
    marginBottom: 24,
  },
  complaintOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  complaintOptionText: {
    fontSize: 14,
    color: "#000000",
  },
})

