
"use client"
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../types/navigation"

type DeliveryFeeNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "PaymentDetails">

interface DeliveryFeeModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  amount: string
  onAmountChange: (amount: string) => void
}

export function ReceiverModal({ visible, onClose, onConfirm, amount, onAmountChange }: DeliveryFeeModalProps) {
  const navigation = useNavigation<DeliveryFeeNavigationProp>()

  const handleDeliverNow = () => {
    // First confirm the amount
    onConfirm()

    // Then navigate to search riders screen
    navigation.navigate("SearchRider", { amount })
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Delivery Fee</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Icon name="bicycle" size={32} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.description}>
            Price displayed is the estimated price for this delivery, you can edit price and send out a bid to available
            riders
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.currency}>₦</Text>
            <TextInput
              style={styles.priceInput}
              value={amount}
              onChangeText={onAmountChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#999999"
            />
          </View>

          <TouchableOpacity style={styles.deliverButton} onPress={handleDeliverNow}>
            <Text style={styles.deliverButtonText}>Deliver Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    width: 110,
    margin: 'auto'
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  currency: {
    fontSize: 36,
    fontWeight: "600",
    color: "#000000",
    marginRight: 4,
    display: 'none'
  },
  priceInput: {
    fontSize: 45,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    minWidth: 120,
    padding: 0,
  },
  deliverButton: {
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  deliverButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

