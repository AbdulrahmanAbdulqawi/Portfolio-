import React from 'react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';

export type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

const SECTIONS: SectionId[] = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];

interface MobileMenuOverlayProps {
  open: boolean;
  onClose: () => void;
  onOpenSection: (sectionId: SectionId) => void;
}

export const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({ open, onClose, onOpenSection }) => {
  const { lang } = useLang();
  const tr = t(lang);
  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col sm:hidden transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ background: 'var(--color-bg)' }}
      aria-hidden={!open}
    >
      <div className="flex-1 grid grid-cols-2 gap-3 p-6 pt-12 content-center">
        {SECTIONS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              onOpenSection(id);
              onClose();
            }}
            className="min-h-[48px] px-4 py-3 rounded border transition-colors touch-manipulation"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--color-terminal)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'transparent',
            }}
          >
            [{navLabel(id)}]
          </button>
        ))}
      </div>
      <div className="flex justify-center pb-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] px-6 rounded border touch-manipulation"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--color-terminal)',
            borderColor: 'var(--color-border)',
            backgroundColor: 'transparent',
          }}
        >
          × close
        </button>
      </div>
    </div>
  );
};
