import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chat 🤖</Text>

      <View style={styles.chatBox}>
        <Text>User: Explain Two Sum</Text>
        <Text style={styles.ai}>AI: Use HashMap for O(n)</Text>
      </View>

      <TextInput
        placeholder="Ask something..."
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold" },
  chatBox: { marginVertical: 20 },
  ai: { color: "green" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});