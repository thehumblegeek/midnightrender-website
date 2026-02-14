
import { GoogleGenAI } from "@google/genai";

// Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.

export async function generateDirectorVision(title: string, category: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a single poetic, evocative sentence describing the "Director's Vision" for a cinematic project titled "${title}" in the category of "${category}". Keep it under 20 words and very professional.`,
    });
    // The .text property directly returns the string output from the model.
    return response.text?.trim() || "A journey through light and shadow, redefining the boundaries of visual perception.";
  } catch (error) {
    console.error("Gemini failed:", error);
    return "Exploring the intersection of human emotion and digital craftsmanship.";
  }
}
