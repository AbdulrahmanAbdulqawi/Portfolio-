import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { stackGroups } from '../data/stack';

export function Stack() {
  const { lang } = useLang();
  const tr = t(lang).stack;
  const groups = stackGroups[lang];

  const levelLabel = { Daily: tr.daily, Solid: tr.solid, Familiar: tr.familiar } as const;

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-3">
        <span className="font-mono text-[13px] text-[var(--accent)]">03</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{tr.meta}</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] border-t border-[var(--ink)]">
        {groups.map((group, i) => (
          <div
            key={group.title}
            className="py-7"
            style={{
              borderInlineEnd: i % 2 === 0 ? '1px solid var(--rule)' : undefined,
              borderBottom: i < 2 ? '1px solid var(--rule)' : undefined,
              paddingInlineStart: i % 2 === 0 ? 0 : 'clamp(10px,2.5vw,32px)',
              paddingInlineEnd: i % 2 === 0 ? 'clamp(10px,2.5vw,32px)' : 0,
            }}
          >
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
