import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { t } from '../data/translations';
import type { WorkCase } from '../types';

/** First stat off a case's panel, used as the right-hand column. Cases with an image or
 * terminal panel have no number to show, so the column stays empty for them. */
function leadStat(work: WorkCase): { value: string; label: string } | null {
  return work.panel.kind === 'stats' ? work.panel.stats[0] ?? null : null;
}

/**
 * Three headline cases, on the home page. The site used to keep every case behind /work,
 * which meant nothing on the landing page proved the claim the hero makes.
 */
export function SelectedWork() {
  const { lang } = useLang();
  const { content } = useContent();
  const tr = t(lang).selectedWork;
  const cases = content.workCases[lang].slice(0, 3);

  if (cases.length === 0) return null;

  return (
    <section className="border border-t-0 border-[var(--rule)] px-5 pb-1 pt-6 sm:px-8 lg:px-12">
      <div className="flex items-baseline justify-between gap-4 border-b border-[var(--ink)] pb-[9px]">
        <h2 className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-3)]">
          {tr.title}
        </h2>
        <Link
          to="/work"
          className="font-mono text-[11px] tracking-[0.1em] text-[var(--accent-text)] transition-opacity hover:opacity-70"
        >
          {tr.all}
        </Link>
      </div>

      {cases.map((work) => {
        const stat = leadStat(work);

        return (
          <Link
            key={work.number}
            to="/work"
            className="group flex flex-wrap items-start gap-x-5 gap-y-2 border-b border-[var(--rule)] py-[17px] sm:flex-nowrap"
          >
            <span className="w-6 shrink-0 pt-[5px] font-mono text-xs text-[var(--accent-text)]">
              {work.number}
            </span>

            <span className="w-full shrink-0 sm:w-[150px]">
              <span className="block text-[19px] font-bold tracking-[-0.02em] text-[var(--ink)] transition-colors group-hover:text-[var(--accent-text)]">
                {work.name}
              </span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-serif text-[18px] leading-[1.4] text-[var(--ink)]">
                {work.headline}
              </span>
              <span className="mt-[5px] block break-words font-mono text-[10px] tracking-[0.06em] text-[var(--ink-3)]">
                {work.stackLine}
              </span>
            </span>

            {stat && (
              <span className="w-full shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-3)] sm:w-[92px] sm:pt-1 sm:text-end">
                {stat.value} {stat.label}
              </span>
            )}
          </Link>
        );
      })}
    </section>
  );
}
