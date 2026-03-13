import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/site';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const site = siteConfig[lang];
  const tr = t(lang).contact;
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
    <section className="py-16 bg-[var(--color-bg)]" aria-label={t(lang).aria.contact}>
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-label">{tr.label}</h2>
          <p className="section-title">{tr.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="card p-5">
            <h3
              className="text-[0.5rem] sm:text-[0.6rem] mb-5"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
            >
              {tr.infoHeading}
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-xs sm:text-sm hover:text-[var(--color-primary)] transition-colors break-all"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                <Mail className="h-4 w-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 text-xs sm:text-sm hover:text-[var(--color-primary)] transition-colors"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                <Phone className="h-4 w-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                {site.phone}
              </a>
              <div
                className="flex items-center gap-3 text-xs sm:text-sm"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                <MapPin className="h-4 w-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                {site.location}
              </div>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="card p-5"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[0.5rem] mb-1"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                >
                  {tr.nameLabel}
                </label>
                <input
                  type="text" name="name" id="name" required
                  value={formData.name} onChange={handleChange}
                  disabled={status === 'sending'} className="input-field"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[0.5rem] mb-1"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                >
                  {tr.emailLabel}
                </label>
                <input
                  type="email" name="email" id="email" required
                  value={formData.email} onChange={handleChange}
                  disabled={status === 'sending'} className="input-field"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[0.5rem] mb-1"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-pixel)' }}
                >
                  {tr.messageLabel}
                </label>
                <textarea
                  name="message" id="message" rows={4} required
                  value={formData.message} onChange={handleChange}
                  disabled={status === 'sending'} className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>{tr.sending}<span className="cursor-blink">_</span></>
                ) : (
                  <><Send className="h-3 w-3" />{tr.send}</>
                )}
              </button>

              {status === 'success' && (
                <p className="flex items-center gap-2 text-[0.5rem]" style={{ color: 'var(--color-neon)', fontFamily: 'var(--font-pixel)' }}>
                  <CheckCircle className="h-3 w-3" />
                  {tr.successMsg}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-[0.5rem]" style={{ color: 'var(--color-hp)', fontFamily: 'var(--font-pixel)' }}>
                  <AlertCircle className="h-3 w-3" />
                  {tr.errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
