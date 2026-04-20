import { View, Text, StyleSheet } from "react-native";

export default function StatCard({ value, label, color }: any) {
    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.value}>{value}</Text>
            <Text>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    value: {
        fontSize: 20,
        fontWeight: "bold",
    },
});