import React, { useState } from 'react';
import { X, User, Calendar, Baby, Check } from 'lucide-react';
import { PostpartumProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  profile: PostpartumProfile;
  onClose: () => void;
  onSave: (updated: PostpartumProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [userTrack, setUserTrack] = useState<'postparto-reciente' | 'renacer-funcional'>(
    profile.userTrack || (profile.weeksPostpartum > 104 ? 'renacer-funcional' : 'postparto-reciente')
  );
  const [yearsPostpartum, setYearsPostpartum] = useState<number>(profile.yearsPostpartum || 3);
  const [weeks, setWeeks] = useState(profile.weeksPostpartum);
  const [deliveryType, setDeliveryType] = useState(profile.deliveryType);
  const [notes, setNotes] = useState(profile.notes);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      name,
      userTrack,
      yearsPostpartum: userTrack === 'renacer-funcional' ? yearsPostpartum : undefined,
      weeksPostpartum: userTrack === 'renacer-funcional' ? yearsPostpartum * 52 : Number(weeks),
      deliveryType,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fef8f4] rounded-3xl border border-[#dbc1ba]/50 shadow-warm-floating overflow-hidden flex flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#dbc1ba]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#96432b]">
              <Baby className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-[#1d1b19]">
                Mi Perfil de Recuperación
              </h2>
              <span className="text-[11px] text-[#55433e]">Personaliza tu etapa posparto</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#55433e] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
              Tu Nombre
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbc1ba]/60 bg-white text-sm text-[#1d1b19] focus:border-[#96432b] focus:ring-1 focus:ring-[#96432b] outline-none"
            />
          </div>

          {/* Stage Switcher */}
          <div>
            <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
              Etapa de Entrenamiento
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUserTrack('postparto-reciente')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                  userTrack === 'postparto-reciente'
                    ? 'border-[#96432b] bg-[#ffdbd1]/30 text-[#96432b] font-bold'
                    : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                }`}
              >
                Postparto Reciente
                <span className="block text-[10px] text-[#55433e] font-normal">&lt; 24 meses</span>
              </button>
              <button
                type="button"
                onClick={() => setUserTrack('renacer-funcional')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                  userTrack === 'renacer-funcional'
                    ? 'border-[#41674c] bg-[#edf5ef] text-[#41674c] font-bold'
                    : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                }`}
              >
                El Renacer Funcional
                <span className="block text-[10px] text-[#41674c] font-normal">&gt; 2 años sin entrenar</span>
              </button>
            </div>
          </div>

          {userTrack === 'renacer-funcional' ? (
            <div className="p-3 bg-[#edf5ef] rounded-xl border border-[#41674c]/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1d1b19]">
                <span>Años desde tu último parto:</span>
                <strong className="text-[#41674c] text-sm font-mono">{yearsPostpartum} años</strong>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={yearsPostpartum}
                onChange={(e) => setYearsPostpartum(Number(e.target.value))}
                className="w-full accent-[#41674c] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#55433e] font-mono">
                <span>2 años</span>
                <span>5 años</span>
                <span>10+ años</span>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
                Semanas desde el Parto ({weeks} semanas)
              </label>
              <input
                type="range"
                min="1"
                max="24"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full accent-[#96432b] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#55433e] font-mono mt-0.5">
                <span>Sem 1</span>
                <span>Sem 6 (Cuarto Trimestre)</span>
                <span>Sem 24</span>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
              Tipo de Parto
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType('vaginal')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  deliveryType === 'vaginal'
                    ? 'border-[#96432b] bg-[#ffdbd1]/30 text-[#96432b]'
                    : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                }`}
              >
                Parto Vaginal
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('cesarea')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  deliveryType === 'cesarea'
                    ? 'border-[#96432b] bg-[#ffdbd1]/30 text-[#96432b]'
                    : 'border-[#dbc1ba]/40 text-[#55433e] hover:bg-[#fbf8f3]'
                }`}
              >
                Cesárea
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1d1b19] block mb-1">
              Notas u Objetivos Principales
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#dbc1ba]/60 bg-white text-xs text-[#1d1b19] focus:border-[#96432b] focus:ring-1 focus:ring-[#96432b] outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[#96432b] hover:bg-[#803722] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Perfil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
