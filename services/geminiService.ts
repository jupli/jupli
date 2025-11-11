
import { GoogleGenAI, Type } from "@google/genai";
import type { FoodItem } from '../types';

// FIX: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY
// and assume it is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The name of the food item.",
        },
        calories: {
          type: Type.NUMBER,
          description: "Estimated calories for the food item.",
        },
        protein: {
          type: Type.NUMBER,
          description: "Estimated protein in grams.",
        },
        carbs: {
          type: Type.NUMBER,
          description: "Estimated carbohydrates in grams.",
        },
        fat: {
          type: Type.NUMBER,
          description: "Estimated fat in grams.",
        },
      },
      required: ["name", "calories", "protein", "carbs", "fat"],
    },
};

export const analyzeFoodImage = async (base64Image: string): Promise<FoodItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            text: "Analyze the food items in this image. Provide a list of each distinct food item with its estimated nutritional information (calories, protein, carbs, fat). Be as accurate as possible. If an item is not food, ignore it."
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as FoodItem[];

  } catch (error) {
    console.error("Error analyzing food image with Gemini API:", error);
    // Return a sample error structure to allow the UI to function
    return [
        { name: 'Error processing image', calories: 0, protein: 0, carbs: 0, fat: 0 }
    ];
  }
};
