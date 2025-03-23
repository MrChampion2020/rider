
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
import { colors } from "../../../constants/colors";
import { theme } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import imageSource from '../../../assets/images/pp.png';

interface TimelineItem {
  date: string;
  time: string;
  text: string;
  location: string;
  isCompleted: boolean;
}

export default function DeliveryDetails() {

  const navigation = useNavigation();

  
  const timelineData: TimelineItem[] = [
    {
      date: "Feb 23",
      time: "01:23 AM",
      text: "User ordered a delivery",
      location: "Iseyin, Oyo state",
      isCompleted: true,
    },
    {
      date: "Feb 23",
      time: "01:23 AM",
      text: "Package picked up",
      location: "Iseyin, Oyo state",
      isCompleted: true,
    },
    {
      date: "Feb 23",
      time: "01:23 AM",
      text: "Package in transit",
      location: "Iseyin, Oyo state",
      isCompleted: false,
    },
    {
      date: "Feb 23",
      time: "01:23 AM",
      text: "Package delivered",
      location: "Iseyin, Oyo state",
      isCompleted: false,
    },
  ];

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
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("RideDetailsMap")}
        >
          <Icon name={icons.back} size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
              lineCap="round"
              lineJoin="round"
            />
            <Marker coordinate={routeCoordinates[0]}>
              <View style={styles.markerContainer}>
                <View style={[styles.markerOuter, styles.markerOuterStart]}>
                  <View style={[styles.markerInner, styles.markerInnerStart]} />
                </View>
              </View>
            </Marker>
            <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
              <View style={styles.markerContainer}>
                <View style={[styles.markerOuter, styles.markerOuterEnd]}>
                  <View style={[styles.markerInner, styles.markerInnerEnd]} />
                </View>
              </View>
            </Marker>
          </MapView>
        </View>

        <View>
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileInfo}>
                <Image
                 source={imageSource}
                  style={styles.profileImage}
                />
                <View style={styles.nameRating}>
                  <Text style={styles.riderName}>Afeez Wale</Text>
                  <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4].map((star) => (
                      <Image
                        key={star}
                        source={icons.star}
                        style={[
                          styles.iconTiny as ImageStyle,
                          styles.starFilled,
                        ]}
                      />
                    ))}
                    <Image
                      source={icons.starOutline}
                      style={[
                        styles.iconTiny as ImageStyle,
                        styles.starOutline,
                      ]}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={icons.chats}
                    style={styles.iconMedium as ImageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Image
                    source={icons.phoneb}
                    style={styles.iconMedium as ImageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderLabel}>Order ID</Text>
                <Text style={styles.orderId}>ORD-21JWD23JFEKNK2WNRK</Text>
              </View>
              <Text style={styles.statusText}>In-Transit</Text>
            </View>

            <View style={styles.timeline}>
              {timelineData.map((item, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <Text style={styles.timelineDate}>{item.date}</Text>
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  </View>
                  <View style={styles.timelineDot}>
                    <View
                      style={[
                        styles.dot,
                        item.isCompleted
                          ? styles.dotActive
                          : styles.dotInactive,
                      ]}
                    />
                    {index < timelineData.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          item.isCompleted
                            ? styles.lineActive
                            : styles.lineInactive,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineText}>{item.text}</Text>
                    <Text style={styles.timelineLocation}>{item.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: 80,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerButton:{
    padding: 11,
    borderRadius: theme.borderRadius.round,
    backgroundColor: "#EBEBEB",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  markerOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  markerOuterStart: {
    borderColor: "#4CAF50",
  },
  markerOuterEnd: {
    borderColor: "#F44336",
  },
  markerInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  markerInnerStart: {
    backgroundColor: "#4CAF50",
  },
  markerInnerEnd: {
    backgroundColor: "#F44336",
  },
  profileCard: {
    backgroundColor: "#5B1170", // Deep purple for sleek design
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginTop: -40, // Moves it up to merge with order details
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  nameRating: {
    marginLeft: 10,
  },
  riderName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  starFilled: {
    tintColor: "#FFD700", // Gold color for filled stars
  },
  starOutline: {
    tintColor: "#fff",
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "'rgba(255,255,255,0.2)'",
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  orderDetails: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginTop: -12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 14,
    color: "#888",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    color: "#FF9800",
    fontSize: 14,
    fontWeight: "bold",
  },
  timeline: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  timelineLeft: {
    width: 70,
  },
  timelineDate: {
    fontSize: 12,
    color: "#888",
  },
  timelineTime: {
    fontSize: 12,
    color: "#555",
  },
  timelineDot: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: "#5B1170",
  },
  dotInactive: {
    backgroundColor: "#ccc",
  },
  timelineLine: {
    width: 2,
    height: 20,
    backgroundColor: "#ccc",
  },
  lineActive: {
    backgroundColor: "#5B1170",
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 10,
  },
  timelineText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  timelineLocation: {
    fontSize: 12,
    color: "#888",
  },
});
