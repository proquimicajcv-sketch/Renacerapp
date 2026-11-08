import React, { useState } from 'react';
import { Heart, Activity, Check, AlertCircle, Info, Calendar, Sparkles, Smile, Frown, BatteryCharging, FileText } from 'lucide-react';
import {
  SymptomLog,
  DiastasisAssessment,
  PostpartumProfile,
  DiastasisHistoryItem,
  WorkoutHistoryItem,
} from '../types';
import { ClinicalReportPDF } from './ClinicalReportPDF';

interface SymptomTrackerProps {
  logs: SymptomLog[];
  onAddLog: (log: Omit<SymptomLog, 'id'>) => void;
  onUpdateDiastasis: (widthCm: number, hasDiastasis: boolean) => void;
  profile: PostpartumProfile;
  diastasisHistory: DiastasisHistoryItem[];
  workoutHistory: WorkoutHistoryItem[];
  waterGlasses: number;
  onImportBackup: (backupData: any) => void;
  onOpenProfileEdit: () => void;
}

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({
  logs,
  onAddLog,
  onUpdateDiastasis,
  profile,
  diastasisHistory,
  workoutHistory,
  waterGlasses,
  onImportBackup,
  onOpenProfileEdit,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'checkin' | 'diastasis' | 'analisis-pdf' | 'historial'>('checkin');

  // Form State for Daily Checkin
  const [energyLevel, setEnergyLevel] = useState(3);
  const [pelvicHeaviness, setPelvicHeaviness] = useState<SymptomLog['pelvicHeaviness']>('none');
  const [backPain, setBackPain] = useState<SymptomLog['backPain']>('mild');
  const [bleedingStatus, setBleedingStatus] = useState<SymptomLog['bleedingStatus']>('spotting');
  const [mood, setMood] = useState<SymptomLog['mood']>('serene');
  const [notes, setNotes] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Form State for Diastasis Assessment
  const [aboveFingers, setAboveFingers] = useState(1.5);
  const [navelFingers, setNavelFingers] = useState(2.0);
  const [belowFingers, setBelowFingers] = useState(1.0);
  const [tissueDepth, setTissueDepth] = useState<'firme' | 'elastico' | 'profundo'>('elastico');
  const [doming, setDoming] = useState(false);
  const [diastasisSaved, setDiastasisSaved] = useState(false);

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog({
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      energyLevel,
      pelvicHeaviness,
      backPain,
      bleedingStatus,
      mood,
      diastasisCheckNotes: `Diástasis ombligo: ${navelFingers} dedos · Tensión ${tissueDepth}`,
      notes,
    });
    setNotes('');
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const calculateDiastasisStatus = () => {
    const maxFingers = Math.max(aboveFingers, navelFingers, belowFingers);
    if (maxFingers <= 1.5 && tissueDepth !== 'profundo') {
      return {
        label: 'Separación Fisiológica Normal',
        color: 'text-[#41674c] bg-[#edf5ef] border-[#41674c]/30',
        cmApprox: 1.2,
        hasDiastasis: false,
        advice: 'Tus rectos abdominales tienen una distancia completamente funcional. Continúa fortaleciendo el transverso para mantener la firmeza.',
      };
    } else if (maxFingers <= 2.5 && !doming) {
      return {
        label: 'Diástasis Funcional Leve',
        color: 'text-[#96432b] bg-[#ffdbd1] border-[#96432b]/30',
        cmApprox: maxFingers * 0.9,
        hasDiastasis: true,
        advice: 'Existe una separación moderada común en el primer semestre. El foco principal es activar el transverso antes de cualquier esfuerzo para evitar que aumente.',
      };
    } else {
      return {
        label: 'Diástasis Significativa con Línea Alba Laxa',
        color: 'text-[#ba1a1a] bg-[#ffdad6] border-[#ba1a1a]/30',
        cmApprox: maxFingers * 1.1,
        hasDiastasis: true,
        advice: 'Se aprecia abombamiento o separación pronunciada. Es prioritario evitar flexiones de tronco (crunches) y acudir a una sesión presencial de fisioterapia de suelo pélvico.',
      };
    }
  };

  const diastasisResult = calculateDiastasisStatus();

  const handleSaveDiastasisAssessment = () => {
    onUpdateDiastasis(Number(diastasisResult.cmApprox.toFixed(1)), diastasisResult.hasDiastasis);
    setDiastasisSaved(true);
    setTimeout(() => setDiastasisSaved(false), 3500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-4 border-b border-[#dbc1ba]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#96432b] uppercase tracking-wider mb-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>Escucha Corporal & Seguimiento Clínico</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d1b19] font-medium tracking-tight">
            Mi Registro de Síntomas & Diástasis
          </h1>
          <p className="text-[15px] text-[#55433e] mt-1 font-sans max-w-2xl">
            Anota cómo responde tu cuerpo día a día. Evalúa la tensión de la pared abdominal y monitoriza
            la ausencia de molestias pélvicas durante tu recuperación.
          </p>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setActiveSubTab('checkin')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeSubTab === 'checkin'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white text-[#55433e] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
              }`}
            >
              Check-in Diario
            </button>
            <button
              onClick={() => setActiveSubTab('diastasis')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeSubTab === 'diastasis'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white text-[#55433e] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
              }`}
            >
              Test Autoevaluación de Diástasis
            </button>
            <button
              onClick={() => setActiveSubTab('analisis-pdf')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'analisis-pdf'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white text-[#55433e] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Análisis & Informe PDF</span>
            </button>
            <button
              onClick={() => setActiveSubTab('historial')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                activeSubTab === 'historial'
                  ? 'bg-[#96432b] text-white shadow-xs'
                  : 'bg-white text-[#55433e] border border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
              }`}
            >
              Historial ({logs.length})
            </button>
          </div>
        </div>
      </section>

      {/* Subtab 1: Daily Checkin */}
      {activeSubTab === 'checkin' && (
        <form onSubmit={handleSubmitLog} className="space-y-6 max-w-3xl mx-auto">
          {showSavedToast && (
            <div className="p-4 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 text-xs sm:text-sm text-[#41674c] font-medium flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>¡Registro guardado con éxito en tu historial de recuperación!</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#dbc1ba]/30 p-5 sm:p-7 shadow-warm-resting space-y-6">
            {/* Energy Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#1d1b19] flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-[#96432b]" />
                  <span>Nivel de Energía Vital ({energyLevel} / 5)</span>
                </label>
                <span className="text-xs text-[#55433e]">
                  {energyLevel <= 2 ? 'Muy agotada' : energyLevel === 3 ? 'Energía moderada' : 'Buen vigor'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full accent-[#96432b] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#55433e] mt-1 font-mono">
                <span>1 (Mínimo)</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5 (Excelente)</span>
              </div>
            </div>

            {/* Pelvic Heaviness */}
            <div className="pt-4 border-t border-[#f2ede9]">
              <label className="text-sm font-semibold text-[#1d1b19] block mb-2">
                Sensación de Pesadez en el Suelo Pélvico
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Ninguna', desc: 'Ligera y cómoda' },
                  { id: 'mild', label: 'Leve', desc: 'Al final del día' },
                  { id: 'moderate', label: 'Moderada', desc: 'Tras estar de pie' },
                  { id: 'severe', label: 'Notoria', desc: 'Consultar especialista' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPelvicHeaviness(item.id as SymptomLog['pelvicHeaviness'])}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      pelvicHeaviness === item.id
                        ? 'border-[#96432b] bg-[#ffdbd1]/30 ring-1 ring-[#96432b]'
                        : 'border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
                    }`}
                  >
                    <strong className="block text-xs text-[#1d1b19]">{item.label}</strong>
                    <span className="text-[11px] text-[#55433e]">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back / Postural Pain */}
            <div className="pt-4 border-t border-[#f2ede9]">
              <label className="text-sm font-semibold text-[#1d1b19] block mb-2">
                Molestias en Espalda / Zona Lumbar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Sin dolor' },
                  { id: 'mild', label: 'Cansancio dorsal' },
                  { id: 'moderate', label: 'Tensión cervical' },
                  { id: 'severe', label: 'Dolor punzante' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBackPain(item.id as SymptomLog['backPain'])}
                    className={`p-2.5 rounded-xl text-center border text-xs font-medium transition-all cursor-pointer ${
                      backPain === item.id
                        ? 'border-[#41674c] bg-[#edf5ef] text-[#41674c] font-bold'
                        : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bleeding / Loquia */}
            <div className="pt-4 border-t border-[#f2ede9]">
              <label className="text-sm font-semibold text-[#1d1b19] block mb-2">
                Sangrado o Loquios
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'none', label: 'Cesado / Flujo blanco' },
                  { id: 'spotting', label: 'Manchado leve' },
                  { id: 'light', label: 'Flujo rosáceo' },
                  { id: 'moderate', label: 'Rojo vivo moderado' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBleedingStatus(item.id as SymptomLog['bleedingStatus'])}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      bleedingStatus === item.id
                        ? 'border-[#96432b] bg-[#ffdbd1]/30 text-[#96432b] font-bold'
                        : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Emotional Wellbeing */}
            <div className="pt-4 border-t border-[#f2ede9]">
              <label className="text-sm font-semibold text-[#1d1b19] block mb-2">
                Estado Emocional Hoy
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'serene', label: '🌸 Serena & En paz' },
                  { id: 'happy', label: '☀️ Con ilusión' },
                  { id: 'tired', label: '🌙 Cansada' },
                  { id: 'overwhelmed', label: '🌧️ Abrumada / Sensible' },
                  { id: 'anxious', label: '💭 Inquieta' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id as SymptomLog['mood'])}
                    className={`px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
                      mood === item.id
                        ? 'bg-[#1d1b19] text-white border-[#1d1b19]'
                        : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Field */}
            <div className="pt-4 border-t border-[#f2ede9]">
              <label className="text-sm font-semibold text-[#1d1b19] block mb-1.5">
                Notas personales o sensaciones del día
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Hoy practiqué 10 minutos de respiración y sentí menos tirantez en la espalda..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#dbc1ba]/60 focus:border-[#96432b] focus:ring-1 focus:ring-[#96432b] outline-none bg-[#fbf8f3]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              Guardar Registro de Hoy
            </button>
          </div>
        </form>
      )}

      {/* Subtab 2: Diastasis Self-Assessment */}
      {activeSubTab === 'diastasis' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-[#dbc1ba]/30 p-5 sm:p-7 shadow-warm-resting space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#41674c] uppercase tracking-wider">
                Protocolo Clínico de Autoevaluación
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#1d1b19] mt-0.5">
                Medición Palpatoria de la Línea Alba
              </h2>
              <p className="text-xs sm:text-sm text-[#55433e] mt-1.5 leading-relaxed">
                Túmbate boca arriba con las rodillas flexionadas. Coloca los dedos perpendiculares a la línea media
                del abdomen. Eleva ligeramente la cabeza 2 cm del suelo (solo como para mirar tus rodillas) y palpa:
              </p>
            </div>

            {/* Step 1: Above navel */}
            <div className="p-4 rounded-xl bg-[#f8f3ef] border border-[#dbc1ba]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1d1b19]">
                  1. Tres centímetros POR ENCIMA del ombligo
                </span>
                <span className="text-xs font-bold text-[#96432b]">{aboveFingers} dedos</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={aboveFingers}
                onChange={(e) => setAboveFingers(Number(e.target.value))}
                className="w-full accent-[#96432b] cursor-pointer"
              />
              <span className="text-[11px] text-[#55433e] block">
                Anchura entre los bordes internos de los músculos rectos.
              </span>
            </div>

            {/* Step 2: At navel */}
            <div className="p-4 rounded-xl bg-[#f8f3ef] border border-[#dbc1ba]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1d1b19]">
                  2. JUSTO EN el ombligo (anillo umbilical)
                </span>
                <span className="text-xs font-bold text-[#96432b]">{navelFingers} dedos</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={navelFingers}
                onChange={(e) => setNavelFingers(Number(e.target.value))}
                className="w-full accent-[#96432b] cursor-pointer"
              />
              <span className="text-[11px] text-[#55433e] block">
                Es la zona de mayor laxitud natural tras el embarazo.
              </span>
            </div>

            {/* Step 3: Below navel */}
            <div className="p-4 rounded-xl bg-[#f8f3ef] border border-[#dbc1ba]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1d1b19]">
                  3. Tres centímetros POR DEBAJO del ombligo
                </span>
                <span className="text-xs font-bold text-[#96432b]">{belowFingers} dedos</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={belowFingers}
                onChange={(e) => setBelowFingers(Number(e.target.value))}
                className="w-full accent-[#96432b] cursor-pointer"
              />
              <span className="text-[11px] text-[#55433e] block">
                Zona de sostén visceral inferior y estabilidad de sínfisis púbica.
              </span>
            </div>

            {/* Tissue Tension & Depth */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1d1b19] block">
                Resistencia y Tensión del Tejido (Fascia de la Línea Alba)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'firme', title: 'Firme / Tensa', desc: 'Rebota como una colchoneta firme' },
                  { id: 'elastico', title: 'Elástica normal', desc: 'Cede levemente pero opone resistencia' },
                  { id: 'profundo', title: 'Blanda / Se hunde', desc: 'Los dedos caen profundo sin soporte' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTissueDepth(item.id as typeof tissueDepth)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      tissueDepth === item.id
                        ? 'border-[#96432b] bg-[#ffdbd1]/30 ring-1 ring-[#96432b]'
                        : 'border-[#dbc1ba]/40 hover:bg-[#fbf8f3]'
                    }`}
                  >
                    <strong className="block text-xs text-[#1d1b19]">{item.title}</strong>
                    <span className="text-[11px] text-[#55433e]">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Doming check */}
            <div className="p-3.5 rounded-xl bg-[#fbf8f3] border border-[#dbc1ba]/30 flex items-center justify-between gap-3">
              <div>
                <strong className="text-xs text-[#1d1b19] block">
                  ¿Observas abombamiento o cresta piramidal (doming)?
                </strong>
                <span className="text-[11px] text-[#55433e]">
                  Ocurre si al despegar la cabeza el centro del vientre sobresale hacia arriba en punta.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDoming(!doming)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  doming
                    ? 'bg-[#ba1a1a] text-white'
                    : 'bg-[#edf5ef] text-[#41674c] border border-[#41674c]/30'
                }`}
              >
                {doming ? 'Sí, aparece cresta' : 'No, vientre plano'}
              </button>
            </div>

            {/* Diagnostic Output Card */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${diastasisResult.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Resultado Estimado: {diastasisResult.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                {diastasisResult.advice}
              </p>
              <div className="mt-2 text-xs font-semibold">
                Anchura media calculada: ~{diastasisResult.cmApprox.toFixed(1)} cm
              </div>
            </div>

            {diastasisSaved && (
              <div className="p-3 rounded-xl bg-[#edf5ef] text-[#41674c] text-xs font-semibold text-center animate-in fade-in">
                ✓ Valor de diástasis actualizado en tu perfil ({diastasisResult.cmApprox.toFixed(1)} cm)
              </div>
            )}

            <button
              onClick={handleSaveDiastasisAssessment}
              className="w-full h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              Actualizar Valor de Diástasis en mi Perfil
            </button>
          </div>
        </div>
      )}

      {/* Subtab: Clinical Report & PDF Analytics */}
      {activeSubTab === 'analisis-pdf' && (
        <ClinicalReportPDF
          profile={profile}
          symptomLogs={logs}
          diastasisHistory={diastasisHistory}
          workoutHistory={workoutHistory}
          waterGlasses={waterGlasses}
          onImportBackup={onImportBackup}
          onOpenProfileEdit={onOpenProfileEdit}
        />
      )}

      {/* Subtab 3: History */}
      {activeSubTab === 'historial' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {logs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#dbc1ba]/30">
              <Calendar className="w-8 h-8 text-[#96432b] mx-auto mb-2 opacity-50" />
              <p className="text-sm text-[#55433e]">Aún no has registrado ningún síntoma.</p>
              <button
                onClick={() => setActiveSubTab('checkin')}
                className="mt-3 text-xs font-semibold text-[#96432b] hover:underline"
              >
                Completar tu primer check-in hoy
              </button>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#dbc1ba]/30 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#f2ede9]">
                  <span className="font-semibold text-[#1d1b19]">{log.date}</span>
                  <span className="capitalize text-[#41674c] font-medium bg-[#edf5ef] px-2 py-0.5 rounded-full">
                    {log.mood}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#55433e] pt-1">
                  <div>
                    <span className="block opacity-75">Energía:</span>
                    <strong className="text-[#1d1b19]">{log.energyLevel} / 5</strong>
                  </div>
                  <div>
                    <span className="block opacity-75">Pesadez pélvica:</span>
                    <strong className="text-[#1d1b19] capitalize">{log.pelvicHeaviness}</strong>
                  </div>
                  <div>
                    <span className="block opacity-75">Molestia lumbar:</span>
                    <strong className="text-[#1d1b19] capitalize">{log.backPain}</strong>
                  </div>
                  <div>
                    <span className="block opacity-75">Sangrado:</span>
                    <strong className="text-[#1d1b19] capitalize">{log.bleedingStatus}</strong>
                  </div>
                </div>
                {log.notes && (
                  <p className="text-[12px] text-[#55433e] italic pt-1 bg-[#fbf8f3] p-2 rounded-lg">
                    "{log.notes}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
