import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light';
export type ViewMode = 'retro' | 'professional';

interface AppPreferencesContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  return 'dark';
}

function getInitialViewMode(): ViewMode {
  if (typeof window === 'undefined') return 'professional';
  const stored = localStorage.getItem('layout') as ViewMode | null;
  if (stored === 'retro' || stored === 'professional') return stored;
  return 'professional';
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-layout', viewMode);
    localStorage.setItem('layout', viewMode);
  }, [viewMode]);

  const value = useMemo<AppPreferencesContextValue>(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    viewMode,
    setViewMode,
    toggleViewMode: () => setViewMode((prev) => (prev === 'retro' ? 'professional' : 'retro')),
  }), [theme, viewMode]);

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences(): AppPreferencesContextValue {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  return ctx;
}
