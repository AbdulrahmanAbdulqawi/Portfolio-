import { useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'ar';

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('lang') as Language | null;
  if (stored === 'en' || stored === 'ar') return stored;
  return 'en';
}

export function useLanguage() {
  const [lang, setLang] = useState<Language>(getInitialLang);

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  return { lang, toggle } as const;
}
