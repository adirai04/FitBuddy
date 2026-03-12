import { GoogleGenerativeAI } from '@google/generative-ai';
import { FitnessProfile } from '../../../shared/types';
import { logger } from '../utils/logger';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generatePlanFromAI = async (profile: FitnessProfile) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
      You are an expert fitness coach and nutritionist. Generate a detailed, highly structured fitness and diet plan based on the following user profile:
      Age: ${profile.age}
      Gender: ${profile.gender}
      Height: ${profile.height} cm
      Weight: ${profile.weight} kg
      Goal: ${profile.goal}
      Fitness Level: ${profile.level}
      Workouts per week: ${profile.daysPerWeek}
      Equipment available: ${profile.equipment}
      Dietary Preference: ${profile.diet}

      You MUST respond with a valid JSON object matching this exact structure:
      {
        "weeklyRoutine": [
          {
            "day": "Day 1",
            "focus": "Upper Body",
            "exercises": [
              { "name": "Bench Press", "sets": 3, "reps": "8-12", "notes": "Keep core tight" }
            ],
            "cardio": "15 mins steady state"
          }
        ],
        "restDaySuggestions": ["Yoga", "Light walking"],
        "dietRecommendations": ["Eat more greens", "Hydrate"],
        "caloriesEstimate": 2500,
        "proteinIntake": 150
      }
      Do not include markdown blocks or any other text, only the JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // THE FIX: Clean the response text of any markdown blocks before parsing
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    logger.error('Error generating plan from Gemini:', error);
    throw new Error('Failed to generate fitness plan from AI provider.');
  }
};