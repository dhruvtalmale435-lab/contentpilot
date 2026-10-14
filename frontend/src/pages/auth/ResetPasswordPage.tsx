import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        <h2 className="text-2xl font-extrabold text-ink-navy">Reset your password</h2>
        <p className="mt-1 text-xs text-ink-muted">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-panel rounded-2xl border border-stone-border">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-ink-navy">Reset Link Sent</h3>
              <p className="text-xs text-ink-muted">
                If an account exists for <span className="font-semibold text-ink-navy">{email}</span>, you will receive password reset instructions shortly.
              </p>
              <Link
                to="/login"
                className="inline-block pt-2 text-xs font-bold text-cobalt hover:underline"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
              >
                Send Reset Link <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-ink-muted hover:text-ink-navy font-semibold">
                  ← Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
