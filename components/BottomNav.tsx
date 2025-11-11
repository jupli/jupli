import React from 'react';
import type { Page } from '../types';
import { HomeIcon, ChartBarIcon, Cog6ToothIcon, PlusIcon } from './icons';

interface BottomNavProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ReactNode;
  currentPage: Page;
  navigate: (page: Page) => void;
}> = ({ page, label, icon, currentPage, navigate }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => navigate(page)}
      className={`flex flex-col items-center justify-center w-20 transition-colors duration-200 ${
        isActive ? 'text-black' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, navigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white border-t border-gray-200 flex items-center justify-between px-6 z-50">
      {/* SEMUA MENU DI KIRI */}
      <div className="flex items-center gap-8">
        <NavItem
          page="home"
          label="Home"
          icon={<HomeIcon className="w-6 h-6" />}
          currentPage={currentPage}
          navigate={navigate}
        />
        <NavItem
          page="progress"
          label="Progress"
          icon={<ChartBarIcon className="w-6 h-6" />}
          currentPage={currentPage}
          navigate={navigate}
        />
        <NavItem
          page="settings"
          label="Settings"
          icon={<Cog6ToothIcon className="w-6 h-6" />}
          currentPage={currentPage}
          navigate={navigate}
        />
      </div>

      {/* TOMBOL PLUS DI KANAN - DITURUNKAN LAGI */}
      <button 
        onClick={() => navigate('add-meal')}
        className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-105 -mt-2"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default BottomNav;