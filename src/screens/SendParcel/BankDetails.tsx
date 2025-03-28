"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type BankDetailsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "BankDetails">

interface BankDetailsProps {
  route: {
    params: {
      amount: string
      rider: any
    }
  }
}

export default function BankDetails({ route }: BankDetailsProps) {
  const navigation = useNavigation<BankDetailsNavigationProp>()
  const { amount, rider } = route.params

  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePaymentMade = () => {
    setIsLoading(true)
    // Simulate payment verification
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    navigation.navigate("RidesSummary", {
      rider,
      amount,
      paymentStatus: "success",
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.bankDetailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name</Text>
            <Text style={styles.detailValue}>VFB Microfinance Bank</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailValue}>Fast Logistics</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <View style={styles.accountNumberContainer}>
              <Text style={styles.detailValue}>123456789</Text>
              <Icon name="copy-outline" size={20} color="#800080" />
            </View>
          </View>

          <View style={styles.warningContainer}>
            <Icon name="alert-circle" size={20} color="#F5A623" />
            <Text style={styles.warningText}>Kindly note that this account can be used only once</Text>
          </View>
        </View>

        <View style={styles.paymentBreakdownCard}>
          <Text style={styles.sectionTitle}>Payment Breakdown</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Delivery fee</Text>
            <Text style={styles.breakdownValue}>2,000</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>22,000</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentMade} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.paymentButtonText}>Payment Made</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Payment Confirmation Modal */}
      <Modal visible={showConfirmation} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowConfirmation(false)}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>

            <Text style={styles.confirmationTitle}>Payment Confirmation</Text>

            <View style={styles.successIconContainer}>
              <View style={styles.successIconOuter}>
                <View style={styles.successIconInner}>
                  <Icon name="checkmark" size={40} color="white" />
                </View>
              </View>
            </View>

            <Text style={styles.confirmationText}>
              Your payment has been received, now you can proceed to complete your rider request
            </Text>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Proceed</Text>
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
    paddingTop: 40,
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
  bankDetailsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  accountNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9E5",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#F5A623",
    marginLeft: 8,
    flex: 1,
  },
  paymentBreakdownCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#666666",
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  footer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  paymentButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationModal: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
    marginTop: 8,
  },
  successIconContainer: {
    marginBottom: 24,
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
  confirmationText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})

