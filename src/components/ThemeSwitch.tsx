import { useTheme } from '../hooks/useTheme';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();
  const tr = t(lang).aria;

  return (
    <div className="flex border border-[var(--rule)] font-mono text-[11px] tracking-[0.1em]">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label={tr.themeToLight}
        aria-pressed={theme === 'light'}
        className="px-[9px] py-[5px] transition-colors"
        style={{
          background: theme === 'light' ? 'var(--ink)' : 'transparent',
          color: theme === 'light' ? 'var(--paper)' : 'var(--ink-3)',
        }}
      >
        LIGHT
      </button>
      <button
        type="button"
        onClick={() => setTheme('night')}
        aria-label={tr.themeToNight}
        aria-pressed={theme === 'night'}
        className="px-[9px] py-[5px] transition-colors"
        style={{
          background: theme === 'night' ? 'var(--ink)' : 'transparent',
          color: theme === 'night' ? 'var(--paper)' : 'var(--ink-3)',
        }}
      >
        NIGHT
      </button>
    </div>
  );
}
