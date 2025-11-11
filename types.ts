export type Page = 'splash' | 'home' | 'progress' | 'settings' | 'add-meal';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  timestamp: string;
  items: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  weightKg: number;
  heightCm: number;
  goalWeightKg: number;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: Meal[];
  waterIntakeOz: number;
  caloriesBurned: number;
}