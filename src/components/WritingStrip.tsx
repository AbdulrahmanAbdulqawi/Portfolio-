import React from 'react';
import { PenLine } from 'lucide-react';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const WritingStrip: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).portfolio;

  const links = site.writingLinks ?? [];
  if (links.length === 0) return null;

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={tr.writingHeading}>
      <Reveal y={10}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <PenLine className="w-6 h-6 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden />
            <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {tr.writingHeading}
            </h2>
          </div>
          <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
            {links.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border no-underline transition-colors hover:opacity-95"
                  style={{
                    color: 'var(--color-text)',
                    borderColor: 'color-mix(in srgb, var(--color-border) 45%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--color-surface-hover) 40%, transparent)',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};
