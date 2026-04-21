import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Visualizer from "@/components/Visualizer";
import { runCode } from "../../services/judge0";
import { problems } from "../../data/problems";

// 🔥 TWO SUM STEPS
const generateTwoSumSteps = () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const map: any = {};
    const steps: any[] = [];

    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];

        steps.push({
            description: `Checking ${nums[i]} at index ${i}`,
        });

        if (map[comp] !== undefined) {
            steps.push({
                description: `Found complement ${comp} → Answer found`,
            });
            break;
        }

        map[nums[i]] = i;

        steps.push({
            description: `Stored ${nums[i]} in hashmap`,
        });
    }

    return steps;
};

// 🔗 LINKED LIST STEPS
const generateReverseLinkedListSteps = () => {
    const steps: any[] = [];

    steps.push({ description: "Start with head node" });
    steps.push({ description: "Reverse pointer of node 1" });
    steps.push({ description: "Reverse pointer of node 2" });
    steps.push({ description: "Reverse pointer of node 3" });
    steps.push({ description: "Continue reversing..." });
    steps.push({ description: "New head formed" });

    return steps;
};

export default function Problem() {
    const { id } = useLocalSearchParams();

    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showVisualizer, setShowVisualizer] = useState(false);

    // 🔥 FIND CURRENT PROBLEM
    const problem = problems.find((p) => p.id === id);

    // 🔥 SELECT STEPS BASED ON PROBLEM TYPE
    let steps: any[] = [];

    if (problem?.type === "array") {
        steps = generateTwoSumSteps();
    } else if (problem?.type === "linkedlist") {
        steps = generateReverseLinkedListSteps();
    }

    // 🔥 RUN CODE
    const handleRun = async () => {
        if (!code.trim()) {
            setOutput("⚠️ Please enter code");
            return;
        }

        try {
            setLoading(true);
            setOutput("⏳ Running...");

            const res = await runCode(code);

            if (res.stderr) {
                setOutput("❌ Runtime Error:\n" + res.stderr);
            } else if (res.compile_output) {
                setOutput("⚠️ Compile Error:\n" + res.compile_output);
            } else {
                setOutput("✅ Output:\n" + (res.stdout || "No output"));
            }
        } catch {
            setOutput("❌ Execution failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            {/* TITLE */}
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {problem?.title || "Problem"}
            </Text>

            {/* DESCRIPTION */}
            <Text style={{ marginTop: 10 }}>
                {problem?.description}
            </Text>

            {/* SAMPLE INPUT */}
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                Sample Input:
            </Text>
            <Text>{problem?.sampleInput}</Text>

            {/* SAMPLE OUTPUT */}
            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                Sample Output:
            </Text>
            <Text>{problem?.sampleOutput}</Text>

            {/* VISUALIZER BUTTON */}
            <View style={{ marginTop: 15 }}>
                <Button
                    title="Visualize Solution 🎬"
                    onPress={() => setShowVisualizer(true)}
                />
            </View>

            {/* VISUALIZER */}
            {showVisualizer && (
                <Visualizer
                    steps={steps}
                    onClose={() => setShowVisualizer(false)}
                />
            )}

            {/* CODE EDITOR */}
            <Text style={{ marginTop: 20 }}>Your Code:</Text>

            <TextInput
                value={code}
                onChangeText={setCode}
                multiline
                placeholder="Write your code here..."
                style={{
                    height: 200,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 5,
                    textAlignVertical: "top",
                    fontFamily: "monospace",
                }}
            />

            {/* RUN BUTTON */}
            <Button
                title={loading ? "Running..." : "Run Code"}
                onPress={handleRun}
            />

            {/* OUTPUT */}
            <Text style={{ marginTop: 20 }}>Output:</Text>

            <View
                style={{
                    minHeight: 120,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: "#111",
                }}
            >
                <Text style={{ color: "#0f0", fontFamily: "monospace" }}>
                    {output || "Run your code to see output"}
                </Text>
            </View>
        </ScrollView>
    );
}