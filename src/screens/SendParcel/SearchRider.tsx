

"use client"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { SendParcelStackParamList } from "../../types/navigation"

type SearchRidersNavigationProp = NativeStackNavigationProp<SendParcelStackParamList, "SearchRiders">

export default function SearchRidersScreen({ route }: { route: { params: { amount: string } } }) {
  const navigation = useNavigation<SearchRidersNavigationProp>()
  const [isSearching, setIsSearching] = useState(true)
  const { amount } = route.params

  useEffect(() => {
    // Simulate finding riders after 3 seconds
    const timer = setTimeout(() => {
      setIsSearching(false)
      navigation.navigate("RiderBid", { amount })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation, amount])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Searching</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.searchAnimation}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
          <View style={styles.searchIconContainer}>
            <Icon name="search" size={40} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.searchingText}>Searching for available riders</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
    paddingTop: 30
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  searchAnimation: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  circle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  circle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  circle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  searchIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchingText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
})


