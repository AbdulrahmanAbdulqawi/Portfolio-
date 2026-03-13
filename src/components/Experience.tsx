import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { experiences } from '../data/experience';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { lang } = useLang();
  const data = experiences[lang];
  const tr = t(lang).experience;

  return (
    <section className="py-16 bg-[var(--color-bg)]" aria-label={t(lang).aria.experience}>
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{tr.title}</p>
        </div>

        <div className="space-y-5 max-w-4xl mx-auto">
          {data.map((exp, index) => (
            <div key={index} className="card p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3
                    className="text-[0.55rem] sm:text-[0.7rem]"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                  >
                    {exp.title}
                  </h3>
                  {!exp.logo && (
                    <p className="text-[0.5rem] sm:text-[0.6rem] mt-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pixel)' }}>
                      {exp.company}
                    </p>
                  )}
                </div>
                <div className="mt-2 md:mt-0 md:text-right space-y-1">
                  <div className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span className="text-[0.5rem]" style={{ fontFamily: 'var(--font-pixel)' }}>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="text-[0.5rem]" style={{ fontFamily: 'var(--font-pixel)' }}>{exp.location}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                    <span style={{ color: 'var(--color-neon)' }} className="shrink-0">-</span>
                    {resp}
                  </li>
                ))}
              </ul>
              {exp.logo && (
                <div className={`flex mt-4 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <img src={exp.logo} alt={exp.company} className="h-8 object-contain" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
