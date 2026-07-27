import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { consoleOverlayLinks, consolePrompts } from '../data/console';
import { TypingLine } from './TypingLine';

interface ConsoleOverlayProps {
  open: boolean;
  onClose: () => void;
}

/** Always renders in the night palette, regardless of the page's current theme. */
export function ConsoleOverlay({ open, onClose }: ConsoleOverlayProps) {
  const { lang, setLang } = useLang();

  if (!open) return null;

  const switchLangLabel = lang === 'en' ? 'arabic' : 'english';

  return (
    <div
      onClick={onClose}
      dir="ltr"
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] backdrop-blur-[6px]"
      style={{ background: 'rgba(8,8,7,0.9)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[min(760px,90vw)] border"
        style={{ background: '#0E0E0C', borderColor: '#2B2A25', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
      >
        <div className="flex items-center gap-2 border-b px-[15px] py-[11px]" style={{ borderColor: '#2B2A25' }}>
          <span className="h-[9px] w-[9px] rounded-full" style={{ background: '#3A3934' }} />
          <span className="h-[9px] w-[9px] rounded-full" style={{ background: '#3A3934' }} />
          <span className="h-[9px] w-[9px] rounded-full" style={{ background: '#3A3934' }} />
          <span className="ms-2 font-mono text-[11px] tracking-[0.1em]" style={{ color: '#6E6A61' }}>
            abdulqawi.dev — console · esc to close
          </span>
        </div>
        <div className="p-6 font-mono text-sm leading-[2.1]" style={{ color: '#B5B1A6' }}>
          <div>
            <span style={{ color: '#FF5A2B' }}>$</span> help
          </div>
          <div className="flex flex-wrap gap-x-[22px] gap-y-[10px] py-[6px] pb-[10px]">
            {consoleOverlayLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="border-b"
                style={{ color: '#F3F0E9', borderColor: '#3A3934' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/AbdulrahmanAbdulqawi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="border-b"
              style={{ color: '#F3F0E9', borderColor: '#3A3934' }}
            >
              github
            </a>
            <button
              type="button"
              onClick={() => {
                setLang(lang === 'en' ? 'ar' : 'en');
                onClose();
              }}
              className="border-b"
              style={{ color: '#F3F0E9', borderColor: '#3A3934' }}
            >
              {switchLangLabel}
            </button>
          </div>
          <div>
            <TypingLine prompts={consolePrompts} dollarColor="#FF5A2B" caretColor="#FF5A2B" textColor="#B5B1A6" />
          </div>
        </div>
      </div>
    </div>
  );
}
