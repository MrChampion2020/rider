
import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"

interface DeliveryFeeModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  onEditSchedule: () => void
  amount: string
  onAmountChange?: (value: string) => void
}

export const DeliveryFeeModal: React.FC<DeliveryFeeModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onEditSchedule,
  amount,
}) => {
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

          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="bicycle" size={32} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.priceInfo}>
            Price displayed is the estimated price for this delivery, you can edit price and send out a bid to available
            riders
          </Text>

          <Text style={styles.priceAmount}>{amount}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deliverButton} onPress={onConfirm}>
              <Text style={styles.deliverButtonText}>Deliver Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scheduleButton} onPress={onEditSchedule}>
              <Icon name="calendar-outline" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "rgba(128, 0, 128, 0.1)",
  },
  priceInfo: {
    textAlign: "center",
    color: "#666666",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  priceAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  deliverButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 10,
  },
  deliverButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleButton: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
})

