import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"

interface LocationCardProps {
  type: "Home" | "Work"
  address: string
  onPress: () => void
}

export const LocationCard: React.FC<LocationCardProps> = ({ type, address, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={type === "Home" ? "home-outline" : "briefcase-outline"} size={24} color={colors.white} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    marginVertical: theme.spacing.xs,
    
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  address: {
    fontSize: theme.fontSizes.xs,
    color: colors.text.secondary,
    width: 60
  },
})

