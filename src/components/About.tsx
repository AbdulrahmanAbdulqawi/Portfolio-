import { aboutContent } from '../data/about';
import { educationEntries, certifications } from '../data/education';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export function About() {
  const { lang } = useLang();
  const about = aboutContent[lang];
  const tr = t(lang).about;
  const entries = educationEntries[lang];
  const certs = certifications[lang];

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent)]">04</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
      </div>

      <div className="flex flex-wrap gap-8 border-t border-[var(--ink)] pt-9 lg:gap-14">
        <div className="min-w-0 flex-1 basis-[420px]">
          <h3 className="m-0 mb-6 max-w-[620px] text-[clamp(24px,3vw,32px)] font-bold leading-[1.15] tracking-[-0.028em]">
            {about.headline}
          </h3>
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="m-0 max-w-[620px] font-serif text-xl leading-[1.65] text-[var(--ink-2)] mb-5 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="min-w-0 flex-1 basis-[320px] max-w-[420px]">
          <p className="m-0 mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            {tr.educationLabel}
          </p>
          {entries.map((entry, i) => (
            <div
              key={entry.school}
              className="py-[14px]"
              style={{
                borderTop: `1px solid ${i === 0 ? 'var(--rule)' : 'var(--rule-soft)'}`,
                borderBottom: i === entries.length - 1 ? '1px solid var(--rule)' : undefined,
              }}
            >
              <div className="flex justify-between gap-3">
                <span className="text-base font-semibold">{entry.degree}</span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--ink-3)]">{entry.period}</span>
              </div>
              <p className="m-0 mt-1 font-serif text-base text-[var(--ink-2)]">
                {entry.school} · {entry.location}
              </p>
            </div>
          ))}

          <details className="group mt-7">
            <summary className="flex items-center justify-between gap-3 pb-[14px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                {tr.certificatesLabel}
              </span>
              <span className="font-mono text-[15px] text-[var(--accent)] transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t border-[var(--rule)] font-mono text-[12.5px] leading-[1.6] text-[var(--ink-2)]">
              {certs.map((cert, i) => (
                <div
                  key={i}
                  className="py-[9px]"
                  style={{ borderBottom: i < certs.length - 1 ? '1px solid var(--rule-soft)' : undefined }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
