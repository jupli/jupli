
import React, { useState, useRef } from 'react';
import { analyzeFoodImage } from '../services/geminiService';
import type { FoodItem, Meal } from '../types';
import { useAppContext } from '../context/AppContext';
import { ArrowUturnLeftIcon } from '../components/icons';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

const AddMealScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FoodItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useAppContext();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);
      
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      try {
        const base64Image = await fileToBase64(file);
        const result = await analyzeFoodImage(base64Image);
        setAnalysisResult(result);
      } catch (err) {
        setError('Failed to analyze the image. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogMeal = () => {
    if (!analysisResult || !image) return;

    const totalCalories = analysisResult.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = analysisResult.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = analysisResult.reduce((sum, item) => sum + item.carbs, 0);
    const totalFat = analysisResult.reduce((sum, item) => sum + item.fat, 0);

    const mealName = analysisResult.map(item => item.name).join(', ') || 'Scanned Meal';

    const newMeal: Meal = {
        id: new Date().toISOString(),
        name: mealName,
        timestamp: new Date().toISOString(),
        items: analysisResult,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        imageUrl: image,
    };
    
    const todayStr = new Date().toISOString().split('T')[0];
    dispatch({ type: 'ADD_MEAL', payload: { date: todayStr, meal: newMeal }});
    onDone();
  };
  
  const handleReset = () => {
      setImage(null);
      setAnalysisResult(null);
      setIsLoading(false);
      setError(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  };

  return (
    <div className="flex flex-col h-full w-full bg-black text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <button onClick={onDone} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h1 className="text-xl font-bold">Scanner</h1>
        <div></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {!image && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Scan your food</h2>
            <p className="text-gray-400 mb-8">Take a photo or upload from your library.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-800 px-6 py-3 rounded-full font-semibold"
            >
              Upload Photo
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {image && (
          <div className="w-full h-full flex flex-col">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                <img src={image} alt="Uploaded food" className="w-full h-full object-cover" />
                {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        <p className="mt-4 text-lg">Analyzing your meal...</p>
                    </div>
                )}
            </div>
          </div>
        )}
      </div>

      {analysisResult && (
        <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-gray-900 rounded-t-3xl p-4 shadow-lg">
            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Nutritional Information</h3>
                <p className="text-sm text-gray-400">Based on your photo</p>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {analysisResult.map((item, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3">
                        <p className="font-semibold capitalize">{item.name}</p>
                        <div className="grid grid-cols-2 text-xs text-gray-300 gap-x-4 mt-1">
                            <span>🔥 Calories: {item.calories.toFixed(0)}</span>
                            <span>🥩 Protein: {item.protein.toFixed(0)}g</span>
                            <span>🌾 Carbs: {item.carbs.toFixed(0)}g</span>
                            <span>🥑 Fat: {item.fat.toFixed(0)}g</span>
                        </div>
                    </div>
                ))}
            </div>
            {error && <p className="text-red-400 text-center my-2">{error}</p>}
            <div className="flex items-center space-x-2 mt-4">
                <button onClick={handleReset} className="flex-1 bg-gray-700 py-3 rounded-full font-semibold flex items-center justify-center space-x-2">
                    <ArrowUturnLeftIcon className="w-5 h-5" />
                    <span>Try Again</span>
                </button>
                <button onClick={handleLogMeal} className="flex-1 bg-white text-black py-3 rounded-full font-bold">
                    Done
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AddMealScreen;
