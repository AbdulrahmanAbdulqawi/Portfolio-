import React from 'react';
import { LayoutPanelTop, TerminalSquare } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import type { ViewMode } from '../context/AppPreferencesContext';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  toggle: () => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, toggle }) => {
  const { lang } = useLang();
  const tr = t(lang);

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-1.5 transition-colors duration-200"
      style={{ color: 'var(--color-text-muted)' }}
      aria-label={viewMode === 'retro' ? tr.aria.viewToProfessional : tr.aria.viewToRetro}
      title={viewMode === 'retro' ? tr.ui.viewProfessional : tr.ui.viewRetro}
    >
      {viewMode === 'retro' ? <LayoutPanelTop className="h-4 w-4" /> : <TerminalSquare className="h-4 w-4" />}
    </button>
  );
};
