import React, { useMemo, useState } from 'react';
import { Quote } from 'lucide-react';
import type { Testimonial } from '../types';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

const MAX_QUOTES = 2;
/** Rough character budget before “Read more”; breaks at last space for cleaner preview. */
const QUOTE_PREVIEW_MAX = 280;

function quotePreview(full: string): { preview: string; needsToggle: boolean } {
  const trimmed = full.trim();
  if (trimmed.length <= QUOTE_PREVIEW_MAX) {
    return { preview: trimmed, needsToggle: false };
  }
  let cut = trimmed.slice(0, QUOTE_PREVIEW_MAX);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > QUOTE_PREVIEW_MAX * 0.45) {
    cut = cut.slice(0, lastSpace);
  }
  return { preview: `${cut}…`, needsToggle: true };
}

function TestimonialCard({
  item,
  readMoreLabel,
  showLessLabel,
}: {
  item: Testimonial;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const { preview, needsToggle } = useMemo(() => quotePreview(item.quote), [item.quote]);

  const displayText = expanded || !needsToggle ? item.quote : preview;

  return (
    <blockquote
      className="rounded-xl border p-5 md:p-6 space-y-3"
      style={{
        borderColor: 'color-mix(in srgb, var(--color-border) 40%, transparent)',
        backgroundColor: 'color-mix(in srgb, var(--stitch-surface-raised, var(--color-surface-hover)) 55%, transparent)',
      }}
    >
      <div className="space-y-2">
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
          “{displayText}”
        </p>
        {needsToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm font-semibold underline underline-offset-2 hover:opacity-90 transition-opacity p-0 border-0 bg-transparent cursor-pointer"
            style={{ color: 'var(--color-primary)' }}
            aria-expanded={expanded}
          >
            {expanded ? showLessLabel : readMoreLabel}
          </button>
        ) : null}
      </div>
      <footer>
        <p className="text-sm font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
          {item.author}
        </p>
        {item.role ? (
          <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {item.role}
          </p>
        ) : null}
      </footer>
    </blockquote>
  );
}

export const Testimonials: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).portfolio;

  const items = (site.testimonials ?? []).slice(0, MAX_QUOTES);
  if (items.length === 0) return null;

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={tr.recommendationsHeading}>
      <Reveal y={12}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Quote className="w-6 h-6 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden />
            <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {tr.recommendationsHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <TestimonialCard
                key={`${item.author}-${index}`}
                item={item}
                readMoreLabel={tr.testimonialReadMore}
                showLessLabel={tr.testimonialShowLess}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
