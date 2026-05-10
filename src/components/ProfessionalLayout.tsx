import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Code2, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { About } from './About';
import { Contact } from './Contact';
import { Education } from './Education';
import { Experience } from './Experience';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { ThemeToggle } from './ThemeToggle';
import { ViewModeToggle } from './ViewModeToggle';
import { useLang } from '../context/LanguageContext';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTheme } from '../hooks/useTheme';
import { useViewMode } from '../hooks/useViewMode';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'] as const;

const SIDEBAR_ID = 'professional-nav-sidebar';

/** Viewports up through iPad Pro 12.9" landscape — sidebar + menu button only. */
const COMPACT_NAV_QUERY = '(max-width: 1365px)';

export const ProfessionalLayout: React.FC = () => {
  const { lang, toggle: toggleLang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang);
  const { theme, toggle: toggleTheme } = useTheme();
  const { viewMode, toggle: toggleViewMode } = useViewMode();
  const isCompactNav = useMediaQuery(COMPACT_NAV_QUERY);

  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;
  const [activeSection, setActiveSection] = useState<(typeof SECTION_IDS)[number]>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const sectionIds = useMemo(() => [...SECTION_IDS], []);

  useEffect(() => {
    if (!isCompactNav) setSidebarOpen(false);
  }, [isCompactNav]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id as (typeof SECTION_IDS)[number]);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-20% 0px -65% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!sidebarOpen || !isCompactNav) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen, isCompactNav]);

  useEffect(() => {
    if (!sidebarOpen || !isCompactNav) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen, isCompactNav]);

  useEffect(() => {
    if (!sidebarOpen || !isCompactNav) return undefined;
    const id = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [sidebarOpen, isCompactNav]);

  const navLinks = SECTION_IDS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      className={`stitch-nav-link ${activeSection === id ? 'stitch-nav-link-active' : ''}`}
    >
      {navLabel(id)}
    </a>
  ));

  const sidebarLinks = SECTION_IDS.map((id) => (
    <a
      key={`sb-${id}`}
      href={`#${id}`}
      onClick={closeSidebar}
      className={`stitch-sidebar-link ${activeSection === id ? 'stitch-sidebar-link-active' : ''}`}
    >
      {navLabel(id)}
    </a>
  ));

  return (
    <div
      className="min-h-full-viewport min-h-screen min-h-[100dvh] flex flex-col overflow-x-hidden w-full"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl professional-header w-full">
        <div className="w-full max-w-[min(100%,var(--content-width))] mx-auto px-3 sm:px-6 lg:px-8 min-w-0 box-border">
          <div className={`stitch-header-row1 flex items-center justify-between h-14 gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 min-w-0 flex-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              {isCompactNav && (
                <button
                  type="button"
                  className="shrink-0 flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
                  style={{
                    color: 'var(--color-primary)',
                    borderColor: 'color-mix(in srgb, var(--color-border) 45%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
                  }}
                  aria-expanded={sidebarOpen}
                  aria-controls={SIDEBAR_ID}
                  onClick={() => setSidebarOpen((o) => !o)}
                  aria-label={sidebarOpen ? tr.aria.closeMenu : tr.aria.openMenu}
                >
                  {sidebarOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                </button>
              )}
              <a href="#home" onClick={closeSidebar} className="flex items-center gap-2 min-w-0 group" style={{ color: 'var(--color-text)' }}>
                <Code2 className="w-5 h-5 shrink-0 text-[var(--color-primary)]" aria-hidden />
                <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight truncate" style={{ fontFamily: 'var(--font-sans)' }}>
                  {site.name}
                </span>
              </a>
            </div>
            <div className={`flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <ViewModeToggle viewMode={viewMode} toggle={toggleViewMode} />
              <ThemeToggle theme={theme} toggle={toggleTheme} />
              <button
                type="button"
                onClick={toggleLang}
                className="px-2 py-1.5 text-xs font-semibold rounded-lg border transition-colors shrink-0"
                style={{
                  color: 'var(--color-text-secondary)',
                  borderColor: 'color-mix(in srgb, var(--color-border) 45%, transparent)',
                }}
                aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              {!isCompactNav && (
                <a href="#contact" onClick={closeSidebar} className="stitch-pro-cta no-underline inline-flex items-center shrink-0">
                  {tr.nav.contact}
                </a>
              )}
            </div>
          </div>
          {!isCompactNav && (
            <nav className="stitch-nav-strip pb-2" aria-label="Main sections">
              {navLinks}
            </nav>
          )}
        </div>
      </header>

      {isCompactNav && (
        <>
          <div
            className={`stitch-sidebar-overlay transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            onClick={closeSidebar}
            aria-hidden={!sidebarOpen}
          />
          <aside
            id={SIDEBAR_ID}
            role="dialog"
            aria-modal="true"
            aria-label={tr.ui.navSidebarTitle}
            aria-hidden={!sidebarOpen}
            className={`stitch-sidebar-panel ${sidebarOpen ? 'translate-x-0' : 'pointer-events-none ltr:-translate-x-full rtl:translate-x-full'}`}
          >
            <div
              className={`flex items-center justify-between gap-2 px-4 py-3 border-b shrink-0 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
              style={{ borderColor: 'color-mix(in srgb, var(--color-border) 40%, transparent)' }}
            >
              <p className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}>
                {tr.ui.navSidebarTitle}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeSidebar}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label={tr.aria.closeMenu}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3 min-h-0" aria-label="Main sections">
              {sidebarLinks}
            </nav>
            <div className="p-3 pt-0 shrink-0 border-t" style={{ borderColor: 'color-mix(in srgb, var(--color-border) 35%, transparent)' }}>
              <a href="#contact" onClick={closeSidebar} className="stitch-pro-cta no-underline flex w-full items-center justify-center py-3">
                {tr.nav.contact}
              </a>
            </div>
          </aside>
        </>
      )}

      <main className="flex-1 min-w-0 w-full flex flex-col">
        <div className="pro-stitch-main flex-1 w-full space-y-4 md:space-y-8">
          <div id="home">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="education">
            <Education />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </div>
      </main>

      <footer className="border-t py-10 md:py-12 shrink-0" style={{ borderColor: 'color-mix(in srgb, var(--color-border) 35%, transparent)' }}>
        <div className="pro-stitch-main flex flex-col items-center gap-8 md:gap-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 min-w-0">
            <div className={`flex flex-col gap-2 text-center min-w-0 ${lang === 'ar' ? 'md:text-end' : 'md:text-start'}`}>
              <span className="text-lg font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
                {site.name}
              </span>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
                © {new Date().getFullYear()} {site.name}. {tr.footer.rights}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              {[
                { Icon: Github, href: 'https://github.com/AbdulrahmanAbdulqawi', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrahman-abdulqawi', label: 'LinkedIn' },
                { Icon: Mail, href: `mailto:${site.email}`, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stitch-footer-icon"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
