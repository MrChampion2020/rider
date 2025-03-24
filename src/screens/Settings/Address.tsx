"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Modal, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type AddressScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Address">

type AddressType = "Home" | "Work"
type TabType = "Home" | "Work"

interface SavedAddress {
  id: string
  type: AddressType
  title: string
  state: string
  city: string
  address: string
}

export default function AddressScreen() {
  const navigation = useNavigation<AddressScreenNavigationProp>()
  
  const [addressType, setAddressType] = useState<AddressType>("Home")
  const [searchText, setSearchText] = useState("")
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSavedAddresses, setShowSavedAddresses] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("Home")
  
  const [savedAddresses] = useState<SavedAddress[]>([
    {
      id: "1",
      type: "Home",
      title: "Address 1",
      state: "Lagos",
      city: "Ikeja",
      address: "No 2, Abcdefgh street, ghijk"
    },
    {
      id: "2",
      type: "Home",
      title: "Address 2",
      state: "Lagos",
      city: "Ikeja",
      address: "No 2, Abcdefgh street, ghijk"
    },
    {
      id: "3",
      type: "Work",
      title: "Address 1",
      state: "Lagos",
      city: "Ikeja",
      address: "No 2, Abcdefgh street, ghijk"
    }
  ])
  
  const handleSave = () => {
    // Save address logic here
    navigation.goBack()
  }
  
  const handleViewSavedAddresses = () => {
    setShowSavedAddresses(true)
  }
  
  const handleEditAddress = (address: SavedAddress) => {
    // Edit address logic here
    console.log("Edit address:", address)
  }
  
  const handleDeleteAddress = (address: SavedAddress) => {
    // Delete address logic here
    console.log("Delete address:", address)
  }
  
  const filteredAddresses = savedAddresses.filter(address => address.type === activeTab)
  
  const renderAddressScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Address Type</Text>
        
        <TouchableOpacity 
          style={styles.selectField}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.selectFieldText}>{addressType}</Text>
          <Icon name="chevron-down" size={24} color="#000000" />
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Search</Text>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Location"
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.locationButton}>
            <Icon name="location" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.viewSavedButton}
          onPress={handleViewSavedAddresses}
        >
          <Text style={styles.viewSavedButtonText}>View Saved Addresses</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      
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
          <Icon name="settings" size={24} color="#800080" />
          <Text style={[styles.navText, styles.activeNavText]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
  
  const renderSavedAddressesScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowSavedAddresses(false)} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Address</Text>
        <View style={styles.headerRight} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Home" && styles.activeTab]} 
            onPress={() => setActiveTab("Home")}
          >
            <Text style={[styles.tabText, activeTab === "Home" && styles.activeTabText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "Work" && styles.activeTab]} 
            onPress={() => setActiveTab("Work")}
          >
            <Text style={[styles.tabText, activeTab === "Work" && styles.activeTabText]}>Work</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.addressList}>
          {filteredAddresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTitleContainer}>
                  <Icon name="location" size={16} color="#800080" />
                  <Text style={styles.addressTitle}>{address.title}</Text>
                </View>
                <View style={styles.addressActions}>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditAddress(address)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteAddress(address)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.addressDetails}>
                <View style={styles.addressDetailColumn}>
                  <Text style={styles.addressDetailLabel}>State</Text>
                  <Text style={styles.addressDetailValue}>{address.state}</Text>
                </View>
                <View style={styles.addressDetailColumn}>
                  <Text style={styles.addressDetailLabel}>City</Text>
                  <Text style={styles.addressDetailValue}>{address.city}</Text>
                </View>
              </View>
              
              <View style={styles.addressFullDetail}>
                <Text style={styles.addressDetailLabel}>Address</Text>
                <Text style={styles.addressDetailValue}>{address.address}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
          <Icon name="settings" size={24} color="#800080" />
          <Text style={[styles.navText, styles.activeNavText]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
  
  return (
    <>
      {showSavedAddresses ? renderSavedAddressesScreen() : renderAddressScreen()}
      
      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.categoryOption}
              onPress={() => {
                setAddressType("Home")
                setShowCategoryModal(false)
              }}
            >
              <Text style={styles.categoryOptionText}>Home</Text>
              <View style={styles.radioButton}>
                {addressType === "Home" && <View style={styles.radioButtonSelected} />}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryOption}
              onPress={() => {
                setAddressType("Work")
                setShowCategoryModal(false)
              }}
            >
              <Text style={styles.categoryOptionText}>Work</Text>
              <View style={styles.radioButton}>
                {addressType === "Work" && <View style={styles.radioButtonSelected} />}
              </View>
            </TouchableOpacity>
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    padding: 12,
  },
  locationButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  viewSavedButton: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  viewSavedButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  saveButton: {
    backgroundColor: "#800080",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
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
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryOptionText: {
    fontSize: 16,
    color: "#000000",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#800080",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#800080",
  },
  tabText: {
    fontSize: 16,
    color: "#000000",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  addressList: {
    flex: 1,
  },
  addressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#800080",
    marginLeft: 8,
  },
  addressActions: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#E6F7E9",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 12,
    color: "#00A651",
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    color: "#FF0000",
  },
  addressDetails: {
    flexDirection: "row",
    marginBottom: 16,
  },
  addressDetailColumn: {
    flex: 1,
  },
  addressDetailLabel: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 4,
  },
  addressDetailValue: {
    fontSize: 14,
    color: "#000000",
  },
  addressFullDetail: {
    marginBottom: 8,
  },
})