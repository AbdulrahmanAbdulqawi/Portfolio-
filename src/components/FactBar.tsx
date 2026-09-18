import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

/**
 * Proof rail. Sits directly under the hero on the inverted ground — the one block on the page
 * that flips to the opposite surface, so the facts read as a stamped record rather than another
 * panel. Content is the same authored factBar; only the placement and surface changed.
 */
export function FactBar() {
  const { lang } = useLang();
  const { content } = useContent();
  const { factBar } = content.site[lang];

  return (
    <section
      className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] border border-t-0 border-[var(--rule)]"
      style={{ background: 'var(--invert-bg)' }}
    >
      {factBar.map((entry, i) => (
        <div
          key={entry.label}
          className="px-4 py-[18px] sm:px-6"
          style={{ borderInlineEnd: i < factBar.length - 1 ? '1px solid var(--invert-rule)' : undefined }}
        >
          <p
            className="m-0 text-[20px] font-bold leading-[1.15] tracking-[-0.025em]"
            style={{ color: 'var(--invert-ink)' }}
          >
            {entry.value}
          </p>
          <p
            className="m-0 mt-[5px] font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--invert-ink-3)' }}
          >
            {entry.label}
          </p>
        </div>
      ))}
    </section>
  );
}
