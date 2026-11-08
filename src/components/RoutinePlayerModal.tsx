import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { Routine } from '../types';
import { playSereneChime } from '../utils/audioChime';

interface RoutinePlayerModalProps {
  routine: Routine;
  onClose: () => void;
  onComplete: (routineId: string, minutes: number) => void;
}

export const RoutinePlayerModal: React.FC<RoutinePlayerModalProps> = ({
  routine,
  onClose,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = routine.steps[currentStepIndex];
  const [timeLeft, setTimeLeft] = useState(currentStep ? currentStep.durationSeconds : 60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  // Cadence sub-timer for Kegel contraction & release cycles (5s contract, 2s hold, 6s release)
  const [cyclePhase, setCyclePhase] = useState<'contract' | 'hold' | 'release' | 'breathe'>('breathe');
  const [cycleSeconds, setCycleSeconds] = useState(0);

  const totalSteps = routine.steps.length;
  const currentStepTotal = currentStep.durationSeconds;
  const progressPercent = Math.round(((currentStepTotal - timeLeft) / currentStepTotal) * 100);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next step or complete
          if (currentStepIndex < totalSteps - 1) {
            const nextIdx = currentStepIndex + 1;
            setCurrentStepIndex(nextIdx);
            setTimeLeft(routine.steps[nextIdx].durationSeconds);
            if (soundEnabled) playSereneChime('finish');
            return routine.steps[nextIdx].durationSeconds;
          } else {
            setIsCompleted(true);
            setIsPlaying(false);
            if (soundEnabled) playSereneChime('finish');
            return 0;
          }
        }
        return prev - 1;
      });

      // Update cycle phase for Kegel / rhythm visualizer
      if (currentStep.isContractionHold) {
        setCycleSeconds((prev) => {
          const next = (prev + 1) % 13;
          if (next < 5) {
            setCyclePhase('contract');
          } else if (next < 7) {
            setCyclePhase('hold');
          } else {
            setCyclePhase('release');
          }
          return next;
        });
      } else {
        setCyclePhase('breathe');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, totalSteps, routine.steps, soundEnabled, isCompleted, currentStep]);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setTimeLeft(routine.steps[nextIdx].durationSeconds);
      if (soundEnabled) playSereneChime('inhale');
    } else {
      setIsCompleted(true);
      setIsPlaying(false);
      if (soundEnabled) playSereneChime('finish');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      setTimeLeft(routine.steps[prevIdx].durationSeconds);
      if (soundEnabled) playSereneChime('click');
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) playSereneChime('click');
  };

  const handleFinishAndSave = () => {
    onComplete(routine.id, routine.durationMinutes);
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/50 shadow-warm-floating overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Bar with Step Progress */}
        <div className="p-4 sm:p-5 border-b border-[#dbc1ba]/30 flex items-center justify-between gap-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#96432b] bg-[#ffdbd1] px-2.5 py-1 rounded-full">
              Paso {currentStepIndex + 1} de {totalSteps}
            </span>
            <span className="text-xs text-[#55433e] hidden sm:inline truncate max-w-xs">
              {routine.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
              aria-label={soundEnabled ? 'Silenciar campanadas' : 'Activar campanadas'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#96432b]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar reproductor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Track */}
        <div className="h-1.5 w-full bg-[#f2ede9]">
          <div
            className="h-full bg-gradient-to-r from-[#96432b] to-[#5b8266] transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {!isCompleted ? (
            <>
              {/* Contraction & Breathing Spiral Visualizer */}
              <div className="flex flex-col items-center justify-center py-2 sm:py-4">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                  {/* Subtle ambient ripple circles */}
                  <div
                    className={`absolute inset-0 rounded-full border border-[#96432b]/20 transition-all duration-1000 ${
                      cyclePhase === 'contract'
                        ? 'scale-90 bg-[#ffdbd1]/30'
                        : cyclePhase === 'hold'
                        ? 'scale-95 bg-[#ffdbd1]/50 border-[#96432b]'
                        : 'scale-110 bg-[#edf5ef]/40 border-[#5b8266]/30'
                    }`}
                  />

                  {/* Concentric Golden Spiral representation */}
                  <div
                    className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-center shadow-warm-resting bg-white border border-[#dbc1ba]/40 transition-transform duration-1000 ${
                      cyclePhase === 'contract'
                        ? 'scale-95'
                        : cyclePhase === 'hold'
                        ? 'scale-100 ring-4 ring-[#ffdbd1]'
                        : 'scale-105 ring-2 ring-[#edf5ef]'
                    }`}
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-medium text-[#1d1b19] tabular-nums leading-none">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase mt-1 text-[#96432b]">
                      {currentStep.isContractionHold
                        ? cyclePhase === 'contract'
                          ? 'Abraza y Eleva'
                          : cyclePhase === 'hold'
                          ? 'Sostén suave'
                          : 'Libera al 100%'
                        : isPlaying
                        ? 'Fluye con el aire'
                        : 'En pausa'}
                    </span>
                  </div>
                </div>

                {/* Cadence indicator explanation */}
                {currentStep.isContractionHold && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#55433e]">
                    <span className={`px-2 py-0.5 rounded-full ${cyclePhase === 'contract' ? 'bg-[#96432b] text-white font-bold' : 'bg-[#f2ede9]'}`}>
                      1. Contracción (5s)
                    </span>
                    <span>→</span>
                    <span className={`px-2 py-0.5 rounded-full ${cyclePhase === 'hold' ? 'bg-[#b55b41] text-white font-bold' : 'bg-[#f2ede9]'}`}>
                      2. Sostén (2s)
                    </span>
                    <span>→</span>
                    <span className={`px-2 py-0.5 rounded-full ${cyclePhase === 'release' ? 'bg-[#41674c] text-white font-bold' : 'bg-[#f2ede9]'}`}>
                      3. Relajación (6s)
                    </span>
                  </div>
                )}
              </div>

              {/* Step Title & Instruction */}
              <div className="text-center space-y-2">
                {currentStep.setsReps && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f3ef] border border-[#dbc1ba]/40 text-xs font-semibold text-[#96432b]">
                    <span>Objetivo:</span>
                    <span className="text-[#1d1b19]">{currentStep.setsReps}</span>
                  </div>
                )}
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1d1b19] leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-[15px] text-[#55433e] leading-relaxed max-w-lg mx-auto">
                  {currentStep.instruction}
                </p>
                {routine.mindfulClosing && currentStepIndex === totalSteps - 1 && (
                  <div className="p-4 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 text-center mt-3">
                    <p className="font-serif italic text-base text-[#1d1b19]">
                      “{routine.mindfulClosing}”
                    </p>
                  </div>
                )}
              </div>

              {/* Clinical Breathing Cue & Physical Therapy Note */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#edf5ef] border border-[#41674c]/20 text-xs sm:text-sm text-[#41674c] flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#41674c] shrink-0 mt-1.5" />
                  <div>
                    <strong className="block text-[#1d1b19] font-medium">Patrón respiratorio consciente:</strong>
                    <span>{currentStep.breathingCue}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#dbc1ba]/40 text-xs text-[#55433e] flex items-start gap-3 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#96432b] shrink-0 mt-1.5" />
                  <div>
                    <strong className="block text-[#1d1b19] font-medium">Clave fisioterapéutica:</strong>
                    <span>{currentStep.clinicalTip}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Completed Screen */
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-[#edf5ef] text-[#41674c] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-semibold text-[#41674c] uppercase tracking-wider">
                  ¡Sesión Completada con Éxito!
                </span>
                <h3 className="font-serif text-3xl font-medium text-[#1d1b19]">
                  Hermoso trabajo de autocuidado
                </h3>
                <p className="text-sm text-[#55433e] leading-relaxed">
                  Has dedicado {routine.durationMinutes} minutos de consciencia corporal, tonificación sin agresión
                  y respiración restauradora a tu recuperación posparto.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#dbc1ba]/40 max-w-sm mx-auto shadow-xs text-xs space-y-2">
                <div className="flex justify-between text-[#55433e]">
                  <span>Duración registrada:</span>
                  <strong className="text-[#1d1b19]">{routine.durationMinutes} minutos</strong>
                </div>
                <div className="flex justify-between text-[#55433e]">
                  <span>Músculos activados:</span>
                  <strong className="text-[#1d1b19]">{routine.targetMuscles[0]} y core profundo</strong>
                </div>
                <div className="flex justify-between text-[#55433e]">
                  <span>Impacto en línea alba:</span>
                  <strong className="text-[#41674c]">Protección fascial 100%</strong>
                </div>
              </div>

              <button
                onClick={handleFinishAndSave}
                className="w-full max-w-sm h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-sm mx-auto shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
              >
                Guardar en Mi Progreso
              </button>
            </div>
          )}
        </div>

        {/* Bottom Playback Controls (when not completed) */}
        {!isCompleted && (
          <div className="p-4 sm:p-5 border-t border-[#dbc1ba]/30 bg-white/90 backdrop-blur-sm flex items-center justify-between gap-3">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2.5 rounded-full border border-[#dbc1ba]/50 hover:bg-[#fbf8f3] disabled:opacity-30 text-xs font-semibold text-[#55433e] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SkipBack className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 px-6 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Reanudar</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextStep}
              className="px-4 py-2.5 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-xs font-semibold text-[#1d1b19] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
