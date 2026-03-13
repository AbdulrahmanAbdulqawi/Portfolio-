import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';

export type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

interface MobileBottomNavProps {
  selectedSection: SectionId | null;
  onBack: () => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  selectedSection,
  onBack,
  onToggleMenu,
  isMenuOpen,
}) => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang);
  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;
  const centerLabel = selectedSection ? navLabel(selectedSection) : site.name;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 sm:hidden flex items-center justify-between px-4 border-t z-40"
      style={{
        paddingTop: '0.75rem',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        background: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
      aria-label="Mobile navigation"
    >
      <div className="min-w-[80px] flex justify-start">
        {selectedSection !== null ? (
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] px-2 flex items-center touch-manipulation"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-terminal)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={tr.aria.back}
          >
            {tr.prompt.back}
          </button>
        ) : null}
      </div>
      <div
        className="flex-1 min-w-0 truncate text-center"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
        }}
      >
        {centerLabel}
      </div>
      <div className="min-w-[80px] flex justify-end">
        <button
          type="button"
          onClick={onToggleMenu}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded border touch-manipulation"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-terminal)',
            borderColor: 'var(--color-border)',
            backgroundColor: 'transparent',
          }}
          aria-label={isMenuOpen ? tr.aria.closeMenu : tr.aria.openMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
    </nav>
  );
};
