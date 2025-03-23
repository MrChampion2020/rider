"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Modal, ActivityIndicator, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type WalletScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Wallet">

interface Transaction {
  id: string
  type: "topup" | "withdrawal"
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

type TransactionFilter = "all" | "topup" | "withdrawal"
type ModalType = "topup" | "withdraw" | "none"
type ConfirmationStatus = "success" | "error" | "none"

export default function WalletScreen() {
  const navigation = useNavigation<WalletScreenNavigationProp>()
  const [balance, setBalance] = useState(25000)
  const [filter, setFilter] = useState<TransactionFilter>("all")
  const [activeModal, setActiveModal] = useState<ModalType>("none")
  const [confirmationStatus, setConfirmationStatus] = useState<ConfirmationStatus>("none")
  const [isLoading, setIsLoading] = useState(false)
  
  // Form states
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [saveBankDetails, setSaveBankDetails] = useState(false)

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "withdrawal", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "2", type: "withdrawal", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "3", type: "withdrawal", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "4", type: "withdrawal", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "5", type: "withdrawal", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "6", type: "topup", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "7", type: "topup", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "8", type: "topup", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "9", type: "topup", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
    { id: "10", type: "topup", amount: 2500, date: "02/03/25 - 11:22 AM", status: "completed" },
  ])

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === "all") return true
    return transaction.type === filter
  })

  const handleTopup = () => {
    setActiveModal("topup")
  }

  const handleWithdraw = () => {
    setActiveModal("withdraw")
  }

  const handlePaymentMade = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // 90% chance of success
      if (Math.random() > 0.1) {
        setConfirmationStatus("success")
        // Add transaction to history
        const newTransaction: Transaction = {
          id: (transactions.length + 1).toString(),
          type: "topup",
          amount: 2500,
          date: new Date().toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          status: "completed",
        }
        setTransactions([newTransaction, ...transactions])
        setBalance(prev => prev + 2500)
      } else {
        setConfirmationStatus("error")
      }
    }, 2000)
  }

  const handlePlaceWithdrawal = () => {
    if (!withdrawAmount || !bankName || !accountName || !accountNumber) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // 90% chance of success
      if (Math.random() > 0.1) {
        setConfirmationStatus("success")
        // Add transaction to history
        const amount = parseInt(withdrawAmount, 10) || 0
        const newTransaction: Transaction = {
          id: (transactions.length + 1).toString(),
          type: "withdrawal",
          amount,
          date: new Date().toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          status: "completed",
        }
        setTransactions([newTransaction, ...transactions])
        setBalance(prev => prev - amount)
      } else {
        setConfirmationStatus("error")
      }
    }, 2000)
  }

  const closeModal = () => {
    setActiveModal("none")
    setConfirmationStatus("none")
    setIsLoading(false)
    setWithdrawAmount("")
    setBankName("")
    setAccountName("")
    setAccountNumber("")
    setSaveBankDetails(false)
  }

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <Icon 
          name={item.type === "topup" ? "arrow-down" : "arrow-up"} 
          size={24} 
          color="#800080" 
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionType}>
          {item.type === "topup" ? "Deposit" : "Withdrawal"}
        </Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text 
        style={[
          styles.transactionAmount, 
          item.type === "topup" ? styles.amountPositive : styles.amountNegative
        ]}
      >
        {item.type === "topup" ? "+" : "-"}₦{item.amount.toLocaleString()}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₦ {balance.toLocaleString()}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleTopup}>
          <Icon name="paper-plane" size={20} color="#800080" />
          <Text style={styles.actionText}>Topup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleWithdraw}>
          <Icon name="arrow-down" size={20} color="#800080" />
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Transactions</Text>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === "all" && styles.activeFilter]} 
            onPress={() => setFilter("all")}
          >
            <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === "topup" && styles.activeFilter]} 
            onPress={() => setFilter("topup")}
          >
            <Text style={[styles.filterText, filter === "topup" && styles.activeFilterText]}>Topup</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === "withdrawal" && styles.activeFilter]} 
            onPress={() => setFilter("withdrawal")}
          >
            <Text style={[styles.filterText, filter === "withdrawal" && styles.activeFilterText]}>Withdrawal</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredTransactions}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.transactionsList}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#000000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bicycle-outline" size={24} color="#000000" />
          <Text style={styles.navText}>Deliveries</Text>
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

      {/* Topup Modal */}
      <Modal
        visible={activeModal === "topup"}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.modalBackButton}>
              <Icon name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Bank Details</Text>
            <View style={styles.modalHeaderRight} />
          </View>

          <View style={styles.modalContent}>
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
            style={[styles.paymentButton, isLoading && styles.disabledButton]} 
            onPress={handlePaymentMade}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.paymentButtonText}>Payment made</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        visible={activeModal === "withdraw"}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.modalBackButton}>
              <Icon name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Withdrawal</Text>
            <View style={styles.modalHeaderRight} />
          </View>

          <View style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Amount to withdraw</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Amount to withdraw"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.amountPreview}>
              <Icon name="cash-outline" size={20} color="#800080" />
              <Text style={styles.amountPreviewText}>₦ 200,000</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Bank Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Bank Name"
                value={bankName}
                onChangeText={setBankName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Account Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Account name"
                value={accountName}
                onChangeText={setAccountName}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Account Number</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Account number"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setSaveBankDetails(!saveBankDetails)}
            >
              <View style={[styles.checkbox, saveBankDetails && styles.checkboxChecked]}>
                {saveBankDetails && <Icon name="checkmark" size={16} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>Save Bank Details</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.paymentButton, isLoading && styles.disabledButton]} 
            onPress={handlePlaceWithdrawal}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.paymentButtonText}>Place Withdrawal</Text>
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmationStatus !== "none"}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setConfirmationStatus("none")}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationContainer}>
            <TouchableOpacity 
              style={styles.confirmationCloseButton} 
              onPress={() => {
                setConfirmationStatus("none")
                if (confirmationStatus === "success") {
                  closeModal()
                }
              }}
            >
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
            
            <Text style={styles.confirmationTitle}>Payment Confirmation</Text>
            
            <View style={styles.confirmationIconContainer}>
              <View style={[
                styles.confirmationIconOuter,
                confirmationStatus === "success" ? styles.successIconOuter : styles.errorIconOuter
              ]}>
                <View style={[
                  styles.confirmationIconInner,
                  confirmationStatus === "success" ? styles.successIconInner : styles.errorIconInner
                ]}>
                  <Icon 
                    name={confirmationStatus === "success" ? "checkmark" : "close"} 
                    size={40} 
                    color="#FFFFFF" 
                  />
                </View>
              </View>
            </View>
            
            <Text style={styles.confirmationText}>
              {activeModal === "topup" ? (
                confirmationStatus === "success" 
                  ? "Your payment has been received, and you wallet has been credit successfully"
                  : "Your payment could not be completed"
              ) : (
                confirmationStatus === "success"
                  ? "Your withdrawal request has been sent successfully"
                  : "Your withdrawal could not be processed"
              )}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#800080",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: "#800080",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  actionsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 16,
    color: "#800080",
    fontWeight: "500",
    marginLeft: 8,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 4,
  },
  activeFilter: {
    backgroundColor: "#800080",
  },
  filterText: {
    fontSize: 14,
    color: "#666666",
  },
  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  transactionsList: {
    paddingBottom: 80,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#666666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  amountPositive: {
    color: "#00A651",
  },
  amountNegative: {
    color: "#FF0000",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  modalBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalHeaderRight: {
    width: 40,
  },
  modalContent: {
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
  paymentButton: {
    backgroundColor: "#800080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  disabledButton: {
    backgroundColor: "#D8BFD8",
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  amountPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  amountPreviewText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#800080",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#800080",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#000000",
  },
  confirmationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
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