import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Search problems..." />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E8F5E9",
        padding: 12,
        borderRadius: 12,
        marginVertical: 12,
    },
});