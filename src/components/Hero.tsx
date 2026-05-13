import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, FileText, Github, Linkedin, Mail, Phone, Terminal } from 'lucide-react';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Mail, Phone };

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).hero;
  const trPortfolio = t(lang).portfolio;
  const aria = t(lang).aria;
  const reduce = useReducedMotion();

  const titleParts = site.title.split('|').map((s) => s.trim());
  const roleLine = titleParts.length > 1 ? titleParts[1] : site.tagline;

  const fadeUp = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      };

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.08 },
    },
  };

  const avatarPop = reduce
    ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
      };

  return (
    <section
      className="relative pt-12 pb-16 md:pt-24 md:pb-28 px-0 sm:px-4 md:px-6 overflow-hidden bg-[var(--color-bg)] w-full"
      aria-label={aria.home}
    >
      <motion.div
        aria-hidden
        className="absolute top-0 left-1/2 w-full max-w-[min(100vw,90rem)] h-[420px] md:h-[500px] rounded-full -z-0 pointer-events-none opacity-90"
        style={{
          background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
          filter: 'blur(120px)',
          x: '-50%',
        }}
        animate={
          reduce
            ? undefined
            : {
                x: ['-50%', 'calc(-50% + 24px)', 'calc(-50% - 18px)', '-50%'],
                y: [0, -10, 8, 0],
                scale: [1, 1.04, 0.98, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-32 right-[12%] w-72 h-72 rounded-full pointer-events-none -z-0 opacity-60 hidden md:block"
        style={{
          background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
          filter: 'blur(100px)',
        }}
        animate={
          reduce
            ? undefined
            : {
                x: [0, -30, 20, 0],
                y: [0, 18, -12, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-full mx-auto flex flex-col items-center text-center px-4 sm:px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={avatarPop} className="relative mb-8 group">
          <div
            className="absolute inset-0 rounded-full blur-2xl transition-colors group-hover:opacity-100 opacity-80"
            style={{ background: 'color-mix(in srgb, var(--color-primary) 22%, transparent)' }}
          />
          <motion.div
            aria-hidden
            className="absolute -inset-2 rounded-full pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0%, color-mix(in srgb, var(--color-primary) 55%, transparent) 25%, transparent 50%, color-mix(in srgb, var(--color-primary) 30%, transparent) 75%, transparent 100%)',
              WebkitMask:
                'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              opacity: 0.85,
            }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 p-1 overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]"
            style={{
              borderColor: 'color-mix(in srgb, var(--color-border) 45%, transparent)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <img
              src="/profile.jpg"
              alt={site.name}
              className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <motion.div
            className="absolute -bottom-2 -end-2 p-2 rounded-xl border stitch-shadow-floating transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--color-surface-hover)',
              borderColor: 'color-mix(in srgb, var(--color-border) 50%, transparent)',
            }}
            animate={reduce ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Terminal className="w-7 h-7 md:w-8 md:h-8" style={{ color: 'var(--color-primary)' }} aria-hidden />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Code2 className="w-5 h-5 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden />
          </div>
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border transition-shadow duration-300 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
            style={{
              color: 'var(--color-primary)',
              borderColor: 'color-mix(in srgb, var(--color-primary) 22%, transparent)',
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 6%, transparent)',
            }}
          >
            {tr.badgeAvailable}
          </span>
          {site.availabilityLine ? (
            <p
              className="text-sm md:text-base max-w-lg mx-auto leading-snug px-2"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
            >
              {site.availabilityLine}
            </p>
          ) : null}
          <h1 className="tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            <span
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
              style={{ color: 'var(--color-text)' }}
            >
              {site.name}
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 md:mt-3 text-[var(--color-text-secondary)]">
              {roleLine}
            </span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
          >
            {site.tagline}
          </p>
          {site.resumeUrl ? (
            <motion.a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold underline underline-offset-4 decoration-[color-mix(in_srgb,var(--color-primary)_55%,transparent)] hover:opacity-90 transition-opacity"
              style={{ color: 'var(--color-primary)' }}
              aria-label={aria.resumePdf}
              whileHover={reduce ? undefined : { y: -1 }}
            >
              <FileText className="w-4 h-4 shrink-0" aria-hidden />
              {trPortfolio.downloadResume}
            </motion.a>
          ) : null}
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-10 w-full max-w-md sm:max-w-none">
          <motion.a
            href="#projects"
            className="group stitch-shadow-cta flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--stitch-on-primary)',
            }}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            {tr.ctaProjects}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden />
          </motion.a>
          <motion.a
            href="#contact"
            className="stitch-hero-secondary-cta flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base w-full sm:w-auto border transition-all"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
              backgroundColor: 'transparent',
            }}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            {tr.ctaContact}
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
        >
          {site.socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            if (!Icon) return null;
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label={link.platform}
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon className="h-4 w-4 shrink-0" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};
