
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import type { Meal, UserProfile, DailyLog } from '../types';

interface AppState {
  profile: UserProfile;
  dailyLogs: { [date: string]: DailyLog };
}

type Action =
  | { type: 'ADD_MEAL'; payload: { date: string; meal: Meal } }
  | { type: 'SET_WATER'; payload: { date: string; amount: number } }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'LOAD_STATE'; payload: AppState };


const initialState: AppState = {
  profile: {
    name: 'Jupli',
    age: 28,
    weightKg: 80,
    heightCm: 175,
    goalWeightKg: 75,
    calorieGoal: 2200,
    proteinGoal: 140,
    carbsGoal: 250,
    fatGoal: 70,
  },
  dailyLogs: {},
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_MEAL': {
      const { date, meal } = action.payload;
      const dayLog = state.dailyLogs[date] || { date, meals: [], waterIntakeOz: 0, caloriesBurned: 0 };
      const updatedMeals = [...dayLog.meals, meal];
      return {
        ...state,
        dailyLogs: {
          ...state.dailyLogs,
          [date]: { ...dayLog, meals: updatedMeals },
        },
      };
    }
    case 'SET_WATER': {
      const { date, amount } = action.payload;
      const dayLog = state.dailyLogs[date] || { date, meals: [], waterIntakeOz: 0, caloriesBurned: 0 };
      return {
        ...state,
        dailyLogs: {
          ...state.dailyLogs,
          [date]: { ...dayLog, waterIntakeOz: Math.max(0, amount) },
        },
      };
    }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case 'LOAD_STATE':
        return action.payload;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
        const savedState = localStorage.getItem('cal-ai-clone-state');
        if (savedState) {
            dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
        }
    } catch (e) {
        console.error("Failed to load state from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('cal-ai-clone-state', JSON.stringify(state));
    } catch (e) {
        console.error("Failed to save state to localStorage", e);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
