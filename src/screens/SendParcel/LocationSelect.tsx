

"use client"

import React, { useEffect, useRef, useState } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  TextInput, 
  FlatList, 
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"
import type { SendParcelStackParamList } from "../../types/navigation"
import { useOrder } from "../../contexts/OrderContext"

type LocationSelectNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "LocationSelect">

// Mock address suggestions - in a real app, this would come from a geocoding API
const mockAddressSuggestions = [
  "123 Main Street, Lagos, Nigeria",
  "456 Park Avenue, Lagos, Nigeria",
  "789 Broadway, Lagos, Nigeria",
  "101 Ocean Drive, Lagos, Nigeria",
  "202 Mountain View, Lagos, Nigeria",
]

export default function LocationSelect() {
  const navigation = useNavigation<LocationSelectNavigationProp>()
  const route = useRoute()
  const { deliveryDetails, updateDeliveryDetails } = useOrder()
  const initialRender = useRef(true)
  const scrollViewRef = useRef<ScrollView>(null)
  
  // State for manual address input and suggestions
  const [senderAddress, setSenderAddress] = useState(deliveryDetails.senderAddress || "")
  const [receiverAddress, setReceiverAddress] = useState(deliveryDetails.receiverAddress || "")
  const [showSenderSuggestions, setShowSenderSuggestions] = useState(false)
  const [showReceiverSuggestions, setShowReceiverSuggestions] = useState(false)
  const [senderSuggestions, setSenderSuggestions] = useState<string[]>([])
  const [receiverSuggestions, setReceiverSuggestions] = useState<string[]>([])
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    // Keyboard listeners to detect when keyboard appears/disappears
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
        // Scroll to the bottom when keyboard appears
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    // Skip the first render to prevent unnecessary updates
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    // Only update if we have valid params
    if (route.params?.selectedAddress && route.params?.type) {
      const addressType = route.params.type === "sender" ? "senderAddress" : "receiverAddress"

      // Only update if the address has actually changed
      if (deliveryDetails[addressType] !== route.params.selectedAddress) {
        updateDeliveryDetails({
          [addressType]: route.params.selectedAddress,
        })
        
        // Update local state as well
        if (addressType === "senderAddress") {
          setSenderAddress(route.params.selectedAddress)
        } else {
          setReceiverAddress(route.params.selectedAddress)
        }
      }
    }
  }, [route.params])

  // Filter suggestions based on input
  const filterSuggestions = (text: string) => {
    if (!text) return []
    return mockAddressSuggestions.filter(address => 
      address.toLowerCase().includes(text.toLowerCase())
    )
  }

  // Handle sender address input
  const handleSenderAddressChange = (text: string) => {
    setSenderAddress(text)
    updateDeliveryDetails({ senderAddress: text })
    
    if (text.length > 2) {
      setSenderSuggestions(filterSuggestions(text))
      setShowSenderSuggestions(true)
    } else {
      setShowSenderSuggestions(false)
    }
  }

  // Handle receiver address input
  const handleReceiverAddressChange = (text: string) => {
    setReceiverAddress(text)
    updateDeliveryDetails({ receiverAddress: text })
    
    if (text.length > 2) {
      setReceiverSuggestions(filterSuggestions(text))
      setShowReceiverSuggestions(true)
      // Scroll to make sure suggestions are visible
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    } else {
      setShowReceiverSuggestions(false)
    }
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: string, type: "sender" | "receiver") => {
    if (type === "sender") {
      setSenderAddress(suggestion)
      updateDeliveryDetails({ senderAddress: suggestion })
      setShowSenderSuggestions(false)
    } else {
      setReceiverAddress(suggestion)
      updateDeliveryDetails({ receiverAddress: suggestion })
      setShowReceiverSuggestions(false)
    }
    // Dismiss keyboard after selection
    Keyboard.dismiss()
  }

  const handleHomePress = () => {
    navigation.navigate("AddressSelect", { type: "home", addressType: "sender" })
  }

  const handleWorkPress = () => {
    navigation.navigate("AddressSelect", { type: "work", addressType: "sender" })
  }

  const handleMapPress = (type: "sender" | "receiver") => {
    navigation.navigate("MapSelect", { type })
  }

  const handleProceed = () => {
    if (senderAddress && receiverAddress) {
      navigation.navigate("ScheduleParcel")
    }
  }

  // Render suggestion item
  const renderSuggestionItem = (item: string, type: "sender" | "receiver") => (
    <TouchableOpacity 
      style={styles.suggestionItem} 
      onPress={() => handleSelectSuggestion(item, type)}
    >
      <Icon name="location-outline" size={16} color={colors.text.secondary} />
      <Text style={styles.suggestionText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
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
                <View style={[styles.stepCircle, step === 1 ? styles.activeStep : styles.inactiveStep]}>
                  <Text style={[styles.stepText, step !== 1 && styles.inactiveStepText]}>{step}</Text>
                </View>
                {index < 3 && <View style={[styles.stepLine, styles.inactiveLine]} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Sender Location */}
            <View style={styles.locationSection}>
              <View style={styles.locationHeader}>
                <View style={[styles.locationIcon, { backgroundColor: "#00A651" }]}>
                  <Icon name="locate" size={24} color={colors.white} />
                </View>
                <Text style={styles.locationTitle}>Sender Location</Text>
              </View>

              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={colors.text.secondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Location"
                  value={senderAddress}
                  onChangeText={handleSenderAddressChange}
                  editable={true}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({ y: 100, animated: true })
                    }, 100)
                  }}
                />
                <TouchableOpacity onPress={() => handleMapPress("sender")}>
                  <Icon name="location" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>

              {/* Sender Address Suggestions */}
              {showSenderSuggestions && senderSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalSuggestionContent}
                  >
                    {senderSuggestions.map((suggestion, index) => (
                      <TouchableOpacity 
                        key={index}
                        style={styles.horizontalSuggestionItem} 
                        onPress={() => handleSelectSuggestion(suggestion, "sender")}
                      >
                        <Icon name="location-outline" size={16} color={colors.text.secondary} />
                        <Text style={styles.suggestionText} numberOfLines={1}>{suggestion}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={styles.addressButtons}>
                <TouchableOpacity style={styles.addressButton} onPress={handleHomePress}>
                  <Icon name="home-outline" size={20} color={colors.text.primary} />
                  <Text style={styles.addressButtonText}>Choose Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addressButton} onPress={handleWorkPress}>
                  <Icon name="briefcase-outline" size={20} color={colors.text.primary} />
                  <Text style={styles.addressButtonText}>Choose Work</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dotted Line Connector - Fixed to connect the icons */}
            <View style={styles.connectorContainer}>
              <View style={styles.dottedLine} />
            </View>

            {/* Receiver Location */}
            <View style={styles.locationSection}>
              <View style={styles.locationHeader}>
                <View style={[styles.locationIcon, { backgroundColor: "#FF0000" }]}>
                  <Icon name="locate" size={24} color={colors.white} />
                </View>
                <Text style={styles.locationTitle}>Receiver Location</Text>
              </View>

              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={colors.text.secondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Location"
                  value={receiverAddress}
                  onChangeText={handleReceiverAddressChange}
                  editable={true}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true })
                    }, 100)
                  }}
                />
                <TouchableOpacity onPress={() => handleMapPress("receiver")}>
                  <Icon name="location" size={20} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>

              {/* Receiver Address Suggestions - Horizontal scrolling */}
              {showReceiverSuggestions && receiverSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalSuggestionContent}
                  >
                    {receiverSuggestions.map((suggestion, index) => (
                      <TouchableOpacity 
                        key={index}
                        style={styles.horizontalSuggestionItem} 
                        onPress={() => handleSelectSuggestion(suggestion, "receiver")}
                      >
                        <Icon name="location-outline" size={16} color={colors.text.secondary} />
                        <Text style={styles.suggestionText} numberOfLines={1}>{suggestion}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <TouchableOpacity style={styles.mapButton} onPress={() => handleMapPress("receiver")}>
                <Icon name="map-outline" size={20} color={colors.text.primary} />
                <Text style={styles.mapButtonText}>Choose on Map</Text>
              </TouchableOpacity>
            </View>
            
            {/* Reduced extra space at the bottom */}
            <View style={{ height: keyboardVisible ? 100 : 20 }} />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.proceedButton,
            (!senderAddress || !receiverAddress) && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceed}
          disabled={!senderAddress || !receiverAddress}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingTop: Platform.OS === "android" ? 40 : theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  headerRight: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    backgroundColor: colors.primary,
  },
  inactiveStep: {
    backgroundColor: colors.grey,
  },
  stepText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  inactiveStepText: {
    opacity: 0.8,
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  inactiveLine: {
    backgroundColor: colors.grey,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  locationSection: {
    width: "100%",
    marginBottom: theme.spacing.md, // Reduced margin to bring sections closer
    padding: theme.spacing.sm,
    zIndex: 100,
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
    marginLeft: -15,
    marginTop: -10,
  },
  locationTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    color: colors.text.primary,
  },
  suggestionsContainer: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    height: 50, // Fixed height for single line
    ...Platform.select({
      ios: {
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  horizontalSuggestionContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  horizontalSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    height: 10,
    maxWidth: Dimensions.get('window').width * 0.7,
  },
  suggestionsList: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.borderRadius.md,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
  },
  addressButtons: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  addressButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  addressButtonText: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    fontWeight: "500",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  mapButtonText: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    fontWeight: "500",
    marginLeft: theme.spacing.sm,
  },
  proceedButton: {
    backgroundColor: "#800080", // Purple color as shown in the image
    margin: theme.spacing.lg,
    marginTop: theme.spacing.sm, // Reduced top margin
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
  },
  connectorContainer: {
    position: "absolute",
    left: 40,
    top: 90, // Position starts from top of first section
    height: 180, // Fixed height to connect the two icons
    width: 2,
    alignItems: "center",
    zIndex: 1, // Ensure it's behind the sections
  },
  dottedLine: {
    flex: 1,
    width: 0.2,
    borderStyle: "dashed",
    borderWidth: 0.3,
    borderColor: colors.text.secondary,
  },
})