import React, { useState, useCallback, useMemo } from 'react';
import { AppProvider } from './context/AppContext';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddMealScreen from './screens/AddMealScreen';
import BottomNav from './components/BottomNav';
import type { Page } from './types';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('splash');

  const navigate = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);

  const renderContent = useMemo(() => {
    switch (page) {
      case 'splash':
        return <SplashScreen onFinish={() => navigate('home')} />;
      case 'home':
        return <HomeScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'add-meal':
        return <AddMealScreen onDone={() => navigate('home')} />;
      default:
        return <HomeScreen />;
    }
  }, [page, navigate]);
  
  const showNav = page !== 'splash' && page !== 'add-meal';

  return (
    <AppProvider>
      <div className="h-screen w-screen bg-gray-50 font-sans flex flex-col max-w-md mx-auto shadow-2xl">
        <main className="flex-1 overflow-y-auto pb-20">
          {renderContent}
        </main>
        {showNav && <BottomNav currentPage={page} navigate={navigate} />}
      </div>
    </AppProvider>
  );
};

export default App;