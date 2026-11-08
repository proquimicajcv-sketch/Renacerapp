import React from 'react';
import { Play, Check, Droplets, Wind, ShieldCheck, ArrowRight, HeartHandshake, Maximize2 } from 'lucide-react';
import { PostpartumProfile, DailyHabit, Routine } from '../types';
import { RadialTracker } from './RadialTracker';
import {
  OFFICIAL_LOGO_SRC,
  getMessageForDay,
  MotivationalMessage,
} from '../data/motivationalMessages';

interface TodayHubProps {
  profile: PostpartumProfile;
  habits: DailyHabit[];
  onToggleHabit: (id: string) => void;
  recommendedRoutine: Routine;
  onStartRoutine: (routine: Routine) => void;
  onOpenBreathing: () => void;
  waterGlasses: number;
  onAddWater: (delta: number) => void;
  onNavigateToTab: (tab: 'hoy' | 'rutinas' | 'fuerza' | 'registro' | 'guias') => void;
  currentDay: number;
  onOpenMotivationalModal: () => void;
}

export const TodayHub: React.FC<TodayHubProps> = ({
  profile,
  habits,
  onToggleHabit,
  recommendedRoutine,
  onStartRoutine,
  onOpenBreathing,
  waterGlasses,
  onAddWater,
  onNavigateToTab,
  currentDay,
  onOpenMotivationalModal,
}) => {
  const completedHabitsCount = habits.filter((h) => h.completed).length;
  const habitPercentage = Math.round((completedHabitsCount / habits.length) * 100);

  const todayMessage: MotivationalMessage = getMessageForDay(currentDay);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Welcome Header */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-4 border-b border-[#dbc1ba]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#41674c] uppercase tracking-wider mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#41674c]" />
              <span>Semana {profile.weeksPostpartum} de Posparto · Fase de Consolidación</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1d1b19] font-medium tracking-tight">
                Hola, {profile.name}
              </h1>
            </div>
            <p className="text-[15px] text-[#55433e] mt-1 font-sans max-w-xl">
              Tu cuerpo gestó vida durante meses; dale la bienvenida a cada avance con paciencia,
              respiración suave y movimiento restaurador.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#55433e]">
            <button
              onClick={() => onNavigateToTab('registro')}
              className="px-3 py-1.5 bg-[#edf5ef] hover:bg-[#dfeee2] text-[#41674c] rounded-full border border-[#41674c]/30 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Ver Análisis & Informe PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1.5 bg-white rounded-full border border-[#dbc1ba]/40 shadow-xs">
              Parto: <strong className="text-[#1d1b19] capitalize">{profile.deliveryType}</strong>
            </span>
            <span className="px-3 py-1.5 bg-white rounded-full border border-[#dbc1ba]/40 shadow-xs">
              Diástasis: <strong className="text-[#96432b]">{profile.diastasisWidthCm} cm</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Prominent Daily Motivational Card with Official Logo following Golden Ratio */}
      <section className="bg-white rounded-3xl border border-[#dbc1ba]/50 p-6 sm:p-8 shadow-warm-resting relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Prominent Circular Official Logo */}
          <div className="shrink-0">
            <button
              onClick={onOpenMotivationalModal}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#96432b] rounded-full block"
              aria-label="Abrir mensaje motivacional en tarjeta emergente"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#dbc1ba]/60 bg-[#fef8f4] p-1 shadow-warm-resting group-hover:scale-105 transition-transform duration-300">
                <img
                  src={OFFICIAL_LOGO_SRC}
                  alt="Logotipo oficial Renacer Postparto"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </button>
          </div>

          {/* Text and Day indicator */}
          <div className="flex-1 text-center md:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#96432b] uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Mensaje Motivador del Día · Día {todayMessage.day}/30</span>
              </div>
              <span className="text-xs text-[#55433e]">
                Semana {todayMessage.week} · {todayMessage.weekTheme}
              </span>
            </div>

            <p className="font-serif text-[17px] sm:text-[19px] leading-[1.65] text-[#1d1b19] font-normal text-balance">
              "{todayMessage.message}"
            </p>

            <div className="pt-1 flex items-center justify-center md:justify-start gap-3">
              <button
                onClick={onOpenMotivationalModal}
                className="text-xs font-semibold text-[#96432b] hover:text-[#803722] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Abrir en tarjeta emergente</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split: Recommended Routine (Hero) & Radial Daily Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Recommended Routine Card (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dbc1ba]/30 overflow-hidden shadow-warm-resting flex flex-col justify-between">
          <div>
            <div className="relative aspect-16/9 sm:aspect-21/9 lg:aspect-16/9 overflow-hidden bg-[#f2ede9]">
              <img
                src={recommendedRoutine.image}
                alt={recommendedRoutine.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-md text-[#96432b]">
                  Sesión Recomendada de Hoy
                </span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#41674c]/90 text-white backdrop-blur-md">
                  {recommendedRoutine.intensity}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs opacity-90 mb-1 flex items-center gap-2">
                  <span>{recommendedRoutine.durationMinutes} minutos</span>
                  <span>·</span>
                  <span>{recommendedRoutine.steps.length} secuencias guiadas</span>
                  <span>·</span>
                  <span className="text-[#c2edcb]">Apto cicatriz</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                  {recommendedRoutine.title}
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-[14px] text-[#55433e] leading-relaxed">
                {recommendedRoutine.description}
              </p>

              <div className="mt-4 pt-4 border-t border-[#f2ede9] flex flex-wrap gap-2 text-xs text-[#55433e]">
                <span className="font-semibold text-[#1d1b19]">Foco anatómico:</span>
                {recommendedRoutine.targetMuscles.map((muscle) => (
                  <span key={muscle} className="px-2 py-0.5 bg-[#f8f3ef] rounded text-[#55433e]">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-0">
            <button
              onClick={() => onStartRoutine(recommendedRoutine)}
              className="w-full h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Sesión Guiada ({recommendedRoutine.durationMinutes} min)</span>
            </button>
          </div>
        </div>

        {/* Daily Recovery Radial Metric Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#dbc1ba]/30 p-5 sm:p-6 shadow-warm-resting flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#f2ede9]">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1d1b19]">
                  Recuperación Diaria
                </h3>
                <p className="text-xs text-[#55433e]">Metas de confort y activación</p>
              </div>
              <span className="text-xs font-semibold text-[#41674c] bg-[#edf5ef] px-2.5 py-1 rounded-full">
                Constancia activa
              </span>
            </div>

            {/* Radial concentric rings */}
            <div className="py-4 flex justify-center">
              <RadialTracker
                pelvicPercent={67}
                breathingPercent={100}
                mobilityPercent={Math.max(30, habitPercentage)}
                size={190}
              />
            </div>

            {/* Ring Legend & Metrics */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#fbf8f3] border border-[#dbc1ba]/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#96432b] shrink-0" />
                  <span className="font-medium text-[#1d1b19]">Suelo Pélvico</span>
                </div>
                <span className="text-[#55433e] font-semibold tabular-nums">2 / 3 series</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#fbf8f3] border border-[#dbc1ba]/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#41674c] shrink-0" />
                  <span className="font-medium text-[#1d1b19]">Respiración Diafragmática</span>
                </div>
                <span className="text-[#41674c] font-semibold tabular-nums">10 min · Completo</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#fbf8f3] border border-[#dbc1ba]/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#b55b41] shrink-0" />
                  <span className="font-medium text-[#1d1b19]">Hábitos y Cuidados</span>
                </div>
                <span className="text-[#55433e] font-semibold tabular-nums">
                  {completedHabitsCount} de {habits.length} ({habitPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Hydration Tracker */}
          <div className="mt-4 pt-4 border-t border-[#f2ede9] flex items-center justify-between gap-3 bg-[#edf5ef] p-3 rounded-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#41674c] shadow-xs">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1d1b19]">
                  Hidratación: <span className="tabular-nums font-bold">{waterGlasses * 275} ml</span> / 2.2L
                </div>
                <div className="text-[11px] text-[#55433e]">{waterGlasses} de 8 vasos</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onAddWater(-1)}
                disabled={waterGlasses <= 0}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#f2ede9] disabled:opacity-40 text-[#1d1b19] font-bold text-sm flex items-center justify-center border border-[#dbc1ba]/40 transition-colors cursor-pointer"
                aria-label="Restar vaso de agua"
              >
                -
              </button>
              <button
                onClick={() => onAddWater(1)}
                className="h-8 px-3 rounded-full bg-[#41674c] hover:bg-[#34533d] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                aria-label="Sumar vaso de agua"
              >
                <span>+ 1 vaso</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Conscious Habits Section */}
      <section className="bg-white rounded-2xl border border-[#dbc1ba]/30 p-5 sm:p-7 shadow-warm-resting">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f2ede9]">
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#1d1b19]">
              Hábitos Conscientes del Día
            </h3>
            <p className="text-xs sm:text-sm text-[#55433e]">
              Micro-acciones para proteger tu postura y periné durante la maternidad cotidiana
            </p>
          </div>
          <div className="text-xs text-[#55433e] font-medium">
            Progreso: <strong className="text-[#41674c]">{completedHabitsCount}/{habits.length}</strong>
          </div>
        </div>

        <div className="divide-y divide-[#f8f3ef] mt-2">
          {habits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => onToggleHabit(habit.id)}
              className="py-3.5 sm:py-4 flex items-start gap-3.5 cursor-pointer hover:bg-[#fbf8f3] -mx-3 px-3 rounded-xl transition-colors group"
            >
              <button
                type="button"
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  habit.completed
                    ? 'bg-[#41674c] text-white'
                    : 'border-2 border-[#dbc1ba] group-hover:border-[#96432b]'
                }`}
                aria-label={habit.completed ? 'Marcar como incompleto' : 'Marcar como completado'}
              >
                {habit.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              <div className="flex-1">
                <h4
                  className={`text-[15px] font-medium leading-snug transition-colors ${
                    habit.completed ? 'text-[#55433e] line-through opacity-80' : 'text-[#1d1b19]'
                  }`}
                >
                  {habit.title}
                </h4>
                <p className="text-xs text-[#55433e] mt-0.5 leading-relaxed">
                  {habit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Banner to Nueva Etapa: Fuerza & Vitalidad */}
      <section className="bg-gradient-to-r from-[#96432b] to-[#b55b41] rounded-3xl p-6 sm:p-7 text-white shadow-warm-resting relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="relative z-10 max-w-xl space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <span>Nueva Etapa Disponible</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Fuerza & Vitalidad Postparto
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
            Transición segura hacia el acondicionamiento físico con peso corporal, ligas y mancuernas ligeras para mujeres mayores de 30 años.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab('fuerza')}
          className="relative z-10 h-11 px-5 rounded-full bg-white hover:bg-[#fbf8f3] text-[#96432b] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm shrink-0 transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span>Ir a Fuerza & Vitalidad</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Two Supportive Resting Cards: Mindful Breathwork Sanctuary & Clinical Safety Tip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mindful Breathwork Card */}
        <div className="bg-[#f8f3ef] rounded-2xl border border-[#dbc1ba]/40 p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#e6e2de]">
              <img
                src="/src/assets/images/postpartum_breath_serene_1794104205346.jpg"
                alt="Pausa de respiración diafragmática"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#96432b]">
                Pausa Restauradora
              </span>
              <h4 className="font-serif text-lg font-medium text-[#1d1b19] mt-0.5">
                Respiración 360° y Liberación Pélvica
              </h4>
              <p className="text-xs text-[#55433e] mt-1">
                3 minutos de calma para reducir el cortisol y relajar la fascia pélvica.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between">
            <span className="text-xs text-[#55433e]">Con sonido meditativo</span>
            <button
              onClick={onOpenBreathing}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#f2ede9] border border-[#dbc1ba]/60 text-xs font-semibold text-[#96432b] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Abrir Calma 360°</span>
            </button>
          </div>
        </div>

        {/* Clinical Physical Therapy Tip */}
        <div className="bg-white rounded-2xl border border-[#41674c]/20 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#41674c] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#41674c]" />
              <span>Consejo de Fisioterapia Obstétrica</span>
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1d1b19] mt-1">
              La maniobra de rodar en bloque para levantarte
            </h4>
            <p className="text-xs text-[#55433e] mt-1.5 leading-relaxed">
              Al incorporarte de la cama o el sillón, gira primero todo el cuerpo de costado en bloque.
              Baja las piernas hacia el suelo y empuja el colchón con ambas manos. Así evitas someter la
              línea alba y el periné a presiones nocivas.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#f2ede9] flex items-center justify-between text-xs">
            <button
              onClick={() => onNavigateToTab('guias')}
              className="text-[#41674c] hover:text-[#2d4734] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Leer guía de ergonomía maternal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
