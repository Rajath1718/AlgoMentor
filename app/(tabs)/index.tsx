import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import ProblemCard from "../../components/ProblemCard";
import SearchBar from "../../components/SearchBar";
import StatCard from "../../components/StatCard";
import { problems } from "../../data/problems";
 
export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
 
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerGradient}>
          <Text style={styles.title}>AlgoMentor</Text>
          <Text style={styles.subtitle}>Master algorithms, one step at a time</Text>
        </View>
      </Animated.View>
 
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
 
      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.stats}>
          <StatCard value="12" label="Solved" color="#2ECC71" />
          <StatCard value="3" label="Streak" color="#F39C12" />
          <StatCard value="5" label="Topics" color="#3498DB" />
        </View>
      </View>
 
      {/* Problems Section */}
      <View style={styles.problemsSection}>
        <Text style={styles.sectionTitle}>Practice Problems</Text>
        {problems.map((p, index) => (
          <Animated.View
            key={p.id}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <ProblemCard problem={p} />
          </Animated.View>
        ))}
      </View>
 
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBF9",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },
  headerGradient: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#1E5631",
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#D1F2EB",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  problemsSection: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E5631",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
});