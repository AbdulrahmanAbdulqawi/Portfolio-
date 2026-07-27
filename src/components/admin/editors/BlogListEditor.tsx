import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { blogApi } from '../../../lib/blogApi';
import type { AdminBlogPostSummary } from '../../../types';

export function BlogListEditor() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<AdminBlogPostSummary[] | null>(null);
  const [error, setError] = useState(false);

  const load = () => {
    blogApi
      .listAdmin(token)
      .then(setPosts)
      .catch(() => setError(true));
  };

  useEffect(load, [token]);

  const handleDelete = async (post: AdminBlogPostSummary) => {
    if (!window.confirm(`Delete "${post.title.en}"? This cannot be undone.`)) return;
    await blogApi.remove(post.id, token);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          to="/admin/blog/new"
          className="border border-[var(--rule)] px-4 py-2 font-mono text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          + New post
        </Link>
      </div>

      {error && <p className="font-mono text-xs" style={{ color: '#b91c1c' }}>Could not load posts.</p>}
      {!error && !posts && <p className="font-mono text-xs text-[var(--ink-3)]">Loading…</p>}
      {posts && posts.length === 0 && <p className="font-mono text-xs text-[var(--ink-3)]">No posts yet.</p>}

      {posts && posts.length > 0 && (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-wrap items-center justify-between gap-3 border border-[var(--rule)] p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className="border px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.1em]"
                    style={
                      post.status === 'published'
                        ? { borderColor: 'var(--accent)', color: 'var(--accent)' }
                        : { borderColor: 'var(--rule)', color: 'var(--ink-3)' }
                    }
                  >
                    {post.status}
                  </span>
                  <span className="font-semibold">{post.title.en}</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[var(--ink-3)]">
                  /{post.slug} · updated {new Date(post.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <Link to={`/admin/blog/${post.id}`} className="underline">
                  Edit
                </Link>
                <button type="button" onClick={() => handleDelete(post)} style={{ color: '#b91c1c' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
