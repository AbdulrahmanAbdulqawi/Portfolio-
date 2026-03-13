import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { siteConfig } from '../data/site';
import { aboutContent } from '../data/about';
import { experiences } from '../data/experience';
import { skillCategories } from '../data/skills';
import { projects } from '../data/projects';
import { educationEntries, certifications } from '../data/education';

type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

interface ConsoleSectionLinesProps {
  sectionId: SectionId;
  onBack: () => void;
  /** When true, render inline (no full-screen wrapper) */
  embedded?: boolean;
  /** When true, reveal lines one by one */
  animateLineByLine?: boolean;
}

const lineStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  lineHeight: 1.8,
};

const LINE_DELAY_MS = 60;

export const ConsoleSectionLines: React.FC<ConsoleSectionLinesProps> = ({
  sectionId,
  onBack,
  embedded = false,
  animateLineByLine = false,
}) => {
  const { lang } = useLang();
  const tr = t(lang);
  const site = siteConfig[lang];
  const [visibleCount, setVisibleCount] = useState(0);

  const buildLines = () => {
    const lines: React.ReactNode[] = [];
    const push = (content: React.ReactNode, color = 'var(--color-terminal)') =>
      lines.push(
        <div key={lines.length} style={{ ...lineStyle, color }}>
          {content}
        </div>
      );
    const pushMuted = (content: React.ReactNode) =>
      lines.push(
        <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-text-muted)' }}>
          {content}
        </div>
      );
    const pushSecondary = (content: React.ReactNode) =>
      lines.push(
        <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-text-secondary)' }}>
          {content}
        </div>
      );

    switch (sectionId) {
      case 'home':
        push(`> ${site.name}`);
        pushSecondary(site.tagline);
        break;

      case 'about': {
        const about = aboutContent[lang];
        push(`> ${about.headline}`);
        about.paragraphs.forEach((p) => {
          const withLink = p.link ? (
            <>{p.text} <a href={p.link.url} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-cyan)' }}>[{p.link.text}]</a></>
          ) : p.text;
          pushSecondary(withLink);
        });
        break;
      }

      case 'experience': {
        const data = experiences[lang];
        data.forEach((exp) => {
          push(`> ${exp.title} @ ${exp.company}`);
          pushMuted(`  ${exp.period} | ${exp.location}`);
          exp.responsibilities.forEach((r) => pushSecondary(`  - ${r}`));
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'skills': {
        const data = skillCategories[lang];
        data.forEach((cat) => {
          push(`> ${cat.title}`);
          cat.skills.forEach((s) => pushMuted(`  ${s.name} (${s.level})`));
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'projects': {
        const data = projects[lang];
        data.forEach((p) => {
          push(`> ${p.title}`);
          pushSecondary(`  ${p.description}`);
          pushMuted(`  [${p.technologies.join(', ')}]`);
          if (p.github || p.link) {
            pushMuted(`  ${p.github ? 'github' : ''} ${p.link ? 'demo' : ''}`);
          }
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'education': {
        push('> Education');
        educationEntries[lang].forEach((e) => {
          pushMuted(`  ${e.school} | ${e.degree}`);
          pushMuted(`  ${e.location} | ${e.period}`);
        });
        lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        push('> Certifications');
        certifications[lang].forEach((c) => pushMuted(`  - ${c}`));
        break;
      }

      case 'contact':
        push('> Contact');
        pushSecondary(<a href={`mailto:${site.email}`} className="underline" style={{ color: 'var(--color-cyan)' }}>{site.email}</a>);
        pushSecondary(<a href={`tel:${site.phone}`} className="underline" style={{ color: 'var(--color-cyan)' }}>{site.phone}</a>);
        pushMuted(`  ${site.location}`);
        break;
    }

    return lines;
  };

  const allLines = buildLines();

  useEffect(() => {
    if (!animateLineByLine) {
      setVisibleCount(allLines.length);
      return;
    }
    setVisibleCount(0);
    const total = allLines.length;
    const t = setInterval(() => {
      setVisibleCount((n) => {
        if (n >= total) {
          clearInterval(t);
          return total;
        }
        return n + 1;
      });
    }, LINE_DELAY_MS);
    return () => clearInterval(t);
  }, [sectionId, lang, animateLineByLine]);

  const visibleLines = animateLineByLine ? allLines.slice(0, visibleCount) : allLines;

  const content = (
    <>
      <div className="space-y-0.5">
        {visibleLines}
      </div>
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)', ...lineStyle }}>
        <button
          type="button"
          onClick={onBack}
          className="transition-colors hover:opacity-80"
          style={{ color: 'var(--color-terminal)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
        >
          {tr.prompt.back}
        </button>
      </div>
    </>
  );

  if (embedded) {
    return <div className="mt-8">{content}</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col p-6 sm:p-8"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="section-container flex-1 max-w-3xl">{content}</div>
    </div>
  );
};
