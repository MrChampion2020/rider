

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal, ScrollView,  Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SettingsStackParamList } from "../../types/navigation"
import { colors } from "../../constants/colors"

type SettingsScreenNavigationProp = NativeStackNavigationProp<SettingsStackParamList, "SettingsMain">

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

export default function SettingsScreen({ onLogout }) {
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

  const handleWalletPress = () => {
    navigation.navigate("Wallet")
  }

  const handleSupportPress = () => {
    navigation.navigate("Support")
  }

  const handleAddressPress = () => {
    navigation.navigate("Address")
  }

  const handleFAQsPress = () => {
    navigation.navigate("FAQs")
  }

  const handleNotificationsPress = () => {
    navigation.navigate("Notifications")
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    // Call the logout function from AuthContext
    if (typeof onLogout === "function") {
      onLogout()
    } else {
      console.error("onLogout is not a function:", onLogout)
    }
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
     
 {/* Profile Header */}

       <View style={styles.profileHeader}>
         <View style={styles.profileLeftSection}>
           <Image source={userProfile.avatar} style={styles.profileAvatar} />
           <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
             <Text style={styles.editProfileText}>Edit Profile</Text>
           </TouchableOpacity>
         </View>
        
         <View style={styles.profileRightSection}>
           <Text style={styles.profileName}>{userProfile.name}</Text>
           <View style={styles.locationContainer}>
             <Text style={styles.locationText}>{userProfile.location}</Text>
             <View style={styles.triangleDown} />
           </View>
          
           {/* Contact Info Card */}
           <View style={styles.contactCard}>
             <View style={styles.contactInfo}>
               <Text style={styles.contactLabel}>Phone</Text>
               <Text style={styles.contactValue}>{userProfile.phone}</Text>
             </View>

            
             <View style={styles.contactInfo}>
               <Text style={styles.contactLabel}>Email</Text>
               <Text style={styles.contactValue}>{userProfile.email}</Text>
             </View>
           </View>
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
            <TouchableOpacity style={styles.settingButton} onPress={handleWalletPress}>
              <Text style={styles.settingButtonText}>Wallet</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="headset-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton} onPress={handleSupportPress}>
              <Text style={styles.settingButtonText}>Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingIconContainer}>
              <Icon name="location-outline" size={24} color="#800080" />
            </View>
            <TouchableOpacity style={styles.settingButton} onPress={handleAddressPress}>
              <Text style={styles.settingButtonText}>Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other Settings */}
        <Text style={styles.sectionTitle}>Other Settings</Text>
        <View style={styles.otherSettingsContainer}>
          <SettingOption icon="document-text-outline" title="FAQs" onPress={handleFAQsPress} />
          <SettingOption icon="notifications-outline" title="Notifications" onPress={handleNotificationsPress} />
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
    height: "auto",
    marginBottom: 70
  },
  profileHeader: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  profileLeftSection: {
    alignItems: "center",
    marginRight: 16,
  },
  profileRightSection: {
    flex: 1,

  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: colors.white,
    marginRight: 4,
  },
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },
  editProfileButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  editProfileText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "500",
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 8,
    color: colors.white,
  },
  contactDivider: {
    width: 1,
    backgroundColor: colors.white,
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
    color: colors.black,
    marginVertical: 16,
  },
  settingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  settingCard: {
    width: "31%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  settingButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  settingButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  otherSettingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0,
    borderBottomColor: "none",
    height: 60,
    marginBottom: 10

  },
  settingOptionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8E6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingOptionTitle: {
    fontSize: 16,
    color: colors.black,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
  },
  deleteAccountButton: {
    alignItems: "center",
    marginBottom: 80,
  },
  deleteAccountText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "600"
  },
  
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  navTextActive: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  fabContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  fab: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: colors.white,
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
    color: colors.black,
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
  proceedButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
})
