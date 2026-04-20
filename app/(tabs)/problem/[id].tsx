import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Problem() {
    const { id } = useLocalSearchParams();

    return (
        <View style={{ padding: 20 }}>
            <Text>Problem ID: {id}</Text>
            <Text>Visualizer + Solution here 🚀</Text>
        </View>
    );
}