import React from 'react';
import type { Language } from '../hooks/useLanguage';

interface LanguageToggleProps {
  lang: Language;
  toggle: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="px-2 py-1 text-[0.5rem] transition-colors duration-200"
      style={{
        fontFamily: 'var(--font-pixel)',
        color: 'var(--color-nav-item)',
        border: '1px solid var(--color-border)',
      }}
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {lang === 'en' ? 'عربي' : 'EN'}
    </button>
  );
};
