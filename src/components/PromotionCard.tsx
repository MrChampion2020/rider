import type React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"

interface PromotionCardProps {
  title: string
  description: string
  tag: string
  imageUrl?: string
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ title, description, tag, imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{tag}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Image
          source={imageUrl ? { uri: imageUrl } : require("../assets/images/deliveryman.png")}
          style={styles.image}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    marginVertical: theme.spacing.md,
  },
  tagContainer: {
    backgroundColor: colors.white,
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.sm,
  },
  tag: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: colors.text.primary,
  },
  contentContainer: {
    flexDirection: "row",
    padding: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "700",
    color: colors.white,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSizes.sm,
    color: colors.white,
    opacity: 0.8,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
})

