import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { t } from '../data/translations';

export function Stack() {
  const { lang } = useLang();
  const { content } = useContent();
  const tr = t(lang).stack;
  const groups = content.stackGroups[lang];

  const levelLabel = { Daily: tr.daily, Solid: tr.solid, Familiar: tr.familiar } as const;

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-3">
        <span className="font-mono text-[13px] text-[var(--accent)]">03</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{tr.meta}</span>
      </div>
      <div className="ldg-stack-grid">
        {groups.map((group) => (
          <div key={group.title} className="py-7">
            <p className="m-0 mb-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">
              {group.title}
            </p>
            {group.skills.map((skill, si) => (
              <div
                key={skill.name}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 py-[9px]"
                style={{ borderBottom: si < group.skills.length - 1 ? '1px solid var(--rule-soft)' : undefined }}
              >
                <span className="text-base">{skill.name}</span>
                <span
                  className="font-mono text-[11px] tracking-[0.1em]"
                  style={{ color: skill.level === 'Daily' ? 'var(--accent)' : 'var(--ink-3)' }}
                >
                  {levelLabel[skill.level]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
