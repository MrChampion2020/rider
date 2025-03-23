

"use client"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type DeliverySummaryNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "DeliverySummary">

interface DeliverySummaryProps {
  route: {
    params: {
      orderId: string
      status: "delivered"
      amount: string
    }
  }
}

export default function DeliveredSummary({ route }: DeliverySummaryProps) {
  const navigation = useNavigation<DeliverySummaryNavigationProp>()
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const { orderId, amount } = route.params

  const handleWriteReview = () => {
    setShowRatingModal(true)
  }

  const handleRatingComplete = () => {
    setShowRatingModal(false)
    // Navigate to home screen after rating
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Summary</Text>
        <TouchableOpacity onPress={() => setShowMoreOptions(true)}>
          <Icon name="ellipsis-vertical" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.paymentInfoRow}>
            <View style={styles.paymentMethodIndicator}>
              <View style={styles.greenDot} />
              <Text style={styles.paymentMethodText}>Delivery fee paid by sender</Text>
            </View>
          </View>
          <Text style={styles.totalAmount}>₦{amount}</Text>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Delivery Summary</Text>
            <Icon name="chevron-down" size={24} color="#000000" />
          </View>

          <View style={styles.addressSection}>
            <View style={styles.addressRow}>
              <Icon name="location" size={20} color="#00A651" style={styles.addressIcon} />
              <View>
                <Text style={styles.addressLabel}>Sender Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>

            <View style={styles.addressDivider} />

            <View style={styles.addressRow}>
              <Icon name="location" size={20} color="#FF0000" style={styles.addressIcon} />
              <View>
                <Text style={styles.addressLabel}>Receiver Address</Text>
                <Text style={styles.addressText}>No 1, alobalowo street, off saki iseyin express way, Iseyin,Oyo</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsSection}>
            {/* Details rows */}
            <DetailRow label="Sender Name" value="Qamardeen Malik" />
            <DetailRow label="Sender Phone" value="07030123456" />
            <DetailRow label="Receiver Name" value="Adebisi Lateefat" />
            <DetailRow label="Receiver Phone" value="07031234567" />
            <DetailRow label="Parcel Name" value="Samsung Phone" />
            <DetailRow label="Parcel Category" value="Electronics" />
            <DetailRow label="Parcel Value" value="100,000 - 200,000" />
            <DetailRow label="Description" value="Nil" />
            <DetailRow label="Payer" value="Sender - Qamardeen Malik" />
            <DetailRow label="Payment method" value="Wallet" />
            <DetailRow label="Pay on delivery" value="No" />
            <DetailRow label="Pay on delivery amount" value="NA" />
            <DetailRow label="Delivery fee for rider" value={`₦${amount}`} />
          </View>
        </View>

        <View style={styles.riderCard}>
          <View style={styles.riderInfo}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.riderImage} />
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>Maleek Oladimeji</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="star" size={16} color="#800080" />
                ))}
              </View>
            </View>
            <View style={styles.riderActions}>
              <TouchableOpacity style={styles.riderActionButton}>
                <Icon name="chatbubble-ellipses" size={24} color="#800080" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.riderActionButton}>
                <Icon name="call" size={24} color="#800080" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.riderDetails}>
            <View style={styles.riderDetailRow}>
              <Icon name="bicycle" size={20} color="#333333" />
              <Text style={styles.riderDetailText}>Bike</Text>
            </View>
            <View style={styles.riderDetailRow}>
              <Icon name="color-palette" size={20} color="#333333" />
              <Text style={styles.riderDetailText}>Black</Text>
            </View>
            <View style={styles.riderDetailRow}>
              <Icon name="time" size={20} color="#333333" />
              <Text style={styles.riderDetailText}>30 min</Text>
            </View>
          </View>

          <View style={styles.deliveryTimeline}>
            <TimelineItem
              date="Feb 23"
              time="01:23 AM"
              description="User ordered a delivery"
              location="Iseyin, Oyo state"
            />
            <TimelineItem date="Feb 23" time="01:23 AM" description="Package picked up" location="Iseyin, Oyo state" />
            <TimelineItem date="Feb 23" time="01:23 AM" description="Package in transit" location="Iseyin, Oyo state" />
            <TimelineItem date="Feb 23" time="01:23 AM" description="Package delivered" location="Iseyin, Oyo state" />
          </View>

          <TouchableOpacity style={styles.reviewButton} onPress={handleWriteReview}>
            <Text style={styles.reviewButtonText}>Write a review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Rating Modal */}
      <Modal visible={showRatingModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.ratingModalContent}>
            <View style={styles.ratingModalHeader}>
              <Text style={styles.ratingModalTitle}>Rate your delivery experience</Text>
              <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <Text style={styles.ratingNumber}>{rating}</Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Icon
                    name={rating >= star ? "star" : "star-outline"}
                    size={40}
                    color={rating >= star ? "#800080" : "#CCCCCC"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.reviewsCount}>3,000 Reviews</Text>

            <View style={styles.ratingStats}>
              <RatingStat number={5} percentage={80} />
              <RatingStat number={4} percentage={10} />
              <RatingStat number={3} percentage={5} />
              <RatingStat number={2} percentage={3} />
              <RatingStat number={1} percentage={2} />
            </View>

            <View style={styles.reviewsList}>
              <ReviewItem name="Qamardeen Abdul Malik" rating={4} date="23/02/2025" comment="The guy was very nice" />
              <ReviewItem
                name="Qamardeen Abdul Malik"
                rating={4}
                date="23/02/2025"
                comment="It was delivered on time"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleRatingComplete}>
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* More Options Modal */}
      <Modal visible={showMoreOptions} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.optionsModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>More Options</Text>
              <TouchableOpacity onPress={() => setShowMoreOptions(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.optionItem}>
              <Icon name="alert-circle" size={24} color="#FF0000" />
              <Text style={styles.optionText}>Report an issue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

const TimelineItem = ({
  date,
  time,
  description,
  location,
}: { date: string; time: string; description: string; location: string }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineDate}>
      <Text style={styles.timelineDateText}>{date}</Text>
      <Text style={styles.timelineTimeText}>{time}</Text>
    </View>
    <View style={styles.timelineDot}>
      <View style={styles.timelineDotInner} />
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineDescription}>{description}</Text>
      <Text style={styles.timelineLocation}>{location}</Text>
    </View>
  </View>
)

const RatingStat = ({ number, percentage }: { number: number; percentage: number }) => (
  <View style={styles.ratingStat}>
    <Text style={styles.ratingStatNumber}>{number} ★</Text>
    <View style={styles.ratingStatBar}>
      <View style={[styles.ratingStatFill, { width: `${percentage}%` }]} />
    </View>
    <Text style={styles.ratingStatPercentage}>{percentage}%</Text>
  </View>
)

const ReviewItem = ({
  name,
  rating,
  date,
  comment,
}: { name: string; rating: number; date: string; comment: string }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <View style={styles.reviewerInfo}>
        <Text style={styles.reviewerName}>{name}</Text>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon key={star} name={rating >= star ? "star" : "star-outline"} size={16} color="#800080" />
          ))}
          <Text style={styles.reviewDate}>{date}</Text>
        </View>
      </View>
    </View>
    {comment ? <Text style={styles.reviewComment}>{comment}</Text> : null}
  </View>
)

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
  content: {
    flex: 1,
    padding: 16,
  },
  totalSection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  paymentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  paymentMethodIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00A651",
    marginRight: 8,
  },
  paymentMethodText: {
    fontSize: 12,
    color: "#666666",
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#800080",
    marginTop: 8,
  },
  summarySection: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  addressSection: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  addressIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666666",
  },
  addressText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  addressDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 8,
    marginLeft: 28,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
  },
  detailValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
    textAlign: "right",
  },
  riderCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  riderInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  riderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  riderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  riderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  riderActions: {
    flexDirection: "row",
  },
  riderActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  riderDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    marginBottom: 8,
  },
  riderDetailText: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 8,
  },
  deliveryTimeline: {
    marginTop: 16,
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineDate: {
    width: 80,
  },
  timelineDateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  timelineTimeText: {
    fontSize: 12,
    color: "#666666",
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  timelineDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#800080",
  },
  timelineContent: {
    flex: 1,
  },
  timelineDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  timelineLocation: {
    fontSize: 12,
    color: "#666666",
  },
  reviewButton: {
    backgroundColor: "#800080",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  reviewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  optionsModalContent: {
    backgroundColor: "white",
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
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  ratingModalContent: {
    flex: 1,
    padding: 16,
  },
  ratingModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  ratingModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
    marginVertical: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  ratingStats: {
    marginBottom: 24,
  },
  ratingStat: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingStatNumber: {
    width: 30,
    fontSize: 14,
    color: "#333333",
  },
  ratingStatBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#EEEEEE",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  ratingStatFill: {
    height: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  ratingStatPercentage: {
    width: 40,
    fontSize: 14,
    color: "#333333",
    textAlign: "right",
  },
  reviewsList: {
    flex: 1,
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: "#800080",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

