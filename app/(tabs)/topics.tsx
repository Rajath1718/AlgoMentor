import { ScrollView, StyleSheet, Text, View } from "react-native";

const topics = [
  { name: "Arrays", progress: 70, color: "#FF7043" },
  { name: "Linked List", progress: 50, color: "#66BB6A" },
  { name: "Trees", progress: 30, color: "#42A5F5" },
  { name: "Graphs", progress: 20, color: "#EF5350" },
  { name: "DP", progress: 10, color: "#FFA726" },
];

export default function Topics() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Learning Paths</Text>

      {topics.map((t, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.name}>{t.name}</Text>

          <View style={styles.bar}>
            <View
              style={[
                styles.fill,
                { width: `${t.progress}%`, backgroundColor: t.color },
              ]}
            />
          </View>

          <Text style={styles.percent}>{t.progress}% Complete</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  bar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginTop: 8,
  },
  fill: {
    height: 8,
    borderRadius: 6,
  },
  percent: { marginTop: 6, color: "#666" },
});