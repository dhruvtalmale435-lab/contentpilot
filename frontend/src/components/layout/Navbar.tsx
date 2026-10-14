import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, loginAsDemoCustomer, user } = useAuth();
  const navigate = useNavigate();

  const handleDemoAccess = () => {
    loginAsDemoCustomer();
    navigate('/app');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#F6F5F1]/95 backdrop-blur-md border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-ink-navy flex items-center justify-center text-chartreuse shadow-sm group-hover:bg-cobalt transition-colors duration-200">
              <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-ink-navy">
                ContentPilot <span className="text-cobalt">AI</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-ink-faint">
                Creation • Packaging • Planning
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-semibold text-ink-muted hover:text-ink-navy transition-colors">
              Features
            </a>
            <a href="#analyzer" className="text-xs font-semibold text-ink-muted hover:text-ink-navy transition-colors flex items-center gap-1.5">
              <span>Potential Analyzer</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-chartreuse text-ink-navy">Unique</span>
            </a>
            <a href="#how-it-works" className="text-xs font-semibold text-ink-muted hover:text-ink-navy transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-xs font-semibold text-ink-muted hover:text-ink-navy transition-colors">
              Pricing
            </a>
            <Link to="/admin" className="text-xs font-semibold text-ink-faint hover:text-cobalt transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <button
                  onClick={handleDemoAccess}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-border bg-white text-xs font-bold text-ink-navy hover:bg-stone-hover shadow-sm transition-colors"
                >
                  Explore Demo Workspace
                </button>
                <Link
                  to="/login"
                  className="text-xs font-bold text-ink-navy hover:text-cobalt px-3 py-1.5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-navy hover:text-cobalt"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-panel">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-ink-navy hover:text-cobalt"
          >
            Features
          </a>
          <a
            href="#analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-ink-navy hover:text-cobalt"
          >
            Content Potential Analyzer
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-ink-navy hover:text-cobalt"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-ink-navy hover:text-cobalt"
          >
            Pricing
          </a>
          <div className="pt-3 border-t border-stone-divider space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDemoAccess();
              }}
              className="w-full py-2.5 rounded-lg border border-stone-border bg-background text-xs font-bold text-ink-navy text-center"
            >
              Explore Demo Workspace
            </button>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 rounded-lg bg-cobalt text-white text-xs font-bold text-center"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
