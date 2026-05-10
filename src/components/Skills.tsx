import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code, Database, Server, Globe } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { SkillLevelBar } from './SkillLevelBar';

const iconMap: Record<string, React.ElementType> = { Code, Database, Server, Globe };

const levelPercent: Record<string, number> = {
  Expert: 95,
  Solid: 70,
  Familiar: 45,
};

const levelColor: Record<string, string> = {
  Expert: 'var(--color-primary)',
  Solid: 'var(--color-cyan)',
  Familiar: 'var(--stitch-tertiary)',
};

const ease = [0.22, 1, 0.36, 1] as const;

export const Skills: React.FC = () => {
  const { lang } = useLang();
  const data = skillCategories[lang];
  const tr = t(lang).skills;
  const reduce = useReducedMotion();

  const levelLabel = (level: string) => {
    if (level === 'Expert') return tr.expert;
    if (level === 'Solid') return tr.solid;
    return tr.familiar;
  };

  const allSkillNames = data.flatMap((c) => c.skills.map((s) => s.name));

  const bentoVariants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      };

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.skills}>
      <div className="space-y-8">
        <Reveal y={12}>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="stitch-section-heading-bar" aria-hidden />
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}>
                {tr.label}
              </h2>
            </div>
            <p className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {tr.title}
            </p>
            <div className="stitch-skill-rule" aria-hidden />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div
                key={index}
                className="group stitch-bento-card space-y-4 stitch-card-lift"
                variants={bentoVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={reduce ? undefined : { delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--stitch-tertiary)' }} />}
                  <h3 className="font-bold text-sm md:text-base" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center gap-2 text-xs font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span style={{ color: 'var(--color-text)' }}>{skill.name}</span>
                        <span style={{ color: levelColor[skill.level] }}>{levelLabel(skill.level)}</span>
                      </div>
                      <SkillLevelBar percent={levelPercent[skill.level]} backgroundColor={levelColor[skill.level]} />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <Reveal y={10} delay={0.1}>
          <div className="flex flex-wrap gap-2 pt-2">
            {allSkillNames.slice(0, 12).map((name) => (
              <motion.span
                key={name}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border cursor-default"
                style={{
                  color: 'var(--color-text-secondary)',
                  borderColor: 'color-mix(in srgb, var(--color-border) 35%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--color-surface-hover) 35%, transparent)',
                }}
                whileHover={reduce ? undefined : { y: -2, borderColor: 'var(--color-primary)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
