
import React, { useEffect } from 'react';
import { AppleIcon } from '../components/icons';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // 2-second delay
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white">
      <div className="flex items-center space-x-4">
         <AppleIcon width="90%" height="auto" />
       
      </div>
    </div>
  );
};

export default SplashScreen;
