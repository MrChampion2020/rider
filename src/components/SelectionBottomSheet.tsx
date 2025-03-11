"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { BottomSheet } from "./BottomSheet"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"
import Icon from "react-native-vector-icons/Ionicons"

interface SelectionOption {
  label: string
  value: string
}

interface SelectionBottomSheetProps {
  isVisible: boolean
  onClose: () => void
  title: string
  options: SelectionOption[]
  selectedValue: string
  onSelect: (value: string) => void
}

export function SelectionBottomSheet({
  isVisible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
}: SelectionBottomSheetProps) {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose} title={title}>
      <View style={styles.container}>
        {options.map((option) => (
          <TouchableOpacity key={option.value} style={styles.option} onPress={() => onSelect(option.value)}>
            <Text style={styles.optionText}>{option.label}</Text>
            {selectedValue === option.value && <Icon name="checkmark-circle" size={24} color={colors.primary} />}
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginBottom: 100
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: theme.fontSizes.md,
    color: colors.text.primary,
  },
})

