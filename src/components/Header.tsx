import React from 'react';
import { Wind, Calendar, HeartHandshake } from 'lucide-react';
import { PostpartumProfile } from '../types';
import { OFFICIAL_LOGO_SRC, getTodayCalendarInfo } from '../data/motivationalMessages';

interface HeaderProps {
  activeTab: 'hoy' | 'rutinas' | 'renacer' | 'fuerza' | 'registro' | 'guias';
  setActiveTab: (tab: 'hoy' | 'rutinas' | 'renacer' | 'fuerza' | 'registro' | 'guias') => void;
  profile: PostpartumProfile;
  currentDay: number;
  onOpenBreathing: () => void;
  onEditProfile: () => void;
  onOpenMotivational: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  currentDay,
  onOpenBreathing,
  onEditProfile,
  onOpenMotivational,
}) => {
  const calendarInfo = getTodayCalendarInfo();
  return (
    <header className="sticky top-0 z-30 bg-[#fef8f4]/95 backdrop-blur-md border-b border-[#dbc1ba]/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3 md:gap-8">
        {/* Zone 1: Official Brand Logo & Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('hoy')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#96432b] rounded-xl"
            aria-label="Ir al inicio de Renacer Postparto"
          >
            {/* Prominent Circular Official Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#dbc1ba]/70 bg-white p-0.5 shadow-warm-resting group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src={OFFICIAL_LOGO_SRC}
                alt="Logotipo oficial Renacer Postparto"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#1d1b19] block leading-none">
                Renacer Postparto
              </span>
              <span className="text-[11px] font-sans text-[#55433e] hidden sm:block tracking-wide mt-1">
                Armonía entre fuerza, salud y maternidad desde el hogar
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[15px] font-medium text-[#55433e]">
          <button
            onClick={() => setActiveTab('hoy')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'hoy'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Hoy
            {activeTab === 'hoy' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('rutinas')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'rutinas'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Rehabilitación
            {activeTab === 'rutinas' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('renacer')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'renacer'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Renacer Funcional (+24m)
            {activeTab === 'renacer' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('fuerza')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'fuerza'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Fuerza & Vitalidad
            {activeTab === 'fuerza' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('registro')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'registro'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Mi Registro & Diástasis
            {activeTab === 'registro' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('guias')}
            className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
              activeTab === 'guias'
                ? 'text-[#96432b] font-semibold'
                : 'hover:text-[#1d1b19]'
            }`}
          >
            Guías Clínicas
            {activeTab === 'guias' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#96432b] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Daily Message Trigger & Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Daily Motivational Message Trigger Button */}
          <button
            onClick={onOpenMotivational}
            className="h-10 px-3 sm:px-3.5 rounded-full bg-[#f8f3ef] hover:bg-[#f2ede9] border border-[#dbc1ba]/60 text-xs font-semibold text-[#96432b] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#96432b]"
            title={`Sincronizado con el calendario: ${calendarInfo.fullFormatted}`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0 text-[#96432b]" />
            <span className="whitespace-nowrap hidden sm:inline">{calendarInfo.shortFormatted} ·</span>
            <span className="whitespace-nowrap font-bold">Día {currentDay}/30</span>
          </button>

          {/* Week Badge */}
          <button
            onClick={onEditProfile}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs text-[#55433e] hover:text-[#1d1b19] bg-[#f2ede9] hover:bg-[#ece7e3] rounded-full transition-colors cursor-pointer"
            title="Ajustar semana de posparto"
          >
            <Calendar className="w-3.5 h-3.5 text-[#96432b]" />
            <span className="font-medium whitespace-nowrap">Semana {profile.weeksPostpartum}</span>
          </button>

          {/* Quick Breathwork Button */}
          <button
            onClick={onOpenBreathing}
            className="h-10 px-3.5 sm:px-4 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            <Wind className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Respiración 360°</span>
          </button>
        </div>
      </div>
    </header>
  );
};
