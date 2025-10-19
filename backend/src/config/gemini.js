import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the client with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Make sure your main function handles errors properly
const main = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const enhancedPrompt = `Write a comprehensive, engaging blog post about "${prompt}". 
        The blog should be well-structured with:
        - An engaging introduction
        - Multiple well-organized sections with subheadings
        - Detailed explanations and examples
        - A compelling conclusion
        - Use markdown formatting for better readability
        - Aim for 800-1200 words
        - Make it informative and engaging for readers`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content with AI");
  }
};

export default main;
