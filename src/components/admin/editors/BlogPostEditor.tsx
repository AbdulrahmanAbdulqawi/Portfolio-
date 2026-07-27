import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { blogApi } from '../../../lib/blogApi';
import { ApiError } from '../../../lib/apiClient';
import { slugify } from '../../../lib/slugify';
import { BilingualField } from '../shared/BilingualField';
import { RichTextField } from '../shared/RichTextField';
import { ImageUploadField } from '../shared/ImageUploadField';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { BlogPostWrite } from '../../../types';

const blankForm: BlogPostWrite = {
  slug: '',
  title: { en: '', ar: '' },
  excerpt: { en: '', ar: '' },
  bodyHtml: { en: '', ar: '' },
  coverImageUrl: undefined,
  status: 'draft',
};

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';

export function BlogPostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState<BlogPostWrite>(blankForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loaded, setLoaded] = useState(isNew);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [slugConflict, setSlugConflict] = useState(false);

  useEffect(() => {
    if (isNew || !id) return;
    blogApi
      .getAdmin(id, token)
      .then((data) => {
        setForm({
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt,
          bodyHtml: data.bodyHtml,
          coverImageUrl: data.coverImageUrl,
          status: data.status,
        });
        setSlugTouched(true);
        setLoaded(true);
      })
      .catch(() => setLoadError(true));
  }, [id, isNew, token]);

  const handleTitleEnChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: { ...f.title, en: value },
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  const handleSave = async () => {
    setStatus('saving');
    setSlugConflict(false);
    try {
      if (isNew) {
        const created = await blogApi.create(form, token);
        navigate(`/admin/blog/${created.id}`, { replace: true });
      } else {
        await blogApi.update(id!, form, token);
      }
      setStatus('saved');
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) setSlugConflict(true);
      setStatus('error');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    await blogApi.remove(id, token);
    navigate('/admin/blog');
  };

  if (loadError) {
    return <p className="font-mono text-xs" style={{ color: '#b91c1c' }}>Could not load this post.</p>;
  }

  if (!loaded) {
    return <p className="font-mono text-xs text-[var(--ink-3)]">Loading…</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{isNew ? 'New post' : 'Edit post'}</h1>

      <div className="flex flex-col gap-6">
        <BilingualField label="Title" en={form.title.en} ar={form.title.ar} onChangeEn={handleTitleEnChange} onChangeAr={(v) => setForm((f) => ({ ...f, title: { ...f.title, ar: v } }))} />

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Slug (shared)</label>
          <input
            dir="ltr"
            type="text"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((f) => ({ ...f, slug: e.target.value }));
            }}
            className={fieldClass}
          />
          {slugConflict && (
            <span className="font-mono text-xs" style={{ color: '#b91c1c' }}>
              That slug is already in use — choose a different one.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as BlogPostWrite['status'] }))}
            className={fieldClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <ImageUploadField label="Cover image (shared)" value={form.coverImageUrl} onChange={(url) => setForm((f) => ({ ...f, coverImageUrl: url }))} />

        <BilingualField
          label="Excerpt"
          en={form.excerpt.en}
          ar={form.excerpt.ar}
          multiline
          rows={3}
          onChangeEn={(v) => setForm((f) => ({ ...f, excerpt: { ...f.excerpt, en: v } }))}
          onChangeAr={(v) => setForm((f) => ({ ...f, excerpt: { ...f.excerpt, ar: v } }))}
        />

        <RichTextField
          label="Body"
          en={form.bodyHtml.en}
          ar={form.bodyHtml.ar}
          onChangeEn={(html) => setForm((f) => ({ ...f, bodyHtml: { ...f.bodyHtml, en: html } }))}
          onChangeAr={(html) => setForm((f) => ({ ...f, bodyHtml: { ...f.bodyHtml, ar: html } }))}
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        {!isNew && (
          <button type="button" onClick={handleDelete} className="border border-[var(--rule)] px-4 py-2 font-mono text-xs" style={{ color: '#b91c1c' }}>
            Delete post
          </button>
        )}
      </div>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
