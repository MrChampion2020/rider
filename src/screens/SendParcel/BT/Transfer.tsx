"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../../types/navigation"

type BankTransferPaymentNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "BankTransferPayment">

interface BankDetailsProps {
  bankName: string
  accountName: string
  accountNumber: string
}

interface PaymentBreakdownProps {
  deliveryFee: number
  total: number
}

export default function BankTransferPayment() {
  const navigation = useNavigation<BankTransferPaymentNavigationProp>()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const bankDetails: BankDetailsProps = {
    bankName: "VFB Microfinance Bank",
    accountName: "Fast Logistics",
    accountNumber: "123456789",
  }

  const paymentBreakdown: PaymentBreakdownProps = {
    deliveryFee: 2000,
    total: 22000,
  }

  const handlePaymentMade = () => {
    setIsLoading(true)
    // Simulate API call to verify payment
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    navigation.navigate("RideSummary", { paymentStatus: "completed" })
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

      <ScrollView style={styles.content}>
        {/* Bank Details Card */}
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name</Text>
            <Text style={styles.detailValue}>{bankDetails.bankName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailValue}>{bankDetails.accountName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <View style={styles.accountNumberContainer}>
              <Text style={styles.detailValue}>{bankDetails.accountNumber}</Text>
              <Icon name="copy-outline" size={20} color="#000000" />
            </View>
          </View>
          <View style={styles.warningContainer}>
            <Icon name="alert-triangle" size={16} color="#FF9800" />
            <Text style={styles.warningText}>Kindly note that this account can be used only once</Text>
          </View>
        </View>

        {/* Payment Breakdown */}
        <Text style={styles.sectionTitle}>Payment Breakdown</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery fee</Text>
            <Text style={styles.detailValue}>{paymentBreakdown.deliveryFee.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{paymentBreakdown.total.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.paymentButton} 
        onPress={handlePaymentMade}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.paymentButtonText}>Payment made</Text>
        )}
      </TouchableOpacity>

      {/* Payment Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleConfirmationClose}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Payment Confirmation</Text>
            
            <View style={styles.successIconContainer}>
              <View style={styles.successIconOuter}>
                <View style={styles.successIconInner}>
                  <Icon name="checkmark" size={40} color="#FFFFFF" />
                </View>
              </View>
            </View>
            
            <Text style={styles.confirmationText}>
              Your payment has been received, now you can proceed to complete your rider request
            </Text>
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
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  accountNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 12,
    color: "#FF9800",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  paymentButton: {
    backgroundColor: "#800080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  paymentButtonText: {
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
  modalContainer: {
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
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
  },
  successIconContainer: {
    marginVertical: 24,
  },
  successIconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E6F7E9",
    justifyContent: "center",
    alignItems: "center",
  },
  successIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#00A651",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
})