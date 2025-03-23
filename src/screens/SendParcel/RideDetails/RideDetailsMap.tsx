
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageStyle,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "../../../constants/icons";
import imageSource from '../../../assets/images/pp.png';

export default function RideDetails() {
  const routeCoordinates = [
    { latitude: 40.7359, longitude: -73.9911 },
    { latitude: 40.742, longitude: -73.9885 },
    { latitude: 40.7484, longitude: -73.9857 },
    { latitude: 40.755, longitude: -73.981 },
    { latitude: 40.7616, longitude: -73.9773 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name={icons.back} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: 40.7484,
                longitude: -73.9857,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#9C27B0"
                strokeWidth={4}
                lineDashPattern={[1]}
              />
              <Marker coordinate={routeCoordinates[0]}>
                <Image
                  source={icons.senderLocation}
                  style={styles.markerIcon as ImageStyle}
                />
              </Marker>
              <Marker
                coordinate={routeCoordinates[routeCoordinates.length - 1]}
              >
                <Image
                  source={icons.receiverLocation}
                  style={styles.markerIcon as ImageStyle}
                />
              </Marker>
            </MapView>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>In Transit</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <Text style={styles.sectionTitle}>Order id</Text>
            <Text style={styles.orderId}>ORD-12ESCJK3K</Text>

            <View style={styles.locationContainer}>
              <View style={styles.locationItem}>
                <Text style={styles.locationLabel}>From</Text>
                <Text style={styles.locationText} numberOfLines={1}>
                  No 1, abcd street...
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeLabel}>Time of Order</Text>
                  <Text style={styles.timeValue}>11:24 AM</Text>
                </View>
              </View>

              <View style={styles.locationItem}>
                <Text style={styles.locationLabel}>To</Text>
                <Text style={styles.locationText} numberOfLines={1}>
                  No 1, abcd street, saki...
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeLabel}>Estimated Delivery</Text>
                  <Text style={styles.timeValue}>01:22 PM</Text>
                </View>
              </View>
            </View>

            <View style={styles.paymentContainer}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Sub total</Text>
                <Text style={styles.paymentValue}>₦ 22,000</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Payment method</Text>
                <Text style={styles.paymentValue}>Wallet</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>View full history</Text>
            </TouchableOpacity>

            <View style={styles.timeline}>
              {["Order", "Picked up", "In transit", "Delivered"].map(
                (step, index) => (
                  <View key={step} style={styles.timelineItem}>
                    <View
                      style={[
                        styles.timelineDot,
                        index <= 2 ? styles.activeDot : styles.inactiveDot,
                      ]}
                    />
                    <Text
                      style={[
                        styles.timelineText,
                        index <= 2 ? styles.activeText : styles.inactiveText,
                      ]}
                    >
                      {step}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={imageSource} 
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.riderName}>Maleek Oladimeji</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4].map((star) => (
                  <Icon key={star} name={icons.star} size={16} color="#fff" />
                ))}
                <Icon
                  name={icons.star}
                  size={16}
                  color="rgba(255,255,255,0.5)"
                />
              </View>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={icons.chats}
                style={styles.actionIcon as ImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={icons.phoneb}
                style={styles.actionIcon as ImageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.trackButton}>
        <View style={styles.trackButtonLeft}>
          <View style={styles.bikeButton}>
            <Icon name={icons.bike} size={24} color="white" />
          </View>

          <Text style={styles.trackButtonText}>Track Parcel</Text>
        </View>
        <Image
          source={icons.chevronTriple}
          style={styles.chevronIcon as ImageStyle}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    overflow: "hidden",
  },
  mapContainer: {
    height: 200,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  statusBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#9C27B0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  orderDetails: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 24,
  },
  locationContainer: {
    marginBottom: 24,
  },
  locationItem: {
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeLabel: {
    fontSize: 13,
    color: "#666",
  },
  timeValue: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
  },
  paymentContainer: {
    marginBottom: 24,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 13,
    color: "#666",
  },
  paymentValue: {
    fontSize: 13,
    color: "#000",
    fontWeight: "500",
  },
  historyButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  historyButtonText: {
    color: "#9C27B0",
    fontSize: 14,
    fontWeight: "500",
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  timelineItem: {
    alignItems: "center",
    gap: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: "#9C27B0",
  },
  inactiveDot: {
    backgroundColor: "#EEE",
  },
  timelineText: {
    fontSize: 12,
  },
  activeText: {
    color: "#9C27B0",
    fontWeight: "500",
  },
  inactiveText: {
    color: "#666",
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9C27B0",
    padding: 16,
    margin: 16,
    borderRadius: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  riderName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: "#800080",
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: 16,
    marginTop: 0,
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(165, 17, 128, 0.1)",
  },
  bikeButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#800080",
  },
  trackButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  trackButtonText: {
    color: "#800080",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  chevronIcon: {
    width: 30,
    height: 24,
    tintColor: "#800080",
  },
});
