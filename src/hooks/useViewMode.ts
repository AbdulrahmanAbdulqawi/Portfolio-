import { useAppPreferences } from '../context/AppPreferencesContext';

export function useViewMode() {
  const { viewMode, setViewMode, toggleViewMode } = useAppPreferences();
  return { viewMode, setViewMode, toggle: toggleViewMode } as const;
}
