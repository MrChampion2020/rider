
"use client"

import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type DeliverySummaryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "DeliverySummary">

interface SummaryItemProps {
  label: string
  value: string
}

const SummaryItem = ({ label, value }: SummaryItemProps) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
)

export default function DeliverySummary() {
  const navigation = useNavigation<DeliverySummaryNavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Parcel</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <View style={[styles.stepCircle, step <= 4 ? styles.activeStep : styles.inactiveStep]}>
                <Text style={[styles.stepText, step > 4 && styles.inactiveStepText]}>{step}</Text>
              </View>
              {index < 3 && <View style={[styles.stepLine, step < 4 ? styles.activeLine : styles.inactiveLine]} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.addressSection}>
            <View style={styles.addressItem}>
              <Icon name="location" size={20} color="#00A651" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Sender Address</Text>
                <Text style={styles.addressValue}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
            <View style={styles.addressDivider} />
            <View style={styles.addressItem}>
              <Icon name="location" size={20} color="#FF0000" />
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>Receiver Address</Text>
                <Text style={styles.addressValue}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            <SummaryItem label="Sender Name" value="Qamardeen Malik" />
            <SummaryItem label="Sender Phone" value="07030123456" />
            <SummaryItem label="Receiver Name" value="Adebisi Lateefat" />
            <SummaryItem label="Receiver Phone" value="07031234567" />
          </View>

          <View style={styles.detailsSection}>
            <SummaryItem label="Parcel Name" value="Samsung Phone" />
            <SummaryItem label="Parcel Category" value="Electronics" />
            <SummaryItem label="Parcel Value" value="100,000 - 200,000" />
            <SummaryItem label="Description" value="Nil" />
          </View>

          <View style={styles.paymentSection}>
            <View style={styles.walletBalance}>
              <Icon name="wallet-outline" size={24} color="white" />
              <Text style={styles.balanceText}>N 200,000</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.goBack()}>
        <Text style={styles.proceedButtonText}>Done</Text>
      </TouchableOpacity>
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    backgroundColor: "#800080",
  },
  inactiveStep: {
    backgroundColor: "#DDDDDD",
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  inactiveStepText: {
    color: "#666666",
  },
  stepLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 4,
  },
  activeLine: {
    backgroundColor: "#800080",
  },
  inactiveLine: {
    backgroundColor: "#DDDDDD",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressContent: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  addressDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
  detailsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  paymentSection: {
    padding: 16,
  },
  walletBalance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#800080",
    padding: 12,
    borderRadius: 8,
  },
  balanceText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  proceedButton: {
    backgroundColor: "#800080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

