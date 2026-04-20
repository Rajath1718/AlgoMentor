import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProblemCard from "../../components/ProblemCard";
import SearchBar from "../../components/SearchBar";
import StatCard from "../../components/StatCard";
import { problems } from "../data/problems";
export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AlgoMentor</Text>
      <Text style={styles.subtitle}>Keep learning!</Text>

      <SearchBar />

      <View style={styles.stats}>
        <StatCard value="12" label="Solved" color="#A5D6A7" />
        <StatCard value="3" label="Streak" color="#FFE0B2" />
        <StatCard value="5" label="Topics" color="#E0E0E0" />
      </View>

      <Text style={styles.section}>Problems</Text>

      {problems.map((p) => (
        <ProblemCard key={p.id} problem={p} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F5F7F6" },
  title: { fontSize: 26, fontWeight: "bold" },
  subtitle: { color: "#666", marginBottom: 10 },
  stats: { flexDirection: "row", gap: 10 },
  section: { marginVertical: 12, fontWeight: "bold", fontSize: 18 },
});