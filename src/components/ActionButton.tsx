import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"

interface ActionButtonProps {
  icon: string
  label: string
  onPress: () => void
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={colors.white} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    width: 100,
    height: 100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.primary,
    fontWeight: "500",
  },
})

