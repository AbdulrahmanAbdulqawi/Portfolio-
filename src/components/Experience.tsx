import { useState } from 'react';
import { experiences, recommendation } from '../data/experience';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export function Experience() {
  const { lang } = useLang();
  const tr = t(lang).experience;
  const rows = experiences[lang];
  const rec = recommendation[lang];
  const [quoteOpen, setQuoteOpen] = useState(false);

  const quoteText = quoteOpen ? rec.full : rec.short;
  const quoted = lang === 'ar' ? `«${quoteText}»` : `"${quoteText}"`;

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent)]">02</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{tr.meta}</span>
      </div>

      {rows.map((row, i) => (
        <div
          key={row.title}
          className="flex flex-wrap items-start gap-4 py-7 lg:gap-8"
          style={{
            borderTop: `1px solid ${i === 0 ? 'var(--ink)' : 'var(--rule)'}`,
            borderBottom: i === rows.length - 1 ? '1px solid var(--ink)' : undefined,
          }}
        >
          <span className="basis-[150px] font-mono text-[13px] text-[var(--ink-3)]">{row.period}</span>
          <div className="min-w-0 flex-1 basis-[360px]">
            <h3 className="m-0 text-[22px] font-bold">{row.title}</h3>
            <p className="mt-[10px] max-w-[600px] font-serif text-lg leading-[1.6] text-[var(--ink-2)]">
              {row.paragraph}
            </p>
            {row.chips && (
              <div className="mt-[14px] flex flex-wrap gap-2">
                {row.chips.map((chip) => (
                  <span
                    key={chip}
                    className="whitespace-nowrap border border-[var(--rule)] px-[9px] py-1 font-mono text-[11px] tracking-[0.08em] text-[var(--ink-3)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-1 basis-[180px] flex-col items-end gap-[10px]">
            <span className="text-base font-semibold text-[var(--accent)]">{row.company}</span>
            {row.logo && (
              <img
                src={row.logo}
                alt={row.company}
                className="h-5 w-auto max-w-[118px] shrink-0 object-contain opacity-80 [filter:var(--logo-filter)]"
              />
            )}
          </div>
        </div>
      ))}

      <blockquote className="mt-11 border border-[var(--rule)] bg-[var(--panel)] px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <p className="m-0 max-w-[900px] font-serif text-[clamp(19px,2.4vw,26px)] leading-[1.5] text-[var(--ink)]">
          {quoted}
        </p>
        <button
          type="button"
          onClick={() => setQuoteOpen((prev) => !prev)}
          className="mt-[18px] border-b border-[var(--accent)] bg-transparent p-0 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          {quoteOpen ? tr.showLess : tr.showFull}
        </button>
        <footer className="mt-5 flex flex-wrap items-baseline gap-[14px]">
          <span className="text-[15px] font-bold">{rec.author}</span>
          <span className="font-mono text-xs text-[var(--ink-3)]">{rec.meta}</span>
        </footer>
      </blockquote>
    </section>
  );
}
