import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Clock,
  Heart,
  ShieldCheck,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Coffee,
  RotateCcw,
  Zap,
  Activity,
  Smile,
  Info,
} from 'lucide-react';
import { Routine, PostpartumProfile } from '../types';
import {
  RENACER_ROUTINES,
  HABIT_CAPSULES,
  FUNCTIONAL_ASSESSMENT_QUESTIONS,
  HabitCapsule,
} from '../data/renacerFuncionalData';

interface RenacerFuncionalSectionProps {
  onStartRoutine: (routine: Routine) => void;
  profile: PostpartumProfile;
  onUpdateProfile?: (updated: Partial<PostpartumProfile>) => void;
}

export const RenacerFuncionalSection: React.FC<RenacerFuncionalSectionProps> = ({
  onStartRoutine,
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'fases' | 'regla-10' | 'capsulas' | 'evaluacion'>('fases');
  const [selectedPhase, setSelectedPhase] = useState<'todos' | 'fase-1' | 'fase-2' | 'fase-3'>('todos');
  const [selectedCapsule, setSelectedCapsule] = useState<HabitCapsule | null>(null);

  // Self-assessment state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);

  const filteredRoutines = RENACER_ROUTINES.filter((r) => {
    if (selectedPhase === 'todos') return true;
    if (selectedPhase === 'fase-1') return r.subtitle.includes('Fase 1');
    if (selectedPhase === 'fase-2') return r.subtitle.includes('Fase 2');
    if (selectedPhase === 'fase-3') return r.subtitle.includes('Fase 3');
    return true;
  });

  const handleAnswerSelect = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateAssessmentResult = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    if (totalScore <= 6) {
      return {
        level: 'Base Fuerte y Transición Positiva',
        recommendedPhase: 'Fase 2 o Fase 3',
        recommendedRoutineId: 'renacer-fuerza-cotidiana',
        text: 'Tu musculatura y capacidad aeróbica conservan buena memoria motora. Puedes comenzar alternando ejercicios de Fase 1 con los patrones de fuerza de Fase 2.',
      };
    } else if (totalScore <= 11) {
      return {
        level: 'Descondicionamiento Funcional Moderado',
        recommendedPhase: 'Fase 1: Despertar Postural',
        recommendedRoutineId: 'renacer-despertar-postural',
        text: 'Llevas tiempo acumulando sobrecarga postural y rigidez en caderas y lumbares. Tu mejor camino es comenzar con sesiones de 8 a 10 minutos de la Fase 1 durante las próximas 4 semanas.',
      };
    } else {
      return {
        level: 'Sobrecarga Crónica y Fatiga Acumulada',
        recommendedPhase: 'Fase 1 (Enfoque en Liberación)',
        recommendedRoutineId: 'renacer-liberacion-cadera',
        text: 'Tu cuerpo está pidiendo a gritos descompresión y gentileza. No necesitas sudar ni agotarte; regálate 8 minutos de movilidad y respiración diafragmática para calmar tu sistema nervioso.',
      };
    }
  };

  const assessmentResult = assessmentSubmitted ? calculateAssessmentResult() : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Compassionate Header tailored to +24 Months Postpartum */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-6 border-b border-[#dbc1ba]/20 rounded-b-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edf5ef] border border-[#41674c]/30 text-xs font-semibold text-[#41674c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Para mujeres con más de 2 años sin entrenar · Cero culpas</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1d1b19] font-medium tracking-tight">
            El Renacer Funcional
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#96432b] italic max-w-2xl mx-auto">
            "No importa si pasaron 2, 5 o 10 años; hoy es el día uno para volver a conectar con tu fuerza sin prisa ni culpa."
          </p>

          <p className="text-sm text-[#55433e] max-w-2xl mx-auto leading-relaxed">
            Cuando han transcurrido años desde tu último parto, las rutinas de gimnasio convencionales suelen provocar dolor lumbar o abandono.
            Este espacio está diseñado para reconstruir tus cimientos: movilidad articular, respiración 360°, fuerza para el día a día y micro-hábitos sostenibles de 10 minutos.
          </p>

          {/* Navigation Pills between Section Modules */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveSubTab('fases')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'fases'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white hover:bg-[#fbf8f3] text-[#55433e] border border-[#dbc1ba]/40'
              }`}
            >
              Programas en 3 Fases (8-12 min)
            </button>
            <button
              onClick={() => setActiveSubTab('regla-10')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'regla-10'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white hover:bg-[#fbf8f3] text-[#55433e] border border-[#dbc1ba]/40'
              }`}
            >
              La Regla de los 10 Minutos
            </button>
            <button
              onClick={() => setActiveSubTab('capsulas')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'capsulas'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white hover:bg-[#fbf8f3] text-[#55433e] border border-[#dbc1ba]/40'
              }`}
            >
              Psicología del Hábito & Culpa Cero
            </button>
            <button
              onClick={() => setActiveSubTab('evaluacion')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeSubTab === 'evaluacion'
                  ? 'bg-[#41674c] text-white shadow-xs'
                  : 'bg-white hover:bg-[#edf5ef] text-[#41674c] border border-[#41674c]/30'
              }`}
            >
              Evaluación Inicial de Línea Base
            </button>
          </div>
        </div>
      </section>

      {/* MODULE 1: THE 3 PROGRESSIVE PHASES */}
      {activeSubTab === 'fases' && (
        <div className="space-y-6">
          {/* Phase Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#dbc1ba]/40">
            <div>
              <h2 className="font-serif text-xl font-medium text-[#1d1b19]">
                Ruta Progresiva en 3 Fases
              </h2>
              <p className="text-xs text-[#55433e]">
                Diseñado para evitar sobrecargas y asegurar que cada minuto sume a tu energía diaria
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedPhase('todos')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedPhase === 'todos'
                    ? 'bg-[#96432b] text-white'
                    : 'bg-[#f8f3ef] hover:bg-[#f2ede9] text-[#55433e]'
                }`}
              >
                Todas las Fases ({RENACER_ROUTINES.length})
              </button>
              <button
                onClick={() => setSelectedPhase('fase-1')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedPhase === 'fase-1'
                    ? 'bg-[#96432b] text-white'
                    : 'bg-[#f8f3ef] hover:bg-[#f2ede9] text-[#55433e]'
                }`}
              >
                Fase 1: Despertar Postural (Sem 1-4)
              </button>
              <button
                onClick={() => setSelectedPhase('fase-2')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedPhase === 'fase-2'
                    ? 'bg-[#96432b] text-white'
                    : 'bg-[#f8f3ef] hover:bg-[#f2ede9] text-[#55433e]'
                }`}
              >
                Fase 2: Fuerza Funcional (Sem 5-8)
              </button>
              <button
                onClick={() => setSelectedPhase('fase-3')}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedPhase === 'fase-3'
                    ? 'bg-[#96432b] text-white'
                    : 'bg-[#f8f3ef] hover:bg-[#f2ede9] text-[#55433e]'
                }`}
              >
                Fase 3: Vitalidad Sostenible (Sem 9+)
              </button>
            </div>
          </div>

          {/* Routine Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutines.map((routine) => (
              <div
                key={routine.id}
                className="bg-white rounded-2xl border border-[#dbc1ba]/40 overflow-hidden shadow-warm-resting hover:shadow-warm-floating transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-[#f2ede9]">
                    <img
                      src={routine.image}
                      alt={routine.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#96432b] font-semibold text-[11px]">
                        {routine.durationMinutes} min diarios
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#41674c]/90 text-white font-medium text-[11px] backdrop-blur-md">
                        {routine.intensity}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] text-[#ffdbd1] font-semibold uppercase tracking-wider block">
                        {routine.subtitle}
                      </span>
                      <h3 className="font-serif text-lg font-semibold leading-tight mt-0.5">
                        {routine.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#55433e] leading-relaxed">
                      {routine.description}
                    </p>

                    <div className="pt-2 border-t border-[#f2ede9]">
                      <span className="text-[11px] font-semibold text-[#1d1b19] block mb-1">
                        Objetivo Biomecánico:
                      </span>
                      <p className="text-[11px] text-[#41674c] font-medium leading-normal">
                        {routine.purpose}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {routine.targetMuscles.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 bg-[#fbf8f3] border border-[#dbc1ba]/30 rounded text-[10px] text-[#55433e]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onStartRoutine(routine)}
                    className="w-full h-11 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Iniciar Sesión Guiada ({routine.durationMinutes} min)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: LA REGLA DE LOS 10 MINUTOS */}
      {activeSubTab === 'regla-10' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#dbc1ba]/50 p-6 sm:p-8 shadow-warm-resting">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold text-[#96432b] uppercase tracking-wider">
                  Estrategia de Adherencia y Neurociencia
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1d1b19] font-medium">
                  La Regla de los 10 Minutos: El Secreto de la Constancia
                </h2>
                <p className="text-sm text-[#55433e] leading-relaxed">
                  Para una mujer que lleva más de 2 años sin entrenar, proponerle 60 minutos en un gimnasio genera un rechazo mental inmediato.
                  Diez minutos son suficientes para transformar tu biología sin agotar tu tiempo ni tu fuerza de voluntad.
                </p>
              </div>

              {/* 3 Pillars Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#fef8f4] border border-[#dbc1ba]/40 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#96432b]/10 text-[#96432b] flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1d1b19]">
                    Cero Resistencia Mental
                  </h3>
                  <p className="text-xs text-[#55433e] leading-relaxed">
                    Diez minutos es un lapso tan accesible que tu cerebro no puede argumentar "no tengo tiempo hoy".
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#41674c]/10 text-[#41674c] flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1d1b19]">
                    70 Minutos Acumulados
                  </h3>
                  <p className="text-xs text-[#55433e] leading-relaxed">
                    Diez minutos al día suman más de una hora de fisioterapia y fuerza semanal, logrando adaptaciones neuronales duraderas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbf8f3] border border-[#dbc1ba]/40 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#b55b41]/10 text-[#b55b41] flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#1d1b19]">
                    Libre de Fatiga Extrema
                  </h3>
                  <p className="text-xs text-[#55433e] leading-relaxed">
                    Terminas cada sesión con más energía de la que tenías al empezar, sin agujetas incapacitantes.
                  </p>
                </div>
              </div>

              {/* Direct Quick Launch for a 10-Minute Session */}
              <div className="p-5 sm:p-6 bg-[#f8f3ef] rounded-2xl border border-[#dbc1ba]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-semibold text-[#96432b] uppercase tracking-wider">
                    ¿Tienes 10 minutos ahora?
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#1d1b19]">
                    Rutina Recomendada: Despertar Postural Express
                  </h4>
                  <p className="text-xs text-[#55433e]">
                    8 minutos de respiración y movilidad dorsal. Sin necesidad de cambiarte de ropa.
                  </p>
                </div>

                <button
                  onClick={() => onStartRoutine(RENACER_ROUTINES[0])}
                  className="h-11 px-6 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm shrink-0 transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Empezar Mis 10 Minutos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: CÁPSULAS DE PSICOLOGÍA DEL HÁBITO & CULPA CERO */}
      {activeSubTab === 'capsulas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HABIT_CAPSULES.map((capsule) => (
              <div
                key={capsule.id}
                className="bg-white rounded-2xl border border-[#dbc1ba]/40 p-6 shadow-warm-resting flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#f8f3ef] text-[#96432b] font-semibold text-[11px]">
                      {capsule.readTime}
                    </span>
                    <span className="text-[11px] text-[#55433e] capitalize">
                      {capsule.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1d1b19] leading-snug">
                    {capsule.title}
                  </h3>
                  <p className="text-xs text-[#96432b] font-medium">
                    {capsule.subtitle}
                  </p>
                  <p className="text-xs text-[#55433e] leading-relaxed">
                    {capsule.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f2ede9] space-y-3">
                  <div className="p-3 bg-[#edf5ef] rounded-xl text-xs text-[#41674c]">
                    <strong>Micro-acción de hoy:</strong> {capsule.actionableStep}
                  </div>

                  <button
                    onClick={() => setSelectedCapsule(capsule)}
                    className="w-full py-2.5 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] hover:text-[#1d1b19] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Leer cápsula completa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: EVALUACIÓN INICIAL DE LÍNEA BASE (SIN JUICIOS) */}
      {activeSubTab === 'evaluacion' && (
        <div className="bg-white rounded-3xl border border-[#dbc1ba]/50 p-6 sm:p-8 shadow-warm-resting max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-[#41674c] uppercase tracking-wider">
              Línea Base Realista · Sin Medir Peso ni IMC
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1d1b19] font-medium">
              Evaluación Funcional del Día Uno
            </h2>
            <p className="text-xs sm:text-sm text-[#55433e] max-w-xl mx-auto">
              Responde estas 4 breves preguntas sobre tus sensaciones corporales actuales para calibrar en qué fase comenzar con total seguridad.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {FUNCTIONAL_ASSESSMENT_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-[#fbf8f3] border border-[#dbc1ba]/30 space-y-3">
                <div>
                  <span className="text-xs font-bold text-[#96432b] uppercase tracking-wider block">
                    Pregunta {idx + 1} de {FUNCTIONAL_ASSESSMENT_QUESTIONS.length}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#1d1b19] mt-0.5">
                    {q.question}
                  </h3>
                  <p className="text-xs text-[#55433e] mt-0.5">{q.context}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleAnswerSelect(q.id, opt.score)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#41674c] text-white border-[#41674c] shadow-xs'
                            : 'bg-white hover:bg-[#f2ede9] border-[#dbc1ba]/40 text-[#1d1b19]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                        </div>
                        <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-white/90' : 'text-[#55433e]'}`}>
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setAssessmentSubmitted(true)}
              disabled={Object.keys(answers).length < FUNCTIONAL_ASSESSMENT_QUESTIONS.length}
              className="h-12 px-8 rounded-full bg-[#41674c] hover:bg-[#34533d] disabled:opacity-40 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
            >
              <span>Generar Mi Diagnóstico Funcional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Assessment Result Panel */}
          {assessmentResult && (
            <div className="mt-6 p-6 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#41674c] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#41674c]" />
                <span>Tu Diagnóstico de Bienestar Funcional</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1d1b19]">
                  {assessmentResult.level}
                </h3>
                <span className="text-xs font-semibold text-[#96432b] mt-1 block">
                  Fase Recomendada: {assessmentResult.recommendedPhase}
                </span>
                <p className="text-xs sm:text-sm text-[#55433e] mt-2 leading-relaxed">
                  {assessmentResult.text}
                </p>
              </div>

              <div className="pt-3 border-t border-[#41674c]/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#55433e]">
                  Comienza hoy con 8 minutos sin culpa.
                </span>

                <button
                  onClick={() => {
                    const targetRoutine =
                      RENACER_ROUTINES.find((r) => r.id === assessmentResult.recommendedRoutineId) ||
                      RENACER_ROUTINES[0];
                    onStartRoutine(targetRoutine);
                  }}
                  className="h-11 px-5 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Empezar Rutina Recomendada</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Capsule Modal Reader */}
      {selectedCapsule && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/60 shadow-warm-floating p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dbc1ba]/30">
              <span className="text-xs font-semibold text-[#96432b] uppercase tracking-wider">
                Cápsula Educativa · {selectedCapsule.readTime}
              </span>
              <button
                onClick={() => setSelectedCapsule(null)}
                className="w-8 h-8 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-medium text-[#1d1b19]">
                {selectedCapsule.title}
              </h2>
              <p className="text-xs text-[#96432b] font-medium mt-1">
                {selectedCapsule.subtitle}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#55433e] leading-relaxed">
              {selectedCapsule.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="p-4 bg-[#edf5ef] rounded-2xl border border-[#41674c]/30 space-y-1">
              <span className="text-xs font-bold text-[#41674c] uppercase tracking-wider block">
                Tu paso a la acción hoy:
              </span>
              <p className="text-xs text-[#1d1b19] leading-relaxed">
                {selectedCapsule.actionableStep}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCapsule(null)}
                className="w-full h-11 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs font-semibold cursor-pointer"
              >
                Entendido y Guardado en mi Mente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
