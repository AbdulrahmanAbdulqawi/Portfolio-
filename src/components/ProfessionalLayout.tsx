import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
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
import { useTheme } from '../hooks/useTheme';
import { useViewMode } from '../hooks/useViewMode';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'] as const;

export const ProfessionalLayout: React.FC = () => {
  const { lang, toggle: toggleLang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang);
  const { theme, toggle: toggleTheme } = useTheme();
  const { viewMode, toggle: toggleViewMode } = useViewMode();

  const navLabel = (key: string) => (tr.nav as Record<string, string>)[key] || key;

  return (
    <div className="min-h-full-viewport min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="sticky top-0 z-50 border-b backdrop-blur-md professional-header">
        <div className="section-container py-3 flex items-center justify-between gap-4">
          <a href="#home" className="font-semibold text-sm sm:text-base tracking-tight" style={{ color: 'var(--color-text)' }}>
            {site.name}
          </a>
          <nav className="hidden lg:flex items-center gap-4 text-sm">
            {SECTION_IDS.map((id) => (
              <a key={id} href={`#${id}`} className="professional-nav-link">
                {navLabel(id)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-0.5">
            <ViewModeToggle viewMode={viewMode} toggle={toggleViewMode} />
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <button
              type="button"
              onClick={toggleLang}
              className="p-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label={lang === 'en' ? tr.aria.langToAr : tr.aria.langToEn}
              title={lang === 'en' ? 'AR' : 'EN'}
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="education"><Education /></div>
        <div id="contact"><Contact /></div>
      </main>

      <footer className="border-t py-6" style={{ borderColor: 'var(--color-border)' }}>
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} {site.name}. {tr.footer.rights}
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: 'https://github.com/AbdulrahmanAbdulqawi' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrahman-abdulqawi' },
              { Icon: Mail, href: `mailto:${site.email}` },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="professional-social-link" aria-label={href}>
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
