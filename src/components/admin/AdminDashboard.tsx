import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { EDITOR_LINKS } from './editorLinks';

export function AdminDashboard() {
  const { usingFallback, loading } = useContent();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Content</h1>
      <p className="mb-6 font-mono text-xs text-[var(--ink-3)]">
        {loading ? 'Loading…' : usingFallback ? 'API unreachable — showing bundled fallback content (read-only until it reconnects).' : 'Connected.'}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {EDITOR_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="border border-[var(--rule)] p-5 font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
