import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProblemCard({ problem }: any) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                router.push({
                    pathname: "/problem/[id]",
                    params: { id: problem.id.toString() },
                })
            }
        >
            <Text style={styles.title}>{problem.title}</Text>

            <View style={styles.row}>
                <Text style={styles.tag}>T: {problem.time}</Text>
                <Text style={styles.tag}>S: {problem.space}</Text>
                <Text style={styles.topic}>{problem.topic}</Text>
            </View>

            <Text style={styles.diff}>{problem.difficulty}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: { fontWeight: "bold", fontSize: 16 },
    row: { flexDirection: "row", marginTop: 6, gap: 8 },
    tag: { backgroundColor: "#FFF3E0", padding: 4, borderRadius: 6 },
    topic: { backgroundColor: "#E8F5E9", padding: 4, borderRadius: 6 },
    diff: { position: "absolute", right: 10, top: 10, color: "green" },
});