import React from 'react';
import { aboutContent } from '../data/about';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

function renderHeadlineWithAmp(text: string): React.ReactNode {
  if (!text.includes('&')) {
    return text;
  }
  return text.split('&').map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <span className="text-[var(--color-primary)]">&</span>}
      {part}
    </React.Fragment>
  ));
}

export const About: React.FC = () => {
  const { lang } = useLang();
  const content = aboutContent[lang];
  const tr = t(lang).about;
  const lead = content.paragraphs[0];
  const bodyParagraphs = content.paragraphs.slice(1);

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.about}>
      <div className="space-y-8">
        <Reveal y={14}>
          <div className="space-y-4">
            <h2 className="stitch-section-heading">
              <span className="stitch-section-heading-bar" aria-hidden />
              {tr.label}
            </h2>
            {lead && (
              <h3 className="stitch-h1" style={{ color: 'var(--color-text)' }}>
                {renderHeadlineWithAmp(lead.text)}
              </h3>
            )}
          </div>
        </Reveal>

        <div className="w-full max-w-full space-y-6">
          {bodyParagraphs.map((paragraph, i) => (
            <Reveal key={i} y={12} delay={i * 0.06}>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                {paragraph.text}
                {paragraph.link && (
                  <>
                    {' '}
                    <a
                      href={paragraph.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline underline-offset-2 hover:opacity-90 transition-opacity"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {paragraph.link.text}
                    </a>
                  </>
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
