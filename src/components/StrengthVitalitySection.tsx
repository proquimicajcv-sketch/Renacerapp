import React, { useState } from 'react';
import { Dumbbell, Sparkles, Clock, Shield, Play, ChevronDown, ChevronUp, Heart, CheckCircle2 } from 'lucide-react';
import { Routine, EquipmentType } from '../types';

interface StrengthVitalitySectionProps {
  routines: Routine[];
  onStartRoutine: (routine: Routine) => void;
}

export const StrengthVitalitySection: React.FC<StrengthVitalitySectionProps> = ({
  routines,
  onStartRoutine,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | EquipmentType>('all');
  const [expandedRoutineId, setExpandedRoutineId] = useState<string | null>(null);

  const filters: { id: 'all' | EquipmentType; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'peso-corporal', label: 'Peso Corporal' },
    { id: 'ligas', label: 'Con Ligas' },
    { id: 'mancuernas', label: 'Con Mancuernas' },
  ];

  const filteredRoutines = routines.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'peso-corporal') return r.equipment === 'peso-corporal' || r.equipment === 'mixto';
    if (selectedFilter === 'ligas') return r.equipment === 'ligas' || r.equipment === 'mixto';
    if (selectedFilter === 'mancuernas') return r.equipment === 'mancuernas';
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedRoutineId(expandedRoutineId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Cabecera de la Sección */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-4 border-b border-[#dbc1ba]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#96432b] uppercase tracking-wider mb-1.5">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Acondicionamiento Funcional para Mujeres 30+</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d1b19] font-medium tracking-tight">
            Fuerza & Vitalidad Postparto
          </h1>

          <p className="font-serif italic text-[16px] sm:text-[18px] text-[#55433e] mt-1.5 max-w-2xl leading-relaxed">
            "Transición segura hacia el acondicionamiento físico. Recupera tu fuerza, tonifica tu silueta y reconecta con tu energía vital desde el hogar."
          </p>

          <p className="text-xs sm:text-sm text-[#55433e] mt-2 font-sans max-w-3xl leading-relaxed">
            Diseñada especialmente para retonificar masa muscular magra, erguir tu postura contra el encorvamiento de la lactancia y liberar endorfinas cuidando en todo momento la presión intraabdominal.
          </p>

          {/* Filtros de Equipamiento (Pills interactivos) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 no-scrollbar">
            {filters.map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#96432b] text-white shadow-xs'
                      : 'bg-white text-[#55433e] hover:text-[#1d1b19] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Programas y Rutinas Destacadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutines.map((routine) => {
          const isExpanded = expandedRoutineId === routine.id;

          return (
            <div
              key={routine.id}
              className="bg-white rounded-3xl border border-[#dbc1ba]/40 overflow-hidden shadow-warm-resting hover:shadow-warm-floating transition-all duration-300 flex flex-col justify-between"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#96432b] backdrop-blur-sm">
                      {routine.intensity}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#41674c]/90 text-white backdrop-blur-sm capitalize">
                      {routine.equipment === 'ligas'
                        ? 'Con Ligas'
                        : routine.equipment === 'mancuernas'
                        ? 'Con Mancuernas'
                        : routine.equipment === 'mixto'
                        ? 'Ligas + Peso Corp.'
                        : 'Peso Corporal'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs opacity-90 mb-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 inline" />
                      <span>{routine.durationMinutes} min</span>
                      <span>·</span>
                      <span>{routine.steps.length} bloques</span>
                      <span>·</span>
                      <span className="text-[#c2edcb]">Control pélvico</span>
                    </div>
                    <h2 className="font-serif text-xl font-semibold leading-snug">
                      {routine.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <span className="text-xs font-semibold text-[#96432b] block uppercase tracking-wider">
                    {routine.subtitle}
                  </span>

                  {routine.purpose && (
                    <div className="p-3 rounded-xl bg-[#f8f3ef] border border-[#dbc1ba]/30 text-xs text-[#55433e]">
                      <strong className="text-[#1d1b19] block mb-0.5 font-medium">Propósito clave:</strong>
                      <span>{routine.purpose}</span>
                    </div>
                  )}

                  <p className="text-[13px] text-[#55433e] leading-relaxed">
                    {routine.description}
                  </p>

                  {/* Ejercicios y Series Preview */}
                  <div className="pt-2 border-t border-[#f2ede9] space-y-2">
                    <span className="text-xs font-semibold text-[#1d1b19] block">
                      Ejercicios y Series estructuradas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#55433e]">
                      {routine.steps.map((st, sIdx) => (
                        <li key={st.title} className="flex items-start gap-2">
                          <span className="text-[#96432b] font-bold">·</span>
                          <div>
                            <strong className="text-[#1d1b19]">{st.title}:</strong>{' '}
                            <span className="text-[#41674c] font-medium">{st.setsReps}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Step Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[#f2ede9] space-y-2 animate-in fade-in duration-200">
                      {routine.steps.map((step, idx) => (
                        <div
                          key={step.title}
                          className="p-3 rounded-xl bg-[#fbf8f3] border border-[#dbc1ba]/25 text-xs text-[#55433e] space-y-1"
                        >
                          <div className="flex items-center justify-between font-semibold text-[#1d1b19]">
                            <span>{idx + 1}. {step.title}</span>
                            <span className="text-[#96432b] font-mono">{step.durationSeconds}s</span>
                          </div>
                          <p className="text-[12px]">{step.instruction}</p>
                          <div className="text-[11px] text-[#41674c] italic">
                            Respiración: {step.breathingCue}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 space-y-2">
                <button
                  onClick={() => onStartRoutine(routine)}
                  className="w-full h-11 px-4 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Comenzar Entrenamiento ({routine.durationMinutes} min)</span>
                </button>

                <button
                  onClick={() => toggleExpand(routine.id)}
                  className="w-full h-9 rounded-full border border-[#dbc1ba]/50 hover:bg-[#fbf8f3] text-xs font-medium text-[#55433e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Ocultar técnica paso a paso' : 'Ver técnica detallada'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Enfoque Mental y Emocional Integrado & Cierre Consciente */}
      <section className="bg-white rounded-3xl border border-[#41674c]/30 p-6 sm:p-8 shadow-warm-resting">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#edf5ef] text-[#41674c] flex items-center justify-center shrink-0 shadow-xs">
            <Heart className="w-7 h-7 stroke-[2]" />
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#41674c] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enfoque Mental y Emocional Integrado</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1d1b19]">
              El Minuto de Cierre Consciente
            </h3>
            <p className="font-serif italic text-[16px] sm:text-[18px] text-[#1d1b19] leading-relaxed max-w-2xl bg-[#fbf8f3] p-4 rounded-2xl border border-[#dbc1ba]/40">
              “Has movido tu cuerpo con propósito. Tu fuerza física es el reflejo de tu resiliencia interna. Respira y agradece lo que eres capaz de lograr hoy.”
            </p>
            <p className="text-xs text-[#55433e] max-w-2xl">
              Cada sesión de esta sección integra al final 60 segundos de respiración en gratitud para regular el sistema nervioso y afianzar la conexión mente-músculo sin prisas ni fatiga residual.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
