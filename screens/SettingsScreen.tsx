
import React from 'react';
import { useAppContext } from '../context/AppContext';

const SettingsItem: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({ children, icon }) => (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
        <div className="text-gray-600">{icon}</div>
        <span className="text-gray-800 font-medium">{children}</span>
    </div>
);

const SettingsScreen: React.FC = () => {
    const { state } = useAppContext();
    const { profile } = state;

    return (
        <div className="p-4 space-y-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center space-x-4">
                <img src={`https://picsum.photos/seed/${profile.name}/200`} alt="Profile" className="w-16 h-16 rounded-full" />
                <div>
                    <p className="text-xl font-bold">{profile.name}</p>
                    <p className="text-gray-500">{profile.age} years old</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="font-semibold">The journey is easier together.</p>
                <button className="mt-2 bg-black text-white px-6 py-2 rounded-full font-semibold">
                    Refer a friend to earn $10
                </button>
            </div>

            <div className="space-y-2">
                 <SettingsItem icon={<UserIcon />}>Personal details</SettingsItem>
                 <SettingsItem icon={<AdjustmentsIcon />}>Adjust macronutrients</SettingsItem>
                 <SettingsItem icon={<FlagIcon />}>Goal & current weight</SettingsItem>
            </div>
             <div className="space-y-2">
                 <SettingsItem icon={<TermsIcon />}>Terms and Conditions</SettingsItem>
                 <SettingsItem icon={<PrivacyIcon />}>Privacy Policy</SettingsItem>
                 <SettingsItem icon={<LogoutIcon />}>Logout</SettingsItem>
            </div>
        </div>
    );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const AdjustmentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414M19.778 4.222l-1.414 1.414M4.222 19.778l1.414-1.414M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
);
const FlagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2z" />
    </svg>
);

const TermsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const PrivacyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export default SettingsScreen;
