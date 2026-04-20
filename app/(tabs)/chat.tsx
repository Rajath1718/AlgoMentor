import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  type: "user" | "ai";
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Explain Two Sum problem",
      type: "user",
    },
    {
      id: "2",
      text: "Two Sum asks you to find two numbers that add up to a target. Use a HashMap for O(n) solution.",
      type: "ai",
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: String(Date.now()),
      text: input,
      type: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    Keyboard.dismiss();

    // Fake AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: String(Date.now() + 1),
        text: "Nice question! Try thinking in terms of hash maps for optimization.",
        type: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#1E5631" />
          <Text style={styles.headerTitle}>AI Chat</Text>
        </View>

        {/* MESSAGES */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messages}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.type === "user"
                  ? styles.userWrapper
                  : styles.aiWrapper,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  msg.type === "user"
                    ? styles.userBubble
                    : styles.aiBubble,
                ]}
              >
                <Text
                  style={
                    msg.type === "user"
                      ? styles.userText
                      : styles.aiText
                  }
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask about DSA..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />

          <Pressable
            onPress={handleSend}
            style={[
              styles.sendBtn,
              !input.trim() && styles.disabledBtn,
            ]}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFBF9" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#1E5631",
  },

  messages: { flex: 1, padding: 12 },

  messageWrapper: { marginVertical: 6, flexDirection: "row" },

  userWrapper: { justifyContent: "flex-end" },
  aiWrapper: { justifyContent: "flex-start" },

  bubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },

  userBubble: {
    backgroundColor: "#1E5631",
    borderBottomRightRadius: 2,
  },

  aiBubble: {
    backgroundColor: "#E8F5F1",
    borderBottomLeftRadius: 2,
  },

  userText: { color: "#fff" },
  aiText: { color: "#2C3E3A" },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#2ECC71",
    padding: 10,
    borderRadius: 20,
  },

  disabledBtn: {
    backgroundColor: "#BDBDBD",
  },
});