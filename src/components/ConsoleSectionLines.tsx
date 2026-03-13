import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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
  /** When true, do not render the back button (e.g. when back is shown above in prompt view) */
  hideBackButton?: boolean;
  /** When Arrow Up on first item, call this (e.g. focus command input) */
  onArrowUpAtFirst?: () => void;
}

export interface ConsoleSectionLinesRef {
  focusFirst: () => void;
}

const lineStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  lineHeight: 1.8,
};

const LINE_DELAY_MS = 60;

export const ConsoleSectionLines = forwardRef<ConsoleSectionLinesRef, ConsoleSectionLinesProps>(({
  sectionId,
  onBack,
  embedded = false,
  animateLineByLine = false,
  hideBackButton = false,
  onArrowUpAtFirst,
}, ref) => {
  const { lang } = useLang();
  const tr = t(lang);
  const site = siteConfig[lang];
  const [visibleCount, setVisibleCount] = useState(0);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [focusedIndex, setFocusedIndex] = useState(0);

  useImperativeHandle(ref, () => ({
    focusFirst: () => setFocusedIndex(0),
  }), []);

  const expandableItemCount =
    sectionId === 'experience'
      ? experiences[lang].length
      : sectionId === 'skills'
        ? skillCategories[lang].length
        : sectionId === 'projects'
          ? projects[lang].length
          : 0;

  useEffect(() => {
    setExpandedIndices(new Set());
    setFocusedIndex(0);
  }, [sectionId, lang]);

  const totalFocusable = expandableItemCount + 1; // items + back button
  const isBackFocused = focusedIndex === expandableItemCount;

  useEffect(() => {
    if (!expandableItemCount) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, totalFocusable - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (focusedIndex === 0 && onArrowUpAtFirst) {
          onArrowUpAtFirst();
          return;
        }
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIndex === expandableItemCount) {
          onBack();
        } else {
          setExpandedIndices((prev) => {
            const next = new Set(prev);
            if (next.has(focusedIndex)) next.delete(focusedIndex);
            else next.add(focusedIndex);
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandableItemCount, focusedIndex, totalFocusable, onBack, onArrowUpAtFirst]);

  const toggleExpanded = (i: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

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
        <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-text-secondary)' }}>
          {content}
        </div>
      );
    const pushSecondary = (content: React.ReactNode) =>
      lines.push(
        <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-text-secondary)' }}>
          {content}
        </div>
      );

    const expandableButton = (isExpanded: boolean, label: React.ReactNode, onToggle: () => void, isFocused: boolean, index: number) => (
      <button
        type="button"
        onClick={() => { setFocusedIndex(index); onToggle(); }}
        onFocus={() => setFocusedIndex(index)}
        className="text-left w-full transition-colors hover:opacity-90"
        style={{
          background: isFocused ? 'var(--color-surface)' : 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-terminal)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'inherit',
          padding: '2px 4px',
          borderRadius: 2,
        }}
      >
        {isExpanded ? '▼ ' : '▶ '}
        {label}
      </button>
    );

    switch (sectionId) {
      case 'home':
        push(`> ${site.name}`);
        pushSecondary(site.tagline);
        if (site.homeIntro) pushMuted(site.homeIntro);
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
        data.forEach((exp, i) => {
          const isExpanded = expandedIndices.has(i);
          lines.push(
            <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-terminal)' }}>
              {expandableButton(isExpanded, `${exp.title} @ ${exp.company}`, () => toggleExpanded(i), focusedIndex === i, i)}
            </div>
          );
          if (isExpanded) {
            pushMuted(`  ${exp.period} | ${exp.location}`);
            exp.responsibilities.forEach((r) => pushSecondary(`  - ${r}`));
          }
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'skills': {
        const data = skillCategories[lang];
        data.forEach((cat, i) => {
          const isExpanded = expandedIndices.has(i);
          lines.push(
            <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-terminal)' }}>
              {expandableButton(isExpanded, cat.title, () => toggleExpanded(i), focusedIndex === i, i)}
            </div>
          );
          if (isExpanded) {
            cat.skills.forEach((s) => pushMuted(`  ${s.name} (${s.level})`));
          }
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'projects': {
        const data = projects[lang];
        data.forEach((p, i) => {
          const isExpanded = expandedIndices.has(i);
          lines.push(
            <div key={lines.length} style={{ ...lineStyle, color: 'var(--color-terminal)' }}>
              {expandableButton(isExpanded, p.title, () => toggleExpanded(i), focusedIndex === i, i)}
            </div>
          );
          if (isExpanded) {
            pushSecondary(`  ${p.description}`);
            pushMuted(`  [${p.technologies.join(', ')}]`);
            if (p.github || p.link) {
              pushMuted(
                <>  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-cyan)' }}>github</a>}
                  {p.github && p.link && ' · '}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-cyan)' }}>demo</a>}
                </>
              );
            }
          }
          lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        });
        break;
      }

      case 'education': {
        push(`> ${tr.education.educationHeading}`);
        educationEntries[lang].forEach((e) => {
          pushMuted(`  ${e.school} | ${e.degree}`);
          pushMuted(`  ${e.location} | ${e.period}`);
        });
        lines.push(<div key={lines.length} style={{ height: '0.5rem' }} />);
        push(`> ${tr.education.certificationsHeading}`);
        certifications[lang].forEach((c) => pushMuted(`  - ${c}`));
        break;
      }

      case 'contact':
        push(`> ${tr.contact.title}`);
        pushSecondary(<a href={`mailto:${site.email}`} className="underline" style={{ color: 'var(--color-cyan)' }}>{site.email}</a>);
        pushSecondary(<a href={`tel:${site.phone}`} className="underline" style={{ color: 'var(--color-cyan)' }}>{site.phone}</a>);
        pushMuted(`  ${site.location}`);
        break;
    }

    return lines;
  };

  const allLines = buildLines();

  const isExpandableSection = sectionId === 'experience' || sectionId === 'skills' || sectionId === 'projects';

  useEffect(() => {
    if (!animateLineByLine || isExpandableSection) {
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
  }, [sectionId, lang, animateLineByLine, isExpandableSection, allLines.length]);

  const visibleLines = animateLineByLine ? allLines.slice(0, visibleCount) : allLines;

  const content = (
    <>
      <div className="space-y-0.5">
        {visibleLines}
      </div>
      {!hideBackButton && (
        <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)', ...lineStyle }}>
          <button
            type="button"
            onClick={onBack}
            onMouseEnter={() => expandableItemCount > 0 && setFocusedIndex(expandableItemCount)}
            className="transition-colors hover:opacity-80"
            style={{
              color: 'var(--color-terminal)',
              background: expandableItemCount > 0 && isBackFocused ? 'var(--color-surface)' : 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              padding: '2px 4px',
              borderRadius: 2,
            }}
          >
            {tr.prompt.back}
          </button>
        </div>
      )}
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
      <div className="section-container flex-1 content-width">{content}</div>
    </div>
  );
});
ConsoleSectionLines.displayName = 'ConsoleSectionLines';
