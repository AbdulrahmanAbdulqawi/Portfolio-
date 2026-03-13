import React, { createContext, useContext } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextValue {
  lang: Language;
  toggle: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  value,
  children,
}: {
  value: LanguageContextValue;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
