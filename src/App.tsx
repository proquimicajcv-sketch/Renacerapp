/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TodayHub } from './components/TodayHub';
import { RoutinesLibrary } from './components/RoutinesLibrary';
import { RoutinePlayerModal } from './components/RoutinePlayerModal';
import { SymptomTracker } from './components/SymptomTracker';
import { GuidesSection } from './components/GuidesSection';
import { BreathingModal } from './components/BreathingModal';
import { ProfileModal } from './components/ProfileModal';
import { MobileNav } from './components/MobileNav';
import { MotivationalModal } from './components/MotivationalModal';
import { StrengthVitalitySection } from './components/StrengthVitalitySection';
import { RenacerFuncionalSection } from './components/RenacerFuncionalSection';
import { WelcomeOnboardingModal } from './components/WelcomeOnboardingModal';

import {
  defaultProfile,
  defaultDailyHabits,
  postpartumRoutines,
  strengthRoutines,
  clinicalGuides,
} from './data/postpartumData';
import { RENACER_ROUTINES } from './data/renacerFuncionalData';
import {
  getTodayDayIndex,
  OFFICIAL_LOGO_SRC,
} from './data/motivationalMessages';
import {
  PostpartumProfile,
  DailyHabit,
  Routine,
  SymptomLog,
  DiastasisHistoryItem,
  WorkoutHistoryItem,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'hoy' | 'rutinas' | 'renacer' | 'fuerza' | 'registro' | 'guias'>('hoy');

  // Persistent profile with primary and backup key redundancy
  const [profile, setProfile] = useState<PostpartumProfile>(() => {
    try {
      const saved = localStorage.getItem('renacer_profile') || localStorage.getItem('renacer_profile_backup');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  // Onboarding modal check for first-time user
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    try {
      const completed = localStorage.getItem('renacer_onboarding_completed');
      if (!completed) {
        setIsOnboardingOpen(true);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Daily date key helper
  const getTodayDateKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  // Persistent daily habits
  const [habits, setHabits] = useState<DailyHabit[]>(() => {
    try {
      const savedDate = localStorage.getItem('renacer_tracked_date');
      const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      if (savedDate && savedDate !== today) {
        // Reset habits for new day
        return defaultDailyHabits.map((h) => ({ ...h, completed: false }));
      }
      const saved = localStorage.getItem('renacer_habits');
      return saved ? JSON.parse(saved) : defaultDailyHabits;
    } catch {
      return defaultDailyHabits;
    }
  });

  // Dynamic daily progress counters (starts at 0% by default)
  const [pelvicSeriesCompleted, setPelvicSeriesCompleted] = useState<number>(() => {
    try {
      const savedDate = localStorage.getItem('renacer_tracked_date');
      const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      if (savedDate && savedDate !== today) {
        return 0; // New day starts at 0%
      }
      const saved = localStorage.getItem('renacer_pelvic_series');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [breathingMinutesCompleted, setBreathingMinutesCompleted] = useState<number>(() => {
    try {
      const savedDate = localStorage.getItem('renacer_tracked_date');
      const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      if (savedDate && savedDate !== today) {
        return 0; // New day starts at 0%
      }
      const saved = localStorage.getItem('renacer_breathing_minutes');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Persistent water glasses
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('renacer_water');
      return saved ? JSON.parse(saved) : 5;
    } catch {
      return 5;
    }
  });

  // Persistent symptom logs
  const [logs, setLogs] = useState<SymptomLog[]>(() => {
    try {
      const saved = localStorage.getItem('renacer_symptom_logs');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'log-init-1',
          date: 'Ayer',
          energyLevel: 3,
          pelvicHeaviness: 'none',
          backPain: 'mild',
          bleedingStatus: 'spotting',
          mood: 'serene',
          diastasisCheckNotes: 'Diástasis ombligo: 2 dedos · Tensión elástica',
          notes: 'Día tranquilo. Buenas sensaciones tras la respiración diafragmática.',
        },
      ];
    } catch {
      return [];
    }
  });

  // Persistent diastasis history
  const [diastasisHistory, setDiastasisHistory] = useState<DiastasisHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('renacer_diastasis_history');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'd-1',
          date: 'Semana 2',
          widthCm: 2.3,
          navelFingers: 2.5,
          tissueDepth: 'elastico',
          doming: false,
        },
        {
          id: 'd-2',
          date: 'Semana 6',
          widthCm: 1.8,
          navelFingers: 2.0,
          tissueDepth: 'elastico',
          doming: false,
        },
      ];
    } catch {
      return [];
    }
  });

  // Persistent workout history
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('renacer_workout_history');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'w-1',
          routineId: 'rutina-core-profundo',
          title: 'Activación del Core Profundo y Respiración 360°',
          category: 'diastasis',
          durationMinutes: 12,
          completedAt: 'Ayer',
        },
        {
          id: 'w-2',
          routineId: 'rutina-suelo-pelvico-kegel',
          title: 'Rehabilitación del Suelo Pélvico',
          category: 'suelo-pelvico',
          durationMinutes: 10,
          completedAt: 'Hace 3 días',
        },
      ];
    } catch {
      return [];
    }
  });

  // Daily motivational message state
  const [currentMotivationalDay, setCurrentMotivationalDay] = useState<number>(() => {
    return getTodayDayIndex();
  });
  const [isMotivationalOpen, setIsMotivationalOpen] = useState(false);

  // Active workout / routine player modal
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);

  // Quick modals
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatic daily popup check
  useEffect(() => {
    try {
      const lastSeenDay = localStorage.getItem('renacer_last_motivational_day');
      const todayStr = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      if (lastSeenDay !== todayStr) {
        setIsMotivationalOpen(true);
        localStorage.setItem('renacer_last_motivational_day', todayStr);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Sync to localStorage with double redundancy
  useEffect(() => {
    localStorage.setItem('renacer_profile', JSON.stringify(profile));
    localStorage.setItem('renacer_profile_backup', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('renacer_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('renacer_tracked_date', getTodayDateKey());
    localStorage.setItem('renacer_pelvic_series', pelvicSeriesCompleted.toString());
  }, [pelvicSeriesCompleted]);

  useEffect(() => {
    localStorage.setItem('renacer_tracked_date', getTodayDateKey());
    localStorage.setItem('renacer_breathing_minutes', breathingMinutesCompleted.toString());
  }, [breathingMinutesCompleted]);

  useEffect(() => {
    localStorage.setItem('renacer_water', JSON.stringify(waterGlasses));
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem('renacer_symptom_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('renacer_diastasis_history', JSON.stringify(diastasisHistory));
  }, [diastasisHistory]);

  useEffect(() => {
    localStorage.setItem('renacer_workout_history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOnboardingComplete = (newProfile: PostpartumProfile) => {
    setProfile(newProfile);
    localStorage.setItem('renacer_profile', JSON.stringify(newProfile));
    localStorage.setItem('renacer_profile_backup', JSON.stringify(newProfile));
    localStorage.setItem('renacer_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
    showToast(`¡Bienvenida ${newProfile.name}! Tu perfil ha quedado registrado permanentemente.`);
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const next = !h.completed;
          if (next) showToast(`✓ Hábito completado: "${h.title.slice(0, 30)}..."`);
          return { ...h, completed: next };
        }
        return h;
      })
    );
  };

  const handleAddWater = (delta: number) => {
    setWaterGlasses((prev) => Math.max(0, Math.min(12, prev + delta)));
  };

  const handleAddPelvicSeries = (delta: number) => {
    setPelvicSeriesCompleted((prev) => {
      const next = Math.max(0, Math.min(3, prev + delta));
      if (delta > 0 && next > prev) {
        showToast(`✓ Serie de suelo pélvico completada (${next}/3 series)`);
      }
      return next;
    });
  };

  const handleAddBreathingMinutes = (delta: number) => {
    setBreathingMinutesCompleted((prev) => {
      const next = Math.max(0, Math.min(20, prev + delta));
      if (delta > 0 && next > prev) {
        showToast(`✓ +${delta} min de respiración registrados (${next}/10 min)`);
      }
      return next;
    });
  };

  const handleResetDailyProgress = () => {
    setPelvicSeriesCompleted(0);
    setBreathingMinutesCompleted(0);
    setHabits((prev) => prev.map((h) => ({ ...h, completed: false })));
    localStorage.setItem('renacer_pelvic_series', '0');
    localStorage.setItem('renacer_breathing_minutes', '0');
    showToast('✓ Progreso diario reiniciado al 0% para hoy.');
  };

  const handleCompleteRoutine = (routineId: string, minutes: number) => {
    const routine = [...postpartumRoutines, ...strengthRoutines, ...RENACER_ROUTINES].find((r) => r.id === routineId);
    const newHistoryItem: WorkoutHistoryItem = {
      id: `w-${Date.now()}`,
      routineId,
      title: routine?.title || 'Sesión de Fisioterapia',
      category: routine?.category || 'suelo-pelvico',
      durationMinutes: minutes,
      completedAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    };

    setWorkoutHistory((prev) => [newHistoryItem, ...prev]);
    // Automatically add 1 completed series to daily progress
    setPelvicSeriesCompleted((prev) => Math.min(3, prev + 1));
    showToast(`🌟 ¡Sesión completada! Registrados ${minutes} min y +1 serie de ejercicio hoy.`);
  };

  const handleAddLog = (newLog: Omit<SymptomLog, 'id'>) => {
    const fullLog: SymptomLog = {
      ...newLog,
      id: `log-${Date.now()}`,
    };
    setLogs((prev) => [fullLog, ...prev]);
    showToast('✓ Check-in de síntomas guardado en tu historial.');
  };

  const handleUpdateDiastasis = (widthCm: number, hasDiastasis: boolean) => {
    setProfile((prev) => ({
      ...prev,
      diastasisWidthCm: widthCm,
      hasDiastasis,
    }));

    const newDiastasisItem: DiastasisHistoryItem = {
      id: `d-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      widthCm,
      navelFingers: Number((widthCm / 0.9).toFixed(1)),
      tissueDepth: 'elastico',
      doming: false,
    };

    setDiastasisHistory((prev) => [newDiastasisItem, ...prev]);
    showToast(`✓ Valor de diástasis actualizado a ${widthCm} cm y registrado para el informe.`);
  };

  const handleImportBackup = (backupData: any) => {
    try {
      if (backupData.profile) {
        setProfile(backupData.profile);
        localStorage.setItem('renacer_profile', JSON.stringify(backupData.profile));
        localStorage.setItem('renacer_profile_backup', JSON.stringify(backupData.profile));
      }
      if (backupData.symptomLogs) {
        setLogs(backupData.symptomLogs);
        localStorage.setItem('renacer_symptom_logs', JSON.stringify(backupData.symptomLogs));
      }
      if (backupData.diastasisHistory) {
        setDiastasisHistory(backupData.diastasisHistory);
        localStorage.setItem('renacer_diastasis_history', JSON.stringify(backupData.diastasisHistory));
      }
      if (backupData.workoutHistory) {
        setWorkoutHistory(backupData.workoutHistory);
        localStorage.setItem('renacer_workout_history', JSON.stringify(backupData.workoutHistory));
      }
      if (typeof backupData.waterGlasses === 'number') {
        setWaterGlasses(backupData.waterGlasses);
        localStorage.setItem('renacer_water', JSON.stringify(backupData.waterGlasses));
      }
      showToast('✓ ¡Copia de seguridad restaurada con éxito!');
    } catch {
      showToast('Error al importar la copia de seguridad.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fef8f4] text-[#1d1b19] flex flex-col font-sans selection:bg-[#ffdbd1] selection:text-[#96432b]">
      {/* Top Header with Prominent Circular Logo */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        currentDay={currentMotivationalDay}
        onOpenBreathing={() => setIsBreathingOpen(true)}
        onEditProfile={() => setIsProfileOpen(true)}
        onOpenMotivational={() => setIsMotivationalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#1d1b19] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-warm-floating flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-16">
        {activeTab === 'hoy' && (
          <TodayHub
            profile={profile}
            habits={habits}
            onToggleHabit={handleToggleHabit}
            recommendedRoutine={postpartumRoutines[0]}
            onStartRoutine={(routine) => setActiveRoutine(routine)}
            onOpenBreathing={() => setIsBreathingOpen(true)}
            waterGlasses={waterGlasses}
            onAddWater={handleAddWater}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            currentDay={currentMotivationalDay}
            onOpenMotivationalModal={() => setIsMotivationalOpen(true)}
            onSelectMotivationalDay={(day) => setCurrentMotivationalDay(day)}
            pelvicSeriesCompleted={pelvicSeriesCompleted}
            breathingMinutesCompleted={breathingMinutesCompleted}
            onAddPelvicSeries={handleAddPelvicSeries}
            onAddBreathingMinutes={handleAddBreathingMinutes}
            onResetDailyProgress={handleResetDailyProgress}
          />
        )}

        {activeTab === 'rutinas' && (
          <RoutinesLibrary
            routines={postpartumRoutines}
            onStartRoutine={(routine) => setActiveRoutine(routine)}
          />
        )}

        {activeTab === 'renacer' && (
          <RenacerFuncionalSection
            onStartRoutine={(routine) => setActiveRoutine(routine)}
            profile={profile}
            onUpdateProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
          />
        )}

        {activeTab === 'fuerza' && (
          <StrengthVitalitySection
            routines={strengthRoutines}
            onStartRoutine={(routine) => setActiveRoutine(routine)}
          />
        )}

        {activeTab === 'registro' && (
          <SymptomTracker
            logs={logs}
            onAddLog={handleAddLog}
            onUpdateDiastasis={handleUpdateDiastasis}
            profile={profile}
            diastasisHistory={diastasisHistory}
            workoutHistory={workoutHistory}
            waterGlasses={waterGlasses}
            onImportBackup={handleImportBackup}
            onOpenProfileEdit={() => setIsProfileOpen(true)}
          />
        )}

        {activeTab === 'guias' && <GuidesSection articles={clinicalGuides} />}
      </main>

      {/* First-Launch Onboarding / Name Registration Modal */}
      <WelcomeOnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
      />

      {/* Motivational Popup Modal Card */}
      <MotivationalModal
        isOpen={isMotivationalOpen}
        currentDay={currentMotivationalDay}
        onSelectDay={setCurrentMotivationalDay}
        onClose={() => setIsMotivationalOpen(false)}
      />

      {/* Workout Player Modal */}
      {activeRoutine && (
        <RoutinePlayerModal
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
          onComplete={handleCompleteRoutine}
        />
      )}

      {/* Breathing Sanctuary Modal */}
      <BreathingModal
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
        onAddMinutes={handleAddBreathingMinutes}
      />

      {/* Profile Edit Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        profile={profile}
        onClose={() => setIsProfileOpen(false)}
        onSave={(updated) => {
          setProfile(updated);
          localStorage.setItem('renacer_profile', JSON.stringify(updated));
          localStorage.setItem('renacer_profile_backup', JSON.stringify(updated));
          showToast(`✓ Perfil de ${updated.name} guardado de forma permanente.`);
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Footer with Circular Logo & Brand Ethos */}
      <footer className="border-t border-[#dbc1ba]/30 bg-[#f8f3ef] py-8 text-xs text-[#55433e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#dbc1ba]/60 bg-white p-0.5 shadow-xs shrink-0">
              <img
                src={OFFICIAL_LOGO_SRC}
                alt="Logotipo oficial Renacer Postparto"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="font-serif text-base font-medium text-[#1d1b19]">
                Renacer Postparto
              </div>
              <p className="text-[11px] text-[#55433e] mt-0.5">
                Armonía entre fuerza, salud y maternidad desde el hogar
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1 text-center sm:text-right">
            <p className="text-[11px] text-[#55433e] max-w-md">
              Nota de responsabilidad clínica: Esta aplicación provee acompañamiento fisioterapéutico
              preventivo y hábitos saludables. Consulta a tu profesional de salud ante cualquier dolor agudo.
            </p>
            <span className="text-[10px] text-[#41674c] font-medium">
              ✓ Datos guardados localmente para {profile.name} (Almacenamiento permanente activo)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
