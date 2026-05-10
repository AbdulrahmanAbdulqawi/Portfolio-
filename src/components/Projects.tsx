import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, projectCategories } from '../data/projects';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { ProjectCardIllustration } from './ProjectCardIllustration';
import { Reveal } from './Reveal';

const PREVIEW_COUNT = 3;
const MORE_COUNT = 6;

type ListSizeMode = 'few' | 'more' | 'all';

function visibleCount(mode: ListSizeMode, total: number): number {
  if (mode === 'all') return total;
  if (mode === 'more') return Math.min(MORE_COUNT, total);
  return Math.min(PREVIEW_COUNT, total);
}

export const Projects: React.FC = () => {
  const { lang } = useLang();
  const data = projects[lang];
  const tr = t(lang).projects;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [listMode, setListMode] = useState<ListSizeMode>('few');

  useEffect(() => {
    setListMode('few');
  }, [activeFilter, lang]);

  const filtered = useMemo(
    () => (activeFilter === 'all' ? data : data.filter((p) => p.category === activeFilter)),
    [data, activeFilter],
  );

  const total = filtered.length;
  const visibleProjects = useMemo(() => {
    const n = visibleCount(listMode, total);
    return filtered.slice(0, n);
  }, [filtered, listMode, total]);
  const showSizeControls = total > PREVIEW_COUNT;
  const showSixButton = total > MORE_COUNT;

  const catLabel = (cat: string) => {
    const map: Record<string, string> = {
      all: tr.all,
      web: tr.web,
      desktop: tr.desktop,
      fullstack: tr.fullstack,
    };
    return map[cat] || cat;
  };

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.projects}>
      <div className="space-y-8">
        <Reveal y={12}>
        <div className="flex flex-col gap-4">
          <div className="space-y-2 min-w-0">
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

          <div className="stitch-filter-shell w-fit max-w-full shrink-0">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`stitch-filter-btn ${activeFilter === cat ? 'stitch-filter-btn-active' : ''}`}
              >
                {catLabel(cat)}
              </button>
            ))}
          </div>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.title}
                layout
                className="stitch-project-card group"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="aspect-video relative overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, var(--stitch-surface-raised), color-mix(in srgb, var(--color-primary) 8%, var(--color-bg)))`,
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center px-8 py-6 text-[var(--color-primary)]">
                      <ProjectCardIllustration kind={project.illustration} className="w-full max-w-[min(100%,280px)] [&_svg]:h-auto [&_svg]:w-full" />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <h3 className="text-lg font-bold leading-snug" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
                      {project.title}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stitch-icon-link"
                          aria-label={tr.code}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stitch-icon-link"
                          aria-label={tr.liveDemo}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="stitch-tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {showSizeControls && (
          <div className="flex justify-center pt-2">
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
    </section>
  );
};
