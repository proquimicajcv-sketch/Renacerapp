import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Calendar, RotateCcw } from 'lucide-react';
import {
  MotivationalMessage,
  OFFICIAL_LOGO_SRC,
  getMessageForDay,
  getTodayCalendarInfo,
} from '../data/motivationalMessages';

interface MotivationalModalProps {
  isOpen: boolean;
  currentDay: number;
  onSelectDay: (day: number) => void;
  onClose: () => void;
}

export const MotivationalModal: React.FC<MotivationalModalProps> = ({
  isOpen,
  currentDay,
  onSelectDay,
  onClose,
}) => {
  const [showAllDays, setShowAllDays] = useState(false);
  const calendarInfo = getTodayCalendarInfo();

  if (!isOpen) return null;

  const message: MotivationalMessage = getMessageForDay(currentDay);
  const isToday = currentDay === calendarInfo.phraseDay;

  const handlePrev = () => {
    if (currentDay > 1) {
      onSelectDay(currentDay - 1);
    } else {
      onSelectDay(30);
    }
  };

  const handleNext = () => {
    if (currentDay < 30) {
      onSelectDay(currentDay + 1);
    } else {
      onSelectDay(1);
    }
  };

  const handleJumpToToday = () => {
    onSelectDay(calendarInfo.phraseDay);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="motivational-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Golden ratio proportioned modal card */}
      <div className="relative w-full max-w-[540px] max-h-[92vh] overflow-y-auto bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/60 shadow-warm-floating flex flex-col p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Subtle close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#96432b]"
          aria-label="Cerrar tarjeta motivacional"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Circular Official Logo - prominently visible */}
        <div className="mx-auto mb-4">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-warm-resting border-2 border-[#dbc1ba]/60 bg-white p-1">
            <img
              src={OFFICIAL_LOGO_SRC}
              alt="Logotipo oficial Renacer Postparto"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Real Calendar Date Synchronization Badge */}
        <div className="flex flex-col items-center gap-1.5 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf5ef] border border-[#41674c]/30 text-xs font-semibold text-[#41674c]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Sincronizado con el calendario · Hoy es {calendarInfo.fullFormatted}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-[13px] font-sans font-bold tracking-wider uppercase text-[#96432b]">
              DÍA {message.day}/30
            </span>
            {isToday ? (
              <span className="px-2 py-0.5 rounded-full bg-[#96432b]/10 text-[#96432b] text-[11px] font-semibold">
                Frase de Hoy
              </span>
            ) : (
              <button
                onClick={handleJumpToToday}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#41674c] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Volver a hoy (Día {calendarInfo.phraseDay})</span>
              </button>
            )}
          </div>

          <h2
            id="motivational-title"
            className="text-xs font-sans text-[#55433e] tracking-wide"
          >
            Semana {message.week} · {message.weekTheme}
          </h2>
        </div>

        {/* Hairline golden divider */}
        <div className="w-16 h-[1.5px] bg-[#dbc1ba]/60 mx-auto mb-4" />

        {/* Daily Motivational Phrase in Editorial Font with Golden Ratio line height */}
        <div className="px-2 sm:px-4 py-2">
          <p className="font-serif text-[17px] sm:text-[19px] leading-[1.65] text-[#1d1b19] font-normal text-balance">
            {message.message}
          </p>
        </div>

        {/* Hairline golden divider */}
        <div className="w-16 h-[1.5px] bg-[#dbc1ba]/60 mx-auto mt-4 mb-4" />

        {/* Day Carousel Navigation (Prev / Next) */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handlePrev}
            className="h-9 px-3 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] hover:text-[#1d1b19] flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Ver día anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Día ant.</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1d1b19] tabular-nums">
              Día {message.day} de 30
            </span>
            <button
              onClick={() => setShowAllDays(!showAllDays)}
              className="text-[11px] text-[#96432b] hover:underline font-semibold cursor-pointer"
            >
              {showAllDays ? 'Ocultar días' : 'Ver todos los días'}
            </button>
          </div>

          <button
            onClick={handleNext}
            className="h-9 px-3 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] hover:text-[#1d1b19] flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Ver día siguiente"
          >
            <span>Día sig.</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Month Calendar Picker Grid */}
        {showAllDays && (
          <div className="mt-4 p-3 bg-white rounded-2xl border border-[#dbc1ba]/40 animate-in fade-in duration-200">
            <div className="text-[11px] font-semibold text-[#55433e] mb-2 flex items-center justify-between">
              <span>Selecciona un día del mes (1 - 30):</span>
              <button
                onClick={handleJumpToToday}
                className="text-[#41674c] hover:underline font-bold"
              >
                Hoy: Día {calendarInfo.phraseDay}
              </button>
            </div>
            <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                const isSelected = d === currentDay;
                const isActualToday = d === calendarInfo.phraseDay;
                return (
                  <button
                    key={d}
                    onClick={() => {
                      onSelectDay(d);
                      setShowAllDays(false);
                    }}
                    className={`h-7 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#96432b] text-white font-bold shadow-xs'
                        : isActualToday
                        ? 'bg-[#edf5ef] text-[#41674c] border border-[#41674c] font-bold'
                        : 'bg-[#f8f3ef] hover:bg-[#f2ede9] text-[#55433e]'
                    }`}
                    title={isActualToday ? `Día ${d} (Hoy en el calendario)` : `Día ${d}`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full h-11 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Agradecer y Continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
