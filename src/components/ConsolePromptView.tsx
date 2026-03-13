import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import { useSwipeBack } from '../hooks/useSwipeBack';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { ConsoleSectionLines, type ConsoleSectionLinesRef } from './ConsoleSectionLines';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileMenuOverlay } from './MobileMenuOverlay';

type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

const SECTIONS: SectionId[] = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];

const PROMPT_COMPLETIONS: string[] = [
  '\\help', 'help', '\\story', 'story', '\\guide', 'guide',
  '\\menu', 'menu', '\\prefs', 'prefs',
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
  /** When true, boot screen has finished and hint can be shown */
  bootComplete?: boolean;
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

export const ConsolePromptView: React.FC<ConsolePromptViewProps> = ({ bootComplete = false, onOpenSection, selectedSection, onBack }) => {
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
  const [showStory, setShowStory] = useState(false);
  const [helpFocusIndex, setHelpFocusIndex] = useState(0);
  const [menuFocusIndex, setMenuFocusIndex] = useState(0);
  const [storyFocusIndex, setStoryFocusIndex] = useState(0);
  const [prefsFocusIndex, setPrefsFocusIndex] = useState(0);
  const [contactFlowStep, setContactFlowStep] = useState<0 | 1 | 2 | 'ready' | 'done'>(0);
  const [contactFormData, setContactFormData] = useState({ name: '', email: '', message: '' });
  const [contactSubmitStatus, setContactSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionLinesRef = useRef<ConsoleSectionLinesRef>(null);
  const isExpandableSection = (id: SectionId) => ['experience', 'skills', 'projects'].includes(id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useSwipeBack(onBack, !!selectedSection);

  const showMenuBelowPrompt = menuVisible || (isMobile && bootComplete && !selectedSection);

  useEffect(() => {
    if (selectedSection !== 'contact') {
      setContactFlowStep(0);
      setContactFormData({ name: '', email: '', message: '' });
      setContactSubmitStatus('idle');
    }
  }, [selectedSection]);

  const handleContactSend = async () => {
    if (contactFlowStep !== 'ready' || !contactFormData.name || !contactFormData.email || !contactFormData.message) return;
    setContactSubmitStatus('sending');
    try {
      const res = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactFormData.name,
          email: contactFormData.email,
          message: contactFormData.message,
        }),
      });
      setContactSubmitStatus(res.ok ? 'success' : 'error');
      if (res.ok) {
        setContactFormData({ name: '', email: '', message: '' });
        setContactFlowStep('done');
      }
    } catch {
      setContactSubmitStatus('error');
    }
  };

  const menuItems = (site.navItems as SectionId[]);
  const menuItemCount = menuItems.length;
  const storyItemCount = SECTIONS.length + 1; // sections + back
  const prefsItemCount = 2; // theme, lang

  const contactPlaceholder =
    selectedSection === 'contact' && typeof contactFlowStep === 'number'
      ? contactFlowStep === 0
        ? tr.contact.flowPlaceholderName
        : contactFlowStep === 1
          ? tr.contact.flowPlaceholderEmail
          : tr.contact.flowPlaceholderMessage
      : (selectedSection === 'contact' && (contactFlowStep === 'ready' || contactFlowStep === 'done'))
        ? tr.prompt.placeholder
        : null;
  const effectivePlaceholder = contactPlaceholder ?? tr.prompt.placeholder;

  const suggestions = React.useMemo(() => getPromptSuggestions(inputValue), [inputValue]);
  const inlineSuggestion =
    selectedSection === 'contact'
      ? null
      : suggestions.length > 0 && inputValue.trim() !== ''
        ? suggestions[0]
        : null;

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && inlineSuggestion) {
      e.preventDefault();
      setInputValue(inlineSuggestion);
    }
  };

  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;

  type ParsedCommand = 'help' | 'story' | 'menu' | 'prefs' | 'theme-light' | 'theme-dark' | 'lang-en' | 'lang-ar' | SectionId | 'unknown';
  const parseCommand = (raw: string): ParsedCommand => {
    const s = raw.trim().toLowerCase().replace(/^\s*open\s+/i, '').trim();
    if (s === '\\help' || s === 'help' || s === '/help') return 'help';
    if (s === '\\story' || s === 'story' || s === '/story' || s === '\\guide' || s === 'guide' || s === '/guide') return 'story';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toSubmit = (inlineSuggestion ?? inputValue).trim();
    setInputValue('');

    if (selectedSection === 'contact' && typeof contactFlowStep === 'number') {
      if (!toSubmit) {
        inputRef.current?.focus();
        return;
      }
      if (contactFlowStep === 0) {
        setContactFormData((prev) => ({ ...prev, name: toSubmit }));
        setContactFlowStep(1);
      } else if (contactFlowStep === 1) {
        setContactFormData((prev) => ({ ...prev, email: toSubmit }));
        setContactFlowStep(2);
      } else if (contactFlowStep === 2) {
        setContactFormData((prev) => ({ ...prev, message: toSubmit }));
        setContactFlowStep('ready');
      }
      inputRef.current?.focus();
      return;
    }

    const cmd = parseCommand(toSubmit);
    if (cmd === 'help') {
      setShowHelp(true);
      setShowStory(false);
      setUnknownCommand(false);
      setHelpFocusIndex(0);
      onBack();
    } else if (cmd === 'story') {
      setShowHelp(false);
      setShowStory(true);
      setUnknownCommand(false);
      setStoryFocusIndex(0);
      onBack();
    } else if (cmd === 'menu') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setMenuVisible((v) => !v);
      setMenuFocusIndex(0);
    } else if (cmd === 'prefs') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setPrefsVisible((v) => !v);
      setPrefsFocusIndex(0);
    } else if (cmd === 'theme-light') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setTheme('light');
    } else if (cmd === 'theme-dark') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setTheme('dark');
    } else if (cmd === 'lang-en') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setLang('en');
    } else if (cmd === 'lang-ar') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      setLang('ar');
    } else if (cmd !== 'unknown') {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(false);
      onOpenSection(cmd);
    } else {
      setShowHelp(false);
      setShowStory(false);
      setUnknownCommand(true);
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selectedSection) inputRef.current?.focus();
  }, [selectedSection]);

  const SECTIONS_FIRST_COUNT = SECTIONS.length; // sections first (indices 0-6)
  const HELP_CMD_COUNT = 5; // \help, \story, \menu, \prefs, open [section]
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
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (helpFocusIndex < SECTIONS_FIRST_COUNT) {
          setShowHelp(false);
          onOpenSection(SECTIONS[helpFocusIndex]);
        } else if (helpFocusIndex === SECTIONS_FIRST_COUNT + 1) {
          setShowHelp(false);
          setShowStory(true);
        } else if (helpFocusIndex === SECTIONS_FIRST_COUNT + 2) {
          setShowHelp(false);
          setMenuVisible((v) => !v);
        } else if (helpFocusIndex === SECTIONS_FIRST_COUNT + 3) {
          setShowHelp(false);
          setPrefsVisible((v) => !v);
        } else if (helpFocusIndex === helpItemCount - 1) {
          setShowHelp(false);
        }
        // SECTIONS_FIRST_COUNT (\help) and SECTIONS_FIRST_COUNT+4 (open [section]) are no-op
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showHelp, helpFocusIndex, helpItemCount, SECTIONS_FIRST_COUNT, onOpenSection]);

  useEffect(() => {
    if (!showMenuBelowPrompt || menuItemCount === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target === inputRef.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setMenuFocusIndex((i) => (i + 1) % menuItemCount);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setMenuFocusIndex((i) => (i - 1 + menuItemCount) % menuItemCount);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setShowHelp(false);
        setShowStory(false);
        setUnknownCommand(false);
        onOpenSection(menuItems[menuFocusIndex]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showMenuBelowPrompt, menuFocusIndex, menuItemCount, menuItems, onOpenSection]);

  useEffect(() => {
    if (!showStory) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target === inputRef.current) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setStoryFocusIndex((i) => Math.min(i + 1, storyItemCount - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setStoryFocusIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (storyFocusIndex < SECTIONS.length) {
          setShowStory(false);
          onOpenSection(SECTIONS[storyFocusIndex]);
        } else {
          setShowStory(false);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showStory, storyFocusIndex, storyItemCount, onOpenSection]);

  useEffect(() => {
    if (!prefsVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target === inputRef.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPrefsFocusIndex((i) => (i + 1) % prefsItemCount);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPrefsFocusIndex((i) => (i - 1 + prefsItemCount) % prefsItemCount);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (prefsFocusIndex === 0) toggleTheme();
        else toggleLang();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prefsVisible, prefsFocusIndex, prefsItemCount, toggleTheme, toggleLang]);

  useEffect(() => {
    if (!selectedSection) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedSection, onBack]);

  useEffect(() => {
    if (!selectedSection || !isExpandableSection(selectedSection)) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown') return;
      if (document.activeElement !== inputRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      inputRef.current?.blur();
      sectionLinesRef.current?.focusFirst();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [selectedSection]);

  return (
    <div className="min-h-full-viewport min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="section-container flex-1 flex flex-col justify-center py-6 sm:py-8 md:py-12 min-h-0 overflow-y-auto pb-[68px] sm:pb-0">
        <div
          className="content-width space-y-4 sm:space-y-6 py-4 px-4 sm:py-4 sm:px-5"
          style={{
            fontFamily: 'var(--font-mono)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.25rem',
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-2 gap-y-1 min-h-[44px] text-[0.8rem] sm:text-[0.75rem] md:text-[0.9rem]">
            <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? '$' : '~'}</span>
            <span style={{ color: 'var(--color-primary)' }}>{site.initials}</span>
            <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? ' ~' : ' $'}</span>
            <span className="flex-1 min-w-0 sm:min-w-[120px] flex items-center">
              <span className="flex items-center min-w-0 flex-1 relative" style={{ fontFamily: 'var(--font-mono)', fontSize: 'inherit' }}>
                {!inputValue && (
                  <span
                    className="cursor-blink inline-block w-[0.6em] h-[1em] mr-0.5 align-text-bottom flex-shrink-0 pointer-events-none"
                    style={{ backgroundColor: 'var(--color-terminal)' }}
                    aria-hidden
                  />
                )}
                <span className="pointer-events-none" style={{ color: inputValue ? 'var(--color-text)' : 'var(--color-text-muted)', opacity: inputValue ? 1 : 0.5 }}>
                  {inputValue || effectivePlaceholder}
                </span>
                {inputValue && (
                  <span
                    className="cursor-blink inline-block w-[0.6em] h-[1em] ml-0.5 align-text-bottom flex-shrink-0 pointer-events-none"
                    style={{ backgroundColor: 'var(--color-terminal)' }}
                    aria-hidden
                  />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
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

          {selectedSection && !['experience', 'skills', 'projects'].includes(selectedSection) && (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] px-3 sm:min-h-0 sm:px-0 transition-colors hover:opacity-80 touch-manipulation flex items-center"
              style={{ color: 'var(--color-terminal)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
              aria-label={tr.aria.back}
            >
              {tr.prompt.back}
            </button>
          )}

          {bootComplete && !menuVisible && !selectedSection && (
            <p className="text-[0.7rem] sm:text-[0.8rem] mb-1" style={{ color: 'var(--color-terminal)', fontFamily: 'var(--font-mono)' }}>
              {tr.prompt.welcomeMessage}
            </p>
          )}

          {prefsVisible && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] sm:text-[0.75rem]">
              <span style={{ color: 'var(--color-text-muted)' }}>//</span>
              <button
                type="button"
                onClick={toggleTheme}
                onMouseEnter={() => setPrefsFocusIndex(0)}
                className="px-3 py-2.5 sm:px-2.5 sm:py-1 min-h-[44px] sm:min-h-0 transition-colors hover:border-[var(--color-terminal)] hover:text-[var(--color-primary)] touch-manipulation"
                style={{
                  ...promptStyle,
                  borderColor: prefsFocusIndex === 0 ? 'var(--color-primary)' : undefined,
                  backgroundColor: prefsFocusIndex === 0 ? 'var(--color-surface)' : undefined,
                }}
                aria-label={theme === 'dark' ? tr.aria.themeToLight : tr.aria.themeToDark}
              >
                $ theme [{theme}]
              </button>
              <button
                type="button"
                onClick={toggleLang}
                onMouseEnter={() => setPrefsFocusIndex(1)}
                className="px-3 py-2.5 sm:px-2.5 sm:py-1 min-h-[44px] sm:min-h-0 transition-colors hover:border-[var(--color-terminal)] hover:text-[var(--color-primary)] touch-manipulation"
                style={{
                  ...promptStyle,
                  borderColor: prefsFocusIndex === 1 ? 'var(--color-primary)' : undefined,
                  backgroundColor: prefsFocusIndex === 1 ? 'var(--color-surface)' : undefined,
                }}
                aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
              >
                $ lang [{lang === 'en' ? 'EN' : 'عربي'}]
              </button>
            </div>
          )}
          {showMenuBelowPrompt && (
            <>
              <p className="text-[0.6rem] sm:text-[0.7rem]" style={{ color: 'var(--color-text-muted)' }}>
                {tr.prompt.menuHint}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {menuItems.map((item, idx) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setShowHelp(false); setShowStory(false); setUnknownCommand(false); onOpenSection(item); }}
                    onMouseEnter={() => setMenuFocusIndex(idx)}
                    className="px-3 py-2.5 sm:px-4 min-h-[44px] sm:min-h-0 text-[0.7rem] sm:text-[0.8rem] transition-colors border touch-manipulation"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-terminal)',
                      borderColor: menuFocusIndex === idx ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: menuFocusIndex === idx ? 'var(--color-surface)' : 'transparent',
                    }}
                  >
                    [{navLabel(item)}]
                  </button>
                ))}
              </div>
            </>
          )}

          {showHelp && (
            <div className="mt-4 sm:mt-8 space-y-1 overflow-y-auto" style={lineStyle}>
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
                    className="text-left w-full transition-colors hover:opacity-100 touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:block"
                    style={{
                      color: focused ? 'var(--color-terminal)' : 'var(--color-text-muted)',
                      background: focused ? 'var(--color-surface)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'inherit',
                      padding: '0.5rem 0',
                    }}
                  >
                    {focused ? '> ' : '    '}{id}
                  </button>
                );
              })}
              <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>  {tr.prompt.commandsLabel}</div>
              {[
                { label: tr.prompt.helpShowHelp, action: () => {}, index: SECTIONS_FIRST_COUNT },
                { label: tr.prompt.helpStory, action: () => { setShowHelp(false); setShowStory(true); }, index: SECTIONS_FIRST_COUNT + 1 },
                { label: tr.prompt.helpMenu, action: () => { setShowHelp(false); setMenuVisible((v) => !v); }, index: SECTIONS_FIRST_COUNT + 2 },
                { label: tr.prompt.helpPrefs, action: () => { setShowHelp(false); setPrefsVisible((v) => !v); }, index: SECTIONS_FIRST_COUNT + 3 },
                { label: tr.prompt.helpOpenSection, action: () => {}, index: SECTIONS_FIRST_COUNT + 4 },
              ].map((item) => {
                const focused = helpFocusIndex === item.index;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={item.action}
                    onMouseEnter={() => setHelpFocusIndex(item.index)}
                    className="text-left w-full transition-colors hover:opacity-100 touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:block"
                    style={{
                      color: focused ? 'var(--color-terminal)' : 'var(--color-text-muted)',
                      background: focused ? 'var(--color-surface)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'inherit',
                      padding: '0.5rem 0',
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
                className="mt-4 block w-full text-left transition-colors hover:opacity-100 touch-manipulation min-h-[44px] flex items-center sm:min-h-0"
                style={{
                  color: 'var(--color-terminal)',
                  background: helpFocusIndex === helpItemCount - 1 ? 'var(--color-surface)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '0.5rem 0',
                }}
              >
                {tr.prompt.back}
              </button>
            </div>
          )}

          {showStory && (
            <div className="mt-4 sm:mt-8 space-y-1 overflow-y-auto" style={lineStyle}>
              {tr.story.narrative.map((line, i) => (
                <p key={i} style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {line}
                </p>
              ))}
              <p style={{ color: 'var(--color-terminal)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                {tr.story.question}
              </p>
              {SECTIONS.map((id, idx) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setShowStory(false); onOpenSection(id); }}
                  onMouseEnter={() => setStoryFocusIndex(idx)}
                  className="text-left w-full transition-colors hover:opacity-100 touch-manipulation min-h-[44px] flex items-center sm:min-h-0 sm:block"
                  style={{
                    color: storyFocusIndex === idx ? 'var(--color-terminal)' : 'var(--color-text-muted)',
                    background: storyFocusIndex === idx ? 'var(--color-surface)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'inherit',
                    padding: '0.5rem 0',
                  }}
                >
                  {(storyFocusIndex === idx ? '> ' : '    ')}{navLabel(id)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowStory(false)}
                onMouseEnter={() => setStoryFocusIndex(SECTIONS.length)}
                className="mt-4 block w-full text-left transition-colors hover:opacity-100 touch-manipulation min-h-[44px] flex items-center sm:min-h-0"
                style={{
                  color: 'var(--color-terminal)',
                  background: storyFocusIndex === SECTIONS.length ? 'var(--color-surface)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '0.5rem 0',
                }}
              >
                {tr.prompt.back}
              </button>
            </div>
          )}

          {selectedSection === 'contact' && !showHelp && !showStory && (
            <div className="mt-8 space-y-0.5" style={lineStyle}>
              <div style={{ color: 'var(--color-terminal)' }}>{`> ${tr.contact.flowPrompt}`}</div>
              <div style={{ color: 'var(--color-terminal)' }}>{`> ${tr.contact.nameQuestion}`}</div>
              {contactFormData.name && (
                <div style={{ color: 'var(--color-text-secondary)' }}>{`  ${contactFormData.name}`}</div>
              )}
              <div style={{ color: 'var(--color-terminal)' }}>{`> ${tr.contact.emailQuestion}`}</div>
              {contactFormData.email && (
                <div style={{ color: 'var(--color-text-secondary)' }}>{`  ${contactFormData.email}`}</div>
              )}
              <div style={{ color: 'var(--color-terminal)' }}>{`> ${tr.contact.messageQuestion}`}</div>
              {contactFormData.message && (
                <div style={{ color: 'var(--color-text-secondary)' }}>{`  ${contactFormData.message}`}</div>
              )}
              {contactFlowStep === 'ready' && (
                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleContactSend}
                    disabled={contactSubmitStatus === 'sending'}
                    className="flex items-center gap-2 min-h-[44px] sm:min-h-0 px-3 py-2 rounded border transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-bg)',
                      background: 'var(--color-terminal)',
                      borderColor: 'var(--color-terminal)',
                    }}
                    aria-label={tr.contact.send}
                  >
                    <Send className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{contactSubmitStatus === 'sending' ? tr.contact.sending : tr.contact.send}</span>
                  </button>
                  {contactSubmitStatus === 'error' && (
                    <div style={{ color: 'var(--color-hp)', marginTop: '0.5rem', fontSize: '0.7rem' }}>{tr.contact.errorMsg}</div>
                  )}
                </div>
              )}
              {contactFlowStep === 'done' && (
                <div
                  style={{
                    color: contactSubmitStatus === 'success' ? 'var(--color-terminal)' : contactSubmitStatus === 'error' ? 'var(--color-hp)' : 'var(--color-text-secondary)',
                    marginTop: '0.5rem',
                  }}
                >
                  {contactSubmitStatus === 'sending' && `  ${tr.contact.sending}`}
                  {contactSubmitStatus === 'success' && `  ${tr.contact.successMsg}`}
                  {contactSubmitStatus === 'error' && `  ${tr.contact.errorMsg}`}
                </div>
              )}
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ color: 'var(--color-terminal)', marginBottom: '0.5rem' }}>{`> ${tr.contact.infoHeading}`}</div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-terminal)' }}>{tr.contact.emailLabel}:</span>{' '}
                  <a href={`mailto:${site.email}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{site.email}</a>
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-terminal)' }}>{tr.contact.phoneLabel}:</span>{' '}
                  <a href={`tel:${site.phone}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{site.phone}</a>
                </div>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-terminal)' }}>{tr.contact.locationLabel}:</span> {site.location}
                </div>
                <div className="flex gap-3 mt-2" style={{ marginTop: '0.5rem' }}>
                  {[
                    { Icon: Github, href: site.socialLinks.find((l) => l.platform === 'github')?.url ?? '#', label: 'GitHub' },
                    { Icon: Linkedin, href: site.socialLinks.find((l) => l.platform === 'linkedin')?.url ?? '#', label: 'LinkedIn' },
                    { Icon: Mail, href: `mailto:${site.email}`, label: 'Email' },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }} aria-label={label}>
                      <Icon className="h-3.5 w-3.5" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSection && selectedSection !== 'contact' && !showHelp && !showStory && (
            <ConsoleSectionLines
              ref={sectionLinesRef}
              sectionId={selectedSection}
              onBack={onBack}
              embedded
              animateLineByLine
              hideBackButton={!isExpandableSection(selectedSection)}
              onArrowUpAtFirst={isExpandableSection(selectedSection) ? () => inputRef.current?.focus() : undefined}
            />
          )}
        </div>
      </div>

      <footer className="flex-shrink-0 py-3 sm:py-4 border-t" style={{ borderColor: 'var(--color-border)', paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[0.35rem] xs:text-[0.4rem] sm:text-[0.5rem]" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
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
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors touch-manipulation"
                aria-label={href}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="sm:hidden">
        <MobileBottomNav
          selectedSection={selectedSection}
          onBack={onBack}
          isMenuOpen={mobileMenuOpen}
          onToggleMenu={() => setMobileMenuOpen((o) => !o)}
        />
        <MobileMenuOverlay
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenSection={(id) => {
            onOpenSection(id);
            setMobileMenuOpen(false);
          }}
        />
      </div>
    </div>
  );
};
