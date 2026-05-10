import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { experiences } from '../data/experience';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

const ease = [0.22, 1, 0.36, 1] as const;

export const Experience: React.FC = () => {
  const { lang } = useLang();
  const data = experiences[lang];
  const tr = t(lang).experience;
  const reduce = useReducedMotion();

  const cardVariants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      };

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.experience}>
      <div className="space-y-10">
        <Reveal y={14}>
          <div>
            <h2 className="stitch-section-heading">
              <span className="stitch-section-heading-bar" aria-hidden />
              {tr.label}
            </h2>
            <p
              className="text-xl md:text-2xl font-bold mt-2"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
            >
              {tr.title}
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {data.map((exp, index) => (
            <motion.article
              key={index}
              className="stitch-exp-card stitch-card-lift"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={reduce ? { duration: 0 } : { delay: index * 0.06, duration: 0.45, ease }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex gap-4 min-w-0">
                  <div
                    className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center border overflow-hidden transition-transform duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--stitch-surface-raised)',
                      borderColor: 'color-mix(in srgb, var(--color-border) 40%, transparent)',
                    }}
                  >
                    {exp.logo ? (
                      <img src={exp.logo} alt="" className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>
                        {exp.company.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
                      {exp.title}
                    </h3>
                    <p className="text-sm md:text-base font-medium mt-0.5" style={{ color: 'var(--color-primary)' }}>
                      {exp.company}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs md:text-sm font-semibold px-3 py-1 rounded-full self-start shrink-0"
                  style={{
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'color-mix(in srgb, var(--color-surface-hover) 65%, transparent)',
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 transition-transform duration-200 hover:scale-110" style={{ color: 'var(--stitch-tertiary)' }} aria-hidden />
                    <span style={{ fontFamily: 'var(--font-sans)' }}>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
