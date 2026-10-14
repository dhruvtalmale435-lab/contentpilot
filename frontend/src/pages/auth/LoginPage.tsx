import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loginWithEmail, loginAsDemoCustomer, loginAsDemoAdmin, isLoading, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await loginWithEmail(email, password);
    if (res.success) {
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    } else {
      setErrorMessage(res.error || 'Failed to authenticate');
    }
  };

  const handleQuickDemoCustomer = () => {
    loginAsDemoCustomer();
    navigate('/app');
  };

  const handleQuickDemoAdmin = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-ink-navy flex items-center justify-center text-chartreuse shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-ink-navy">
            ContentPilot <span className="text-cobalt">AI</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-ink-navy">Sign in to your workspace</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Or{' '}
          <Link to="/signup" className="font-bold text-cobalt hover:underline">
            create a new account with business onboarding
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-panel rounded-2xl border border-stone-border space-y-6">
          {/* Quick Demo Access Bar */}
          <div className="bg-surface-subtle p-3.5 rounded-xl border border-stone-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-ink-navy uppercase tracking-wider">
                Instant 1-Click Evaluation Mode
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-chartreuse text-ink-navy">
                Zero Setup
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickDemoCustomer}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white border border-stone-border hover:bg-stone-hover text-ink-navy text-xs font-bold transition-all shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5 text-cobalt" />
                <span>Customer Demo</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-ink-navy hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-chartreuse" />
                <span>Owner Admin</span>
              </button>
            </div>
            <p className="text-[10px] text-ink-faint text-center">
              Loads pre-seeded data for Roast & Co. No credentials needed.
            </p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-divider" />
            <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-ink-faint">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-stone-divider" />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-error-bg text-red-error text-xs font-medium border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@roastandco.com"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-ink-navy">Password</label>
                <Link to="/reset-password" className="text-[11px] font-semibold text-cobalt hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'Verifying...' : 'Sign In'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-ink-muted">
            <Link to="/" className="text-ink-muted hover:text-ink-navy font-medium">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
