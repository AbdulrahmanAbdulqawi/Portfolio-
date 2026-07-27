import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { blogApi } from '../lib/blogApi';
import type { BlogPostSummary } from '../types';

export function Blog() {
  const { lang } = useLang();
  const tr = t(lang).blog;
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    blogApi
      .listPublic()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="flex items-baseline gap-4 pb-9">
        <span className="font-mono text-[13px] text-[var(--accent)]">06</span>
        <h2 className="m-0 text-[clamp(27px,3.6vw,38px)] font-bold tracking-[-0.03em]">{tr.title}</h2>
        {posts && posts.length > 0 && (
          <span className="ms-auto font-mono text-xs text-[var(--ink-3)]">{posts.length}</span>
        )}
      </div>

      {error && <p className="font-mono text-sm text-[var(--ink-3)]">{tr.loadError}</p>}

      {!error && posts && posts.length === 0 && (
        <p className="font-mono text-sm text-[var(--ink-3)]">{tr.empty}</p>
      )}

      {posts &&
        posts.map((post, i) => (
          <article
            key={post.id}
            className="flex flex-wrap gap-6 py-9 lg:gap-9"
            style={{
              borderTop: `1px solid ${i === 0 ? 'var(--ink)' : 'var(--rule)'}`,
              borderBottom: i === posts.length - 1 ? '1px solid var(--ink)' : undefined,
            }}
          >
            {post.coverImageUrl && (
              <div className="flex min-w-0 flex-1 basis-[260px] items-center justify-center border border-[var(--rule)] bg-[var(--panel)] max-w-[320px]">
                <img src={post.coverImageUrl} alt="" className="h-auto max-w-full" />
              </div>
            )}
            <div className="min-w-0 flex-[2] basis-[400px]">
              <p dir="ltr" className="m-0 mb-3 text-start font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                {new Date(post.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="m-0 text-[clamp(23px,3.2vw,34px)] font-bold leading-[1.13] tracking-[-0.028em]">
                {post.title[lang]}
              </h3>
              <p className="mt-4 max-w-[580px] font-serif text-[19px] leading-[1.6] text-[var(--ink-2)]">
                {post.excerpt[lang]}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="mt-[18px] inline-block border-b border-[var(--accent)] font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
              >
                {tr.readMore}
              </Link>
            </div>
          </article>
        ))}
    </section>
  );
}
