
"use client"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"

// Define the delivery item type
interface DeliveryItem {
  id: string
  status: "Scheduled"
  fromAddress: string
  toAddress: string
  orderTime: string
  deliveryTime: string
  scheduledDate: string
  scheduledTime: string
  isEdited?: boolean
}

const RideHistory = () => {
  const navigation = useNavigation<any>()
  const [activeTab, setActiveTab] = useState("Scheduled")
  const [scheduledDeliveries, setScheduledDeliveries] = useState<DeliveryItem[]>([
    {
      id: "ORD-12ESCJK3K",
      status: "Scheduled",
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street....",
      orderTime: "11:24 AM",
      deliveryTime: "Scheduled",
      scheduledDate: "23rd Feb,2025",
      scheduledTime: "11:24 AM",
      isEdited: false,
    },
    {
      id: "ORD-12ESCJK3K",
      status: "Scheduled",
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street....",
      orderTime: "11:24 AM",
      deliveryTime: "Scheduled",
      scheduledDate: "23rd Feb,2025",
      scheduledTime: "11:24 AM",
      isEdited: false,
    },
  ])

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleTabPress = (tab: string) => {
    setActiveTab(tab)
  }

  const handleEdit = (deliveryId: string) => {
    // Mark the delivery as edited
    setScheduledDeliveries(
      scheduledDeliveries.map((delivery) => (delivery.id === deliveryId ? { ...delivery, isEdited: true } : delivery)),
    )

    // Navigate to edit screen with the delivery data
    // In a real app, you would pass the actual delivery data
    navigation.navigate("ScheduleParcel", {
      deliveryId,
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street....",
      scheduledDate: "23rd Feb,2025",
      scheduledTime: "11:24 AM",
    })
  }

  const handleDelete = (deliveryId: string) => {
    // Remove the delivery from the list
    setScheduledDeliveries(scheduledDeliveries.filter((delivery) => delivery.id !== deliveryId))
  }

  const handleProceed = (delivery: DeliveryItem) => {
    // Navigate to payment screen with the delivery data
    navigation.navigate("PaymentDetails", {
      deliveryId: delivery.id,
      fromScheduled: true,
    })
  }

  const renderDeliveryItem = ({ item }: { item: DeliveryItem }) => (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressColumn}>
          <Text style={styles.addressLabel}>From</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {item.fromAddress}
          </Text>

          <Text style={styles.timeLabel}>Time of Order</Text>
          <Text style={styles.timeText}>{item.orderTime}</Text>
        </View>

        <View style={styles.addressColumn}>
          <Text style={styles.addressLabel}>To</Text>
          <Text style={styles.addressText} numberOfLines={1}>
            {item.toAddress}
          </Text>

          <Text style={styles.timeLabel}>Estimated Delivery</Text>
          <Text style={styles.timeText}>{item.deliveryTime}</Text>
        </View>
      </View>

      <View style={styles.scheduledContainer}>
        <Text style={styles.scheduledTitle}>Ride Scheduled</Text>
        <View style={styles.scheduledDetails}>
          <View style={styles.dateContainer}>
            <Icon name="calendar-outline" size={20} color={colors.primary} />
            <Text style={styles.scheduledText}>{item.scheduledDate}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon name="time-outline" size={20} color={colors.primary} />
            <Text style={styles.scheduledText}>{item.scheduledTime}</Text>
          </View>
        </View>
      </View>

      {item.isEdited ? (
        <TouchableOpacity style={styles.proceedButton} onPress={() => handleProceed(item)}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride History</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Scheduled" && styles.activeTab]}
          onPress={() => handleTabPress("Scheduled")}
        >
          <Text style={[styles.tabText, activeTab === "Scheduled" && styles.activeTabText]}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => handleTabPress("Active")}
        >
          <Text style={[styles.tabText, activeTab === "Active" && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Delivered" && styles.activeTab]}
          onPress={() => handleTabPress("Delivered")}
        >
          <Text style={[styles.tabText, activeTab === "Delivered" && styles.activeTabText]}>Delivered</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={scheduledDeliveries}
        renderItem={renderDeliveryItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    backgroundColor: "#EEEEEE",
    borderRadius: 8,
    margin: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  deliveryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  statusBadge: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  addressContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  addressColumn: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#000000",
  },
  scheduledContainer: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  scheduledTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    textAlign: "center",
  },
  scheduledDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduledText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  deleteButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },
  proceedButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default RideHistory

