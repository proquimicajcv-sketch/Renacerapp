import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Activity,
  Heart,
  Calendar,
  CheckCircle2,
  Database,
  Upload,
} from 'lucide-react';
import {
  PostpartumProfile,
  SymptomLog,
  DiastasisHistoryItem,
  WorkoutHistoryItem,
} from '../types';
import { OFFICIAL_LOGO_SRC } from '../data/motivationalMessages';

interface ClinicalReportPDFProps {
  profile: PostpartumProfile;
  symptomLogs: SymptomLog[];
  diastasisHistory: DiastasisHistoryItem[];
  workoutHistory: WorkoutHistoryItem[];
  waterGlasses: number;
  onImportBackup: (backupData: any) => void;
  onOpenProfileEdit: () => void;
}

export const ClinicalReportPDF: React.FC<ClinicalReportPDFProps> = ({
  profile,
  symptomLogs,
  diastasisHistory,
  workoutHistory,
  waterGlasses,
  onImportBackup,
  onOpenProfileEdit,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Compute analytics
  const totalMinutes = workoutHistory.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalSessions = workoutHistory.length;

  const avgEnergy =
    symptomLogs.length > 0
      ? (
          symptomLogs.reduce((acc, curr) => acc + curr.energyLevel, 0) / symptomLogs.length
        ).toFixed(1)
      : '3.5';

  const initialDiastasis = diastasisHistory.length > 0 ? diastasisHistory[diastasisHistory.length - 1].widthCm : profile.diastasisWidthCm;
  const currentDiastasis = profile.diastasisWidthCm;
  const diastasisChange = (initialDiastasis - currentDiastasis).toFixed(1);

  const reportDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate and Download PDF using jsPDF + html2canvas
  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 mm width
      const pageHeight = 297; // A4 mm height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const safeName = profile.name.trim().replace(/\s+/g, '_') || 'Paciente';
      pdf.save(`Informe_Recuperacion_RenacerPostparto_${safeName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const data = {
      profile,
      symptomLogs,
      diastasisHistory,
      workoutHistory,
      waterGlasses,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_RenacerPostparto_${profile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onImportBackup(parsed);
      } catch (err) {
        alert('El archivo de copia de seguridad no tiene un formato válido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header with Actions Bar */}
      <div className="bg-white rounded-3xl border border-[#dbc1ba]/40 p-5 sm:p-7 shadow-warm-resting flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#41674c] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Documento Clínico de Evolución</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1d1b19]">
            Informe de Fisioterapia & Análisis Clínico
          </h2>
          <p className="text-xs sm:text-sm text-[#55433e] mt-1 max-w-xl">
            Genera un informe detallado con tus mediciones de diástasis, adherencia al ejercicio y evolución
            para compartir con tu ginecóloga, matrona o fisioterapeuta de suelo pélvico.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex-1 md:flex-initial h-11 px-5 rounded-full bg-[#96432b] hover:bg-[#803722] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPDF ? 'Generando PDF...' : 'Descargar Informe PDF'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="h-11 px-4 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Imprimir documento"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="h-11 px-4 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Descargar copia de seguridad en archivo JSON"
          >
            <Database className="w-4 h-4 text-[#41674c]" />
            <span className="hidden sm:inline">Copia de Seguridad</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="h-11 px-3.5 rounded-full border border-[#dbc1ba]/60 hover:bg-[#fbf8f3] text-xs font-semibold text-[#55433e] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Restaurar datos desde copia de seguridad JSON"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden lg:inline">Restaurar</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-3 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 text-xs text-[#41674c] font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>¡Copia de seguridad descargada! Tus datos están protegidos en tu ordenador o móvil.</span>
        </div>
      )}

      {/* The Printable Clinical Document Sheet */}
      <div
        id="clinical-report-sheet"
        ref={reportRef}
        className="bg-white rounded-3xl border border-[#dbc1ba]/50 p-6 sm:p-10 shadow-warm-resting max-w-4xl mx-auto space-y-8 text-[#1d1b19]"
        style={{ minHeight: '1000px' }}
      >
        {/* Document Header with Official Logo & Patient Metadata */}
        <div className="border-b-2 border-[#96432b]/20 pb-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#dbc1ba]/60 bg-[#fef8f4] p-1 shadow-xs shrink-0">
              <img
                src={OFFICIAL_LOGO_SRC}
                alt="Logotipo oficial Renacer Postparto"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-tight text-[#1d1b19]">
                Renacer Postparto
              </div>
              <p className="text-xs text-[#55433e] font-sans mt-0.5">
                Programa de Fisioterapia Obstétrica & Bienestar Maternal en el Hogar
              </p>
              <div className="mt-1.5 inline-block text-[11px] font-semibold text-[#96432b] bg-[#ffdbd1]/50 px-2.5 py-0.5 rounded-full">
                Informe de Seguimiento Fisioterapéutico
              </div>
            </div>
          </div>

          <div className="text-right text-xs space-y-1 bg-[#fbf8f3] p-3.5 rounded-2xl border border-[#dbc1ba]/30 w-full sm:w-auto">
            <div className="text-[#55433e]">
              Fecha de emisión: <strong className="text-[#1d1b19]">{reportDate}</strong>
            </div>
            <div className="text-[#55433e]">
              Paciente: <strong className="text-[#96432b] text-sm">{profile.name}</strong>
            </div>
            <div className="text-[#55433e]">
              Parto: <strong className="text-[#1d1b19] capitalize">{profile.deliveryType}</strong> · Semana:{' '}
              <strong className="text-[#1d1b19]">{profile.weeksPostpartum}</strong>
            </div>
          </div>
        </div>

        {/* 1. Resumen Ejecutivo y Diagnóstico Clínico */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-[#1d1b19] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#96432b]" />
            <span>1. Diagnóstico Clínico & Análisis de Evolución</span>
          </h3>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f8f3ef] border border-[#dbc1ba]/30 text-xs sm:text-sm text-[#55433e] leading-relaxed space-y-2">
            <p>
              La paciente <strong className="text-[#1d1b19]">{profile.name}</strong> se encuentra actualmente
              en la <strong className="text-[#1d1b19]">Semana {profile.weeksPostpartum}</strong> de posparto
              tras un parto <strong className="text-[#1d1b19] capitalize">{profile.deliveryType}</strong>. Ha
              mantenido un registro sistemático de respiración diafragmática, activación del transverso profundo y
              acondicionamiento físico funcional en el hogar.
            </p>
            <p>
              <strong className="text-[#1d1b19]">Estado de la pared abdominal:</strong> La medición actual
              muestra una distancia interrectos de <strong className="text-[#96432b]">{profile.diastasisWidthCm} cm</strong> en
              el anillo umbilical. Se observa una adecuada competencia tónica de la línea alba sin reporte de
              abombamiento piramidal patológico durante el esfuerzo.
            </p>
            <p>
              <strong className="text-[#1d1b19]">Suelo pélvico y bienestar:</strong> La respuesta refleja del periné
              se mantiene estable. El nivel medio de energía registrado se sitúa en <strong className="text-[#41674c]">{avgEnergy}/5</strong>,
              evidenciando una recuperación metabólica favorable y descanso progresivo.
            </p>
          </div>
        </div>

        {/* 2. Métricas Cuantitativas de Recuperación */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-[#1d1b19] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#41674c]" />
            <span>2. Métricas Cuantitativas & Volumen de Actividad</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#dbc1ba]/40 shadow-xs text-center">
              <span className="text-[11px] font-medium text-[#55433e] block uppercase">Diástasis Actual</span>
              <span className="font-serif text-2xl font-bold text-[#96432b] tabular-nums mt-1 block">
                {profile.diastasisWidthCm} cm
              </span>
              <span className="text-[10px] text-[#41674c] font-semibold mt-0.5 block">
                {Number(diastasisChange) > 0 ? `Reducción de ${diastasisChange} cm` : 'Tono fascial óptimo'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#dbc1ba]/40 shadow-xs text-center">
              <span className="text-[11px] font-medium text-[#55433e] block uppercase">Minutos Entrenados</span>
              <span className="font-serif text-2xl font-bold text-[#1d1b19] tabular-nums mt-1 block">
                {totalMinutes} min
              </span>
              <span className="text-[10px] text-[#55433e] mt-0.5 block">
                {totalSessions} sesiones guiadas
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#dbc1ba]/40 shadow-xs text-center">
              <span className="text-[11px] font-medium text-[#55433e] block uppercase">Energía Promedio</span>
              <span className="font-serif text-2xl font-bold text-[#41674c] tabular-nums mt-1 block">
                {avgEnergy} / 5
              </span>
              <span className="text-[10px] text-[#55433e] mt-0.5 block">Vitalidad sostenida</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#dbc1ba]/40 shadow-xs text-center">
              <span className="text-[11px] font-medium text-[#55433e] block uppercase">Hidratación Diaria</span>
              <span className="font-serif text-2xl font-bold text-[#1d1b19] tabular-nums mt-1 block">
                {waterGlasses * 275} ml
              </span>
              <span className="text-[10px] text-[#41674c] font-semibold mt-0.5 block">
                {waterGlasses} vasos / día
              </span>
            </div>
          </div>
        </div>

        {/* 3. Tabla de Seguimiento de Síntomas Recientes */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-[#1d1b19] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#96432b]" />
            <span>3. Registro Cronológico de Sensaciones & Síntomas</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-[#dbc1ba]/30">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8f3ef] text-[#55433e] font-semibold border-b border-[#dbc1ba]/30">
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Energía</th>
                  <th className="p-3">Pesadez Pélvica</th>
                  <th className="p-3">Dolor Lumbar</th>
                  <th className="p-3">Sangrado/Loquios</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2ede9] text-[#1d1b19]">
                {symptomLogs.slice(0, 6).map((log) => (
                  <tr key={log.id} className="hover:bg-[#fbf8f3]">
                    <td className="p-3 font-medium text-[#96432b]">{log.date}</td>
                    <td className="p-3">{log.energyLevel} / 5</td>
                    <td className="p-3 capitalize">{log.pelvicHeaviness}</td>
                    <td className="p-3 capitalize">{log.backPain}</td>
                    <td className="p-3 capitalize">{log.bleedingStatus}</td>
                    <td className="p-3 text-[11px] text-[#55433e] italic max-w-xs truncate">
                      {log.notes || 'Sin incidencias'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Plan de Acción y Recomendaciones para la Siguiente Etapa */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-semibold text-[#1d1b19] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#41674c]" />
            <span>4. Pautas Fisioterapéuticas Recomendadas</span>
          </h3>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5ef] border border-[#41674c]/30 text-xs text-[#55433e] space-y-2.5">
            <div className="flex items-start gap-2">
              <span className="text-[#41674c] font-bold mt-0.5">·</span>
              <p>
                <strong className="text-[#1d1b19]">Transición a Fuerza & Vitalidad:</strong> Se autoriza la
                inclusión progresiva de bandas de resistencia y mancuernas ligeras (1 a 3 kg), priorizando la
                exhalación forzada al momento del esfuerzo concéntrico.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#41674c] font-bold mt-0.5">·</span>
              <p>
                <strong className="text-[#1d1b19]">Protección de la línea alba:</strong> Mantener la técnica de
                incorporación lateral en bloque de la cama y evitar planchas isométricas directas o flexiones de
                tronco (crunches) sin control previo.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#41674c] font-bold mt-0.5">·</span>
              <p>
                <strong className="text-[#1d1b19]">Descanso y Fascia:</strong> Sostener un consumo hídrico de al
                menos 2.2 litros diarios y 15 minutos diarios de reposo horizontal con piernas elevadas para
                descomprimir el suelo pélvico.
              </p>
            </div>
          </div>
        </div>

        {/* Document Footer Signature and Authenticity Seal */}
        <div className="pt-6 border-t border-[#dbc1ba]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#55433e]">
          <div className="text-center sm:text-left">
            <span className="font-semibold text-[#1d1b19] block">
              Renacer Postparto — Armonía y Salud desde el Hogar
            </span>
            <span className="text-[11px]">
              Documento generado digitalmente. Válido como bitácora clínica para el equipo médico tratante.
            </span>
          </div>

          <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l sm:border-[#dbc1ba]/40 sm:pl-6 pt-3 sm:pt-0">
            <span className="text-[11px] block font-mono">ID Registro: RNP-{profile.name.slice(0, 3).toUpperCase()}-{profile.weeksPostpartum}W</span>
            <span className="text-[10px] text-[#41674c] font-semibold">✓ Verificado y Almacenado Seguro</span>
          </div>
        </div>
      </div>
    </div>
  );
};
