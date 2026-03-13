import { useState, useEffect } from 'react';

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
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  return { lang, toggle, setLang } as const;
}
