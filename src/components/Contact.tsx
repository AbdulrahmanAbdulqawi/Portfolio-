import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const { content } = useContent();
  const site = content.site[lang];
  const tr = t(lang).contact;
  const aria = t(lang).aria;
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

  const rowClass =
    'flex min-w-0 items-baseline justify-between gap-4 border-t border-[var(--rule-soft)] py-4 transition-colors hover:text-[var(--accent)]';

  return (
    <section className="border border-[var(--rule)] px-5 py-8 pb-16 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent)]">05</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{site.contactMeta}</span>
      </div>

      <div className="flex flex-wrap gap-8 border-t border-[var(--ink)] pt-10 lg:gap-14">
        <div className="min-w-0 flex-1 basis-[400px]">
          <h3 className="m-0 mb-5 max-w-[520px] text-[clamp(30px,4.4vw,44px)] font-bold leading-[1.08] tracking-[-0.032em]">
            {lang === 'ar' ? 'أخبرني بما تبنيه.' : "Tell me what you're building."}
          </h3>
          <p className="m-0 mb-9 max-w-[500px] font-serif text-xl leading-[1.6] text-[var(--ink-2)]">
            {site.contactIntro}
          </p>

          <a href={`mailto:${site.email}`} className={`${rowClass} border-t-[var(--rule)]`}>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{tr.emailLabel}</span>
            <span className="min-w-0 break-all text-end text-lg font-semibold" dir="ltr">{site.email}</span>
          </a>
          <a href={`tel:${site.phone}`} className={rowClass}>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{tr.phoneLabel}</span>
            <span className="min-w-0 break-words text-end text-lg font-semibold" dir="ltr">{site.phone}</span>
          </a>
          <div className={`${rowClass} hover:text-inherit`}>
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{tr.locationLabel}</span>
            <span className="min-w-0 break-words text-end text-lg font-semibold">{site.location}</span>
          </div>
          {site.resumeUrl && (
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={aria.resumePdf}
              className={`${rowClass} border-b border-[var(--rule)]`}
            >
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{tr.resumeLabel}</span>
              <span className="min-w-0 break-words text-end text-lg font-semibold text-[var(--accent)]">{tr.downloadPdf}</span>
            </a>
          )}
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="box-border flex min-w-0 flex-1 basis-[360px] max-w-[520px] flex-col gap-[22px] border border-[var(--rule)] bg-[var(--panel)] p-8"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="flex flex-col gap-2">
            <label htmlFor="ldg-name" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              {tr.nameLabel}
            </label>
            <input
              id="ldg-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'sending'}
              autoComplete="name"
              className="w-full border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ldg-email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              {tr.emailLabel}
            </label>
            <input
              id="ldg-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'sending'}
              autoComplete="email"
              className="w-full border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="ldg-msg" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              {tr.messageLabel}
            </label>
            <textarea
              id="ldg-msg"
              name="message"
              rows={6}
              required
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'sending'}
              className="w-full resize-y border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[var(--ink)] py-4 text-[15px] font-semibold text-[var(--paper)] disabled:opacity-60"
          >
            {status === 'sending' ? tr.sending : tr.send}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm text-[var(--accent)]">
              <CheckCircle className="h-4 w-4 shrink-0" />
              {tr.successMsg}
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 text-sm" style={{ color: '#b91c1c' }}>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {tr.errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
