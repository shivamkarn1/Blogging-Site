import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// Make sure your main function handles errors properly
const main = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content with AI');
  }
};

export default main;