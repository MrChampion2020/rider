
"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"
import { BottomSheet } from "../../components/BottomSheet"
import { useOrder } from "../../contexts/OrderContext"

interface Address {
  id: string
  state: string
  city: string
  address: string
}

export default function AddressSelect() {
  const navigation = useNavigation()
  const route = useRoute()
  const { updateDeliveryDetails } = useOrder()
  const [selectedAddress, setSelectedAddress] = useState("")

  // Safely access route params with default values
  const type = route.params?.type || "home"
  const addressType = route.params?.addressType || "sender"

  const addresses: Address[] = [
    {
      id: "1",
      state: "Lagos",
      city: "Ikeja",
      address: "No 2, Abcdefgh street, ghijk",
    },
    {
      id: "2",
      state: "Lagos",
      city: "Ikeja",
      address: "No 2, Abcdefgh street, ghijk",
    },
  ]

  const handleClose = () => {
    navigation.goBack()
  }

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address.id)
    updateDeliveryDetails({
      [addressType === "sender" ? "senderAddress" : "receiverAddress"]: address.address,
    })
    navigation.navigate("LocationSelect", {
      selectedAddress: address.address,
      type: addressType,
    })
  }

  return (
    <BottomSheet isVisible onClose={handleClose} title={`${type === "home" ? "Home" : "Work"} Address`}>
      {addresses.map((address, index) => (
        <TouchableOpacity
          key={address.id}
          style={[styles.addressCard, selectedAddress === address.id && styles.selectedCard]}
          onPress={() => handleAddressSelect(address)}
        >
          <View style={styles.addressHeader}>
            <View style={styles.addressLabelContainer}>
              <Icon name={type === "home" ? "home" : "business"} size={20} color={colors.primary} />
              <Text style={styles.addressLabel}>{`Address ${index + 1}`}</Text>
            </View>
            <View style={[styles.radioButton, selectedAddress === address.id && styles.radioButtonSelected]}>
              {selectedAddress === address.id && <View style={styles.radioButtonInner} />}
            </View>
          </View>

          <View style={styles.addressDetails}>
            <View style={styles.addressRow}>
              <View style={styles.addressField}>
                <Text style={styles.fieldLabel}>State</Text>
                <Text style={styles.fieldValue}>{address.state}</Text>
              </View>
              <View style={styles.addressField}>
                <Text style={styles.fieldLabel}>City</Text>
                <Text style={styles.fieldValue}>{address.city}</Text>
              </View>
            </View>

            <View style={styles.addressField}>
              <Text style={styles.fieldLabel}>Address</Text>
              <Text style={styles.fieldValue}>{address.address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCard: {
    borderColor: colors.primary,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  addressLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  addressLabel: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.primary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  addressDetails: {
    gap: theme.spacing.md,
  },
  addressRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  addressField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: theme.fontSizes.md,
    color: colors.text.primary,
    fontWeight: "500",
  },
})

