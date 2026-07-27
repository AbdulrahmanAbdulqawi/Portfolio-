import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EDITOR_LINKS } from './editorLinks';

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <header
        className="sticky top-0 z-50 border-b border-[var(--rule)] backdrop-blur-[14px]"
        style={{ background: 'var(--paper-fade)' }}
      >
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
          <Link to="/admin" className="font-mono text-[13px] font-bold tracking-[0.08em]">
            ADMIN
          </Link>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-2)]">
            {EDITOR_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'text-[var(--accent)]' : 'transition-colors hover:text-[var(--accent)]')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/" className="font-mono text-xs text-[var(--ink-3)] underline">
              View live site
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="border border-[var(--rule)] px-3 py-1 font-mono text-xs"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
