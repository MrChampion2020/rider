"use client"

import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Icon from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/navigation"

type SupportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Support">

type MessageType = "agent" | "user" | "options" | "form" | "formSubmission" | "typing"

interface Message {
  id: string
  type: MessageType
  content: string
  timestamp: Date
  options?: string[]
  formData?: {
    fullName?: string
    phoneNumber?: string
    email?: string
  }
}

export default function SupportScreen() {
  const navigation = useNavigation<SupportScreenNavigationProp>()
  const scrollViewRef = useRef<ScrollView>(null)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: ""
  })
  const [isTyping, setIsTyping] = useState(false)
  
  // Initialize chat
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        type: "agent",
        content: "Hello, I'm Alex how can I help you today",
        timestamp: new Date()
      },
      {
        id: "2",
        type: "options",
        content: "What issues would you want help with",
        timestamp: new Date(),
        options: [
          "Issues with payment",
          "Lost parcel",
          "Rider not responding",
          "Customer not responding",
          "Issues with app"
        ]
      }
    ]
    
    setMessages(initialMessages)
  }, [])
  
  const handleSendMessage = () => {
    if (inputText.trim() === "") return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText("")
    
    // Simulate agent typing
    simulateAgentTyping()
  }
  
  const handleSelectOption = (option: string) => {
    setSelectedIssue(option)
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: option,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Simulate agent typing
    simulateAgentTyping()
    
    // After a delay, show the form request
    setTimeout(() => {
      const formRequestMessage: Message = {
        id: Date.now().toString(),
        type: "agent",
        content: "Drop the following details",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, formRequestMessage])
      setShowForm(true)
    }, 1500)
  }
  
  const handleSubmitForm = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.email) return
    
    const formSubmissionMessage: Message = {
      id: Date.now().toString(),
      type: "formSubmission",
      content: "Form details",
      timestamp: new Date(),
      formData: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      }
    }
    
    setMessages(prev => [...prev, formSubmissionMessage])
    setShowForm(false)
    
    // Simulate agent typing
    simulateAgentTyping()
    
    // After a delay, show the final message
    setTimeout(() => {
      const finalMessage: Message = {
        id: Date.now().toString(),
        type: "agent",
        content: "An agent will be with you shortly",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, finalMessage])
    }, 1500)
  }
  
  const simulateAgentTyping = () => {
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
    }, 1500)
  }
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messages, isTyping, showForm])
  
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "agent":
        return (
          <View style={styles.agentMessageContainer}>
            <Image 
              source={require("../../assets/support-agent.png")} 
              style={styles.agentAvatar} 
            />
            <View style={styles.agentMessage}>
              <Text style={styles.messageText}>{message.content}</Text>
              <Text style={styles.timestamp}>Just now</Text>
            </View>
          </View>
        )
        
      case "user":
        return (
          <View style={styles.userMessageContainer}>
            <View style={styles.userMessage}>
              <Text style={styles.userMessageText}>{message.content}</Text>
              <Text style={styles.userTimestamp}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <Image 
              source={require("../../assets/support-agent.png")} 
              style={styles.userAvatar} 
            />
          </View>
        )
        
      case "options":
        return (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>{message.content}</Text>
            {message.options?.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.optionButton,
                  option === "Issues with payment" && styles.activeOptionButton
                ]}
                onPress={() => handleSelectOption(option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    option === "Issues with payment" && styles.activeOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )
        
      case "formSubmission":
        return (
          <View style={styles.userMessageContainer}>
            <View style={styles.formSubmissionMessage}>
              <Text style={styles.formSubmissionTitle}>{message.content}</Text>
              
              <View style={styles.formSubmissionDetail}>
                <Text style={styles.formSubmissionLabel}>Name</Text>
                <Text style={styles.formSubmissionValue}>{message.formData?.fullName}</Text>
              </View>
              
              <View style={styles.formSubmissionDetail}>
                <Text style={styles.formSubmissionLabel}>Phone Number</Text>
                <Text style={styles.formSubmissionValue}>{message.formData?.phoneNumber}</Text>
              </View>
              
              <View style={styles.formSubmissionDetail}>
                <Text style={styles.formSubmissionLabel}>Email</Text>
                <Text style={styles.formSubmissionValue}>{message.formData?.email}</Text>
              </View>
              
              <Text style={styles.formSubmissionTimestamp}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <Image 
              source={require("../../assets/support-agent.png")} 
              style={styles.userAvatar} 
            />
          </View>
        )
        
      default:
        return null
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Fast Support</Text>
          <Text style={styles.onlineStatus}>Online</Text>
        </View>
        <View style={styles.headerRight} />
      </View>
      
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationHeaderText}>This is the beginning of your conversation</Text>
        </View>
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(message => (
            <View key={message.id}>
              {renderMessage(message)}
            </View>
          ))}
          
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          )}
          
          {showForm && (
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Full Name</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
              />
              
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
              />
              
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Enter your email address"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              />
              
              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitForm}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Icon name="paper-plane" size={20} color="#800080" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800080",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  onlineStatus: {
    fontSize: 14,
    color: "#00FF00",
    marginTop: 4,
  },
  headerRight: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  conversationHeader: {
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  conversationHeaderText: {
    fontSize: 14,
    color: "#666666",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  agentMessageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  agentMessage: {
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: "75%",
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    color: "#999999",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  userMessageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  userMessage: {
    backgroundColor: "#FFA500",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
    maxWidth: "75%",
    marginRight: 8,
  },
  userMessageText: {
    fontSize: 16,
    color: "#000000",
  },
  userTimestamp: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.7,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionsTitle: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  activeOptionButton: {
    backgroundColor: "#800080",
  },
  optionText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  activeOptionText: {
    color: "#FFFFFF",
  },
  formContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#800080",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  formSubmissionMessage: {
    backgroundColor: "#FFA500",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 16,
    maxWidth: "75%",
    marginRight: 8,
  },
  formSubmissionTitle: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 8,
  },
  formSubmissionDetail: {
    marginBottom: 8,
  },
  formSubmissionLabel: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.7,
    textAlign: "right",
  },
  formSubmissionValue: {
    fontSize: 14,
    color: "#000000",
    textAlign: "right",
  },
  formSubmissionTimestamp: {
    fontSize: 12,
    color: "#000000",
    opacity: 0.7,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
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
  typingContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  typingIndicator: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    padding: 12,
    width: 70,
    justifyContent: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999999",
    marginHorizontal: 2,
  },
})