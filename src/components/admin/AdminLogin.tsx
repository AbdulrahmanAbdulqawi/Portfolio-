import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <h1 className="mb-6 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Admin sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-password" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full border border-[var(--rule)] bg-[var(--paper)] px-[14px] py-3 text-base text-[var(--ink)]"
          />
        </div>
        {error && <p className="text-sm" style={{ color: '#b91c1c' }}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[var(--ink)] py-3 text-[15px] font-semibold text-[var(--paper)] disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
