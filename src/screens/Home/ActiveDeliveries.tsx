import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { DeliveryCard } from "../../components/DeliveryCard"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types"

type ActiveDeliveriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ActiveDeliveries">

interface Delivery {
  id: string
  orderId: string
  status: "In Transit" | "Delivered" | "Cancelled" | "Picked up" | "Order Received"
  fromAddress: string
  toAddress: string
  orderTime: Date
  estimatedDelivery: Date
  riderName: string
  riderRating: number
}

export default function ActiveDeliveries() {
  const navigation = useNavigation<ActiveDeliveriesScreenNavigationProp>()

  const deliveries: Delivery[] = [
    {
      id: "1",
      orderId: "ORD-12ESCJK3K",
      status: "In Transit",
      fromAddress: "No 1, abcd street...",
      toAddress: "No 1, abcd street...",
      orderTime: new Date("2023-02-23T11:24:00"),
      estimatedDelivery: new Date("2023-02-23T13:22:00"),
      riderName: "Maleek Oladimeji",
      riderRating: 5,
    },
    {
      id: "2",
      orderId: "ORD-34FGHJL5M",
      status: "Picked up",
      fromAddress: "No 2, abcd street...",
      toAddress: "No 3, abcd street...",
      orderTime: new Date("2023-02-23T10:15:00"),
      estimatedDelivery: new Date("2023-02-23T12:30:00"),
      riderName: "John Doe",
      riderRating: 4,
    },
  ]

  const handleDeliveryPress = (orderId: string) => {
    console.log(`Delivery ${orderId} pressed`)
    navigation.navigate("UserDetails")
  }

  const handleViewAll = () => {
    console.log("View all deliveries")
    navigation.navigate("Deliveries" as never)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Deliveries</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeliveryCard
            orderId={item.orderId}
            status={item.status}
            fromAddress={item.fromAddress}
            toAddress={item.toAddress}
            orderTime={item.orderTime}
            estimatedDelivery={item.estimatedDelivery}
            riderName={item.riderName}
            riderRating={item.riderRating}
            onPress={() => handleDeliveryPress(item.orderId)}
            onChatPress={() => console.log(`Chat with ${item.riderName}`)}
            onCallPress={() => console.log(`Call ${item.riderName}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  viewAll: {
    fontSize: theme.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500",
  },
})

