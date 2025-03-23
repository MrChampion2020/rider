

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">

interface SettingOptionProps {
  icon: string
  title: string
  onPress: () => void
  iconColor?: string
  backgroundColor?: string
}

const SettingOption = ({
  icon,
  title,
  onPress,
  iconColor = "#800080",
  backgroundColor = "#F8E6FF",
}: SettingOptionProps) => (
  <TouchableOpacity style={styles.settingOption} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Icon name={icon} size={24} color={iconColor} />
    </View>
    <Text style={styles.settingTitle}>{title}</Text>
  </TouchableOpacity>
)

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const userProfile = {
    name: "Qamardeen Malik",
    location: "Lagos, Ng",
    phone: "07033484845",
    email: "qamardeenmalik@gmail.com",
    avatar: require("../../assets/images/pp.png"),
  }

  const handleEditProfile = () => {
    navigation.navigate("EditProfile")
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    // Implement logout logic here
    // navigation.navigate("Login")
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={userProfile.avatar} style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{userProfile.location}</Text>
            <Icon name="chevron-down" size={16} color="#FFFFFF" />
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Info */}
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{userProfile.phone}</Text>
        </View>
        <View style={styles.contactDivider} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{userProfile.email}</Text>
        </View>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* General Settings */}
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.settingsGrid}>
          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="wallet-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Wallet</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="headset-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="location-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton}>
              <Text style={styles.settingButtonText}>Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Settings */}
        <Text style={styles.sectionTitle}>Other Settings</Text>
        <View style={styles.otherSettingsContainer}>
          <SettingOption icon="document-text-outline" title="FAQs" onPress={() => {}} />
          <SettingOption icon="notifications-outline" title="Notifications" onPress={() => {}} />
        </View>

        {/* Logout and Delete Account */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal visible={showLogoutModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.warningIconContainer}>
              <Icon name="alert-triangle" size={32} color="#FF9800" />
            </View>

            <Text style={styles.modalTitle}>Are you sure you want to logout</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelLogout}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.proceedButton]} onPress={confirmLogout}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
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
  profileHeader: {
    backgroundColor: "#800080",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 4,
  },
  editProfileButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  contactInfoContainer: {
    backgroundColor: "#800080",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  contactDivider: {
    width: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    marginHorizontal: 16,
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 16,
    marginBottom: 16,
  },
  settingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  settingCard: {
    width: "31%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
  },
  settingIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  settingButton: {
    backgroundColor: "#800080",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  settingButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  otherSettingsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: "#000000",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  deleteAccountButton: {
    alignItems: "center",
    marginBottom: 80,
  },
  deleteAccountText: {
    fontSize: 16,
    color: "#000000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  warningIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF8E1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  proceedButton: {
    backgroundColor: "#800080",
    marginLeft: 8,
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

