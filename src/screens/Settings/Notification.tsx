"use client"

import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type NotificationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Notifications">

interface Notification {
  id: string
  type: "message" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  image?: string
}

export default function NotificationsScreen() {
  const navigation = useNavigation<NotificationsScreenNavigationProp>()
  
  const notifications: Notification[] = [
    {
      id: "1",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false
    },
    {
      id: "2",
      type: "system",
      title: "System Notification",
      message: "Ge the best discount on your rides when you use the promo code",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false,
      image: require("../../assets/promo-image.png")
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false
    },
    {
      id: "4",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: true
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: true
    },
    {
      id: "6",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false
    },
    {
      id: "7",
      type: "message",
      title: "New Message",
      message: "A rider just sent you a message, click to view",
      timestamp: "23/02/25 - 02:22 AM",
      isRead: false
    }
  ]
  
  const handleNotificationPress = (notification: Notification) => {
    // Handle notification press based on type
    if (notification.type === "message") {
      // Navigate to chat screen
      // navigation.navigate("Chat")
    } else if (notification.type === "system") {
      // Handle system notification
    }
  }
  
  const renderNotificationItem = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id}
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(notification)}
    >
      {!notification.isRead && (
        <View style={styles.unreadIndicator} />
      )}
      
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
        </View>
        
        <View style={styles.notificationBody}>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          {notification.image && (
            <Image source={notification.image} style={styles.notificationImage} />
          )}
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
      
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotificationItem)}
      </ScrollView>
      
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
          <Icon name="settings-outline" size={24} color="#800080" />
          <Text style={[styles.navText, styles.activeNavText]}>Settings</Text>
        </TouchableOpacity>
      </View>
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
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#800080",
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
})