
// "use client"
// import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native"
// import Icon from "react-native-vector-icons/Ionicons"
// import { useNavigation } from "@react-navigation/native"
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
// import type { SendParcelStackParamList } from "../../types/navigation"

// type DeliveryFeeNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "PaymentDetails">

// interface DeliveryFeeModalProps {
//   visible: boolean
//   onClose: () => void
//   onConfirm: () => void
//   amount: string
//   onAmountChange: (amount: string) => void
// }

// export function DeliveryFeeModal({ visible, onClose, onConfirm, amount, onAmountChange }: DeliveryFeeModalProps) {
//   const navigation = useNavigation<DeliveryFeeNavigationProp>()

//   const handleDeliverNow = () => {
//     // First confirm the amount
//     onConfirm()

//     // Then navigate to search riders screen
//     navigation.navigate("SearchRiders", { amount })
//   }

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Delivery Fee</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={24} color="#000000" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.iconContainer}>
//             <View style={styles.iconCircle}>
//               <Icon name="bicycle" size={32} color="#FFFFFF" />
//             </View>
//           </View>

//           <Text style={styles.description}>
//             Price displayed is the estimated price for this delivery, you can edit price and send out a bid to available
//             riders
//           </Text>

//           <View style={styles.priceContainer}>
//             <Text style={styles.currency}>₦</Text>
//             <TextInput
//               style={styles.priceInput}
//               value={amount}
//               onChangeText={onAmountChange}
//               keyboardType="numeric"
//               placeholder="0"
//               placeholderTextColor="#999999"
//             />
//           </View>

//           <TouchableOpacity style={styles.deliverButton} onPress={handleDeliverNow}>
//             <Text style={styles.deliverButtonText}>Deliver Now</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   )
// }

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 20,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000000",
//     width: 110,
//     margin: 'auto'
//   },
//   iconContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#800080",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   description: {
//     fontSize: 14,
//     color: "#666666",
//     textAlign: "center",
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   priceContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   currency: {
//     fontSize: 36,
//     fontWeight: "600",
//     color: "#000000",
//     marginRight: 4,
//     display: 'none'
//   },
//   priceInput: {
//     fontSize: 45,
//     fontWeight: "900",
//     color: "#000000",
//     textAlign: "center",
//     minWidth: 120,
//     padding: 0,
//   },
//   deliverButton: {
//     backgroundColor: "#800080",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   deliverButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// })




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

