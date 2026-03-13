import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Mail, Phone };

export const Hero: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).hero;

  const fullName = site.name;
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [fullName]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const aria = t(lang).aria;
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]"
      aria-label={aria.home}
    >
      <div className="section-container py-12 sm:py-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-16">
          <div className="shrink-0">
            <div className="card p-1">
              <img
                src="/profile.jpg"
                alt={site.name}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-start">
            <p
              className="text-[0.5rem] sm:text-[0.6rem] mb-3"
              style={{ color: 'var(--color-terminal)', fontFamily: 'var(--font-mono)' }}
            >
              {'$ echo "' + tr.greeting + '"'}
            </p>

            <h1
              className="text-sm sm:text-lg md:text-2xl leading-relaxed break-words"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pixel)' }}
            >
              {displayed}
              <span
                className="inline-block w-[0.6em] h-[1em] ml-1 align-text-bottom"
                style={{
                  backgroundColor: showCursor ? 'var(--color-primary)' : 'transparent',
                }}
              />
            </h1>

            <p
              className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{'> '}</span>
              {site.tagline}
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              {site.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-neon)] transition-colors duration-200"
                    aria-label={link.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
