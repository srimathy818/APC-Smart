// src/utils/generateMessage.js

export async function generateAbsenteeMessage(name, course) {
  try {
    const response = await fetch("https://apc-smart.vercel.app/api/generate-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, course }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI message");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error generating AI message:", error);
    // Fallback message if AI fails
    return `Dear ${name}, you were marked absent today in ${course}. Please contact the class coordinator.`;
  }
}
