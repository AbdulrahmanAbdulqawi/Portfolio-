import { useAppPreferences } from '../context/AppPreferencesContext';

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useAppPreferences();

  return { theme, toggle: toggleTheme, setTheme } as const;
}
