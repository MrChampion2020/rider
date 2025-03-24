// "use client"

// import React, { useState } from "react"
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
// import Icon from "react-native-vector-icons/Ionicons"
// import type { SendParcelStackParamList } from "../../../types/navigation"

// type DeliverySummaryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "DeliverySummary">

// interface SummaryItemProps {
//   label: string
//   value: string
// }

// const SummaryItem = ({ label, value }: SummaryItemProps) => (
//   <View style={styles.summaryRow}>
//     <Text style={styles.summaryLabel}>{label}</Text>
//     <Text style={styles.summaryValue}>{value}</Text>
//   </View>
// )

// export default function BankTansfer() {
//   const navigation = useNavigation<DeliverySummaryNavigationProp>()
//   const [expanded, setExpanded] = useState(true)

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="chevron-back" size={24} color="#000000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Ride Summary</Text>
//         <View style={styles.headerRight} />
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Total Amount Card */}
//         <View style={styles.totalCard}>
//           <View>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.feeWarning}>
//               <Icon name="ellipse" size={8} color="#FF0000" /> Delivery fee & POD fee Not Paid
//             </Text>
//           </View>
//           <Text style={styles.totalAmount}>N22,000</Text>
//         </View>

//         {/* Delivery Summary Card */}
//         <View style={styles.card}>
//           <TouchableOpacity 
//             style={styles.sectionHeader} 
//             onPress={() => setExpanded(!expanded)}
//           >
//             <Text style={styles.sectionTitle}>Delivery Summary</Text>
//             <Icon 
//               name={expanded ? "chevron-down" : "chevron-up"} 
//               size={20} 
//               color="#000000" 
//             />
//           </TouchableOpacity>

//           {expanded && (
//             <>
//               <View style={styles.addressSection}>
//                 <View style={styles.addressItem}>
//                   <View style={styles.addressIconContainer}>
//                     <Icon name="ellipse" size={10} color="#00A651" />
//                   </View>
//                   <View>
//                     <Text style={styles.addressLabel}>Sender Address</Text>
//                     <Text style={styles.addressValue}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
//                   </View>
//                 </View>
//                 <View style={styles.addressDivider} />
//                 <View style={styles.addressItem}>
//                   <View style={styles.addressIconContainer}>
//                     <Icon name="ellipse" size={10} color="#FF0000" />
//                   </View>
//                   <View>
//                     <Text style={styles.addressLabel}>Receiver Address</Text>
//                     <Text style={styles.addressValue}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.detailsSection}>
//                 <SummaryItem label="Sender Name" value="Qamardeen Malik" />
//                 <SummaryItem label="Sender Phone" value="07030123456" />
//                 <SummaryItem label="Receiver Name" value="Adebisi Lateefat" />
//                 <SummaryItem label="Receiver Phone" value="07031234567" />
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.detailsSection}>
//                 <SummaryItem label="Parcel Name" value="Samsung Phone" />
//                 <SummaryItem label="Parcel Category" value="Electronics" />
//                 <SummaryItem label="Parcel Value" value="100,000 - 200,000" />
//                 <SummaryItem label="Description" value="Nil" />
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.detailsSection}>
//                 <SummaryItem label="Payer" value="Sender - Qamardeen Malik" />
//                 <SummaryItem label="Payment method" value="Bank Transfer" />
//                 <SummaryItem label="Pay on delivery" value="Yes" />
//                 <SummaryItem label="Pay on delivery amount" value="N20,000" />
//                 <SummaryItem label="Delivery fee for rider" value="N2,000" />
//               </View>
//             </>
//           )}
//         </View>

//         {/* Rider Details Card */}
//         <View style={styles.riderCard}>
//           <View style={styles.riderInfo}>
//             <Image
//               source={require("../../../assets/images/pp.png")}
//               style={styles.riderImage}
//               defaultSource={{ uri: "/placeholder.svg?height=60&width=60" }}
//             />
//             <View style={styles.riderDetails}>
//               <Text style={styles.riderName}>Maleek Oladimeji</Text>
//               <View style={styles.ratingContainer}>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Icon key={star} name="star" size={16} color="#800080" />
//                 ))}
//               </View>
//             </View>
//             <View style={styles.priceTag}>
//               <Text style={styles.priceText}>N 2,000</Text>
//             </View>
//           </View>

//           <View style={styles.riderVehicleInfo}>
//             <View style={styles.vehicleDetail}>
//               <Icon name="bicycle-outline" size={20} color="#000000" />
//               <Text style={styles.vehicleDetailText}>Bike</Text>
//             </View>
//             <View style={styles.vehicleDetail}>
//               <Icon name="color-palette-outline" size={20} color="#000000" />
//               <Text style={styles.vehicleDetailText}>Black</Text>
//             </View>
//             <View style={styles.vehicleDetail}>
//               <Icon name="time-outline" size={20} color="#000000" />
//               <Text style={styles.vehicleDetailText}>3 min away</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate("Payment")}>
//         <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingTop: 30,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#EEEEEE",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000000",
//   },
//   headerRight: {
//     width: 40,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   totalCard: {
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000000",
//     marginBottom: 4,
//   },
//   feeWarning: {
//     fontSize: 12,
//     color: "#FF0000",
//   },
//   totalAmount: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#800080",
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 16,
//     overflow: "hidden",
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: expanded ? 1 : 0,
//     borderBottomColor: "#EEEEEE",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000000",
//   },
//   addressSection: {
//     padding: 16,
//   },
//   addressItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   addressIconContainer: {
//     marginRight: 8,
//     marginTop: 4,
//   },
//   addressLabel: {
//     fontSize: 12,
//     color: "#666666",
//     marginBottom: 4,
//   },
//   addressValue: {
//     fontSize: 14,
//     color: "#333333",
//     lineHeight: 20,
//     maxWidth: "95%",
//   },
//   addressDivider: {
//     height: 1,
//     backgroundColor: "#EEEEEE",
//     marginVertical: 8,
//     marginLeft: 4,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#EEEEEE",
//   },
//   detailsSection: {
//     padding: 16,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: "#666666",
//   },
//   summaryValue: {
//     fontSize: 14,
//     color: "#333333",
//     fontWeight: "500",
//   },
//   riderCard: {
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   riderInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   riderImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 12,
//   },
//   riderDetails: {
//     flex: 1,
//   },
//   riderName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000000",
//     marginBottom: 4,
//   },
//   ratingContainer: {
//     flexDirection: "row",
//   },
//   priceTag: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#800080",
//   },
//   priceText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#800080",
//   },
//   riderVehicleInfo: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   vehicleDetail: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   vehicleDetailText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: "#666666",
//   },
//   proceedButton: {
//     backgroundColor: "#800080",
//     margin: 16,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   proceedButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// })



"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../types/navigation"

type BankTransferPaymentNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "BankTransferPayment">

export default function BankTransferPayment({ route }: { route: { params: { amount: string } } }) {
  const navigation = useNavigation<BankTransferPaymentNavigationProp>()
  const { amount } = route.params
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [reference, setReference] = useState("")

  const handleConfirmPayment = () => {
    if (reference.trim()) {
      setPaymentConfirmed(true)
    }
  }

  const handleProceed = () => {
    navigation.navigate("SearchRider", { amount })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Transfer</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {!paymentConfirmed ? (
          <>
            <View style={styles.bankDetailsCard}>
              <Text style={styles.bankDetailsTitle}>Bank Details</Text>
              <View style={styles.bankDetail}>
                <Text style={styles.bankDetailLabel}>Bank Name</Text>
                <Text style={styles.bankDetailValue}>First Bank</Text>
              </View>
              <View style={styles.bankDetail}>
                <Text style={styles.bankDetailLabel}>Account Number</Text>
                <View style={styles.accountNumberContainer}>
                  <Text style={styles.bankDetailValue}>1234567890</Text>
                  <TouchableOpacity style={styles.copyButton}>
                    <Icon name="copy-outline" size={20} color="#800080" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bankDetail}>
                <Text style={styles.bankDetailLabel}>Account Name</Text>
                <Text style={styles.bankDetailValue}>Delivery App Ltd</Text>
              </View>
              <View style={styles.bankDetail}>
                <Text style={styles.bankDetailLabel}>Amount</Text>
                <Text style={styles.bankDetailValue}>₦{amount}</Text>
              </View>
            </View>

            <View style={styles.referenceContainer}>
              <Text style={styles.referenceLabel}>Enter Payment Reference</Text>
              <TextInput
                style={styles.referenceInput}
                placeholder="Enter reference from your bank transfer"
                value={reference}
                onChangeText={setReference}
              />
              <Text style={styles.referenceHelp}>
                Please enter the reference number or transaction ID from your bank transfer
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, !reference.trim() && styles.disabledButton]}
              onPress={handleConfirmPayment}
              disabled={!reference.trim()}
            >
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.paymentConfirmedContainer}>
            <View style={styles.successIconContainer}>
              <Icon name="checkmark-circle" size={80} color="#00A651" />
            </View>
            <Text style={styles.paymentConfirmedTitle}>Payment Confirmed</Text>
            <Text style={styles.paymentConfirmedText}>
              Your payment of ₦{amount} has been confirmed. You can now proceed to find a rider for your delivery.
            </Text>
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.proceedButtonText}>Find Rider</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  bankDetailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bankDetailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  bankDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bankDetailLabel: {
    fontSize: 14,
    color: "#666666",
  },
  bankDetailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  accountNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    marginLeft: 8,
  },
  referenceContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  referenceLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
  },
  referenceInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  referenceHelp: {
    fontSize: 12,
    color: "#666666",
  },
  confirmButton: {
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentConfirmedContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  successIconContainer: {
    marginBottom: 16,
  },
  paymentConfirmedTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  paymentConfirmedText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  proceedButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

