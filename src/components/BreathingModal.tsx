import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { playSereneChime } from '../utils/audioChime';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMinutes?: (minutes: number) => void;
}

type BreathingPattern = 'pelvica' | 'calma' | 'coherencia';

interface PatternConfig {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdEmpty?: number;
  description: string;
}

const PATTERNS: Record<BreathingPattern, PatternConfig> = {
  pelvica: {
    name: 'Relajación Pélvica (4-6)',
    inhale: 4,
    hold: 0,
    exhale: 6,
    description: 'La exhalación prolongada activa el nervio vago y desciende la presión en el suelo pélvico.',
  },
  calma: {
    name: 'Calma Profunda (4-7-8)',
    inhale: 4,
    hold: 7,
    exhale: 8,
    description: 'Reduce la sobreactivación del sistema nervioso simpático provocada por la falta de sueño.',
  },
  coherencia: {
    name: 'Coherencia Cardíaca (4-4)',
    inhale: 4,
    hold: 0,
    exhale: 4,
    description: 'Armoniza la variabilidad de la frecuencia cardíaca y la presión arterial.',
  },
};

export const BreathingModal: React.FC<BreathingModalProps> = ({ isOpen, onClose, onAddMinutes }) => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>('pelvica');
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [secondsInPhase, setSecondsInPhase] = useState(0);
  const [totalSecondsActive, setTotalSecondsActive] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  const pattern = PATTERNS[selectedPattern];

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const interval = setInterval(() => {
      setTotalSecondsActive((s) => s + 1);
      setSecondsInPhase((prev) => {
        const next = prev + 1;
        if (phase === 'inhale') {
          if (next >= pattern.inhale) {
            if (pattern.hold > 0) {
              setPhase('hold');
              if (soundOn) playSereneChime('hold');
            } else {
              setPhase('exhale');
              if (soundOn) playSereneChime('exhale');
            }
            return 0;
          }
        } else if (phase === 'hold') {
          if (next >= pattern.hold) {
            setPhase('exhale');
            if (soundOn) playSereneChime('exhale');
            return 0;
          }
        } else if (phase === 'exhale') {
          if (next >= pattern.exhale) {
            setPhase('inhale');
            setCycleCount((c) => c + 1);
            if (soundOn) playSereneChime('inhale');
            return 0;
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isActive, phase, pattern, soundOn]);

  const handleFinishAndClose = () => {
    const elapsedMinutes = Math.max(cycleCount > 0 ? 1 : 0, Math.ceil(totalSecondsActive / 60));
    if (elapsedMinutes > 0 && onAddMinutes) {
      onAddMinutes(elapsedMinutes);
    }
    onClose();
  };

  if (!isOpen) return null;

  const currentPhaseMax =
    phase === 'inhale' ? pattern.inhale : phase === 'hold' ? pattern.hold : pattern.exhale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/50 shadow-warm-floating overflow-hidden flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#dbc1ba]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#edf5ef] flex items-center justify-center text-[#41674c]">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-[#1d1b19]">
                Santuario de Respiración 360°
              </h2>
              <span className="text-[11px] text-[#55433e]">
                Ciclos completados: <strong className="text-[#96432b]">{cycleCount}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
              aria-label={soundOn ? 'Silenciar sonidos' : 'Activar campanadas'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-[#96432b]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar respirador"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
          {(Object.keys(PATTERNS) as BreathingPattern[]).map((pKey) => (
            <button
              key={pKey}
              onClick={() => {
                setSelectedPattern(pKey);
                setPhase('inhale');
                setSecondsInPhase(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedPattern === pKey
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white text-[#55433e] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
              }`}
            >
              {PATTERNS[pKey].name}
            </button>
          ))}
        </div>

        {/* Main Breathing Circle */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Outer Expanding Halo */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                phase === 'inhale'
                  ? 'scale-110 bg-[#ffdbd1]/40 border border-[#96432b]/30'
                  : phase === 'hold'
                  ? 'scale-105 bg-[#ffdbd1]/60 border-2 border-[#96432b]'
                  : 'scale-90 bg-[#edf5ef]/50 border border-[#5b8266]/30'
              }`}
            />

            {/* Inner Circle with Phase Label & Countdown */}
            <div
              className={`relative z-10 w-40 h-40 rounded-full bg-white shadow-warm-resting border border-[#dbc1ba]/40 flex flex-col items-center justify-center text-center p-4 transition-transform duration-1000 ${
                phase === 'inhale' ? 'scale-105' : phase === 'hold' ? 'scale-100' : 'scale-95'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#96432b]">
                {phase === 'inhale' ? 'Inhala' : phase === 'hold' ? 'Sostén' : 'Exhala'}
              </span>
              <span className="font-serif text-4xl font-medium text-[#1d1b19] tabular-nums mt-1">
                {currentPhaseMax - secondsInPhase}
              </span>
              <span className="text-[10px] text-[#55433e] mt-1 max-w-[100px] leading-tight">
                {phase === 'inhale'
                  ? 'Expande costillas'
                  : phase === 'hold'
                  ? 'Mantén la calma'
                  : 'Suelta periné'}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#55433e] text-center max-w-xs mt-6 leading-relaxed">
            {pattern.description}
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="pt-4 border-t border-[#dbc1ba]/30 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setPhase('inhale');
              setSecondsInPhase(0);
              setCycleCount(0);
              setTotalSecondsActive(0);
            }}
            className="w-10 h-10 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
            title="Reiniciar contador"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className="h-11 px-5 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            {isActive ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isActive ? 'Pausar' : 'Reanudar'}</span>
          </button>

          <button
            onClick={handleFinishAndClose}
            className="h-11 px-5 rounded-full bg-[#41674c] hover:bg-[#34533d] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
          >
            <span>Guardar & Salir ({Math.max(1, Math.ceil(totalSecondsActive / 60))} min)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
