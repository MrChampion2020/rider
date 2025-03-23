"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface IssueModalProps {
  visible: boolean
  onClose: () => void
  onComplete: () => void
}

export function IssueModal({ visible, onClose, onComplete }: IssueModalProps) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [description, setDescription] = useState("")

  const issues = [
    "Rider was late",
    "Package was damaged",
    "Rider was unprofessional",
    "Wrong delivery location",
    "Other issue",
  ]

  const handleSubmit = () => {
    // Here you would typically send the issue to your backend
    onComplete()
  }

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Report an issue</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.description}>Please select the issue you experienced with this delivery:</Text>

          <View style={styles.issuesList}>
            {issues.map((issue, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.issueItem, selectedIssue === issue && styles.selectedIssueItem]}
                onPress={() => setSelectedIssue(issue)}
              >
                <Text style={[styles.issueText, selectedIssue === issue && styles.selectedIssueText]}>{issue}</Text>
                {selectedIssue === issue && <Icon name="checkmark" size={20} color="#FFFFFF" />}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Describe the issue (optional)</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Tell us more about the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={[styles.submitButton, !selectedIssue && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!selectedIssue}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 24,
    lineHeight: 24,
  },
  issuesList: {
    marginBottom: 24,
  },
  issueItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedIssueItem: {
    backgroundColor: "#800080",
  },
  issueText: {
    fontSize: 16,
    color: "#333333",
  },
  selectedIssueText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333333",
    height: 120,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#800080",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})

