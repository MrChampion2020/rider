

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"

// Import the tab screens
import ScheduledDeliveries from "./Scheduled"
import ActiveDeliveries from "./Active"
import DeliveredDeliveries from "./Delivered"

import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { DeliveriesStackParamList } from "../../types/navigation"

type DeliveryHistoryNavigationProp = NativeStackNavigationProp<DeliveriesStackParamList, "DeliveryMain">

const DeliveryHistory = () => {
  const navigation = useNavigation<DeliveryHistoryNavigationProp>()

  const [activeTab, setActiveTab] = useState<"Scheduled" | "Active" | "Delivered">("Delivered")

  const handleBack = () => {
    navigation.goBack()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Scheduled":
        return <ScheduledDeliveries />
      case "Active":
        return <ActiveDeliveries />
      case "Delivered":
        return <DeliveredDeliveries />
      default:
        return <DeliveredDeliveries />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Scheduled" && styles.activeTab]}
          onPress={() => setActiveTab("Scheduled")}
        >
          <Text style={[styles.tabText, activeTab === "Scheduled" && styles.activeTabText]}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Text style={[styles.tabText, activeTab === "Active" && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Delivered" && styles.activeTab]}
          onPress={() => setActiveTab("Delivered")}
        >
          <Text style={[styles.tabText, activeTab === "Delivered" && styles.activeTabText]}>Delivered</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom: 90,
    zIndex: 999
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
})

export default DeliveryHistory

