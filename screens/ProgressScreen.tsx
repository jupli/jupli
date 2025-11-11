import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ProgressScreen: React.FC = () => {
    const { state } = useAppContext();
    const { profile } = state;
    const [selectedTimeframe, setSelectedTimeframe] = useState('90 Days');
    const [selectedWeek, setSelectedWeek] = useState('This Week');

    // Data dari gambar - menggunakan huruf O bukan angka 0
    const weightInLb = "O";
    const goalWeightInLb = "O";
    const bmi = "NaN";
    const bmiCategory = "Obese";

    const TimeframeButton: React.FC<{ label: string }> = ({ label }) => (
        <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTimeframe === label
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedTimeframe(label)}
        >
            {label}
        </button>
    );

    const WeekButton: React.FC<{ label: string }> = ({ label }) => (
        <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedWeek === label
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedWeek(label)}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-white p-4 pb-24">
            {/* === HEADER === */}
            <h1 className="text-2xl font-bold text-black mb-6">Progress</h1>

            {/* === PROGRESS CARDS SECTION === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Card My Weight */}
                <div className="bg-gray-50 rounded-2xl shadow-sm p-5 flex flex-col justify-between text-center">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">My Weight</p>
                        <p className="text-3xl font-bold mb-1">{weightInLb} lb</p>
                        <p className="text-gray-500 text-sm mb-3">Goal {goalWeightInLb} lbs</p>
                    </div>
                    <p className="text-gray-400 text-xs">Next weight-in: 7d</p>
                </div>

                {/* Card Day Streak */}
                <div className="bg-gray-50 rounded-2xl shadow-sm p-5 text-center flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                            <span className="text-orange-500 text-2xl">🔥</span>
                        </div>
                        <p className="text-orange-600 font-semibold">Day streak</p>
                    </div>

                    <div className="flex justify-center mt-3 space-x-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div
                                key={i}
                                className="w-6 h-6 flex items-center justify-center rounded-full text-xs text-gray-400 border border-gray-200"
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === TIMEFRAME TABS === */}
            <div className="flex justify-between mb-6">
                <TimeframeButton label="90 Days" />
                <TimeframeButton label="6 Months" />
                <TimeframeButton label="1 Year" />
                <TimeframeButton label="All time" />
            </div>

            <hr className="border-gray-300 my-6" />

            {/* === GOAL PROGRESS === */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-black">Goal Progress</h2>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-md text-black">
                        F1 OK of goal
                    </span>
                </div>
                <p className="text-gray-500 text-sm">
                    Getting started is the hardest part. You're reac
                </p>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* === WEEK TABS === */}
            <div className="mb-6">
                <h2 className="font-semibold text-black mb-3">This Week</h2>
                <div className="flex space-x-2">
                    <WeekButton label="Last Week" />
                    <WeekButton label="2 wks. ago" />
                    <WeekButton label="3 wks. ago" />
                </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* === TOTAL CALORIES === */}
            <div className="mb-6">
                <h2 className="font-semibold text-black mb-3">Total calories</h2>
                <p className="text-3xl font-bold text-center mb-1">0.0</p>
                <p className="text-gray-500 text-sm text-center mb-6">cals</p>

                <div className="space-y-2 mb-4">
                    {[0, 0, 0, 0, 0].map((value, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-gray-500 w-8">{value}</span>
                            <div className="flex-1 border-t border-gray-300 border-dashed ml-2"></div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between text-xs text-gray-500 mb-6">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                </div>

                <div className="flex justify-center space-x-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Protein</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Carbs</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Fats</p>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                    Getting started is the hardest part. You're reac
                </p>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* === BMI SECTION === */}
            <div>
                <h2 className="font-semibold text-black mb-2">Your BMI</h2>
                <p className="text-3xl font-bold text-center mb-2">{bmi}</p>
                <p className="text-gray-500 text-sm text-center mb-4">
                    Your weight is <span className="font-semibold">{bmiCategory}</span>
                </p>

                <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Underweight</span>
                        <span>Healthy</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-400 flex-1"></div>
                        <div className="h-full bg-green-500 flex-1"></div>
                        <div className="h-full bg-yellow-500 flex-1"></div>
                        <div className="h-full bg-red-500 flex-1"></div>
                    </div>

                    <div className="flex justify-between text-xs mt-1">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                </div>

                <p className="text-gray-500 text-sm">
                    Getting started is the hardest part. You're reac
                </p>
            </div>
        </div>
    );
};

export default ProgressScreen;
