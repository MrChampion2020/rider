
import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from "../constants/colors"

interface TabBarProps {
  activeTab: string
  onTabPress: (tabName: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { name: "Home", icon: "home-outline", activeIcon: "home" },
    { name: "Deliveries", icon: "bicycle-outline", activeIcon: "bicycle" },
    { name: "Add", icon: "add", isMain: true },
    { name: "Chat", icon: "chatbubble-outline", activeIcon: "chatbubble" },
    { name: "Settings", icon: "settings-outline", activeIcon: "settings" },
  ]

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, tab.isMain && styles.mainTab]}
          onPress={() => onTabPress(tab.name)}
          activeOpacity={0.7}
        >
          {tab.isMain ? (
            <View style={styles.mainTabButton}>
              <Icon name={tab.icon} size={30} color={colors.white} />
            </View>
          ) : (
            <>
              <Icon
                name={activeTab === tab.name ? tab.activeIcon : tab.icon}
                size={24}
                color={activeTab === tab.name ? colors.primary : colors.text.secondary}
              />
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
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "92%",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    marginBottom: Platform.OS === "ios" ? 5 : 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  mainTab: {
    justifyContent: "center",
  },
  mainTabButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
})

