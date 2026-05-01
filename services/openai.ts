import axios from "axios";

const GROQ_API_KEY = "YOUR_GROQ_API_KEY";

export const askAI = async (message: string) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are AlgoMentor AI, a highly skilled programming mentor specializing in DSA, algorithms, coding interviews, debugging, and software engineering.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Groq Success:", response.data);

    return (
      response.data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error: any) {
    console.log(
      "Groq Error Full:",
      JSON.stringify(error.response?.data || error.message, null, 2)
    );

    return "Sorry, I couldn't process your request.";
  }
};