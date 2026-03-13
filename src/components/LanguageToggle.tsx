import React from 'react';
import type { Language } from '../hooks/useLanguage';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

interface LanguageToggleProps {
  lang: Language;
  toggle: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, toggle }) => {
  const { lang: currentLang } = useLang();
  const tr = t(currentLang);
  return (
  <button
    type="button"
    onClick={toggle}
    className="px-2 py-1 text-[0.5rem] transition-colors duration-200"
    style={{
      fontFamily: 'var(--font-pixel)',
      color: 'var(--color-nav-item)',
      border: '1px solid var(--color-border)',
      background: 'transparent',
    }}
    aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
  >
    {lang === 'en' ? 'عربي' : 'EN'}
  </button>
  );
};
