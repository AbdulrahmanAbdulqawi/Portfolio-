import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).contact;
  const trPortfolio = t(lang).portfolio;
  const aria = t(lang).aria;
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const form = e.currentTarget;
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  return (
    <section className="stitch-section bg-[var(--color-bg)]" aria-label={t(lang).aria.contact}>
      <div className="flex flex-col gap-12">
        <Reveal y={14}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="w-9 h-9 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                {tr.title}
              </h2>
            </div>
            <p className="text-base md:text-lg max-w-full sm:max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}>
              {tr.intro}
            </p>
            {site.resumeUrl ? (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:opacity-90 transition-opacity w-fit"
                style={{ color: 'var(--color-primary)' }}
                aria-label={aria.resumePdf}
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden />
                {trPortfolio.downloadResume}
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={`mailto:${site.email}`}
              className="stitch-contact-pill no-underline hover:opacity-95 transition-opacity"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 14%, transparent)' }}
              >
                <Mail className="w-5 h-5" style={{ color: 'var(--color-primary)' }} aria-hidden />
              </div>
              <div className="text-start min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                  {tr.emailLabel}
                </p>
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                  {site.email}
                </p>
              </div>
            </motion.a>
            <motion.a
              href={`tel:${site.phone}`}
              className="stitch-contact-pill no-underline hover:opacity-95 transition-opacity"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--stitch-tertiary) 14%, transparent)' }}
              >
                <Phone className="w-5 h-5" style={{ color: 'var(--stitch-tertiary)' }} aria-hidden />
              </div>
              <div className="text-start">
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                  {tr.phoneLabel}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {site.phone}
                </p>
              </div>
            </motion.a>
            <motion.div
              className="stitch-contact-pill"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.35, delay: 0.12 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--stitch-tertiary) 14%, transparent)' }}
              >
                <MapPin className="w-5 h-5" style={{ color: 'var(--stitch-tertiary)' }} aria-hidden />
              </div>
              <div className="text-start">
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                  {tr.locationLabel}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {site.location}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="stitch-contact-form space-y-5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium px-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {tr.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="input-field w-full"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm font-medium px-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {tr.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="input-field w-full"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium px-1" style={{ color: 'var(--color-text-secondary)' }}>
                {tr.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'sending'}
                className="input-field resize-none w-full"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 disabled:opacity-60"
              whileHover={reduce || status === 'sending' ? undefined : { scale: 1.02 }}
              whileTap={reduce || status === 'sending' ? undefined : { scale: 0.98 }}
            >
              {status === 'sending' ? (
                <>{tr.sending}</>
              ) : (
                <>
                  <span>{tr.send}</span>
                  <Send className="w-4 h-4 shrink-0" aria-hidden />
                </>
              )}
            </motion.button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-primary)' }}>
                <CheckCircle className="w-4 h-4 shrink-0" />
                {tr.successMsg}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-hp)' }}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                {tr.errorMsg}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};
