import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { t } from '../data/translations';

export function Hero() {
  const { lang } = useLang();
  const { content } = useContent();
  const site = content.site[lang];
  const tr = t(lang).hero;

  return (
    <section className="flex flex-wrap border border-[var(--rule)]">
      <div className="ldg-rise flex-1 basis-[460px] min-w-0 border-e border-[var(--rule)] px-5 pb-12 pt-11 sm:px-8 sm:pb-12 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="mb-[30px] flex items-center gap-[11px]">
          <span className="relative inline-block h-[7px] w-[7px] rounded-full bg-[var(--accent)]">
            <span className="ldg-ping absolute inset-0 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            {site.availabilityLine}
          </span>
        </div>

        <h1 className="m-0 text-[clamp(38px,6.2vw,82px)] font-bold leading-[0.95] tracking-[-0.042em] text-[var(--ink)] rtl:text-[clamp(32px,5.4vw,70px)] rtl:leading-[1.2]">
          {site.heroHeadlineLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>

        <p className="mt-[30px] max-w-[540px] font-serif text-[22px] leading-[1.5] text-[var(--ink-2)]">
          {site.heroSubline}
        </p>

        <div className="mt-[38px] flex flex-wrap gap-3">
          <Link
            to="/work"
            className="inline-flex items-center gap-[10px] bg-[var(--ink)] px-[26px] py-[15px] text-[15px] font-semibold text-[var(--paper)] transition-transform duration-[180ms] ease-out hover:-translate-y-0.5"
          >
            {tr.ctaWork}
            <ArrowRight className="h-4 w-4 rtl:scale-x-[-1]" strokeWidth={2.2} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center border border-[var(--ink)] px-[26px] py-[15px] text-[15px] font-semibold text-[var(--ink)] transition-colors duration-[180ms] ease-out hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            {tr.ctaContact}
          </Link>
        </div>
      </div>

      <div className="relative min-h-[clamp(300px,40vw,560px)] flex-1 basis-[320px] bg-[var(--panel)]">
        <img
          src={site.heroImage || '/profile.jpg'}
          alt={site.name}
          className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.12)_brightness(var(--img-bright))] [mix-blend-mode:var(--img-blend)]"
        />
        <div className="absolute inset-0 bg-[var(--img-tint)] [mix-blend-mode:var(--img-blend)]" />
      </div>
    </section>
  );
}
