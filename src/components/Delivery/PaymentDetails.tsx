"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"
import { DeliveryFeeModal } from "./DeliveryFeeModal"
import { ProgressSteps } from "./ProgressSteps"

type PaymentDetailsNavigationProp = NativeStackNavigationProp<any, "PaymentDetails">

interface PaymentOption {
  label: string
  value: string
}

const payerOptions: PaymentOption[] = [
  { label: "Sender", value: "sender" },
  { label: "Receiver", value: "receiver" },
]

const paymentMethods: PaymentOption[] = [
  { label: "Wallet", value: "wallet" },
  { label: "Bank Transfer", value: "bank_transfer" },
]

export default function PaymentDetails() {
  const navigation = useNavigation<PaymentDetailsNavigationProp>()
  const [payer, setPayer] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isPayOnDelivery, setIsPayOnDelivery] = useState(false)
  const [amount, setAmount] = useState("")
  const [isDeliverySummaryExpanded, setIsDeliverySummaryExpanded] = useState(false)
  const [showDeliveryFeeModal, setShowDeliveryFeeModal] = useState(false)

  const handleProceed = () => {
    if (payer && paymentMethod) {
      setShowDeliveryFeeModal(true)
    }
  }

  const handleDeliveryFeeConfirm = () => {
    setShowDeliveryFeeModal(false)
    navigation.navigate("RiderBids")
  }

  const renderSelector = (
    label: string,
    options: PaymentOption[],
    value: string,
    onChange: (value: string) => void,
  ) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, value === option.value && styles.selectedOption]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.optionText, value === option.value && styles.selectedOptionText]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Parcel</Text>
        <View style={styles.headerRight} />
      </View>

      <ProgressSteps currentStep={4} />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {renderSelector("Who is paying for the delivery ?", payerOptions, payer, setPayer)}
        {renderSelector("Payment method", paymentMethods, paymentMethod, setPaymentMethod)}

        {paymentMethod === "wallet" && (
          <View style={styles.walletBalance}>
            <Icon name="wallet-outline" size={24} color="white" />
            <Text style={styles.walletBalanceText}>N 200,000</Text>
          </View>
        )}

        <View style={styles.payOnDeliveryContainer}>
          <Text style={styles.label}>Is this Pay on delivery ?</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radioOption} onPress={() => setIsPayOnDelivery(true)}>
              <View style={[styles.radioOuter, isPayOnDelivery && styles.radioOuterSelected]}>
                {isPayOnDelivery && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOption} onPress={() => setIsPayOnDelivery(false)}>
              <View style={[styles.radioOuter, !isPayOnDelivery && styles.radioOuterSelected]}>
                {!isPayOnDelivery && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Type Amount"
            placeholderTextColor="#999999"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {isPayOnDelivery && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              If you choose pay on delivery, the money for the package will be collected at the point of delivery and
              will be credited to your wallet automatically upon delivery
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => setIsDeliverySummaryExpanded(!isDeliverySummaryExpanded)}
        >
          <Text style={styles.summaryButtonText}>Delivery Summary</Text>
          <Icon name={isDeliverySummaryExpanded ? "chevron-up" : "chevron-down"} size={24} color="#000000" />
        </TouchableOpacity>

        {isDeliverySummaryExpanded && (
          <View style={styles.summaryContent}>
            <DeliverySummary />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.proceedButton, (!payer || !paymentMethod) && styles.proceedButtonDisabled]}
          onPress={handleProceed}
          disabled={!payer || !paymentMethod}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <DeliveryFeeModal
        visible={showDeliveryFeeModal}
        onClose={() => setShowDeliveryFeeModal(false)}
        onConfirm={handleDeliveryFeeConfirm}
      />
    </SafeAreaView>
  )
}

const DeliverySummary = () => (
  <View style={styles.summaryDetails}>
    <SummaryItem label="Sender Address" value="No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo" />
    <SummaryItem label="Receiver Address" value="No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo" />
    <SummaryItem label="Sender Name" value="Qamardeen Malik" />
    <SummaryItem label="Sender Phone" value="07030123456" />
    <SummaryItem label="Receiver Name" value="Adebisi Lateefat" />
    <SummaryItem label="Receiver Phone" value="07031234567" />
    <SummaryItem label="Parcel Name" value="Samsung Phone" />
    <SummaryItem label="Parcel Category" value="Electronics" />
    <SummaryItem label="Parcel Value" value="100,000 - 200,000" />
    <SummaryItem label="Description" value="Nil" />
  </View>
)

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
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
  },
  scrollContent: {
    padding: 16,
  },
  selectorContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 12,
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: "#F5F5F5",
  },
  optionText: {
    fontSize: 16,
    color: "#666666",
  },
  selectedOptionText: {
    color: "#800080",
    fontWeight: "500",
  },
  walletBalance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  walletBalanceText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  payOnDeliveryContainer: {
    marginBottom: 24,
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: "#800080",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#800080",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333333",
  },
  amountContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
  },
  infoBox: {
    backgroundColor: "#FFF9E5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  summaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  summaryContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
  },
  summaryDetails: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  proceedButton: {
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

