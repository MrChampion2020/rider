
import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"
import { theme } from "../constants/theme"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBackPress?: () => void
  rightComponent?: React.ReactNode
  light?: boolean
}

export function Header({ title, showBackButton = true, onBackPress, rightComponent, light = false }: HeaderProps) {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={[styles.container, light && styles.lightContainer]}>
      {showBackButton && (
        <TouchableOpacity style={[styles.backButton, light && styles.lightBackButton]} onPress={handleBackPress}>
          <Icon name={icons.back} size={24} color={light ? colors.white : colors.text.primary} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, light && styles.lightTitle]}>{title}</Text>
      {rightComponent ? rightComponent : <View style={styles.rightPlaceholder} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lightContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  lightBackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  lightTitle: {
    color: colors.white,
  },
  rightPlaceholder: {
    width: 40,
  },
})

