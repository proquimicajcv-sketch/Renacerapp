export type UserTrack = 'postparto-reciente' | 'renacer-funcional';

export interface PostpartumProfile {
  name: string;
  deliveryType: 'vaginal' | 'cesarea';
  weeksPostpartum: number;
  deliveryDate: string;
  hasDiastasis: boolean;
  diastasisWidthCm: number;
  hasPelvicDiscomfort: boolean;
  notes: string;
  // Perfil de Reconexión a Largo Plazo (+24 meses)
  userTrack?: UserTrack;
  yearsPostpartum?: number;
  lumbarDiscomfortLevel?: 'none' | 'mild' | 'moderate' | 'chronic';
  stairFatigueLevel?: 'none' | 'mild' | 'moderate' | 'high';
  dailySleepHours?: number;
  sedentaryHoursPerDay?: number;
}

export type ExerciseCategory =
  | 'suelo-pelvico'
  | 'diastasis'
  | 'movilidad'
  | 'cesarea'
  | 'respiracion'
  | 'fuerza-vitalidad'
  | 'renacer-funcional';

export type EquipmentType = 'peso-corporal' | 'ligas' | 'mancuernas' | 'mixto';

export interface ExerciseStep {
  title: string;
  durationSeconds: number;
  instruction: string;
  breathingCue: string;
  clinicalTip: string;
  isContractionHold?: boolean;
  setsReps?: string;
  equipment?: EquipmentType;
}

export interface Routine {
  id: string;
  title: string;
  subtitle: string;
  category: ExerciseCategory;
  durationMinutes: number;
  intensity: 'Restaurador' | 'Suave' | 'Moderado' | 'Intermedio' | 'Avanzado';
  image: string;
  description: string;
  suitableFromWeek: number;
  targetMuscles: string[];
  safeForCesarean: boolean;
  clinicalPrecautions: string;
  steps: ExerciseStep[];
  equipment?: EquipmentType;
  purpose?: string;
  mindfulClosing?: string;
}

export interface DailyHabit {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'pelvico' | 'hidratacion' | 'respiracion' | 'postura' | 'autocuidado';
}

export interface SymptomLog {
  id: string;
  date: string;
  energyLevel: number; // 1 to 5
  pelvicHeaviness: 'none' | 'mild' | 'moderate' | 'severe';
  backPain: 'none' | 'mild' | 'moderate' | 'severe';
  bleedingStatus: 'none' | 'spotting' | 'light' | 'moderate' | 'heavy';
  mood: 'serene' | 'tired' | 'overwhelmed' | 'happy' | 'anxious';
  diastasisCheckNotes: string;
  notes: string;
}

export interface DiastasisAssessment {
  aboveNavelFingers: number;
  navelFingers: number;
  belowNavelFingers: number;
  tissueDepth: 'firme' | 'elastico' | 'profundo';
  domingObserved: boolean;
  date: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'cicatriz' | 'lactancia' | 'nutricion' | 'alerta' | 'movimiento';
  readTime: string;
  image: string;
  summary: string;
  content: {
    heading: string;
    paragraphs: string[];
    tips?: string[];
  }[];
}

export interface WorkoutHistoryItem {
  id: string;
  routineId: string;
  title: string;
  category: ExerciseCategory;
  durationMinutes: number;
  completedAt: string;
}

export interface DiastasisHistoryItem {
  id: string;
  date: string;
  widthCm: number;
  navelFingers: number;
  tissueDepth: 'firme' | 'elastico' | 'profundo';
  doming: boolean;
}

