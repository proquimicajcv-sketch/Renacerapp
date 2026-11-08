import React from 'react';
import { Home, Activity, Dumbbell, Heart, BookOpen } from 'lucide-react';

interface MobileNavProps {
  activeTab: 'hoy' | 'rutinas' | 'fuerza' | 'registro' | 'guias';
  setActiveTab: (tab: 'hoy' | 'rutinas' | 'fuerza' | 'registro' | 'guias') => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'hoy' as const, label: 'Hoy', icon: Home },
    { id: 'rutinas' as const, label: 'Rehab', icon: Activity },
    { id: 'fuerza' as const, label: 'Fuerza', icon: Dumbbell },
    { id: 'registro' as const, label: 'Registro', icon: Heart },
    { id: 'guias' as const, label: 'Guías', icon: BookOpen },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fef8f4]/95 backdrop-blur-md border-t border-[#dbc1ba]/40 px-1 py-1 shadow-warm-sheet">
      <div className="grid grid-cols-5 items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center text-center group cursor-pointer focus:outline-none"
            >
              <div
                className={`p-1 rounded-full transition-transform ${
                  isActive ? 'text-[#96432b] scale-110' : 'text-[#55433e] group-hover:text-[#1d1b19]'
                }`}
              >
                <Icon className="w-4.5 h-4.5" strokeWidth={isActive ? 2.3 : 1.8} />
              </div>
              <span
                className={`text-[9.5px] font-medium tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'text-[#96432b] font-semibold' : 'text-[#55433e]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
