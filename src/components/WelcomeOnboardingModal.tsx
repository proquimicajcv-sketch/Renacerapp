import React, { useState } from 'react';
import { Baby, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { PostpartumProfile } from '../types';
import { OFFICIAL_LOGO_SRC } from '../data/motivationalMessages';

interface WelcomeOnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: PostpartumProfile) => void;
}

export const WelcomeOnboardingModal: React.FC<WelcomeOnboardingModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const [name, setName] = useState('');
  const [userTrack, setUserTrack] = useState<'postparto-reciente' | 'renacer-funcional'>('postparto-reciente');
  const [yearsPostpartum, setYearsPostpartum] = useState(3);
  const [lumbarDiscomfortLevel, setLumbarDiscomfortLevel] = useState<'none' | 'mild' | 'moderate' | 'chronic'>('mild');
  const [deliveryType, setDeliveryType] = useState<'vaginal' | 'cesarea'>('vaginal');
  const [weeksPostpartum, setWeeksPostpartum] = useState(6);
  const [diastasisWidthCm, setDiastasisWidthCm] = useState(1.8);
  const [notes, setNotes] = useState('Recuperar tono de suelo pélvico, mejorar postura y sentirme fuerte desde casa.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProfile: PostpartumProfile = {
      name: name.trim(),
      deliveryType,
      weeksPostpartum: userTrack === 'renacer-funcional' ? yearsPostpartum * 52 : weeksPostpartum,
      deliveryDate: new Date().toISOString().split('T')[0],
      hasDiastasis: diastasisWidthCm >= 2.0,
      diastasisWidthCm,
      hasPelvicDiscomfort: false,
      notes:
        userTrack === 'renacer-funcional'
          ? `Perfil Renacer Funcional (${yearsPostpartum} años postparto). Enfoque en descompresión dorsal, movilidad de cadera y regla de los 10 minutos sin culpa.`
          : notes,
      userTrack,
      yearsPostpartum: userTrack === 'renacer-funcional' ? yearsPostpartum : undefined,
      lumbarDiscomfortLevel,
    };

    onComplete(newProfile);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/60 shadow-warm-floating overflow-hidden flex flex-col p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        {/* Top Official Logo */}
        <div className="text-center space-y-3 mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#dbc1ba]/60 bg-white p-1 shadow-warm-resting mx-auto">
            <img
              src={OFFICIAL_LOGO_SRC}
              alt="Logotipo oficial Renacer Postparto"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[#96432b] block">
              Registro Inicial Seguro
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1d1b19] mt-0.5">
              Bienvenida a Renacer Postparto
            </h1>
            <p className="text-xs sm:text-sm text-[#55433e] mt-1 font-sans max-w-sm mx-auto leading-relaxed">
              Personaliza tu espacio de recuperación. Tus datos quedarán registrados y guardados de forma
              permanente en tu dispositivo para tus análisis e informes.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field (Prominent & Mandatory) */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#96432b]/40 shadow-xs space-y-1.5">
            <label className="text-xs font-bold text-[#1d1b19] flex items-center gap-1.5 uppercase tracking-wide">
              <span>¿Cómo te llamas?</span>
              <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Escribe tu nombre aquí (ej. María, Elena...)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbc1ba]/60 bg-[#fbf8f3] text-sm text-[#1d1b19] font-medium focus:border-[#96432b] focus:ring-2 focus:ring-[#96432b]/20 outline-none transition-all placeholder:text-[#55433e]/50"
            />
            <span className="text-[11px] text-[#41674c] block font-medium">
              ✓ Tu nombre quedará guardado para tu saludo diario y tus informes clínicos en PDF.
            </span>
          </div>

          {/* Stage Track Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1d1b19] block uppercase tracking-wide">
              ¿Cuál es tu momento actual?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserTrack('postparto-reciente')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  userTrack === 'postparto-reciente'
                    ? 'border-[#96432b] bg-[#ffdbd1]/30 text-[#96432b] ring-1 ring-[#96432b]'
                    : 'border-[#dbc1ba]/50 text-[#55433e] bg-white hover:bg-[#fbf8f3]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Postparto Reciente</span>
                  {userTrack === 'postparto-reciente' && <Check className="w-3.5 h-3.5 text-[#96432b]" />}
                </div>
                <p className="text-[11px] text-[#55433e] mt-1">
                  Menos de 24 meses. Rehabilitación de suelo pélvico, diástasis y cicatriz.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setUserTrack('renacer-funcional')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  userTrack === 'renacer-funcional'
                    ? 'border-[#41674c] bg-[#edf5ef] text-[#41674c] ring-1 ring-[#41674c]'
                    : 'border-[#dbc1ba]/50 text-[#55433e] bg-white hover:bg-[#fbf8f3]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">El Renacer Funcional</span>
                  {userTrack === 'renacer-funcional' && <Check className="w-3.5 h-3.5 text-[#41674c]" />}
                </div>
                <p className="text-[11px] text-[#55433e] mt-1">
                  Más de 2 años sin entrenar. Descompresión postural y micro-hábitos.
                </p>
              </button>
            </div>
          </div>

          {/* Conditional Fields based on User Track */}
          {userTrack === 'renacer-funcional' ? (
            <div className="p-4 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 space-y-3 animate-in fade-in duration-200">
              <div className="p-3 bg-white/80 rounded-xl border border-[#41674c]/20">
                <p className="font-serif text-xs text-[#41674c] italic text-center font-medium">
                  "No importa si pasaron 2, 5 o 10 años; hoy es el día uno para volver a conectar con tu fuerza sin prisa ni culpa."
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
                  ¿Cuántos años han pasado desde tu último parto?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 5, 10].map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYearsPostpartum(y)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        yearsPostpartum === y
                          ? 'bg-[#41674c] text-white border-[#41674c]'
                          : 'bg-white hover:bg-[#f2ede9] border-[#dbc1ba]/40 text-[#55433e]'
                      }`}
                    >
                      {y === 10 ? '10+ años' : `Hace ${y} años`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
                  Molestia lumbar o rigidez habitual:
                </label>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  {[
                    { id: 'mild' as const, label: 'Leve / Ocasional' },
                    { id: 'moderate' as const, label: 'Moderada en la tarde' },
                    { id: 'chronic' as const, label: 'Frecuente al levantar peso' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLumbarDiscomfortLevel(lvl.id)}
                      className={`py-2 px-2 rounded-xl border font-medium text-center transition-all cursor-pointer ${
                        lumbarDiscomfortLevel === lvl.id
                          ? 'bg-[#41674c] text-white border-[#41674c]'
                          : 'bg-white hover:bg-[#f2ede9] border-[#dbc1ba]/40 text-[#55433e]'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Delivery Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1b19] block">
                  Tipo de Parto
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('vaginal')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      deliveryType === 'vaginal'
                        ? 'border-[#96432b] bg-[#ffdbd1]/40 text-[#96432b] ring-1 ring-[#96432b]'
                        : 'border-[#dbc1ba]/50 text-[#55433e] bg-white hover:bg-[#fbf8f3]'
                    }`}
                  >
                    Parto Vaginal
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('cesarea')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      deliveryType === 'cesarea'
                        ? 'border-[#96432b] bg-[#ffdbd1]/40 text-[#96432b] ring-1 ring-[#96432b]'
                        : 'border-[#dbc1ba]/50 text-[#55433e] bg-white hover:bg-[#fbf8f3]'
                    }`}
                  >
                    Cesárea
                  </button>
                </div>
              </div>

              {/* Weeks Postpartum */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#dbc1ba]/40 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1d1b19]">
                  <span>Semanas desde el parto:</span>
                  <strong className="text-[#96432b] text-sm font-mono">Semana {weeksPostpartum}</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={weeksPostpartum}
                  onChange={(e) => setWeeksPostpartum(Number(e.target.value))}
                  className="w-full accent-[#96432b] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#55433e] font-mono">
                  <span>Sem 1</span>
                  <span>Sem 6 (Consolidación)</span>
                  <span>Sem 24+</span>
                </div>
              </div>
            </>
          )}

          {/* Initial Diastasis Estimate */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#dbc1ba]/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1d1b19]">
              <span>Diástasis o separación estimada:</span>
              <strong className="text-[#96432b] text-sm font-mono">{diastasisWidthCm} cm</strong>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={diastasisWidthCm}
              onChange={(e) => setDiastasisWidthCm(Number(e.target.value))}
              className="w-full accent-[#96432b] cursor-pointer"
            />
            <span className="text-[11px] text-[#55433e] block">
              Podrás evaluarla paso a paso con el test de la app cuando lo desees.
            </span>
          </div>

          {/* Privacy & Guarantee note */}
          <div className="p-3 rounded-xl bg-[#edf5ef] border border-[#41674c]/20 flex items-center gap-2 text-[11px] text-[#41674c]">
            <Shield className="w-4 h-4 shrink-0" />
            <span>Tus datos son 100% privados y se almacenan de forma segura en tu navegador.</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Registrar y Comenzar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
