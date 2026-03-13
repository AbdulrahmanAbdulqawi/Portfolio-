import React from 'react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

interface ConsoleWindowProps {
  title: string;
  children: React.ReactNode;
  id?: string;
  onBack?: () => void;
}

export const ConsoleWindow: React.FC<ConsoleWindowProps> = ({ title, children, id, onBack }) => {
  const { lang } = useLang();
  const tr = t(lang);
  return (
    <div id={id} className="console-window">
      <div className="console-window-titlebar">
        <div className="console-window-dots">
          <span className="console-window-dot console-window-dot-red" />
          <span className="console-window-dot console-window-dot-yellow" />
          <span className="console-window-dot console-window-dot-green" />
        </div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="console-window-back"
            style={{ color: 'var(--color-nav-item)', fontFamily: 'var(--font-mono)' }}
            aria-label={tr.aria.back}
          >
            <span className="console-window-back-icon" aria-hidden>{lang === 'ar' ? '>' : '<'}</span>
            {tr.aria.back}
          </button>
        )}
        <span className="console-window-title" style={{ fontFamily: 'var(--font-mono)' }}>
          {title}
        </span>
      </div>
      <div className="console-window-content">{children}</div>
    </div>
  );
};
