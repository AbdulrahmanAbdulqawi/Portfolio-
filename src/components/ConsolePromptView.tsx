import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { ConsoleSectionLines } from './ConsoleSectionLines';

type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

const SECTIONS: SectionId[] = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];

const PROMPT_COMPLETIONS: string[] = [
  '\\help', 'help', '\\menu', 'menu', '\\prefs', 'prefs',
  'light', 'dark', 'theme light', 'theme dark',
  'english', 'arabic', 'en', 'ar', 'lang en', 'lang ar',
  ...SECTIONS,
];

function getPromptSuggestions(input: string): string[] {
  const t = input.trim().toLowerCase();
  if (t === '') return [];
  if (t.startsWith('open ')) {
    const rest = t.slice(5).trim();
    if (rest === '') return SECTIONS.map((s) => 'open ' + s);
    return SECTIONS.filter((s) => s.startsWith(rest)).map((s) => 'open ' + s);
  }
  return PROMPT_COMPLETIONS.filter((c) => c.toLowerCase().startsWith(t));
}

interface ConsolePromptViewProps {
  onOpenSection: (sectionId: SectionId) => void;
  /** When set, show this section's content below the list (line by line) */
  selectedSection: SectionId | null;
  onBack: () => void;
}

const promptStyle = {
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-terminal)',
  background: 'transparent',
  border: '1px solid var(--color-border)',
  cursor: 'pointer' as const,
};

const lineStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  lineHeight: 1.8,
};

export const ConsolePromptView: React.FC<ConsolePromptViewProps> = ({ onOpenSection, selectedSection, onBack }) => {
  const { lang, setLang } = useLang();
  const { theme, toggle: toggleTheme, setTheme } = useTheme();
  const { toggle: toggleLang } = useLanguage();
  const site = siteConfig[lang];
  const tr = t(lang);
  const [inputValue, setInputValue] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [unknownCommand, setUnknownCommand] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [prefsVisible, setPrefsVisible] = useState(false);
  const [helpFocusIndex, setHelpFocusIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = React.useMemo(() => getPromptSuggestions(inputValue), [inputValue]);
  const inlineSuggestion = suggestions.length > 0 && inputValue.trim() !== '' ? suggestions[0] : null;

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && inlineSuggestion) {
      e.preventDefault();
      setInputValue(inlineSuggestion);
    }
  };

  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;

  type ParsedCommand = 'help' | 'menu' | 'prefs' | 'theme-light' | 'theme-dark' | 'lang-en' | 'lang-ar' | SectionId | 'unknown';
  const parseCommand = (raw: string): ParsedCommand => {
    const s = raw.trim().toLowerCase().replace(/^\s*open\s+/i, '').trim();
    if (s === '\\help' || s === 'help' || s === '/help') return 'help';
    if (s === '\\menu' || s === 'menu' || s === '/menu') return 'menu';
    if (s === 'light' || s === 'dark' || s === 'theme light' || s === 'theme dark') return s === 'light' || s === 'theme light' ? 'theme-light' : 'theme-dark';
    if (s === 'en' || s === 'english' || s === 'ar' || s === 'arabic' || s === 'lang en' || s === 'lang english' || s === 'lang ar' || s === 'lang arabic') {
      if (s === 'en' || s === 'english' || s === 'lang en' || s === 'lang english') return 'lang-en';
      return 'lang-ar';
    }
    if (s === '\\prefs' || s === 'prefs' || s === '/prefs' || s === '\\theme' || s === 'theme' || s === '\\lang' || s === 'lang') return 'prefs';
    const section = SECTIONS.find((id) => id === s || id === s.replace(/\s/g, ''));
    return section ?? 'unknown';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSubmit = inlineSuggestion ?? inputValue;
    const cmd = parseCommand(toSubmit);
    setInputValue('');
    if (cmd === 'help') {
      setShowHelp(true);
      setUnknownCommand(false);
      setHelpFocusIndex(0);
      onBack();
    } else if (cmd === 'menu') {
      setShowHelp(false);
      setUnknownCommand(false);
      setMenuVisible((v) => !v);
    } else if (cmd === 'prefs') {
      setShowHelp(false);
      setUnknownCommand(false);
      setPrefsVisible((v) => !v);
    } else if (cmd === 'theme-light') {
      setShowHelp(false);
      setUnknownCommand(false);
      setTheme('light');
    } else if (cmd === 'theme-dark') {
      setShowHelp(false);
      setUnknownCommand(false);
      setTheme('dark');
    } else if (cmd === 'lang-en') {
      setShowHelp(false);
      setUnknownCommand(false);
      setLang('en');
    } else if (cmd === 'lang-ar') {
      setShowHelp(false);
      setUnknownCommand(false);
      setLang('ar');
    } else if (cmd !== 'unknown') {
      setShowHelp(false);
      setUnknownCommand(false);
      onOpenSection(cmd);
    } else {
      setShowHelp(false);
      setUnknownCommand(true);
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const SECTIONS_FIRST_COUNT = SECTIONS.length; // sections first (indices 0-6)
  const HELP_CMD_COUNT = 4; // \help, \menu, \prefs, open [section] (indices 7-10)
  const helpItemCount = SECTIONS_FIRST_COUNT + HELP_CMD_COUNT + 1; // sections + cmd lines + back
  useEffect(() => {
    if (!showHelp) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHelpFocusIndex((i) => (i + 1) % helpItemCount);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHelpFocusIndex((i) => (i - 1 + helpItemCount) % helpItemCount);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (helpFocusIndex < SECTIONS_FIRST_COUNT) {
          setShowHelp(false);
          onOpenSection(SECTIONS[helpFocusIndex]);
        } else if (helpFocusIndex === SECTIONS_FIRST_COUNT + 1) {
          setShowHelp(false);
          setMenuVisible((v) => !v);
        } else if (helpFocusIndex === SECTIONS_FIRST_COUNT + 2) {
          setShowHelp(false);
          setPrefsVisible((v) => !v);
        } else if (helpFocusIndex === helpItemCount - 1) {
          setShowHelp(false);
        }
        // SECTIONS_FIRST_COUNT (\help) and SECTIONS_FIRST_COUNT+3 (open [section]) are no-op
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHelp, helpFocusIndex, helpItemCount, SECTIONS_FIRST_COUNT, onOpenSection]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="section-container flex-1 flex flex-col justify-center py-12">
        <div className="max-w-3xl space-y-6" style={{ fontFamily: 'var(--font-mono)' }}>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] sm:text-[0.9rem]">
            <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? '$' : '~'}</span>
            <span style={{ color: 'var(--color-primary)' }}>{site.initials}</span>
            <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? ' ~' : ' $'}</span>
            <span className="flex-1 min-w-[120px] flex items-center">
              <span className="flex items-center min-w-0 flex-1 relative" style={{ fontFamily: 'var(--font-mono)', fontSize: 'inherit' }}>
                <span className="pointer-events-none" style={{ color: inputValue ? 'var(--color-text)' : 'var(--color-text-muted)', opacity: inputValue ? 1 : 0.5 }}>
                  {inputValue || tr.prompt.placeholder}
                </span>
                <span
                  className="cursor-blink inline-block w-[0.6em] h-[1em] ml-0.5 align-text-bottom flex-shrink-0 pointer-events-none"
                  style={{ backgroundColor: 'var(--color-terminal)' }}
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  className="absolute inset-0 w-full bg-transparent border-none outline-none text-transparent caret-transparent"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'inherit',
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={tr.aria.commandInput}
                  aria-autocomplete="inline"
                />
              </span>
              {inlineSuggestion && (
                <span className="pointer-events-none flex-shrink-0 flex items-center gap-1.5">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'inherit',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {inlineSuggestion}
                  </span>
                  <kbd
                    className="px-1.5 py-0.5 rounded border text-[0.6rem] font-normal"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    Tab
                  </kbd>
                </span>
              )}
            </span>
          </form>

          <p className="text-[0.65rem] sm:text-[0.7rem]" style={{ color: unknownCommand ? 'var(--color-hp)' : 'var(--color-text-muted)' }}>
            {tr.prompt.hint}
          </p>

          {prefsVisible && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] sm:text-[0.75rem]">
              <span style={{ color: 'var(--color-text-muted)' }}>//</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-2.5 py-1 transition-colors hover:border-[var(--color-terminal)] hover:text-[var(--color-primary)]"
                style={promptStyle}
                aria-label={theme === 'dark' ? tr.aria.themeToLight : tr.aria.themeToDark}
              >
                $ theme [{theme}]
              </button>
              <button
                type="button"
                onClick={toggleLang}
                className="px-2.5 py-1 transition-colors hover:border-[var(--color-terminal)] hover:text-[var(--color-primary)]"
                style={promptStyle}
                aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
              >
                $ lang [{lang === 'en' ? 'EN' : 'عربي'}]
              </button>
            </div>
          )}
          {menuVisible && (
            <>
              <p className="text-[0.6rem] sm:text-[0.7rem]" style={{ color: 'var(--color-text-muted)' }}>
                {tr.prompt.menuHint}
              </p>
              <div className="flex flex-wrap gap-3">
                {(site.navItems as SectionId[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setShowHelp(false); setUnknownCommand(false); onOpenSection(item); }}
                    className="px-4 py-2.5 text-[0.7rem] sm:text-[0.8rem] transition-colors border"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-terminal)',
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    [{navLabel(item)}]
                  </button>
                ))}
              </div>
            </>
          )}

          {showHelp && (
            <div className="mt-8 space-y-1" style={lineStyle}>
              <div style={{ color: 'var(--color-terminal)' }}>{tr.prompt.helpTitle}</div>
              <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>  {tr.prompt.sectionsLabel}</div>
              {SECTIONS.map((id, idx) => {
                const focused = helpFocusIndex === idx;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setShowHelp(false); onOpenSection(id); }}
                    onMouseEnter={() => setHelpFocusIndex(idx)}
                    className="text-left w-full transition-colors hover:opacity-100"
                    style={{
                      color: focused ? 'var(--color-terminal)' : 'var(--color-text-muted)',
                      background: focused ? 'var(--color-surface)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'inherit',
                      padding: '2px 0',
                    }}
                  >
                    {focused ? '> ' : '    '}{id}
                  </button>
                );
              })}
              <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>  {tr.prompt.commandsLabel}</div>
              {[
                { label: tr.prompt.helpShowHelp, action: () => {}, index: SECTIONS_FIRST_COUNT },
                { label: tr.prompt.helpMenu, action: () => { setShowHelp(false); setMenuVisible((v) => !v); }, index: SECTIONS_FIRST_COUNT + 1 },
                { label: tr.prompt.helpPrefs, action: () => { setShowHelp(false); setPrefsVisible((v) => !v); }, index: SECTIONS_FIRST_COUNT + 2 },
                { label: tr.prompt.helpOpenSection, action: () => {}, index: SECTIONS_FIRST_COUNT + 3 },
              ].map((item) => {
                const focused = helpFocusIndex === item.index;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={item.action}
                    onMouseEnter={() => setHelpFocusIndex(item.index)}
                    className="text-left w-full transition-colors hover:opacity-100"
                    style={{
                      color: focused ? 'var(--color-terminal)' : 'var(--color-text-muted)',
                      background: focused ? 'var(--color-surface)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'inherit',
                      padding: '2px 0',
                    }}
                  >
                    {(focused ? '> ' : '  ') + item.label.trim()}
                  </button>
                );
              })}
              <div style={{ color: 'var(--color-text-muted)' }}>{tr.prompt.helpTheme}</div>
              <div style={{ color: 'var(--color-text-muted)' }}>{tr.prompt.helpLang}</div>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                onMouseEnter={() => setHelpFocusIndex(helpItemCount - 1)}
                className="mt-4 block w-full text-left transition-colors hover:opacity-100"
                style={{
                  color: 'var(--color-terminal)',
                  background: helpFocusIndex === helpItemCount - 1 ? 'var(--color-surface)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '2px 0',
                }}
              >
                {tr.prompt.back}
              </button>
            </div>
          )}

          {selectedSection && !showHelp && (
            <ConsoleSectionLines
              sectionId={selectedSection}
              onBack={onBack}
              embedded
              animateLineByLine
            />
          )}
        </div>
      </div>

      <footer className="py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[0.4rem] sm:text-[0.5rem]" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            // © {new Date().getFullYear()} {site.name}. {tr.footer.rights}
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: 'https://github.com/AbdulrahmanAbdulqawi' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrahman-abdulqawi' },
              { Icon: Mail, href: `mailto:${site.email}` },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                aria-label={href}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
