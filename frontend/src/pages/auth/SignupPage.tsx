import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await signup(email, password, businessName);
    if (res.success) {
      navigate('/onboarding');
    } else {
      setErrorMessage(res.error || 'Failed to create account');
    }
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
        <h2 className="text-2xl font-extrabold text-ink-navy">Create your ContentPilot account</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-cobalt hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-panel rounded-2xl border border-stone-border space-y-6">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-error-bg text-red-error text-xs font-medium border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Business or Creator Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Modern Craft Studio"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'Creating Workspace...' : 'Continue to Onboarding'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-ink-faint text-center">
            By creating an account, you agree to our Terms and Privacy Policy. In local demo mode, no credit card or external keys are required.
          </p>
        </div>
      </div>
    </div>
  );
};
