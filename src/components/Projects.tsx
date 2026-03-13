import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, projectCategories } from '../data/projects';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { lang } = useLang();
  const data = projects[lang];
  const tr = t(lang).projects;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? data
    : data.filter((p) => p.category === activeFilter);

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
    <section className="py-16 bg-[var(--color-bg)]" aria-label={t(lang).aria.projects}>
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{tr.title}</p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-2 py-1 sm:px-3 sm:py-1.5 text-[0.4rem] sm:text-[0.5rem] transition-all duration-100"
              style={{
                fontFamily: 'var(--font-pixel)',
                color: activeFilter === cat ? '#000' : 'var(--color-text-muted)',
                backgroundColor: activeFilter === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                border: `2px solid ${activeFilter === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                className="card overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-5">
                  <h3
                    className="text-[0.5rem] sm:text-[0.65rem] mb-2"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mb-4 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="pixel-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[0.5rem] hover:text-[var(--color-neon)] transition-colors"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-pixel)' }}
                      >
                        <Github className="h-3.5 w-3.5" />
                        {tr.code}
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[0.5rem] hover:text-[var(--color-cyan)] transition-colors"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-pixel)' }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {tr.liveDemo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
