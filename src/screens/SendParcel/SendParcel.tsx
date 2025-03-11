import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"

export default function SendParcel() {
  const navigation = useNavigation()

  const handleStartSendParcel = () => {
    navigation.navigate("LocationSelect")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send a Parcel</Text>
      <Text style={styles.description}>
        Start the process of sending your parcel by selecting locations, scheduling, and more.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartSendParcel}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.fontSizes.md,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: theme.fontSizes.md,
    fontWeight: "bold",
  },
})

