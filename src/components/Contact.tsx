import React, { useRef, useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { t } from '../data/translations';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { apiClient } from '../lib/apiClient';
import { consultation } from '../data/consultation';
import { localizeDigits } from '../lib/numerals';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FormMode = 'message' | 'consultation';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const { content } = useContent();
  const site = content.site[lang];
  const tr = t(lang).contact;
  const aria = t(lang).aria;
  const offer = consultation[lang];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mode, setMode] = useState<FormMode>('message');
  const [topicIndex, setTopicIndex] = useState(0);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [sentMode, setSentMode] = useState<FormMode>('message');
  const formRef = useRef<HTMLFormElement>(null);
  const isConsultation = mode === 'consultation';

  const switchMode = (next: FormMode) => {
    setMode(next);
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const requestOffer = (index: number) => {
    setTopicIndex(index);
    switchMode('consultation');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    formRef.current?.querySelector<HTMLTextAreaElement>('#ldg-msg')?.focus({ preventScroll: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // Hidden honeypot: people never fill it, bots usually do. The API drops those silently.
    const botField = (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement | null)?.value ?? '';
    try {
      // The topic is sent in the visitor's language: it's what they picked, and it lands in the email subject.
      const topic = isConsultation ? offer.offers[topicIndex]?.title : undefined;
      await apiClient.post('/api/contact', { ...formData, topic, botField });
      setSentMode(mode);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const labelClass = 'font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]';
  const modeButtonClass = (active: boolean) =>
    `flex-1 py-2.5 text-sm font-semibold transition-colors ${
      active ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-[var(--paper)] text-[var(--ink-2)] hover:text-[var(--accent-text)]'
    }`;

  const rowClass =
    'flex min-w-0 items-baseline justify-between gap-4 border-t border-[var(--rule-soft)] py-4 transition-colors hover:text-[var(--accent-text)]';

  return (
    <section className="border border-[var(--rule)] px-5 py-8 pb-16 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent-text)]">05</span>
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
              <span className="min-w-0 break-words text-end text-lg font-semibold text-[var(--accent-text)]">{tr.downloadPdf}</span>
            </a>
          )}
        </div>

        <form
          ref={formRef}
          name="contact"
          onSubmit={handleSubmit}
          className="box-border flex min-w-0 flex-1 basis-[360px] max-w-[520px] scroll-mt-24 flex-col gap-[22px] border border-[var(--rule)] bg-[var(--panel)] p-6 sm:p-8"
        >
          <p className="hidden" aria-hidden="true">
            <label>
              Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="flex flex-col gap-2" role="radiogroup" aria-label={tr.modeLabel}>
            <span className={labelClass}>{tr.modeLabel}</span>
            <div className="flex border border-[var(--rule)]">
              <button
                type="button"
                role="radio"
                aria-checked={!isConsultation}
                onClick={() => switchMode('message')}
                disabled={status === 'sending'}
                className={modeButtonClass(!isConsultation)}
              >
                {tr.modeMessage}
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={isConsultation}
                onClick={() => switchMode('consultation')}
                disabled={status === 'sending'}
                className={`${modeButtonClass(isConsultation)} border-s border-[var(--rule)]`}
              >
                {tr.modeConsultation}
              </button>
            </div>
          </div>

          {isConsultation && (
            <div className="flex flex-col gap-2">
              <label htmlFor="ldg-topic" className={labelClass}>
                {tr.topicLabel}
              </label>
              <select
                id="ldg-topic"
                value={topicIndex}
                onChange={(e) => setTopicIndex(Number(e.target.value))}
                disabled={status === 'sending'}
                className="w-full border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
              >
                {offer.offers.map((o, i) => (
                  <option key={o.title} value={i}>
                    {o.title}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              {isConsultation ? tr.consultationMessageLabel : tr.messageLabel}
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
            {status === 'sending' ? tr.sending : isConsultation ? tr.sendConsultation : tr.send}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm text-[var(--accent-text)]">
              <CheckCircle className="h-4 w-4 shrink-0" />
              {sentMode === 'consultation' ? tr.consultationSuccess : tr.successMsg}
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

      <div className="mt-14 border-t border-[var(--ink)] pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pb-8">
          <h3 className="m-0 text-[clamp(26px,3.4vw,34px)] font-bold tracking-[-0.03em]">{offer.title}</h3>
          <span className="font-mono text-xs text-[var(--ink-3)]">{offer.format}</span>
        </div>
        <p className="m-0 mb-8 max-w-[640px] font-serif text-lg leading-[1.6] text-[var(--ink-2)]">{offer.intro}</p>

        <div className="grid grid-cols-1 border-s border-t border-[var(--rule)] md:grid-cols-3">
          {offer.offers.map((o, i) => (
            <div key={o.title} className="flex flex-col gap-3 border-b border-e border-[var(--rule)] p-6">
              <span className="font-mono text-[13px] text-[var(--accent-text)]">{localizeDigits(String(i + 1).padStart(2, '0'), lang)}</span>
              <h4 className="m-0 text-lg font-bold tracking-[-0.01em]">{o.title}</h4>
              <p className="m-0 flex-1 text-[15px] leading-[1.6] text-[var(--ink-2)]">{o.description}</p>
              <button
                type="button"
                onClick={() => requestOffer(i)}
                className="self-start pt-2 text-[15px] font-semibold text-[var(--accent-text)] hover:underline"
              >
                {tr.requestThis}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
