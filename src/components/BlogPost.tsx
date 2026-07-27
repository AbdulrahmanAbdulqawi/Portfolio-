import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { blogApi } from '../lib/blogApi';
import { ApiError } from '../lib/apiClient';
import type { BlogPostDetail as BlogPostDetailType } from '../types';

export function BlogPost() {
  const { lang } = useLang();
  const tr = t(lang).blog;
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetailType | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setPost(null);
    setNotFound(false);
    blogApi
      .getPublicBySlug(slug)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (notFound) {
    return (
      <section className="border border-[var(--rule)] px-5 py-14 text-center sm:px-8 lg:px-12">
        <p className="font-mono text-sm text-[var(--ink-3)]">{tr.notFound}</p>
        <Link
          to="/blog"
          className="mt-4 inline-block border-b border-[var(--accent)] font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
        >
          {tr.backToBlog}
        </Link>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="border border-[var(--rule)] px-5 py-14 text-center sm:px-8 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">…</p>
      </section>
    );
  }

  return (
    <section className="border border-[var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <Link
        to="/blog"
        className="mb-8 inline-block border-b border-[var(--accent)] font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]"
      >
        {tr.backToBlog}
      </Link>

      <p dir="ltr" className="m-0 mb-3 text-start font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
        {new Date(post.publishedAt).toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <h1 className="m-0 text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.1] tracking-[-0.03em]">{post.title[lang]}</h1>

      {post.coverImageUrl && (
        <div className="mt-8 border border-[var(--rule)] bg-[var(--panel)] p-4">
          <img src={post.coverImageUrl} alt="" className="h-auto max-w-full" />
        </div>
      )}

      <div className="ldg-prose mt-8 max-w-[680px]" dangerouslySetInnerHTML={{ __html: post.bodyHtml[lang] }} />
    </section>
  );
}
