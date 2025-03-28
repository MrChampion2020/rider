// "use client"

// import React from "react"
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
// import Icon from "react-native-vector-icons/Ionicons"
// import type { RootStackParamList } from "../../types/navigation"

// type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Notifications">

// interface Notification {
//   id: string
//   type: "message" | "system"
//   title: string
//   message: string
//   timestamp: string
//   isRead: boolean
//   image?: string
// }

// export default function NotificationsScreen() {
//   const navigation = useNavigation<NotificationsScreenNavigationProp>()
  
//   const notifications: Notification[] = [
//     {
//       id: "1",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: false
//     },
//     {
//       id: "2",
//       type: "system",
//       title: "System Notification",
//       message: "Ge the best discount on your rides when you use the promo code",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: false,
//       image: require("../../assets/images/notification.png")
//     },
//     {
//       id: "3",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: false
//     },
//     {
//       id: "4",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: true
//     },
//     {
//       id: "5",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: true
//     },
//     {
//       id: "6",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: false
//     },
//     {
//       id: "7",
//       type: "message",
//       title: "New Message",
//       message: "A rider just sent you a message, click to view",
//       timestamp: "23/02/25 - 02:22 AM",
//       isRead: false
//     }
//   ]
  
//   const handleNotificationPress = (notification: Notification) => {
//     // Handle notification press based on type
//     if (notification.type === "message") {
//       // Navigate to chat screen
//       // navigation.navigate("Chat")
//     } else if (notification.type === "system") {
//       // Handle system notification
//     }
//   }
  
//   const renderNotificationItem = (notification: Notification) => (
//     <TouchableOpacity 
//       key={notification.id}
//       style={styles.notificationItem}
//       onPress={() => handleNotificationPress(notification)}
//     >
//       {!notification.isRead && (
//         <View style={styles.unreadIndicator} />
//       )}
      
//       <View style={styles.notificationContent}>
//         <View style={styles.notificationHeader}>
//           <Text style={styles.notificationTitle}>{notification.title}</Text>
//           <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
//         </View>
        
//         <View style={styles.notificationBody}>
//           <Text style={styles.notificationMessage}>{notification.message}</Text>
//           {notification.image && (
//             <Image source={notification.image} style={styles.notificationImage} />
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   )
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="chevron-back" size={24} color="#000000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notifications</Text>
//         <View style={styles.headerRight} />
//       </View>
      
//       <ScrollView style={styles.notificationsList}>
//         {notifications.map(renderNotificationItem)}
//       </ScrollView>
      
    
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 16,
//     backgroundColor: "#FFFFFF",
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
//   notificationsList: {
//     flex: 1,
//   },
//   notificationItem: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F0F0",
//   },
//   unreadIndicator: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#800080",
//     marginRight: 10,
//     marginTop: 6,
//   },
//   notificationContent: {
//     flex: 1,
//   },
//   notificationHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   notificationTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000000",
//   },
//   notificationTimestamp: {
//     fontSize: 12,
//     color: "#999999",
//   },
//   notificationBody: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   notificationMessage: {
//     fontSize: 14,
//     color: "#333333",
//     flex: 1,
//     marginRight: 8,
//   },
//   notificationImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#EEEEEE",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   navItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 4,
//   },
//   navText: {
//     fontSize: 12,
//     color: "#666666",
//     marginTop: 4,
//   },
//   activeNavText: {
//     color: "#800080",
//     fontWeight: "500",
//   },
//   addButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#800080",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: -25,
//     borderWidth: 4,
//     borderColor: "#FFFFFF",
//   },
// })


"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"
import { colors } from "../../constants/colors"

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Notifications">

interface Notification {
  id: string
  type: "message" | "system" | "delivery"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  image?: string
  data?: {
    chatId?: string
    deliveryId?: string
    promoCode?: string
    [key: string]: any
  }
}

export default function NotificationsScreen() {
  const navigation = useNavigation<NotificationsScreenNavigationProp>()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  const notifications: Notification[] = [
    {
      id: "1",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
      data: {
        chatId: "rider123",
      },
    },
    {
      id: "2",
      type: "system",
      title: "System Notification",
      message: "Get the best discount on your rides when you use the promo code RIDE50",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
      image: require("../../assets/images/notification.png"),
      data: {
        promoCode: "RIDE50",
      },
    },
    {
      id: "3",
      type: "delivery",
      title: "Delivery Update",
      message: "Your package has been delivered successfully",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
      data: {
        deliveryId: "ORD-12ESCJK3K",
      },
    },
    {
      id: "4",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: true,
      data: {
        chatId: "rider456",
      },
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: true,
      data: {
        chatId: "rider789",
      },
    },
    {
      id: "6",
      type: "delivery",
      title: "Delivery Update",
      message: "Your package is in transit and will be delivered soon",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
      data: {
        deliveryId: "ORD-21JWD23JFEKNK2WNRK",
      },
    },
    {
      id: "7",
      type: "system",
      title: "Account Update",
      message: "Your profile has been updated successfully",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
    },
  ]

  const handleNotificationPress = (notification: Notification) => {
    // Mark notification as read (in a real app, you would update this in your backend)
    notification.isRead = true

    // Set the selected notification and show modal for system notifications
    if (notification.type === "system") {
      setSelectedNotification(notification)
      setShowNotificationModal(true)
      return
    }

    // Navigate based on notification type
    switch (notification.type) {
      case "message":
        if (notification.data?.chatId) {
          navigation.navigate("Chat", { chatId: notification.data.chatId })
        }
        break

      case "delivery":
        if (notification.data?.deliveryId) {
          navigation.navigate("Delivery", {
            screen: "RideSummary",
            params: { deliveryId: notification.data.deliveryId },
          })
        }
        break

      default:
        // For any other types, show the modal
        setSelectedNotification(notification)
        setShowNotificationModal(true)
    }
  }

  const closeNotificationModal = () => {
    setShowNotificationModal(false)
    setSelectedNotification(null)
  }

  const renderNotificationItem = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[styles.notificationItem, !notification.isRead && styles.unreadNotificationItem]}
      onPress={() => handleNotificationPress(notification)}
    >
      {!notification.isRead && <View style={styles.unreadIndicator} />}

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
        </View>

        <View style={styles.notificationBody}>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          {notification.image && <Image source={notification.image} style={styles.notificationImage} />}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.notificationsList}>{notifications.map(renderNotificationItem)}</ScrollView>

      {/* Notification Detail Modal */}
      <Modal
        visible={showNotificationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeNotificationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
              <TouchableOpacity onPress={closeNotificationModal}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalTimestamp}>{selectedNotification?.timestamp}</Text>
              <Text style={styles.modalMessage}>{selectedNotification?.message}</Text>

              {selectedNotification?.image && (
                <Image source={selectedNotification.image} style={styles.modalImage} resizeMode="contain" />
              )}

              {selectedNotification?.data?.promoCode && (
                <View style={styles.promoCodeContainer}>
                  <Text style={styles.promoCodeLabel}>Promo Code:</Text>
                  <View style={styles.promoCodeBox}>
                    <Text style={styles.promoCode}>{selectedNotification.data.promoCode}</Text>
                  </View>
                  <TouchableOpacity style={styles.copyButton}>
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={closeNotificationModal}>
              <Text style={styles.modalButtonText}>Close</Text>
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
    marginBottom: 110
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 50,
    paddingBottom: 16,
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
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  unreadNotificationItem: {
    backgroundColor: "#FAFAFA",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginRight: 10,
    marginTop: 6,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  notificationTimestamp: {
    fontSize: 12,
    color: "#999999",
  },
  notificationBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#333333",
    flex: 1,
    marginRight: 8,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalBody: {
    marginBottom: 20,
  },
  modalTimestamp: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 16,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  promoCodeContainer: {
    marginTop: 16,
  },
  promoCodeLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  promoCodeBox: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  promoCode: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
  copyButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

