
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageStyle,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { DeliveryTimeline } from "../../../components/DeliveryTimeline";
import { RiderProfile } from "../../../components/RiderProfile";
import { colors } from "../../../constants/colors";
import { theme } from "../../../constants/theme";
import { icons } from "../../../constants/icons";
import { useNavigation } from "@react-navigation/native";

const deliveryDetails = {
  senderInfo: [
    { label: "Sender Name", value: "Qamardeen Malik" },
    { label: "Sender Phone", value: "07030123458" },
    { label: "Receiver Name", value: "Adebisi Lateefat" },
    { label: "Receiver Phone", value: "07031234567" },
    { label: "Parcel Name", value: "Samsung Phone" },
    { label: "Parcel Category", value: "Electronics" },
    { label: "Parcel Value", value: "100,000 - 200,000" },
    { label: "Description", value: "Nil" },
  ],
  paymentInfo: [
    { label: "Payer", value: "Sender - Qamardeen Malik" },
    { label: "Payment method", value: "Bank Transfer" },
  ],
  deliveryInfo: [
    { label: "Pay on delivery", value: "Yes" },
    { label: "Amount", value: "N20,000" },
    { label: "Delivery", value: "N2,000" },
  ],
};

export default function RideSummary() {
  const [isDeliverySummaryExpanded, setIsDeliverySummaryExpanded] =
    useState(true);

  const navigation = useNavigation();

  const senderAddress =
    "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo";
  const receiverAddress =
    "No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("RideDetails")}
        >
          <Icon name={icons.back} size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Ride Summary</Text>
        <TouchableOpacity style={styles.headerButtons}>
          <Icon
            name="ellipsis-vertical"
            size={26}
            color={colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.totalSection}>
          <View>
            <Text style={styles.totalAmount}>22,000</Text>
          </View>

          <View>
            <Text style={styles.totalLabel}>Total</Text>

            <View style={styles.deliveryFeeNote}>
              <View style={styles.greenDot} />
              <Text style={styles.deliveryFeeText}>
                Delivery fee paid by sender
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.summaryHeader}
            onPress={() =>
              setIsDeliverySummaryExpanded(!isDeliverySummaryExpanded)
            }
          >
            <Text style={styles.summaryTitle}>Delivery Summary</Text>
            <Icon
              name={isDeliverySummaryExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>

          {isDeliverySummaryExpanded && (
            <View style={styles.summaryContent}>
              <View style={styles.addall}>
                {/* Sender Address */}
                <View style={styles.addressContainer}>
                  <Text style={styles.addressLabel}>Sender Address</Text>
                  <View style={styles.addressRow}>
                    <Image
                      source={icons.senderLocation}
                      style={styles.icon as ImageStyle}
                    />
                    <View style={styles.dotLine} />
                    <Text style={styles.addressText}>{senderAddress}</Text>
                  </View>
                </View>

                {/* Receiver Address */}
                <View
                  style={[styles.addressContainer, styles.receiverContainer]}
                >
                  <Text style={styles.addressLabel}>Receiver Address</Text>
                  <View style={styles.addressRow}>
                    <Image
                      source={icons.receiverLocation}
                      style={styles.icon as ImageStyle}
                    />
                    <Text style={styles.addressText}>{receiverAddress}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                {/* Sender Information Section */}
                <View style={[styles.detailRow, styles.section]}>
                  {deliveryDetails.senderInfo.map((item, index) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{item.label}</Text>
                      <Text style={styles.detailValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>

                {/* Payment Information Section */}
                <View style={[styles.detailRow, styles.section]}>
                  {deliveryDetails.paymentInfo.map((item, index) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{item.label}</Text>
                      <Text style={styles.detailValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>

                {/* Delivery Information Section */}
                <View style={[styles.detailRow, styles.section]}>
                  {deliveryDetails.deliveryInfo.map((item, index) => (
                    <View key={index} style={styles.detailItem}>
                      <Text style={styles.detailLabel}>{item.label}</Text>
                      <Text style={styles.detailValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.riderSection}>
          <RiderProfile
            name="Malee Oladimeji"
            rating={5}
            image="/placeholder.svg"
          />

          <View style={styles.rideInfo}>
            <View style={styles.rideDetail}>
              <Icon name={icons.bike} size={20} color={colors.text.primary} />
              <Text style={styles.rideDetailText}>Bike</Text>
            </View>
            <View style={styles.rideDetail}>
              <Image source={icons.color} style={styles.icon as ImageStyle} />
              <Text style={styles.rideDetailText}>Black</Text>
            </View>
            <View style={styles.rideDetail}>
              <Image source={icons.time} style={styles.icon as ImageStyle} />
              <Text style={styles.rideDetailText}>30 min</Text>
            </View>
          </View>
        </View>

        <DeliveryTimeline />

        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.reviewButtonText}>Write a review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    padding: 16,
    height: 80,
    borderColor: "none",
    backgroundColor: "white",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerButton: {
    padding: 11,
    borderRadius: theme.borderRadius.round,
    backgroundColor: "#EBEBEB",
  },
  headerButtons: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },

  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  totalSection: {
    backgroundColor: colors.white,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    display: "flex",
    flexDirection: "row-reverse",
    borderRadius: 20,
    width: "90%",
    gap: 27,
    margin: "auto",
  },
  totalLabel: {
    fontSize: theme.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontWeight: "800",
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "900",
    color: "#800080",
    marginBottom: theme.spacing.sm,
    textAlign: "right",
  },
  deliveryFeeNote: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#008000",
    marginRight: theme.spacing.sm,
  },
  deliveryFeeText: {
    color: "#008000",
    fontSize: theme.fontSizes.sm,
  },

  card: {
    backgroundColor: colors.white,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    elevation: 2,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "94%",
    margin: "auto",
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.text.primary,
  },
  summaryContent: {
    padding: theme.spacing.md,
    width: "100%",
  },

  detailsGrid: {
    gap: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    width: "100%",
  },
  detailRow: {
    flexDirection: "column",
    gap: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  section: {
    borderWidth: 0,
    borderColor: "#C3C3C3",
    borderStyle: "dashed",
    width: "100%",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.xl,
  },
  detailLabel: {
    color: theme.colors.black,
  },
  detailValue: {
    color: theme.colors.black,
    fontWeight: "bold",
    maxWidth: "80%",
    textAlign: "right",
  },

  riderSection: {
    backgroundColor: colors.white,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    elevation: 2,
    width: "94%",
    alignSelf: "center",
  },
  rideInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: theme.spacing.lg,
    borderTopWidth: 0,
    borderTopColor: colors.white,
  },
  rideDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  rideDetailText: {
    color: colors.text.primary,
    fontSize: theme.fontSizes.sm,
  },
  reviewButton: {
    backgroundColor: "#800080",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xl,
  },
  reviewButtonText: {
    color: colors.white,
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
  },

  addressall: {
    backgroundColor: colors.white,
  },
  addressSection: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: colors.white,
  },
  addressContainer: {
    marginBottom: theme.spacing.md,
    backgroundColor: colors.white,
  },
  addressLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
    marginLeft: 28,
    fontFamily: Platform.select({ ios: "System", android: "Roboto-Regular" }),
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: 2,
    padding: 4,
  },
  addressText: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 22,
    marginLeft: 14,
    fontWeight: "800",
    fontFamily: Platform.select({ ios: "System", android: "Roboto-Regular" }),
  },
  dotLine: {
    position: "absolute",
    left: 5,
    top: 15,
    width: 1,
    height: 80,
    borderStyle: "dotted",
    borderLeftWidth: 2,
    borderColor: "black",
  },
  receiverContainer: {
    marginTop: theme.spacing.sm,
  },
});
