"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, ScrollView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type ParcelPaymentProcessNavigationProp = NativeStackNavigationProp<RootStackParamList, "ParcelPaymentProcess">

type Step = 1 | 2 | 3 | 4
type PaymentMethod = "Bank transfer" | "Cash" | "Wallet"
type PayerType = "Sender" | "Receiver"
type PayOnDelivery = boolean
type ScreenView = "history" | "payment" | "confirmation" | "bankDetails"
type HistoryTab = "Scheduled" | "Active" | "Delivered"

interface RideDetails {
  id: string
  from: string
  to: string
  orderTime: string
  estimatedDelivery: string
  date: string
  time: string
  status: "Scheduled" | "Active" | "Delivered"
}

export default function ParcelPaymentProcess() {
  const navigation = useNavigation<ParcelPaymentProcessNavigationProp>()
  
  // Screen state
  const [currentView, setCurrentView] = useState<ScreenView>("history")
  const [historyTab, setHistoryTab] = useState<HistoryTab>("Scheduled")
  
  // Payment process state
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [payerType, setPayerType] = useState<PayerType>("Receiver")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Bank transfer")
  const [isPayOnDelivery, setIsPayOnDelivery] = useState<PayOnDelivery>(false)
  
  // Modals
  const [showDeliveryFeeModal, setShowDeliveryFeeModal] = useState(false)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  
  // Sample ride data
  const [rides] = useState<RideDetails[]>([
    {
      id: "ORD-12ESCJK3K",
      from: "No 1, abcd street....",
      to: "No 1, abcd street....",
      orderTime: "11:24 AM",
      estimatedDelivery: "Scheduled",
      date: "23rd Feb,2025",
      time: "11:24 AM",
      status: "Scheduled"
    },
    {
      id: "ORD-12ESCJK3K",
      from: "No 1, abcd street....",
      to: "No 1, abcd street....",
      orderTime: "11:24 AM",
      estimatedDelivery: "Scheduled",
      date: "23rd Feb,2025",
      time: "11:24 AM",
      status: "Scheduled"
    }
  ])
  
  const [selectedRide, setSelectedRide] = useState<RideDetails | null>(null)
  
  const handleProceed = (ride: RideDetails) => {
    setSelectedRide(ride)
    setCurrentView("payment")
    setShowDeliveryFeeModal(true)
  }
  
  const handleDeliverNow = () => {
    setShowDeliveryFeeModal(false)
    if (paymentMethod === "Bank transfer") {
      setCurrentView("bankDetails")
    } else {
      // Handle other payment methods
      setShowPaymentConfirmation(true)
    }
  }
  
  const handlePaymentMade = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(Math.random() > 0.2) // 80% success rate
      setShowPaymentConfirmation(true)
    }, 1000)
  }
  
  const handleConfirmationClose = () => {
    setShowPaymentConfirmation(false)
    if (paymentSuccess) {
      setCurrentView("history")
    }
  }
  
  const renderHistoryScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, historyTab === "Scheduled" && styles.activeTab]} 
          onPress={() => setHistoryTab("Scheduled")}
        >
          <Text style={[styles.tabText, historyTab === "Scheduled" && styles.activeTabText]}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, historyTab === "Active" && styles.activeTab]} 
          onPress={() => setHistoryTab("Active")}
        >
          <Text style={[styles.tabText, historyTab === "Active" && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, historyTab === "Delivered" && styles.activeTab]} 
          onPress={() => setHistoryTab("Delivered")}
        >
          <Text style={[styles.tabText, historyTab === "Delivered" && styles.activeTabText]}>Delivered</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.ridesList}>
        {rides.map((ride, index) => (
          <View key={index} style={styles.rideCard}>
            <View style={styles.rideHeader}>
              <Text style={styles.rideId}>{ride.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{ride.status}</Text>
              </View>
            </View>
            
            <View style={styles.rideDetails}>
              <View style={styles.rideDetailRow}>
                <Text style={styles.rideDetailLabel}>From</Text>
                <Text style={styles.rideDetailLabel}>To</Text>
              </View>
              <View style={styles.rideDetailRow}>
                <Text style={styles.rideDetailValue}>{ride.from}</Text>
                <Text style={styles.rideDetailValue}>{ride.to}</Text>
              </View>
            </View>
            
            <View style={styles.rideDetails}>
              <View style={styles.rideDetailRow}>
                <Text style={styles.rideDetailLabel}>Time of Order</Text>
                <Text style={styles.rideDetailLabel}>Estimated Delivery</Text>
              </View>
              <View style={styles.rideDetailRow}>
                <Text style={styles.rideDetailValue}>{ride.orderTime}</Text>
                <Text style={styles.rideDetailValue}>{ride.estimatedDelivery}</Text>
              </View>
            </View>
            
            <View style={styles.rideScheduleContainer}>
              <Text style={styles.rideScheduleTitle}>Ride Scheduled</Text>
              <View style={styles.rideScheduleDetails}>
                <View style={styles.rideScheduleItem}>
                  <Icon name="calendar-outline" size={20} color="#800080" />
                  <Text style={styles.rideScheduleText}>{ride.date}</Text>
                </View>
                <View style={styles.rideScheduleItem}>
                  <Icon name="time-outline" size={20} color="#800080" />
                  <Text style={styles.rideScheduleText}>{ride.time}</Text>
                </View>
              </View>
            </View>
            
            {index === 0 ? (
              <TouchableOpacity 
                style={styles.proceedButton} 
                onPress={() => handleProceed(ride)}
              >
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#000000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="bicycle" size={24} color="#800080" />
          <Text style={[styles.navText, styles.activeNavText]}>Deliveries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="chatbubble-outline" size={24} color="#000000" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="settings-outline" size={24} color="#000000" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
  
  const renderPaymentScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView("history")} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Parcel</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.paymentContainer}>
        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              {step > 1 && <View style={styles.progressLine} />}
              <View style={[styles.progressStep, currentStep >= step && styles.activeProgressStep]}>
                <Text style={styles.progressStepText}>{step}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Who is paying for the delivery ?</Text>
        
        <TouchableOpacity 
          style={styles.selectField}
          onPress={() => setPayerType(payerType === "Sender" ? "Receiver" : "Sender")}
        >
          <Text style={styles.selectFieldText}>{payerType}</Text>
          <Icon name="chevron-down" size={24} color="#000000" />
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Payment method</Text>
        
        <TouchableOpacity 
          style={styles.selectField}
          onPress={() => {
            // Toggle between payment methods
            if (paymentMethod === "Bank transfer") setPaymentMethod("Cash")
            else if (paymentMethod === "Cash") setPaymentMethod("Wallet")
            else setPaymentMethod("Bank transfer")
          }}
        >
          <Text style={styles.selectFieldText}>{paymentMethod}</Text>
          <Icon name="chevron-down" size={24} color="#000000" />
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Is this Pay on delivery ?</Text>
        
        <TouchableOpacity 
          style={styles.toggleContainer}
          onPress={() => setIsPayOnDelivery(!isPayOnDelivery)}
        >
          <View style={[styles.toggleSwitch, isPayOnDelivery && styles.toggleSwitchActive]}>
            <View style={[styles.toggleKnob, isPayOnDelivery && styles.toggleKnobActive]} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
  
  const renderBankDetailsScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView("payment")} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.bankDetailsContainer}>
        <View style={styles.bankDetailsCard}>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Bank Name</Text>
            <Text style={styles.bankDetailValue}>VFB Microfinance Bank</Text>
          </View>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Account Name</Text>
            <Text style={styles.bankDetailValue}>Fast Logistics</Text>
          </View>
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Account Number</Text>
            <View style={styles.accountNumberContainer}>
              <Text style={styles.bankDetailValue}>123456789</Text>
              <Icon name="copy-outline" size={20} color="#000000" />
            </View>
          </View>
          <View style={styles.warningContainer}>
            <Icon name="alert-triangle" size={16} color="#FF9800" />
            <Text style={styles.warningText}>Kindly note that this account can be used only once</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.paymentMadeButton} 
        onPress={handlePaymentMade}
      >
        <Text style={styles.paymentMadeButtonText}>Payment made</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
  
  return (
    <>
      {currentView === "history" && renderHistoryScreen()}
      {currentView === "payment" && renderPaymentScreen()}
      {currentView === "bankDetails" && renderBankDetailsScreen()}
      
      {/* Delivery Fee Modal */}
      <Modal
        visible={showDeliveryFeeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeliveryFeeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deliveryFeeModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delivery Fee</Text>
              <TouchableOpacity onPress={() => setShowDeliveryFeeModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.deliveryFeeContent}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircleOuter}>
                  <View style={styles.logoCircleInner}>
                    <Icon name="bicycle" size={24} color="#FFFFFF" />
                  </View>
                </View>
              </View>
              
              <Text style={styles.deliveryFeeDescription}>
                Price displayed is the estimated price for this delivery, you can edit price and send out a bid to available riders
              </Text>
              
              <Text style={styles.deliveryFeeAmount}>2,500</Text>
            </View>
            
            <View style={styles.deliveryFeeActions}>
              <TouchableOpacity 
                style={styles.deliverNowButton} 
                onPress={handleDeliverNow}
              >
                <Text style={styles.deliverNowButtonText}>Deliver Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.scheduleButton}>
                <Icon name="calendar-outline" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Payment Confirmation Modal */}
      <Modal
        visible={showPaymentConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={handleConfirmationClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <TouchableOpacity 
              style={styles.confirmationCloseButton} 
              onPress={handleConfirmationClose}
            >
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
            
            <Text style={styles.confirmationTitle}>Payment Confirmation</Text>
            
            <View style={styles.confirmationIconContainer}>
              <View style={[
                styles.confirmationIconOuter,
                paymentSuccess ? styles.successIconOuter : styles.errorIconOuter
              ]}>
                <View style={[
                  styles.confirmationIconInner,
                  paymentSuccess ? styles.successIconInner : styles.errorIconInner
                ]}>
                  <Icon 
                    name={paymentSuccess ? "checkmark" : "close"} 
                    size={40} 
                    color="#FFFFFF" 
                  />
                </View>
              </View>
            </View>
            
            <Text style={styles.confirmationText}>
              {paymentSuccess 
                ? "Your payment has been received, and you wallet has been credit successfully"
                : "Your payment could not be completed"}
            </Text>
          </View>
        </View>
      </Modal>
    </>
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
    paddingTop: 50,
    paddingBottom: 16,
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: "#800080",
  },
  tabText: {
    fontSize: 14,
    color: "#666666",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  ridesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rideId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F8F8F8",
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#666666",
  },
  rideDetails: {
    marginBottom: 16,
  },
  rideDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rideDetailLabel: {
    fontSize: 12,
    color: "#666666",
    flex: 1,
  },
  rideDetailValue: {
    fontSize: 14,
    color: "#000000",
    flex: 1,
    marginTop: 4,
  },
  rideScheduleContainer: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  rideScheduleTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  rideScheduleDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rideScheduleItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rideScheduleText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 8,
  },
  proceedButton: {
    backgroundColor: "#800080",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#800080",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
  },
  editButtonText: {
    color: "#800080",
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  deleteButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#800080",
  },
  navText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  activeNavText: {
    color: "#800080",
    fontWeight: "500",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -25,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  paymentContainer: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "center",
  },
  activeProgressStep: {
    backgroundColor: "#800080",
  },
  progressStepText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#DDDDDD",
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 12,
    marginTop: 16,
  },
  selectField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  selectFieldText: {
    fontSize: 16,
    color: "#000000",
  },
  toggleContainer: {
    alignItems: "flex-start",
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#DDDDDD",
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: "#800080",
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  toggleKnobActive: {
    transform: [{ translateX: 20 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  deliveryFeeModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  deliveryFeeContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryFeeDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  deliveryFeeAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000000",
  },
  deliveryFeeActions: {
    flexDirection: "row",
    marginTop: 24,
  },
  deliverNowButton: {
    flex: 1,
    backgroundColor: "#800080",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 8,
  },
  deliverNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  scheduleButton: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  bankDetailsContainer: {
    flex: 1,
    padding: 16,
  },
  bankDetailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bankDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    gap: 8,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
  },
  warningText: {
    fontSize: 12,
    color: "#FF9800",
    marginLeft: 8,
  },
  paymentMadeButton: {
    backgroundColor: "#800080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  paymentMadeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmationModal: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  confirmationCloseButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 24,
  },
  confirmationIconContainer: {
    marginVertical: 24,
  },
  confirmationIconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  successIconOuter: {
    backgroundColor: "#E6F7E9",
  },
  errorIconOuter: {
    backgroundColor: "#FFEBEE",
  },
  confirmationIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  successIconInner: {
    backgroundColor: "#00A651",
  },
  errorIconInner: {
    backgroundColor: "#FF0000",
  },
  confirmationText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
})