import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

const DURATION_MS = 2500;
const LINE_INTERVAL_MS = 270;
const FADE_MS = 400;

interface BootScreenProps {
  onDone?: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onDone }) => {
  const { lang } = useLang();
  const tr = t(lang).boot;
  const nav = t(lang).nav as Record<string, string>;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
  const lines = [
    { text: `> ${tr.loading}`, delay: 0 },
    ...sectionIds.map((id, i) => ({ text: `> ${nav[id] ?? id} ${tr.loadingOk}`, delay: LINE_INTERVAL_MS * (i + 1) })),
    { text: `> ${tr.welcome}`, delay: LINE_INTERVAL_MS * (sectionIds.length + 1) },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setLineIndex((prev) => Math.max(prev, i + 1)), (i + 1) * LINE_INTERVAL_MS));
    });

    const progressSteps = 20;
    const progressInterval = DURATION_MS / progressSteps;
    for (let i = 1; i <= progressSteps; i++) {
      timers.push(setTimeout(() => setProgress((i / progressSteps) * 100), i * progressInterval));
    }

    timers.push(setTimeout(() => setVisible(false), DURATION_MS - 100));
    timers.push(
      setTimeout(() => {
        setDone(true);
        onDone?.();
      }, DURATION_MS + FADE_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  if (done) return null;

  return (
    <div
      className="boot-screen"
      style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-out` }}
      aria-hidden="true"
    >
      <div className="boot-screen-content">
        <div className="boot-screen-lines" style={{ fontFamily: 'var(--font-mono)' }}>
          {lines.slice(0, lineIndex).map((line, i) => (
            <div key={i} className="boot-screen-line" style={{ color: 'var(--color-terminal)' }}>
              {line.text}
            </div>
          ))}
          {lineIndex < lines.length && (
            <span className="boot-screen-cursor" style={{ color: 'var(--color-terminal)' }}>
              _
            </span>
          )}
        </div>
        <div className="boot-screen-progress-bg">
          <div
            className="boot-screen-progress-fill"
            style={{ width: `${progress}%`, backgroundColor: 'var(--color-primary)' }}
          />
        </div>
      </div>
    </div>
  );
};
