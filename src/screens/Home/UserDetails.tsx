import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { GradientBackground } from "../../components/BackgroundGradient"
import { DeliveryCard } from "../../components/DeliveryCard"
import { Header } from "../../components/Headers"
import { colors } from "../../constants/colors"
import { theme } from "../../constants/theme"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../../types"

type UserDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "UserDetails">

export default function UserDetails() {
  const navigation = useNavigation<UserDetailsScreenNavigationProp>()

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleDeliveryPress = (orderId: string) => {
    console.log(`Delivery ${orderId} details pressed`)
    // Navigate to detailed delivery view
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <Header title="Delivery Details" showBackButton={true} onBackPress={handleBackPress} light={true} />

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <DeliveryCard
            orderId="ORD-12ESCJK3K"
            status="In Transit"
            fromAddress="No 1, abcd street..."
            toAddress="No 1, abcd street..."
            orderTime={new Date("2023-02-23T11:24:00")}
            estimatedDelivery={new Date("2023-02-23T13:22:00")}
            riderName="Maleek Oladimeji"
            riderRating={5}
            onPress={() => handleDeliveryPress("ORD-12ESCJK3K")}
            onChatPress={() => console.log("Chat with rider")}
            onCallPress={() => console.log("Call rider")}
          />

          {/* Delivery Timeline */}
          <View style={styles.timelineContainer}>
            <Text style={styles.timelineTitle}>Delivery Timeline</Text>

            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineDate}>Feb 23</Text>
                <Text style={styles.timelineTime}>11:24 AM</Text>
              </View>
              <View style={styles.timelineCenter}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={[styles.timelineLine, styles.timelineLineActive]} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.timelineEvent}>Order Received</Text>
                <Text style={styles.timelineLocation}>No 1, abcd street...</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineDate}>Feb 23</Text>
                <Text style={styles.timelineTime}>11:45 AM</Text>
              </View>
              <View style={styles.timelineCenter}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={[styles.timelineLine, styles.timelineLineActive]} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.timelineEvent}>Picked up</Text>
                <Text style={styles.timelineLocation}>No 1, abcd street...</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineDate}>Feb 23</Text>
                <Text style={styles.timelineTime}>12:30 PM</Text>
              </View>
              <View style={styles.timelineCenter}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.timelineEvent}>In transit</Text>
                <Text style={styles.timelineLocation}>On the way to destination</Text>
              </View>
            </View>

            <View style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineDate}>Feb 23</Text>
                <Text style={styles.timelineTime}>01:22 PM</Text>
              </View>
              <View style={styles.timelineCenter}>
                <View style={styles.timelineDot} />
              </View>
              <View style={styles.timelineRight}>
                <Text style={styles.timelineEvent}>Delivered</Text>
                <Text style={styles.timelineLocation}>No 1, abcd street...</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: theme.spacing.xl,
    marginBottom: 110
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
   
  },
  timelineContainer: {
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: 40
  },
  timelineTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: "600",
    color: colors.black,
    marginBottom: theme.spacing.lg,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  timelineLeft: {
    width: 80,
  },
  timelineDate: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.secondary,
  },
  timelineTime: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "500",
    color: colors.text.primary,
  },
  timelineCenter: {
    alignItems: "center",
    width: 24,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  timelineDotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.grey,
    marginVertical: 4,
  },
  timelineLineActive: {
    backgroundColor: colors.primary,
  },
  timelineRight: {
    flex: 1,
    paddingLeft: theme.spacing.md,
  },
  timelineEvent: {
    fontSize: theme.fontSizes.md,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 4,
  },
  timelineLocation: {
    fontSize: theme.fontSizes.sm,
    color: colors.text.secondary,
  },
})

