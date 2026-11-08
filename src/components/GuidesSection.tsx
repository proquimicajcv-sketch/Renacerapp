import React, { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { GuideArticle } from '../types';

interface GuidesSectionProps {
  articles: GuideArticle[];
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#96432b] hover:text-[#803722] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las guías clínicas</span>
        </button>

        <article className="bg-white rounded-3xl border border-[#dbc1ba]/40 overflow-hidden shadow-warm-resting">
          <div className="relative aspect-21/9 overflow-hidden bg-[#f2ede9]">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                {selectedArticle.category.toUpperCase()} · {selectedArticle.readTime}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold mt-1">
                {selectedArticle.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-base text-[#1d1b19] font-medium leading-relaxed italic border-l-2 border-[#96432b] pl-4">
              {selectedArticle.summary}
            </p>

            <div className="space-y-6">
              {selectedArticle.content.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="font-serif text-xl font-medium text-[#1d1b19] pt-2 border-t border-[#f2ede9]">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[14px] text-[#55433e] leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.tips && sec.tips.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#f8f3ef] border border-[#dbc1ba]/30 space-y-2 mt-3">
                      <span className="text-xs font-bold text-[#41674c] uppercase tracking-wider block">
                        Recomendaciones Prácticas:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#55433e]">
                        {sec.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-[#41674c] font-bold">·</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#f2ede9] flex justify-between items-center text-xs text-[#55433e]">
              <span>Revisado por Fisioterapia Obstétrica & Matronería</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-full bg-[#f2ede9] hover:bg-[#ece7e3] text-[#1d1b19] font-semibold transition-colors cursor-pointer"
              >
                Cerrar guía
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#f8f3ef] to-[#fef8f4] -mx-4 sm:-mx-6 px-4 sm:px-6 pt-6 pb-4 border-b border-[#dbc1ba]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#41674c] uppercase tracking-wider mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Conocimiento & Cuidados del Cuarto Trimestre</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1d1b19] font-medium tracking-tight">
            Guías Clínicas de Fisioterapia y Bienestar
          </h1>
          <p className="text-[15px] text-[#55433e] mt-1 font-sans max-w-2xl">
            Información rigurosa y empática sobre cicatrización fascial, lactancia ergonómica,
            alimentación reparadora y señales médicas de alarma.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-2xl border border-[#dbc1ba]/30 overflow-hidden shadow-warm-resting hover:shadow-warm-floating transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-16/9 overflow-hidden bg-[#f2ede9]">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-[#96432b] backdrop-blur-sm uppercase">
                    {art.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-xl font-medium text-[#1d1b19] group-hover:text-[#96432b] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#96432b] font-medium mt-1">
                  {art.subtitle}
                </p>
                <p className="text-[13px] text-[#55433e] mt-2 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <span className="text-xs font-semibold text-[#41674c] group-hover:text-[#96432b] flex items-center gap-1 transition-colors">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
