import { z } from "zod";

export const FitnessProfileSchema = z.object({
  age: z.number().min(16).max(100),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.number().min(100).max(250).describe("Height in cm"),
  weight: z.number().min(30).max(300).describe("Weight in kg"),
  goal: z.enum(["Lose Weight", "Gain Muscle", "Maintain Fitness"]),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  daysPerWeek: z.number().min(1).max(7),
  equipment: z.string().min(3).max(100),
  diet: z.enum(["Veg", "Non-Veg", "Vegan"]),
});

export type FitnessProfile = z.infer<typeof FitnessProfileSchema>;

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export interface DailyPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  cardio?: string;
}

export interface FitnessPlanResponse {
  weeklyRoutine: DailyPlan[];
  restDaySuggestions: string[];
  dietRecommendations: string[];
  caloriesEstimate: number;
  proteinIntake: number;
}