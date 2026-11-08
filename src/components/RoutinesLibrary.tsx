import React, { useState } from 'react';
import { Play, Clock, Sparkles, ChevronDown, ChevronUp, Shield, Activity } from 'lucide-react';
import { Routine, ExerciseCategory } from '../types';

interface RoutinesLibraryProps {
  routines: Routine[];
  onStartRoutine: (routine: Routine) => void;
}

export const RoutinesLibrary: React.FC<RoutinesLibraryProps> = ({
  routines,
  onStartRoutine,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(null);

  const categories: { id: ExerciseCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Todas las Rutinas' },
    { id: 'suelo-pelvico', label: 'Suelo Pélvico' },
    { id: 'diastasis', label: 'Diástasis & Core' },
    { id: 'movilidad', label: 'Movilidad & Espalda' },
    { id: 'cesarea', label: 'Cicatriz & Cesárea' },
  ];

  const filteredRoutines = routines.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedRoutineId(expandedRoutineId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Title Section */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-4 border-b border-[#dbc1ba]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#96432b] uppercase tracking-wider mb-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Biblioteca de Fisioterapia Obstétrica</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d1b19] font-medium tracking-tight">
            Programas de Rehabilitación en el Hogar
          </h1>
          <p className="text-[15px] text-[#55433e] mt-1 font-sans max-w-2xl">
            Protocolos progresivos diseñados para reconstruir la sinergia entre tu diafragma, abdomen profundo
            y base pélvica, respetando los tiempos biológicos del posparto.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#96432b] text-white shadow-xs'
                      : 'bg-white text-[#55433e] hover:text-[#1d1b19] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoutines.map((routine) => {
          const isExpanded = expandedRoutineId === routine.id;

          return (
            <div
              key={routine.id}
              className="bg-white rounded-2xl border border-[#dbc1ba]/30 overflow-hidden shadow-warm-resting flex flex-col justify-between hover:shadow-warm-floating transition-shadow duration-300"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#f2ede9]">
                  <img
                    src={routine.image}
                    alt={routine.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#96432b] backdrop-blur-sm">
                      Semana {routine.suitableFromWeek}+
                    </span>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#41674c]/90 text-white backdrop-blur-sm">
                      {routine.intensity}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs opacity-90 mb-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 inline" />
                      <span>{routine.durationMinutes} min</span>
                      <span>·</span>
                      <span>{routine.steps.length} secuencias</span>
                      {routine.safeForCesarean && (
                        <>
                          <span>·</span>
                          <span className="text-[#c2edcb]">Apto cesárea</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-semibold leading-snug">
                      {routine.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5">
                  <p className="text-xs font-medium text-[#96432b] mb-1">
                    {routine.subtitle}
                  </p>
                  <p className="text-[13px] text-[#55433e] leading-relaxed line-clamp-3">
                    {routine.description}
                  </p>

                  {/* Clinical safety precations */}
                  <div className="mt-3.5 p-3 rounded-xl bg-[#f8f3ef] border border-[#dbc1ba]/30 flex items-start gap-2.5 text-xs text-[#55433e]">
                    <Shield className="w-4 h-4 text-[#41674c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1d1b19] block">Pauta de seguridad:</strong>
                      <span>{routine.clinicalPrecautions}</span>
                    </div>
                  </div>

                  {/* Target Muscles */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-[#55433e]">
                    {routine.targetMuscles.map((muscle) => (
                      <span key={muscle} className="px-2 py-0.5 bg-[#fbf8f3] border border-[#dbc1ba]/20 rounded text-[11px]">
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Step Breakdown */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#f2ede9] space-y-2.5 animate-in fade-in duration-200">
                      <span className="text-xs font-semibold text-[#1d1b19] block">
                        Desglose paso a paso:
                      </span>
                      {routine.steps.map((step, idx) => (
                        <div
                          key={step.title}
                          className="p-2.5 rounded-lg bg-[#fbf8f3] border border-[#dbc1ba]/20 text-xs text-[#55433e]"
                        >
                          <div className="flex items-center justify-between font-medium text-[#1d1b19] mb-1">
                            <span>
                              {idx + 1}. {step.title}
                            </span>
                            <span className="tabular-nums text-[#96432b] font-semibold">
                              {step.durationSeconds}s
                            </span>
                          </div>
                          <p className="text-[12px] text-[#55433e]">{step.instruction}</p>
                          <div className="mt-1 text-[11px] text-[#41674c] italic">
                            Guía: {step.breathingCue}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-0 flex items-center gap-2.5">
                <button
                  onClick={() => toggleExpand(routine.id)}
                  className="flex-1 h-11 px-3 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Ocultar pasos' : 'Ver desglose'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onStartRoutine(routine)}
                  className="flex-1 h-11 px-4 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Comenzar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
