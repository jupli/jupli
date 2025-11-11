import React, { useMemo, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { AppleIcon, FireIcon, ProteinIcon, CarbsIcon, FatIcon, FiberIcon, SugarIcon, SodiumIcon } from '../components/icons';

const getFormattedDate = (date: Date) => date.toISOString().split('T')[0];

const GoogleHealthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M26.0762,18.5,23.248,15.6719l1.7676-1.7676a3.0014,3.0014,0,0,0,0-4.2432,3.0716,3.0716,0,0,0-4.2422,0L17.9443,6.833a7,7,0,0,1,9.9,9.8994Z" fill="#4285f4"/>
    <rect fill="#4285f4" height="3.9996" transform="translate(-2.2826 15.2256) rotate(-45)" width="6.9996" x="13.7378" y="8.3684"/>
    <path d="M6.2773,18.5l-2.121-2.1211A7,7,0,1,1,14.0557,6.48l2.1211,2.1211-2.8282,2.8281L11.2271,9.3076a3.0706,3.0706,0,0,0-4.2422,0,3,3,0,0,0,0,4.2432l2.1206,2.1211Z" fill="#ea4435"/>
    <rect fill="#fbc02d" height="3.9996" transform="translate(-8.293 12.7359) rotate(-45)" width="10.0003" x="6.2269" y="14.3786"/>
    <polygon fill="#00ac47" points="16.177 28.399 9.106 21.328 11.934 18.5 16.177 22.743 23.248 15.672 26.076 18.5 16.177 28.399"/>
  </svg>
);

const DateSelector: React.FC = () => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 3);
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
    setWeekDays(days);
  }, []);

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  return (
    <div className="flex justify-around items-center px-1">
      {weekDays.map((date) => {
        const today = isToday(date);
        return (
          <div key={date.toISOString()} className={`flex flex-col items-center p-1 rounded-2xl ${today ? 'bg-white shadow' : ''}`}>
            <span className={`text-xs font-medium mb-2 ${today ? 'text-gray-800' : 'text-gray-500'}`}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <div className="w-10 h-10 flex items-center justify-center relative">
              {!today && <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300"></div>}
              <span className={`font-semibold text-sm ${today ? 'text-black' : 'text-gray-400'}`}>
                {date.getDate().toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CaloriesCard = ({ caloriesLeft }: { caloriesLeft: number }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center w-full">
    <div>
      <p className="text-5xl font-bold">{caloriesLeft >= 0 ? Math.round(caloriesLeft) : 0}</p>
      <p className="text-gray-500 mt-1">Calories left</p>
    </div>
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
        <FireIcon className="w-7 h-7 text-black" />
      </div>
    </div>
  </div>
);

const MacroCard = ({ title, icon, unit = "g" }: any) => (
  <div className="bg-white rounded-2xl p-3 shadow-sm w-full flex flex-col justify-between" style={{ height: '140px' }}>
    <div>
      <p className="font-bold text-xl">0{unit}</p>
      <p className="text-gray-500 text-sm">{title} over</p>
    </div>
    <div className="relative w-12 h-12 self-center">
      <div className="absolute inset-0 bg-gray-100 rounded-full opacity-60"></div>
      <div className="absolute inset-2 flex items-center justify-center">{icon}</div>
    </div>
  </div>
);

const HealthMacroCard = MacroCard;

const HealthScoreCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Health score</h3>
    <div className="text-3xl font-bold mb-4">0/10</div>
    <p className="text-gray-600 text-sm">
      Carbs and fat are on track. You're low in calories and protein, which can slow
    </p>
  </div>
);

const StepsCard = () => (
  <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
    <p className="text-2xl font-bold mb-1">0 / 10000</p>
    <p className="text-gray-500 text-sm mb-4">Steps Today</p>

    <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-center w-full">
      <GoogleHealthIcon className="w-5 h-5 mr-2" />
      <p className="text-gray-600 text-sm">Connect Google Health to track your steps</p>
    </div>

    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="bg-gray-50 rounded-xl text-center py-3">
        <p className="text-xl font-bold mb-1">0</p>
        <p className="text-gray-500 text-sm">Calories burned</p>
      </div>
      <div className="bg-gray-50 rounded-xl text-center py-3">
        <p className="text-xl font-bold mb-1">+0</p>
        <p className="text-gray-500 text-sm">Steps</p>
      </div>
    </div>
  </div>
);

const WaterCard = () => (
  <div className="bg-white rounded-2xl shadow-sm p-5">
    <div className="flex justify-between items-center mb-3">
      <p className="text-gray-800 font-semibold text-base">Water</p>
      <div className="flex space-x-2">
        <button className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-lg">−</button>
        <button className="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-lg">+</button>
      </div>
    </div>
    <p className="text-lg font-bold mb-4">0 fl oz (0 cups)</p>
    <div className="flex justify-between">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const EmptyMealCard = () => (
  <div className="relative mt-2">
    <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[90%] h-10 bg-white/50 rounded-b-2xl z-0"></div>
    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[95%] h-10 bg-white/70 rounded-b-2xl z-0"></div>
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative z-10">
      <div className="bg-gray-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
        <span style={{ fontSize: '40px' }}>🥗</span>
      </div>
      <div className="w-3/4 my-4 space-y-2">
        <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
      </div>
      <p className="text-gray-500 text-sm font-medium">Tap + to add your first meal of the day</p>
    </div>
  </div>
);

const CarouselContainer = ({ activeIndex, onIndexChange, children }: any) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipe = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > minSwipe && activeIndex < children.length - 1) onIndexChange(activeIndex + 1);
    if (dist < -minSwipe && activeIndex > 0) onIndexChange(activeIndex - 1);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {children.map((child: any, i: number) => (
            <div key={i} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {children.map((_: any, i: number) => (
          <button key={i} onClick={() => onIndexChange(i)} className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-gray-600' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

const HomeScreen: React.FC = () => {
  const { state } = useAppContext();
  const todayStr = getFormattedDate(new Date());
  const todayLog = state.dailyLogs[todayStr] || { meals: [], waterIntakeOz: 0 };
  const { profile } = state;
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const totals = useMemo(() => {
    return todayLog.meals.reduce(
      (acc: any, meal: any) => ({
        totalCalories: acc.totalCalories + meal.totalCalories,
        totalProtein: acc.totalProtein + meal.totalProtein,
        totalCarbs: acc.totalCarbs + meal.totalCarbs,
        totalFat: acc.totalFat + meal.totalFat,
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );
  }, [todayLog.meals]);

  const caloriesLeft = profile.calorieGoal - totals.totalCalories;

  return (
    <div className="p-4 space-y-5 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <AppleIcon className="h-8 w-auto" />
        <div className="bg-white rounded-full py-1.5 px-3 shadow-sm flex items-center space-x-1.5">
          <FireIcon className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-sm">0</span>
        </div>
      </header>

      <DateSelector />

      <CarouselContainer activeIndex={activeCarouselIndex} onIndexChange={setActiveCarouselIndex}>
        {/* Carousel 1 */}
        <div className="space-y-3">
          <CaloriesCard caloriesLeft={caloriesLeft} />
          <div className="grid grid-cols-3 gap-3">
            <MacroCard title="Protein" icon={<ProteinIcon className="w-7 h-7" />} />
            <MacroCard title="Carbs" icon={<CarbsIcon className="w-7 h-7" />} />
            <MacroCard title="Fats" icon={<FatIcon className="w-7 h-7" />} />
          </div>
        </div>

        {/* Carousel 2 */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <HealthMacroCard title="Fiber" icon={<FiberIcon className="w-7 h-7" />} />
            <HealthMacroCard title="Sugar" icon={<SugarIcon className="w-7 h-7" />} />
            <HealthMacroCard title="Sodium" unit="mg" icon={<SodiumIcon className="w-7 h-7" />} />
          </div>
          <HealthScoreCard />
        </div>

        {/* Carousel 3 */}
        <div className="space-y-3">
          <StepsCard />
          <WaterCard />
        </div>
      </CarouselContainer>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently uploaded</h2>
        {todayLog.meals.length > 0 ? (
          <p className="text-center text-gray-500 py-8">Meal display coming soon!</p>
        ) : (
          <EmptyMealCard />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
