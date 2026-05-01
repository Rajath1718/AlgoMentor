import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { askAI } from "../../services/openai";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm AlgoMentor AI. Ask me anything about coding, DSA, or algorithms.",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const aiResponse = await askAI(input);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: "ai",
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AlgoMentor AI</Text>
          <Text style={styles.subtitle}>
            Your personal coding mentor
          </Text>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "user"
                  ? styles.userBubble
                  : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user"
                    ? styles.userText
                    : styles.aiText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#1E5631" />
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#9CA3AF"
            value={input}
            onChangeText={setInput}
          />

          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBF9",
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: "#1E5631",
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#D1F2EB",
    marginTop: 4,
  },
  chatContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: "#1E5631",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: "#FFFFFF",
  },
  aiText: {
    color: "#111827",
  },
  loadingContainer: {
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#111827",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#1E5631",
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});