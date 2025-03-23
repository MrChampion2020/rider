
import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"
import { theme } from "../constants/theme"
import { useNavigation } from "@react-navigation/native"

interface TabBarProps {
  activeTab: string
  onTabPress: (tabName: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const navigation = useNavigation()

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Deliveries", icon: "bicycle" },
    { name: "Add", icon: "add", isMain: true },
    { name: "Chat", icon: "chatbubble" },
    { name: "Settings", icon: "settings" },
  ]

  const handlePress = (tabName) => {
    onTabPress(tabName)
    navigation.navigate(tabName)
  }

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, activeTab === tab.name && styles.activeTab, tab.isMain && styles.mainTab]}
          onPress={() => handlePress(tab.name)}
        >
          {tab.isMain ? (
            <View style={styles.mainTabButton}>
              <Icon name={tab.icon} size={30} color={colors.white} />
            </View>
          ) : (
            <>
              <Icon name={tab.icon} size={28} color={activeTab === tab.name ? colors.primary : colors.text.secondary} />
              <Text style={[styles.tabLabel, activeTab === tab.name && styles.activeTabLabel]}>{tab.name}</Text>
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.lg,
    margin: "auto",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "91%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.xs,
  },
  activeTab: {
    // marginTop: -30,
  },
  mainTab: {
    justifyContent: "center",
  },
  mainTabButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabLabel: {
    fontSize: theme.fontSizes.xs,
    color: colors.text.secondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
})

