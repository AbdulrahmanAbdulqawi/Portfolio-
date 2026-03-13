import React from 'react';
import { Code, Database, Server, Globe } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

const iconMap: Record<string, React.ElementType> = { Code, Database, Server, Globe };

const levelPercent: Record<string, number> = {
  Expert: 95,
  Solid: 70,
  Familiar: 45,
};

const levelColor: Record<string, string> = {
  Expert: 'var(--color-primary)',
  Solid: 'var(--color-neon)',
  Familiar: 'var(--color-cyan)',
};

export const Skills: React.FC = () => {
  const { lang } = useLang();
  const data = skillCategories[lang];
  const tr = t(lang).skills;

  const levelLabel = (level: string) => {
    if (level === 'Expert') return tr.expert;
    if (level === 'Solid') return tr.solid;
    return tr.familiar;
  };

  return (
    <section className="py-16 bg-[var(--color-surface)]" aria-label={t(lang).aria.skills}>
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{tr.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {data.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <div key={index} className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  {Icon && <Icon className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />}
                  <h3
                    className="text-[0.5rem] sm:text-[0.65rem]"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                  >
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1 gap-2">
                        <span
                          className="text-xs sm:text-sm"
                          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="text-[0.45rem]"
                          style={{ color: levelColor[skill.level], fontFamily: 'var(--font-pixel)' }}
                        >
                          {levelLabel(skill.level)}
                        </span>
                      </div>
                      <div className="xp-bar-bg">
                        <div
                          className="xp-bar-fill"
                          style={{
                            width: `${levelPercent[skill.level]}%`,
                            backgroundColor: levelColor[skill.level],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
