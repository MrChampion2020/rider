

"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Chat">

interface ChatItem {
  id: string
  name: string
  orderId: string
  avatar: any
  lastMessageTime: string
  unreadCount: number
}

interface Message {
  id: string
  text: string
  sender: "user" | "rider"
  timestamp: string
}

export default function ChatScreen() {
  const navigation = useNavigation<ChatScreenNavigationProp>()
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null)
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      { id: "1", text: "Hello, I'm on my way to pick up your package", sender: "rider", timestamp: "10:30 AM" },
      { id: "2", text: "Great! I'll be waiting", sender: "user", timestamp: "10:32 AM" },
      { id: "3", text: "I'm almost at your location", sender: "rider", timestamp: "10:45 AM" },
    ],
    "2": [
      { id: "1", text: "Hi, I've arrived at the pickup location", sender: "rider", timestamp: "11:15 AM" },
      { id: "2", text: "I'll be down in 5 minutes", sender: "user", timestamp: "11:16 AM" },
    ],
    "3": [
      { id: "1", text: "Hello, is the package fragile?", sender: "rider", timestamp: "09:30 AM" },
      { id: "2", text: "Yes, please handle with care", sender: "user", timestamp: "09:35 AM" },
    ],
    "4": [],
    "5": [
      { id: "1", text: "I'm at the gate, can you let me in?", sender: "rider", timestamp: "12:10 PM" },
      { id: "2", text: "I'll tell the security to let you in", sender: "user", timestamp: "12:12 PM" },
    ],
    "6": [
      { id: "1", text: "Hello, what's the apartment number?", sender: "rider", timestamp: "01:20 PM" },
      { id: "2", text: "It's 304, 3rd floor", sender: "user", timestamp: "01:22 PM" },
    ],
    "7": [
      { id: "1", text: "Package delivered successfully", sender: "rider", timestamp: "02:45 PM" },
      { id: "2", text: "Thank you!", sender: "user", timestamp: "02:46 PM" },
    ],
  })

  const [chats] = useState<ChatItem[]>([
    {
      id: "1",
      name: "Afeez Wale",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/smiles.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Adam Wayne",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/smiley.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
    {
      id: "3",
      name: "Adebola Charles",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/guy.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
    {
      id: "4",
      name: "Karim Adeyemi",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/lady.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 0,
    },
    {
      id: "5",
      name: "John Bello",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/pp.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
    {
      id: "6",
      name: "Halima Ibrahim",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/smiley.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
    {
      id: "7",
      name: "ID Money",
      orderId: "ORD-12345672D",
      avatar: require("../../assets/images/smiles.png"),
      lastMessageTime: "23/02/25- 11:12AM",
      unreadCount: 2,
    },
  ])

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
    }))

    setMessageText("")
  }

  const handleBackToChats = () => {
    setActiveChat(null)
  }

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => setActiveChat(item)}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatOrderId}>{item.orderId}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.lastMessageTime}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount} Unread</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === "user" ? styles.userMessage : styles.riderMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      {item.sender === "user" && <Image source={activeChat?.avatar} style={styles.messageAvatar} />}
      {item.sender === "rider" && <Image source={activeChat?.avatar} style={styles.messageAvatar} />}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {!activeChat ? (
        // Chat List Screen
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chats</Text>
            <View style={styles.headerRight} />
          </View>

          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
          />
        </>
      ) : (
        // Chat Room Screen
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <View style={styles.chatRoomHeader}>
            <TouchableOpacity onPress={handleBackToChats} style={styles.backButton}>
              <Icon name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Image source={activeChat.avatar} style={styles.headerAvatar} />
            <View style={styles.headerChatInfo}>
              <Text style={styles.headerChatName}>{activeChat.name}</Text>
              <Text style={styles.headerChatOrderId}>{activeChat.orderId}</Text>
            </View>
          </View>

          <FlatList
            data={messages[activeChat.id] || []}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            inverted={false}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={messageText}
              onChangeText={setMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={!messageText.trim()}>
              <Icon name="send" size={20} color={messageText.trim() ? "#800080" : "#CCCCCC"} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  headerRight: {
    width: 40,
  },
  chatList: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  chatOrderId: {
    fontSize: 14,
    color: "#800080",
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatTime: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: "#800080",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  // Chat Room Styles
  chatRoomHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerChatInfo: {
    flex: 1,
  },
  headerChatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  headerChatOrderId: {
    fontSize: 14,
    color: "#800080",
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userMessage: {
    backgroundColor: "#800080",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  riderMessage: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
})

