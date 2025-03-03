
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"

interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const { height } = Dimensions.get("window")
const SHEET_HEIGHT = height * 0.7

export function BottomSheet({ isVisible, onClose, title, children }: BottomSheetProps) {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isVisible, animation])

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [SHEET_HEIGHT, 0],
  })

  if (!isVisible) {
    return null
  }

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    height: SHEET_HEIGHT,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
})

