import React from 'react';
import { aboutContent } from '../data/about';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { lang } = useLang();
  const content = aboutContent[lang];
  const tr = t(lang).about;

  return (
    <section className="py-16 bg-[var(--color-surface)]" aria-label="About">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{content.headline}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-5">
          {content.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              <span style={{ color: 'var(--color-neon)' }}>{'> '}</span>
              {paragraph.text}
              {paragraph.link && (
                <>
                  {' '}
                  <a
                    href={paragraph.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-cyan)' }}
                  >
                    [{paragraph.link.text}]
                  </a>
                </>
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
