import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { BootScreen } from './components/BootScreen';
import { ConsoleWindow } from './components/ConsoleWindow';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { LanguageProvider } from './context/LanguageContext';
import { siteConfig } from './data/site';
import { t } from './data/translations';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();

  const site = siteConfig[lang];
  const tr = t(lang);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = site.navItems;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [site.navItems]);

  const navLabel = (key: string) => {
    return (tr.nav as Record<string, string>)[key] || key;
  };

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang }}>
      <div className="min-h-screen scanlines" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <BootScreen />
        {/* Terminal command bar */}
        <nav
          className={`fixed w-full z-50 transition-all duration-200 ${scrolled ? 'shadow-lg' : ''}`}
          style={{
            backgroundColor: scrolled ? 'var(--color-surface)' : 'var(--color-bg)',
            borderBottom: '2px solid var(--color-border)',
          }}
        >
          <div className="section-container">
            <div className="flex items-center h-14">
              <button
                onClick={() => scrollToSection('home')}
                className="text-[0.6rem] sm:text-[0.65rem] shrink-0 flex items-center gap-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? '$' : '~'}</span>
                <span style={{ color: 'var(--color-primary)' }}>{site.initials}</span>
                <span style={{ color: 'var(--color-nav-item)' }}>{lang === 'ar' ? ' ~' : ' $'}</span>
              </button>

              <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
                {site.navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="px-2.5 py-1.5 text-[0.55rem] transition-colors duration-100"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: activeSection === item ? 'var(--color-terminal)' : 'var(--color-nav-item)',
                      backgroundColor: activeSection === item ? 'rgba(0,255,136,0.08)' : 'transparent',
                      borderBottom: activeSection === item ? '2px solid var(--color-terminal)' : '2px solid transparent',
                    }}
                  >
                    {activeSection === item && <span style={{ color: 'var(--color-terminal)' }}>&gt; </span>}
                    [{navLabel(item)}]
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-2 shrink-0">
                <LanguageToggle lang={lang} toggle={toggleLang} />
                <ThemeToggle theme={theme} toggle={toggleTheme} />
              </div>

              <div className="md:hidden flex items-center gap-2 ml-auto">
                <LanguageToggle lang={lang} toggle={toggleLang} />
                <ThemeToggle theme={theme} toggle={toggleTheme} />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2"
                  style={{ color: 'var(--color-nav-item)' }}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden"
                style={{ backgroundColor: 'var(--color-surface)', borderTop: '2px solid var(--color-border)' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="section-container py-2 space-y-0.5">
                  {site.navItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="block w-full px-3 py-2 text-[0.6rem] transition-colors"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        color: activeSection === item ? 'var(--color-terminal)' : 'var(--color-nav-item)',
                      }}
                    >
                      {activeSection === item && <span style={{ color: 'var(--color-terminal)' }}>&gt; </span>}
                      [{navLabel(item)}]
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main className="pt-14 flex flex-col gap-0">
          <ConsoleWindow id="home" title="~/">
            <Hero />
          </ConsoleWindow>
          <ConsoleWindow id="about" title="~/about">
            <About />
          </ConsoleWindow>
          <ConsoleWindow id="experience" title="~/experience">
            <Experience />
          </ConsoleWindow>
          <ConsoleWindow id="skills" title="~/skills">
            <Skills />
          </ConsoleWindow>
          <ConsoleWindow id="projects" title="~/projects">
            <Projects />
          </ConsoleWindow>
          <ConsoleWindow id="education" title="~/education">
            <Education />
          </ConsoleWindow>
          <ConsoleWindow id="contact" title="~/contact">
            <Contact />
          </ConsoleWindow>
        </main>

        <footer
          className="py-8"
          style={{ backgroundColor: 'var(--color-surface)', borderTop: '2px solid var(--color-border)' }}
        >
          <div className="section-container flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[0.4rem] sm:text-[0.5rem] text-center md:text-left" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-pixel)' }}>
              &copy; {new Date().getFullYear()} {site.name} <span style={{ color: 'var(--color-neon)' }}>// {tr.footer.rights}</span>
            </p>
            <div className="flex gap-5">
              {[
                { Icon: Github, href: 'https://github.com/AbdulrahmanAbdulqawi' },
                { Icon: Linkedin, href: 'https://linkedin.com/in/abdulrahman-abdulqawi' },
                { Icon: Mail, href: `mailto:${site.email}` },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}

export default App;
