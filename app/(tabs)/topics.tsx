import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Topics() {
  const topics = [
    "Arrays",
    "Linked List",
    "Trees",
    "Graphs",
    "Dynamic Programming",
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Topics</Text>

        {topics.map((topic, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.topic}>{topic}</Text>
            <Text style={styles.subtitle}>
              Learn and practice problems
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F7F6",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  topic: {
    fontSize: 16,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 4,
  },
});