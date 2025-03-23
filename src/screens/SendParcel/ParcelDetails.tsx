

"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type ParcelDetailsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "ParcelDetails">

interface SelectionOption {
  label: string
  value: string
  description?: string
}

const categories: SelectionOption[] = [
  { label: "Food", value: "food", description: "Food items" },
  { label: "Electronics", value: "electronics", description: "Mobile phones, headphones, laptops" },
  { label: "Health & Beauty", value: "health_beauty", description: "Beauty products, Wigs, Perfumes" },
  { label: "Documents", value: "documents", description: "Any form of document" },
  { label: "Others", value: "others", description: "Any other form of parcel" },
]

const valueRanges: SelectionOption[] = [
  { label: "N 50,000 - N 100,000", value: "50000-100000" },
  { label: "N 100,000 - N 200,000", value: "100000-200000" },
  { label: "N 200,000 - N 400,000", value: "200000-400000" },
  { label: "N 400,000 - N 700,000", value: "400000-700000" },
  { label: "N 700,000 - N 1,000,000", value: "700000-1000000" },
  { label: "N 1,000,000 and above", value: "1000000+" },
]

export default function ParcelDetails() {
  const navigation = useNavigation<ParcelDetailsNavigationProp>()
  const [parcelName, setParcelName] = useState("")
  const [parcelCategory, setParcelCategory] = useState("")
  const [parcelValue, setParcelValue] = useState("")
  const [description, setDescription] = useState("")
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false)
  const [isValueModalVisible, setIsValueModalVisible] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const { height: screenHeight } = Dimensions.get("window")

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleProceed = () => {
    if (parcelName && parcelCategory && parcelValue) {
      navigation.navigate("PaymentDetails")
    }
  }

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  const SelectionModal = ({
    visible,
    onClose,
    title,
    options,
    selectedValue,
    onSelect,
  }: {
    visible: boolean
    onClose: () => void
    title: string
    options: SelectionOption[]
    selectedValue: string
    onSelect: (value: string) => void
  }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalOptions}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  onSelect(option.value)
                  onClose()
                }}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  {option.description && <Text style={styles.optionDescription}>{option.description}</Text>}
                </View>
                <View style={[styles.radioOuter, selectedValue === option.value && styles.radioOuterSelected]}>
                  {selectedValue === option.value && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )

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
              <View style={[styles.stepCircle, step <= 3 ? styles.activeStep : styles.inactiveStep]}>
                <Text style={[styles.stepText, step > 3 && styles.inactiveStepText]}>{step}</Text>
              </View>
              {index < 3 && <View style={[styles.stepLine, step < 3 ? styles.activeLine : styles.inactiveLine]} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Icon name="bag" size={24} color="white" />
              </View>
              <Text style={styles.cardTitle}>Parcel Details</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Parcel Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Type the name of parcel"
                placeholderTextColor="#999999"
                value={parcelName}
                onChangeText={setParcelName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Parcel category</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  Keyboard.dismiss()
                  setIsCategoryModalVisible(true)
                }}
              >
                <Text style={parcelCategory ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                  {parcelCategory ? categories.find((c) => c.value === parcelCategory)?.label : "Choose category"}
                </Text>
                <Icon name="chevron-down" size={24} color="#999999" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Value of item</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  Keyboard.dismiss()
                  setIsValueModalVisible(true)
                }}
              >
                <Text style={parcelValue ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                  {parcelValue ? valueRanges.find((v) => v.value === parcelValue)?.label : "Select value range"}
                </Text>
                <Icon name="chevron-down" size={24} color="#999999" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Type a description (optional)"
                placeholderTextColor="#999999"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                onFocus={scrollToBottom}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Icon name="shield-checkmark" size={20} color="#800080" />
            <Text style={styles.footerText}>
              All parcels are secured and insured in Nigeria by <Text style={styles.footerHighlight}>MANSARD</Text>
            </Text>
          </View>

          {/* Add extra padding at the bottom to ensure content is scrollable above the fixed button */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>

      {/* Fixed Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            (!parcelName || !parcelCategory || !parcelValue) && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceed}
          disabled={!parcelName || !parcelCategory || !parcelValue}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      <SelectionModal
        visible={isCategoryModalVisible}
        onClose={() => setIsCategoryModalVisible(false)}
        title="Select Category"
        options={categories}
        selectedValue={parcelCategory}
        onSelect={setParcelCategory}
      />

      <SelectionModal
        visible={isValueModalVisible}
        onClose={() => setIsValueModalVisible(false)}
        title="Parcel Value"
        options={valueRanges}
        selectedValue={parcelValue}
        onSelect={setParcelValue}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30
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
  contentContainer: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
  },
  selectButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#333333",
  },
  selectButtonPlaceholder: {
    fontSize: 16,
    color: "#999999",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
    flex: 1,
  },
  footerHighlight: {
    color: "#800080",
    fontWeight: "500",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  proceedButton: {
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  modalOptions: {
    padding: 16,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666666",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#800080",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#800080",
  },
})

