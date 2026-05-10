import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import { educationEntries, certifications } from '../data/education';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

const PREVIEW_COUNT = 3;
const MORE_COUNT = 6;

type ListSizeMode = 'few' | 'more' | 'all';

function visibleCount(mode: ListSizeMode, total: number): number {
  if (mode === 'all') return total;
  if (mode === 'more') return Math.min(MORE_COUNT, total);
  return Math.min(PREVIEW_COUNT, total);
}

const ease = [0.22, 1, 0.36, 1] as const;

export const Education: React.FC = () => {
  const { lang } = useLang();
  const eduData = educationEntries[lang];
  const certData = certifications[lang];
  const tr = t(lang).education;
  const [listMode, setListMode] = useState<ListSizeMode>('few');
  const reduce = useReducedMotion();

  useEffect(() => {
    setListMode('few');
  }, [lang]);

  const totalCerts = certData.length;
  const visibleCerts = useMemo(() => {
    const n = visibleCount(listMode, totalCerts);
    return certData.slice(0, n);
  }, [certData, listMode, totalCerts]);
  const showSizeControls = totalCerts > PREVIEW_COUNT;
  const showSixButton = totalCerts > MORE_COUNT;

  const eduCardVariants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
      };

  const certRowVariants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
      };

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.education}>
      <div className="space-y-10">
        <Reveal y={12}>
          <div className="flex items-center gap-4">
            <GraduationCap className="w-9 h-9 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
              {tr.label}
            </h2>
          </div>
        </Reveal>

        <div className="space-y-6">
          {eduData.map((edu, index) => (
            <motion.article
              key={index}
              className="stitch-edu-card group stitch-card-lift"
              variants={eduCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={reduce ? { duration: 0 } : { delay: index * 0.07, duration: 0.42, ease }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                <div>
                  <h3
                    className="text-lg md:text-xl font-bold transition-colors group-hover:text-[var(--color-primary)]"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-sm md:text-base font-medium mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {edu.school}
                  </p>
                </div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold self-start shrink-0"
                  style={{
                    backgroundColor: 'var(--stitch-surface-raised)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {edu.period}
                </span>
              </div>
              <div
                className="mt-4 text-sm leading-relaxed border-s-2 ps-4 py-1"
                style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}
              >
                {edu.location}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="pt-4">
          <Reveal y={10}>
            <div className="mb-6">
              <h3
                className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
              >
                <Award className="w-4 h-4" style={{ color: 'var(--stitch-tertiary)' }} aria-hidden />
                {tr.certificationsHeading}
              </h3>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={`${listMode}-${index}-${cert.slice(0, 40)}`}
                className="stitch-cert-row"
                variants={certRowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={reduce ? { duration: 0 } : { delay: index * 0.05, duration: 0.35, ease }}
                whileHover={reduce ? undefined : { scale: 1.01 }}
              >
                <Award className="w-5 h-5 shrink-0" style={{ color: 'var(--stitch-tertiary)' }} aria-hidden />
                <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
                  {cert}
                </p>
              </motion.div>
            ))}
          </div>

          {showSizeControls && (
            <div className="flex justify-center pt-4">
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              {tr.listSizeLabel ? (
                <span className="text-xs font-bold uppercase tracking-wider shrink-0 text-center" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
                  {tr.listSizeLabel}
                </span>
              ) : null}
              <div className="stitch-filter-shell min-w-0 w-fit max-w-full">
                <button
                  type="button"
                  onClick={() => setListMode('few')}
                  className={`stitch-filter-btn ${listMode === 'few' ? 'stitch-filter-btn-active' : ''}`}
                >
                  {tr.listThree}
                </button>
                {showSixButton && (
                  <button
                    type="button"
                    onClick={() => setListMode('more')}
                    className={`stitch-filter-btn ${listMode === 'more' ? 'stitch-filter-btn-active' : ''}`}
                  >
                    {tr.listSix}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setListMode('all')}
                  className={`stitch-filter-btn ${listMode === 'all' ? 'stitch-filter-btn-active' : ''}`}
                >
                  {tr.listAll}
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
