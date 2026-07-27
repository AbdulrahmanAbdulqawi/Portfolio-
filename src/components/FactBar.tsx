import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

export function FactBar() {
  const { lang } = useLang();
  const { content } = useContent();
  const { factBar } = content.site[lang];

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] border border-t-0 border-[var(--rule)]">
      {factBar.map((entry, i) => (
        <div
          key={entry.label}
          className="px-4 py-[22px] sm:px-6"
          style={{ borderInlineEnd: i < factBar.length - 1 ? '1px solid var(--rule)' : undefined }}
        >
          <p className="m-0 mb-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            {entry.label}
          </p>
          <p className="m-0 text-base font-semibold text-[var(--ink)]">{entry.value}</p>
        </div>
      ))}
    </section>
  );
}
