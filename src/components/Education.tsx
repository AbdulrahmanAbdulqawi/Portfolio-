import React from 'react';
import { Award, BookOpen } from 'lucide-react';
import { educationEntries, certifications } from '../data/education';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { lang } = useLang();
  const eduData = educationEntries[lang];
  const certData = certifications[lang];
  const tr = t(lang).education;

  return (
    <section className="py-16 bg-[var(--color-surface)]" aria-label="Education">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{tr.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center mb-5 gap-2">
              <BookOpen className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <h3
                className="text-[0.6rem]"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
              >
                {tr.educationHeading}
              </h3>
            </div>
            <div className="space-y-4">
              {eduData.map((edu, index) => (
                <div key={index} className="card p-4">
                  <h4 className="text-[0.5rem] sm:text-[0.6rem]" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}>
                    {edu.school}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}>
                    {edu.degree}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {edu.location} | {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-5 gap-2">
              <Award className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <h3
                className="text-[0.6rem]"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
              >
                {tr.certificationsHeading}
              </h3>
            </div>
            <div className="card p-4">
              <ul className="space-y-2">
                {certData.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs sm:text-sm hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                  >
                    <span style={{ color: 'var(--color-neon)' }} className="shrink-0">+</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
