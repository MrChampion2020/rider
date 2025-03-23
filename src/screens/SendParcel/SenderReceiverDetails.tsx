"use client"

import React, { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"
import type { SendParcelStackParamList } from "../../types/navigation"

type SenderReceiverDetailsNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "SenderReceiverDetails">

export default function SenderReceiverDetails() {
  const navigation = useNavigation<SenderReceiverDetailsNavigationProp>()
  const [senderName, setSenderName] = useState("Qamardeen Abdul Malik")
  const [senderPhone, setSenderPhone] = useState("07033484845")
  const [receiverName, setReceiverName] = useState("")
  const [receiverPhone, setReceiverPhone] = useState("")
  const scrollViewRef = useRef<ScrollView>(null)

  const handleProceed = () => {
    if (senderName && senderPhone && receiverName && receiverPhone) {
      navigation.navigate("ParcelDetails")
    }
  }

  const scrollToReceiver = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.content}>
          <ScrollView ref={scrollViewRef} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-back" size={24} color={colors.text.primary} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Send Parcel</Text>
              <View style={styles.headerRight} />
            </View>

            {/* Progress Steps */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                {[1, 2, 3, 4].map((step, index) => (
                  <React.Fragment key={step}>
                    <View style={[styles.stepCircle, step <= 2 ? styles.activeStep : styles.inactiveStep]}>
                      <Text style={[styles.stepText, step > 2 && styles.inactiveStepText]}>{step}</Text>
                    </View>
                    {index < 3 && (
                      <View style={[styles.stepLine, step <= 2 ? styles.activeLine : styles.inactiveLine]} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>

            <View style={styles.mainContent}>
              {/* Dotted Line Connector */}
              <View style={styles.connectorContainer}>
                <View style={styles.dottedLine} />
              </View>

              {/* Sender Details */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.sectionIcon, { backgroundColor: "#00A651" }]}>
                      <Icon name="locate" size={24} color={colors.white} />
                    </View>
                    <Text style={styles.sectionTitle}>Sender Details</Text>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sender Name</Text>
                    <TextInput
                      style={styles.input}
                      value={senderName}
                      onChangeText={setSenderName}
                      placeholder="Enter name"
                      placeholderTextColor="#999999"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sender Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      value={senderPhone}
                      onChangeText={setSenderPhone}
                      placeholder="Enter phone number"
                      placeholderTextColor="#999999"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              </View>

              {/* Receiver Details */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.sectionIcon, { backgroundColor: "#FF0000" }]}>
                      <Icon name="locate" size={24} color={colors.white} />
                    </View>
                    <Text style={styles.sectionTitle}>Receiver Details</Text>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Receiver Name</Text>
                    <TextInput
                      style={styles.input}
                      value={receiverName}
                      onChangeText={setReceiverName}
                      placeholder="Enter name"
                      placeholderTextColor="#999999"
                      onFocus={scrollToReceiver}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Receiver Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      value={receiverPhone}
                      onChangeText={setReceiverPhone}
                      placeholder="Enter phone number"
                      placeholderTextColor="#999999"
                      keyboardType="phone-pad"
                      onFocus={scrollToReceiver}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.proceedButton,
              (!senderName || !senderPhone || !receiverName || !receiverPhone) && styles.proceedButtonDisabled,
            ]}
            onPress={handleProceed}
            disabled={!senderName || !senderPhone || !receiverName || !receiverPhone}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  mainContent: {
    padding: 16,
    position: "relative",
  },
  section: {
    marginBottom: 24,
    position: "relative",
    zIndex: 1,
  },
  sectionCard: {
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionTitle: {
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
  connectorContainer: {
    position: "absolute",
    left: 36,
    top: 72,
    bottom: 72,
    width: 1,
    alignItems: "center",
    zIndex: 0,
  },
  dottedLine: {
    flex: 1,
    width: 1,
    borderStyle: "dashed",
    borderWidth: 0.3,
    borderColor: "#AAAAAA",
    marginLeft: 15,
  },
  buttonContainer: {
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
})

