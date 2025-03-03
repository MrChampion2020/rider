"use client";

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../constants/colors";
import { theme } from "../../constants/theme";
import type { SendParcelStackParamList } from "./Index";
import { useOrder } from "../../contexts/OrderContext";

type LocationSelectNavigationProp = NativeStackNavigationProp<
  SendParcelStackParamList,
  "LocationSelect"
>;

export default function LocationSelect() {
  const navigation = useNavigation<LocationSelectNavigationProp>();
  const route = useRoute();
  const { orderDetails, updateAddress } = useOrder();

  useEffect(() => {
    if (route.params?.selectedAddress && route.params?.type) {
      updateAddress({
        type: route.params.type,
        address: route.params.selectedAddress,
      });
    }
  }, [route.params, updateAddress]);

  const handleHomePress = () => {
    console.log("Navigating to AddressSelect with home type");
    navigation.navigate("AddressSelect", {
      type: "home",
      addressType: "sender",
    });
  };

  const handleWorkPress = () => {
    console.log("Navigating to AddressSelect with work type");
    navigation.navigate("AddressSelect", {
      type: "work",
      addressType: "sender",
    });
  };

  const handleMapPress = (type: "sender" | "receiver") => {
    navigation.navigate("MapSelect", { type });
  };

  const handleProceed = () => {
    if (orderDetails.senderAddress && orderDetails.receiverAddress) {
      // Navigate to next step in the order process
      navigation.navigate("NextStep");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
              <View
                style={[
                  styles.stepCircle,
                  step === 1 ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                <Text
                  style={[
                    styles.stepText,
                    step !== 1 && styles.inactiveStepText,
                  ]}
                >
                  {step}
                </Text>
              </View>
              {index < 3 && (
                <View style={[styles.stepLine, styles.inactiveLine]} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

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
              value={orderDetails.senderAddress}
              editable={false}
            />
            <TouchableOpacity onPress={() => handleMapPress("sender")}>
              <Icon name="location" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.addressButtons}>
            <TouchableOpacity
              style={styles.addressButton}
              onPress={handleHomePress}
            >
              <Icon name="home-outline" size={20} color={colors.text.primary} />
              <Text style={styles.addressButtonText}>Choose Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addressButton}
              onPress={handleWorkPress}
            >
              <Icon
                name="briefcase-outline"
                size={20}
                color={colors.text.primary}
              />
              <Text style={styles.addressButtonText}>Choose Work</Text>
            </TouchableOpacity>
          </View>
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
              value={orderDetails.receiverAddress}
              editable={false}
            />
            <TouchableOpacity onPress={() => handleMapPress("receiver")}>
              <Icon name="location" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => handleMapPress("receiver")}
          >
            <Icon name="map-outline" size={20} color={colors.text.primary} />
            <Text style={styles.mapButtonText}>Choose on Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.proceedButton,
          (!orderDetails.senderAddress || !orderDetails.receiverAddress) &&
            styles.proceedButtonDisabled,
        ]}
        onPress={handleProceed}
        disabled={!orderDetails.senderAddress || !orderDetails.receiverAddress}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
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
    backgroundColor: colors.grey
   
    
  },
  locationSection: {
    height: 200,
    backgroundColor: colors.white,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
 ...Platform.select({
      ios: {
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
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
    backgroundColor: colors.primary,
    margin: theme.spacing.lg,
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
});
