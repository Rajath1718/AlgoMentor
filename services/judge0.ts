export async function runCode(sourceCode: string) {
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            source_code: sourceCode,
            language_id: 71, // Python (change later if needed)
            stdin: "",
        }),
    });

    const result = await response.json();
    return result;
}