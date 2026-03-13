import React, { createContext, useContext } from 'react';
import type { Language } from '../hooks/useLanguage';

interface LanguageContextValue {
  lang: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({ lang: 'en', toggle: () => {} });

export const LanguageProvider: React.FC<{ value: LanguageContextValue; children: React.ReactNode }> = ({ value, children }) => {
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => useContext(LanguageContext);
