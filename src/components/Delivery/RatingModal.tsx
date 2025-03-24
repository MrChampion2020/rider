



"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface RatingModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
}

export function RatingModal({ visible, onClose, onComplete }: RatingModalProps) {
  const [rating, setRating] = useState(4)
  const [review, setReview] = useState("")

  const handleSubmitReview = () => {
    // Here you would typically send the review to your backend
    onComplete()
  }

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rate your delivery experience</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.ratingNumber}>{rating}</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <View style={styles.starContainer}>
                  <Icon name="star" size={40} color={star <= rating ? "#800080" : "#DDDDDD"} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.reviewsCount}>3,000 Reviews</Text>

          <View style={styles.reviewInputContainer}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Leave a review"
              value={review}
              onChangeText={setReview}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Icon name="send" size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingStats}>
            <RatingStat number={5} percentage={80} />
            <RatingStat number={4} percentage={10} />
            <RatingStat number={3} percentage={5} />
            <RatingStat number={2} percentage={3} />
            <RatingStat number={1} percentage={2} />
          </View>

          <View style={styles.reviewsList}>
            <ReviewItem
              name="Qamardeen Abdul Malik"
              rating={4}
              date="23/02/2025"
              comment="The guy was very nice"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2070-KagiGNaW2LCbUEY3vGmUe5to7PE5B1.png"
            />
            <ReviewItem
              name="Qamardeen Abdul Malik"
              rating={4}
              date="23/02/2025"
              comment="It was delivered on time"
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2070-KagiGNaW2LCbUEY3vGmUe5to7PE5B1.png"
            />
            <ReviewItem
              name="Qamardeen Abdul Malik"
              rating={4}
              date="23/02/2025"
              comment=""
              image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20%26%2015%20Pro%20Max%20-%2070-KagiGNaW2LCbUEY3vGmUe5to7PE5B1.png"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const RatingStat = ({ number, percentage }: { number: number; percentage: number }) => {
  const getBarColor = () => {
    if (number === 5) return "#4CAF50"
    if (number === 4) return "#8BC34A"
    if (number === 3) return "#FFEB3B"
    if (number === 2) return "#FF9800"
    return "#F44336"
  }

  return (
    <View style={styles.ratingStat}>
      <Text style={styles.ratingStatNumber}>{number} ★</Text>
      <View style={styles.ratingStatBar}>
        <View style={[styles.ratingStatFill, { width: `${percentage}%`, backgroundColor: getBarColor() }]} />
      </View>
      <Text style={styles.ratingStatPercentage}>{percentage.toString().padStart(2, "0")}%</Text>
    </View>
  )
}

const ReviewItem = ({
  name,
  rating,
  date,
  comment,
  image,
}: {
  name: string
  rating: number
  date: string
  comment: string
  image: string
}) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <Image
        source={{ uri: image }}
        style={styles.reviewerImage}
        defaultSource={{ uri: "/placeholder.svg?height=40&width=40" }}
      />
      <View style={styles.reviewerInfo}>
        <Text style={styles.reviewerName}>{name}</Text>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon key={star} name="star" size={16} color={star <= rating ? "#800080" : "#DDDDDD"} />
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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 16,
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
  starContainer: {
    padding: 8,
  },
  reviewsCount: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  reviewInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  reviewInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
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
})

