import React from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import {
  MotivationalMessage,
  OFFICIAL_LOGO_SRC,
  getMessageForDay,
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
  if (!isOpen) return null;

  const message: MotivationalMessage = getMessageForDay(currentDay);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="motivational-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Golden ratio proportioned modal card */}
      <div className="relative w-full max-w-[520px] bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/60 shadow-warm-floating overflow-hidden flex flex-col p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
        {/* Subtle close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#96432b]"
          aria-label="Cerrar tarjeta motivacional"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Circular Official Logo - prominently visible */}
        <div className="mx-auto mb-5">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-warm-resting border-2 border-[#dbc1ba]/60 bg-white p-1">
            <img
              src={OFFICIAL_LOGO_SRC}
              alt="Logotipo oficial Renacer Postparto"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Day Indicator following golden proportion */}
        <div className="space-y-1 mb-4">
          <span className="text-[13px] font-sans font-semibold tracking-wider uppercase text-[#96432b]">
            Día {message.day}/30
          </span>
          <h2
            id="motivational-title"
            className="text-xs font-sans text-[#55433e] tracking-wide"
          >
            Semana {message.week} · {message.weekTheme}
          </h2>
        </div>

        {/* Hairline golden divider */}
        <div className="w-16 h-[1.5px] bg-[#dbc1ba]/60 mx-auto mb-5" />

        {/* Daily Motivational Phrase in Editorial Font with Golden Ratio line height */}
        <div className="px-2 sm:px-4 py-2">
          <p className="font-serif text-[17px] sm:text-[19px] leading-[1.65] text-[#1d1b19] font-normal text-balance">
            {message.message}
          </p>
        </div>

        {/* Hairline golden divider */}
        <div className="w-16 h-[1.5px] bg-[#dbc1ba]/60 mx-auto mt-6 mb-6" />

        {/* Day Carousel Navigation (Prev / Next) */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handlePrev}
            className="h-10 px-3.5 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] hover:text-[#1d1b19] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Ver día anterior"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Día anterior</span>
          </button>

          <span className="text-xs font-mono font-medium text-[#55433e] tabular-nums">
            {message.day} de 30
          </span>

          <button
            onClick={handleNext}
            className="h-10 px-3.5 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] hover:text-[#1d1b19] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Ver día siguiente"
          >
            <span className="hidden sm:inline">Día siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Agradecer y Continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
