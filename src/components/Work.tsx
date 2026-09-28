import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { t } from '../data/translations';
import { localizeDigits } from '../lib/numerals';
import type { Project, WorkCase } from '../types';

function WorkPanel({ panel }: { panel: WorkCase['panel'] }) {
  if (panel.kind === 'stats') {
    return (
      <div className="flex min-w-0 flex-1 basis-[300px] flex-col border border-[var(--rule)] bg-[var(--panel)] max-w-[360px]">
        <div className="border-b border-[var(--rule)] px-4 py-[14px] font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
          Scale
        </div>
        <div className="grid flex-1 grid-cols-2">
          {panel.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-4 py-5"
              style={{
                borderInlineEnd: i % 2 === 0 ? '1px solid var(--rule)' : undefined,
                borderBottom: i < 2 ? '1px solid var(--rule)' : undefined,
              }}
            >
              <p className="m-0 text-[30px] font-bold text-[var(--ink)]">{stat.value}</p>
              <p className="m-0 mt-[3px] font-mono text-[11px] text-[var(--ink-3)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (panel.kind === 'image') {
    return (
      <div className="flex min-w-0 flex-1 basis-[300px] items-center justify-center border border-[var(--rule)] bg-[var(--panel)] p-7 max-w-[360px]">
        <img src={panel.src} alt={panel.alt} className="h-auto max-w-full" />
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="min-w-0 flex-1 basis-[300px] overflow-x-auto border border-[var(--rule)] bg-[var(--panel)] p-[22px] text-left font-mono text-xs leading-[2.1] text-[var(--ink-2)] max-w-[360px]"
    >
      {panel.lines.map((line, i) => (
        <div key={i} style={{ color: line.accent ? 'var(--accent)' : undefined }}>
          {line.text}
        </div>
      ))}
    </div>
  );
}

/** One entry in the index. A card links out when there is somewhere to go, and otherwise says
 * why there isn't, so an unlinked project still reads as deliberate rather than broken. */
function ProjectCard({ project, lang }: { project: Project; lang: 'en' | 'ar' }) {
  const tr = t(lang).work;
  const isGithub = project.url.includes('github.com');
  const statusLabel =
    project.status === 'private' ? tr.privateRepo : project.status === 'archived' ? tr.archived : null;

  return (
    <article className="flex flex-col gap-[10px] border border-[var(--rule)] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          {project.name}
        </h3>
        {project.year && (
          <span className="shrink-0 font-mono text-[11px] text-[var(--ink-3)]">
            {localizeDigits(project.year, lang)}
          </span>
        )}
      </div>

      {project.stackLine && (
        <p dir="ltr" className="m-0 text-start font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
          {project.stackLine}
        </p>
      )}

      {project.description && (
        <p className="m-0 font-serif text-[15px] leading-[1.55] text-[var(--ink-2)]">{project.description}</p>
      )}

      <div className="mt-auto pt-1">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b border-[var(--accent)] font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--accent-text)]"
          >
            {lang === 'ar'
              ? `← ${isGithub ? tr.repository : tr.visitSite}`
              : `${isGithub ? tr.repository : tr.visitSite} →`}
          </a>
        ) : (
          statusLabel && (
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-3)]">
              {statusLabel}
            </span>
          )
        )}
      </div>
    </article>
  );
}

export function Work() {
  const { lang } = useLang();
  const { content } = useContent();
  const tr = t(lang).work;
  const cases = content.workCases[lang];
  const projects = content.projects[lang];
  const [expanded, setExpanded] = useState(false);

  const featured = projects.filter((p) => p.featured);
  // Nothing marked featured would otherwise render an empty index behind a "show all" button.
  const collapsed = featured.length > 0 ? featured : projects.slice(0, 6);
  const visible = expanded ? projects : collapsed;
  const canExpand = projects.length > collapsed.length;

  const meta = tr.meta
    .replace('{cases}', localizeDigits(cases.length, lang))
    .replace('{index}', localizeDigits(projects.length, lang));

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent-text)]">01</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{meta}</span>
      </div>

      {cases.map((work, i) => (
        <article
          key={work.name}
          className="flex flex-wrap gap-6 py-9 lg:gap-9"
          style={{
            borderTop: `1px solid ${i === 0 ? 'var(--ink)' : 'var(--rule)'}`,
            borderBottom: i === cases.length - 1 ? '1px solid var(--ink)' : undefined,
          }}
        >
          <span className="text-[clamp(36px,4.6vw,58px)] font-bold leading-[0.9] tracking-[-0.04em] text-[var(--accent)]">
            {work.number}
          </span>
          <div className="min-w-0 flex-1 basis-[400px]">
            <p dir="ltr" className="m-0 mb-3 text-start font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              {work.stackLine}
            </p>
            <h3 className="m-0 text-[clamp(23px,3.2vw,34px)] font-bold leading-[1.13] tracking-[-0.028em]">
              {work.headline}
            </h3>
            <p className="mt-4 max-w-[580px] font-serif text-[19px] leading-[1.6] text-[var(--ink-2)]">
              {work.description}
            </p>
            {/* Closed-source work has no URL to send anyone to, so it gets a label rather
             * than a link into a 404. */}
            {work.repoUrl ? (
              <a
                href={work.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[18px] inline-block border-b border-[var(--accent)] font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent-text)]"
              >
                {lang === 'ar'
                  ? `← ${work.repoUrl.includes('github.com') ? tr.repository : tr.visitSite}`
                  : `${work.repoUrl.includes('github.com') ? tr.repository : tr.visitSite} →`}
              </a>
            ) : (
              <span className="mt-[18px] inline-block font-mono text-xs uppercase tracking-[0.08em] text-[var(--ink-3)]">
                {tr.privateRepo}
              </span>
            )}
          </div>
          <WorkPanel panel={work.panel} />
        </article>
      ))}

      <div className="pt-10">
        <p className="m-0 mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
          {tr.projects}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(258px,1fr))] gap-4">
          {visible.map((project) => (
            <ProjectCard key={project.name} project={project} lang={lang} />
          ))}
        </div>

        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6 border border-[var(--rule)] px-[22px] py-[12px] font-mono text-xs uppercase tracking-[0.08em] text-[var(--ink-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
          >
            {expanded
              ? tr.showFewer
              : tr.showAll.replace('{n}', localizeDigits(projects.length, lang))}
          </button>
        )}
      </div>
    </section>
  );
}
