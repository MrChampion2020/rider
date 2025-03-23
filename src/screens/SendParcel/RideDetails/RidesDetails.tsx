

"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Animated,
  Easing,
  TextInput,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { SendParcelStackParamList } from "../../../types/navigation"
import pp from "../../../assets/pp.png"

type RideDetailsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "RideDetails">

export default function RideDetails({ route }: { route: { params: { rideId: string } } }) {
  const navigation = useNavigation<RideDetailsNavigationProp>()
  const { rideId } = route.params

  // State variables
  const [deliveryStatus, setDeliveryStatus] = useState<"In Transit" | "Delivered">("In Transit")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [showCustomerCode, setShowCustomerCode] = useState(false)
  const [showInputCodeButton, setShowInputCodeButton] = useState(true)

  // Route coordinates for the map
  const routeCoordinates = [
    { latitude: 6.9075, longitude: 3.252 }, // Sender location (example coordinates)
    { latitude: 6.91, longitude: 3.255 },
    { latitude: 6.9125, longitude: 3.258 },
    { latitude: 6.915, longitude: 3.261 },
    { latitude: 6.9175, longitude: 3.264 }, // Receiver location (example coordinates)
  ]

  // Blinking cursor animation
  const cursorOpacity = useState(new Animated.Value(1))[0]

  useEffect(() => {
    const blinkCursor = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    )

    if (showConfirmationModal) {
      blinkCursor.start()
    } else {
      blinkCursor.stop()
    }

    return () => {
      blinkCursor.stop()
    }
  }, [showConfirmationModal, cursorOpacity])

  // Handlers
  const handleInputCode = () => {
    setConfirmationCode("") // Clear any previous code
    setShowConfirmationModal(true)
    // The autoFocus property on TextInput will automatically show the keyboard
  }

  const handleConfirmCode = () => {
    setShowConfirmationModal(false)
    setShowCustomerCode(true)
    setShowInputCodeButton(false)
  }

  const handleTrackParcel = () => {
    setDeliveryStatus("Delivered")
  }

  const handleDeliveryDetails = () => {
    navigation.navigate("DeliveredSummary", { rideId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} bounces={false}>
        <View style={styles.card}>
          {!showCustomerCode && !showConfirmationModal && (
            <View style={styles.notificationContainer}>
              <View style={styles.checkIconContainer}>
                <Icon name="checkmark" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.notificationText}>
                Your rider has arrived at your destination, input the confirmation code to confirm
              </Text>
            </View>
          )}

          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 6.9125,
                longitude: 3.258,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              <Polyline coordinates={routeCoordinates} strokeColor="#800080" strokeWidth={4} />
              <Marker coordinate={routeCoordinates[0]}>
                <View style={styles.originMarker}>
                  <Icon name="location" size={24} color="#00A651" />
                </View>
              </Marker>
              <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
                <View style={styles.destinationMarker}>
                  <Icon name="location" size={24} color="#FF0000" />
                </View>
              </Marker>
            </MapView>
            <View style={[styles.statusBadge, deliveryStatus === "Delivered" && styles.deliveredStatusBadge]}>
              <Text style={styles.statusText}>{deliveryStatus}</Text>
            </View>
            {showCustomerCode && (
              <View style={styles.customerCodeBadge}>
                <Text style={styles.customerCodeText}>Customer Code: 1356</Text>
              </View>
            )}
          </View>

          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>Order id</Text>
            <Text style={styles.orderId}>ORD-12ESCJK3K</Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.addressColumns}>
              <View style={styles.addressColumn}>
                <Text style={styles.addressLabel}>From</Text>
                <Text style={styles.addressValue}>No 1, abcd street....</Text>
              </View>
              <View style={styles.addressColumn}>
                <Text style={styles.addressLabel}>To</Text>
                <Text style={styles.addressValue}>No 1, abcd street, saki.....</Text>
              </View>
            </View>

            <View style={styles.timeColumns}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Time of Order</Text>
                <Text style={styles.timeValue}>11:24 AM</Text>
              </View>
              <View style={styles.timeColumn}>
                <Text style={styles.timeLabel}>Estimated Delivery</Text>
                <Text style={styles.timeValue}>01:22 PM</Text>
              </View>
            </View>

            <View style={styles.paymentColumns}>
              <View style={styles.paymentColumn}>
                <Text style={styles.paymentLabel}>Sub total</Text>
                <Text style={styles.paymentValue}>₦ 2,000</Text>
              </View>
              <View style={styles.paymentColumn}>
                <Text style={styles.paymentLabel}>Payment method</Text>
                <Text style={styles.paymentValue}>Wallet</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.viewHistoryButton}>
            <Text style={styles.viewHistoryButtonText}>View full history</Text>
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            {/* Continuous progress line */}
            <View style={styles.progressLineContainer}>
              <View style={styles.activeLine} />
              <View style={styles.inactiveLine} />
            </View>

            {/* Progress steps */}
            <View style={styles.progressTracker}>
              <View style={styles.progressStepContainer}>
                <View style={styles.progressDotOuter}>
                  <View style={styles.progressDotInner} />
                </View>
                <Text style={styles.progressLabel}>Order</Text>
              </View>
              <View style={styles.progressStepContainer}>
                <View style={styles.progressDotOuter}>
                  <View style={styles.progressDotInner} />
                </View>
                <Text style={styles.progressLabel}>Picked up</Text>
              </View>
              <View style={styles.progressStepContainer}>
                <View style={styles.progressDotOuter}>
                  <View style={styles.progressDotInner} />
                </View>
                <Text style={styles.progressLabel}>In transit</Text>
              </View>
              <View style={styles.progressStepContainer}>
                <View style={[styles.progressDotOuter, styles.inactiveDotOuter]}>
                  <View style={[styles.progressDotInner, styles.inactiveDotInner]} />
                </View>
                <Text style={styles.progressLabel}>Delivered</Text>
              </View>
            </View>
          </View>

          <View style={styles.riderSection}>
            <Image
              source={pp}
              style={styles.riderImage}
              defaultSource={{ uri: "/placeholder.svg?height=50&width=50" }}
            />
            <View style={styles.riderInfo}>
              <Text style={styles.riderName}>Maleek Oladimeji</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" size={14} color="#800080" />
                ))}
              </View>
            </View>
            <View style={styles.riderActions}>
              <TouchableOpacity style={styles.riderActionButton}>
                <Icon name="chatbubble-ellipses" size={24} color="#800080" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.riderActionButton}>
                <Icon name="call" size={24} color="#800080" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={deliveryStatus === "In Transit" ? handleTrackParcel : undefined}
        >
          <View style={styles.trackButtonIcon}>
            <Icon name="bicycle" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.trackButtonText}>Track {deliveryStatus === "In Transit" ? "Rider" : "Rider"}</Text>
          <View style={styles.chevronContainer}>
            <Icon name="chevron-forward" size={16} color="#800080" />
            <Icon name="chevron-forward" size={16} color="#800080" style={styles.middleChevron} />
            <Icon name="chevron-forward" size={16} color="#800080" />
          </View>
        </TouchableOpacity>

        {showInputCodeButton && deliveryStatus === "In Transit" ? (
          <TouchableOpacity style={styles.inputCodeButton} onPress={handleInputCode}>
            <Text style={styles.inputCodeButtonText}>Input Code</Text>
          </TouchableOpacity>
        ) : deliveryStatus === "Delivered" ? (
          <TouchableOpacity style={styles.deliveryDetailsButton} onPress={handleDeliveryDetails}>
            <Text style={styles.deliveryDetailsButtonText}>Delivery Details</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Confirmation Code Modal */}
      <Modal visible={showConfirmationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <View style={styles.confirmationModalHeader}>
              <Text style={styles.confirmationModalTitle}>Confirmation Code</Text>
              <TouchableOpacity onPress={() => setShowConfirmationModal(false)} style={styles.closeModalButton}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                keyboardType="number-pad"
                maxLength={4}
                autoFocus
                caretHidden={confirmationCode.length > 0}
              />
              {confirmationCode.length === 0 && (
                <Animated.View style={[styles.codeCursor, { opacity: cursorOpacity }]} />
              )}
            </View>

            <Text style={styles.codeInputLabel}>Input code from Rider</Text>

            <TouchableOpacity
              style={[styles.continueButton, confirmationCode.length === 0 && styles.disabledButton]}
              onPress={handleConfirmCode}
              disabled={confirmationCode.length === 0}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
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
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    margin: 16,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    margin: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00A651",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  mapContainer: {
    height: 220,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  originMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  destinationMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#800080",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  deliveredStatusBadge: {
    backgroundColor: "#00A651",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  customerCodeBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(128, 0, 128, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  customerCodeText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#800080",
  },
  orderIdContainer: {
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  orderIdLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  detailsSection: {
    padding: 16,
  },
  addressColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addressColumn: {
    flex: 1,
    paddingRight: 8,
  },
  addressLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 14,
    color: "#000000",
  },
  timeColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeColumn: {
    flex: 1,
    paddingRight: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    color: "#000000",
  },
  paymentColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentColumn: {
    flex: 1,
    paddingRight: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 14,
    color: "#000000",
  },
  viewHistoryButton: {
    alignSelf: "center",
    marginVertical: 16,
  },
  viewHistoryButtonText: {
    fontSize: 14,
    color: "#800080",
    textDecorationLine: "underline",
  },
  progressContainer: {
    height: 40,
    position: "relative",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  progressLineContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 8,
    left: 24,
    right: 24,
    height: 1,
    zIndex: 1,
  },
  activeLine: {
    flex: 3,
    height: 1,
    backgroundColor: "#800080",
  },
  inactiveLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  progressTracker: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    zIndex: 2,
  },
  progressStepContainer: {
    alignItems: "center",
    width: 70,
  },
  progressDotOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  progressDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  inactiveDotOuter: {
    backgroundColor: "#CCCCCC",
  },
  inactiveDotInner: {
    backgroundColor: "#FFFFFF",
  },
  progressLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    textAlign: "center",
  },
  riderSection: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    padding: 16,
  },
  riderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  riderActions: {
    flexDirection: "row",
  },
  riderActionButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 16,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#800080",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  trackButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  trackButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#800080",
    marginLeft: 8,
  },
  chevronContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleChevron: {
    marginHorizontal: -8,
  },
  inputCodeButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  inputCodeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  deliveryDetailsButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  deliveryDetailsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200, // Add space at the bottom for the keyboard
  },
  confirmationModal: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginTop: 200,
    zIndex: 1000
    
  },
  confirmationModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  confirmationModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  closeModalButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  codeInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 60,
    flexDirection: "row",
  },
  codeInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  codeInput: {
    fontSize: 36,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    minWidth: 40,
    padding: 0,
  },
  codeCursor: {
    width: 2,
    height: 36,
    backgroundColor: "#000000",
    position: "absolute",
    left: "50%",
  },
  codeInputLabel: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
})

