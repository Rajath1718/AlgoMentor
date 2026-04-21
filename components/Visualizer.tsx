import { View, Text, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function Visualizer({ steps, onClose }: any) {
    const [currentStep, setCurrentStep] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing && currentStep < steps.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [playing, currentStep]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step {currentStep + 1}</Text>
            <Text style={styles.text}>
                {steps[currentStep]?.description}
            </Text>

            <View style={styles.buttons}>
                <Button title="Play" onPress={() => setPlaying(true)} />
                <Button title="Pause" onPress={() => setPlaying(false)} />
                <Button title="Reset" onPress={() => setCurrentStep(0)} />
                <Button title="Close" onPress={onClose} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
        backgroundColor: "#1C2128",
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    text: {
        marginTop: 10,
        color: "white",
    },
    buttons: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});