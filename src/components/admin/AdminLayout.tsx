import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { EDITOR_LINKS } from './editorLinks';

export function AdminLayout() {
  const { logout } = useAuth();
  const { lang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <header
        className="sticky top-0 z-50 border-b border-[var(--rule)] backdrop-blur-[14px]"
        style={{ background: 'var(--paper-fade)' }}
      >
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
          <Link
            to="/admin"
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault();
                setSidebarOpen((prev) => !prev);
              }
            }}
            aria-label={isMobile ? (sidebarOpen ? 'Close menu' : 'Open menu') : undefined}
            className="flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.08em]"
          >
            {isMobile && (sidebarOpen ? <X size={16} /> : <Menu size={16} />)}
            ADMIN
          </Link>

          <nav className="hidden font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-2)] md:flex md:flex-wrap md:gap-x-5 md:gap-y-2">
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

      <div
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[140] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <nav
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 start-0 z-[150] flex w-[min(78vw,320px)] flex-col gap-1 border-e border-[var(--rule)] px-6 py-6 font-mono text-sm uppercase tracking-[0.1em] text-[var(--ink-2)] transition-transform duration-300 ease-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : lang === 'ar' ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{ background: 'var(--paper)' }}
      >
        {EDITOR_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `border-b py-3 transition-colors ${isActive ? 'text-[var(--accent)]' : 'border-[var(--rule-soft)] hover:text-[var(--accent)]'}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
