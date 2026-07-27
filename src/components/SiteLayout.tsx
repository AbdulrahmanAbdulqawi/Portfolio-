import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { useIsMobile } from '../hooks/useIsMobile';
import { t } from '../data/translations';
import { ThemeSwitch } from './ThemeSwitch';
import { ConsoleOverlay } from './ConsoleOverlay';

const NAV_ITEMS = ['work', 'experience', 'stack', 'about', 'contact', 'blog'] as const;

const PERSON_LD_ID = 'portfolio-person-jsonld';

export function SiteLayout() {
  const { lang, setLang } = useLang();
  const { content, loading } = useContent();
  const site = content.site[lang];
  const tr = t(lang);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName ?? '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '~' || e.key === '`') {
        e.preventDefault();
        setConsoleOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setConsoleOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    let script = document.getElementById(PERSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = PERSON_LD_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const origin = window.location.origin;
    const titleParts = site.title.split('|').map((s) => s.trim());
    const jobTitle = (titleParts.length > 1 ? titleParts[1] : site.tagline).slice(0, 160);
    const sameAs = site.socialLinks.filter((l) => l.url.startsWith('http')).map((l) => l.url);
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: `${origin}/`,
      jobTitle,
      sameAs,
      email: site.email,
    };
    script.textContent = JSON.stringify(payload);
    return () => {
      document.getElementById(PERSON_LD_ID)?.remove();
    };
  }, [lang, site]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `border-b py-1 transition-colors ${isActive ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]'}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <header
        className="sticky top-0 z-[100] border-b border-[var(--rule)] backdrop-blur-[14px]"
        style={{ background: 'var(--paper-fade)' }}
      >
        <div className="mx-auto flex min-h-[60px] max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-2 sm:px-6 lg:px-10">
          <NavLink
            to="/"
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault();
                setSidebarOpen((prev) => !prev);
              }
            }}
            aria-label={isMobile ? (sidebarOpen ? tr.aria.closeMenu : tr.aria.openMenu) : undefined}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-[13px] font-bold tracking-[0.08em] text-[var(--ink)]"
          >
            {isMobile && (sidebarOpen ? <X size={16} /> : <Menu size={16} />)}
            A.ABDULQAWI
          </NavLink>

          <nav className="hidden font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-2)] md:flex md:flex-wrap md:gap-x-6 md:gap-y-[10px]">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item} to={`/${item}`} className={navLinkClass}>
                {(tr.nav as Record<string, string>)[item]}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
              className="border border-[var(--rule)] px-2 py-1 font-mono text-xs text-[var(--ink-3)]"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              type="button"
              onClick={() => setConsoleOpen(true)}
              aria-label={tr.aria.openConsole}
              title={tr.aria.openConsole}
              className="border border-[var(--accent)] bg-transparent px-[9px] py-1 font-mono text-xs text-[var(--accent)]"
            >
              ~
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[140] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <nav
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 start-0 z-[150] flex w-[min(78vw,320px)] flex-col gap-1 border-e border-[var(--rule)] px-6 py-6 font-mono text-sm uppercase tracking-[0.1em] text-[var(--ink-2)] transition-transform duration-300 ease-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : lang === 'ar' ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{ background: 'var(--paper)' }}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink key={item} to={`/${item}`} className={({ isActive }) => `border-b py-3 transition-colors ${isActive ? 'text-[var(--accent)]' : 'border-[var(--rule-soft)] hover:text-[var(--accent)]'}`}>
            {(tr.nav as Record<string, string>)[item]}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">
            Loading…
          </div>
        ) : (
          <Outlet />
        )}

        <footer className="mb-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border border-t-0 border-[var(--rule)] px-5 py-8 sm:px-8 lg:px-12">
          <span className="font-mono text-xs text-[var(--ink-3)]">{site.footerCopyright}</span>
          <div className="flex gap-5 font-mono text-xs uppercase tracking-[0.1em]">
            <a
              href="https://github.com/AbdulrahmanAbdulqawi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink-2)] transition-colors hover:text-[var(--accent)]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/abdulrahman-abdulqawi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink-2)] transition-colors hover:text-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="text-[var(--ink-2)] transition-colors hover:text-[var(--accent)]">
              Email
            </a>
          </div>
        </footer>
      </main>

      <ConsoleOverlay open={consoleOpen} onClose={() => setConsoleOpen(false)} />
    </div>
  );
}
