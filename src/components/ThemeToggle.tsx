import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggle }) => {
  const { lang } = useLang();
  const tr = t(lang);
  return (
  <button
    type="button"
    onClick={toggle}
    className="p-1.5 transition-colors duration-200"
    style={{ color: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
    aria-label={theme === 'dark' ? tr.aria.themeToLight : tr.aria.themeToDark}
  >
    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
  </button>
  );
};
