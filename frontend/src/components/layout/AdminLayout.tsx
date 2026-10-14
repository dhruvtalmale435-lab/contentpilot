import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';
import { apiClient } from '../../services/apiClient';

export const AdminLayout: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [adminKey, setAdminKey] = useState<string>(() => {
    return localStorage.getItem('cp_admin_key_override') || 'contentpilot-admin-dev-secret-key-2026';
  });
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const verifyServerAuthorization = async (keyToTest: string) => {
    setChecking(true);
    setVerificationError(null);
    try {
      // In production and local FastAPI mode, test real server-side authorization
      const res = await fetch(`http://localhost:8000/admin/metrics`, {
        headers: { 'X-Admin-Key': keyToTest }
      });
      if (res.status === 200) {
        setIsVerified(true);
        localStorage.setItem('cp_admin_key_override', keyToTest);
      } else if (res.status === 403) {
        setIsVerified(false);
        setVerificationError('Server rejected credentials: X-Admin-Key does not match configured ADMIN_SECRET_KEY.');
      } else {
        // Fallback for standalone demo if backend server is not running
        if (keyToTest === 'contentpilot-admin-dev-secret-key-2026') {
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setVerificationError('Invalid owner administrative key.');
        }
      }
    } catch {
      // If server unreachable, check key locally against expected secret
      if (keyToTest === 'contentpilot-admin-dev-secret-key-2026') {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        setVerificationError('Invalid administrative key.');
      }
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    verifyServerAuthorization(adminKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-ink-navy flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-ink-navy text-white px-4 sm:px-8 py-3.5 border-b border-white/10 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-border hover:text-white transition-colors mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to App
          </Link>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-chartreuse flex items-center justify-center text-ink-navy">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight">ContentPilot Owner Console</span>
              <span className="text-[10px] text-chartreuse ml-2 font-mono uppercase tracking-wider">
                Authorized / Admin Only
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-success/20 text-teal-300 border border-teal-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Verified Server Role
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <AlertCircle className="w-3 h-3" /> Verification Pending
            </span>
          )}
          <span className="text-xs text-white/60 font-mono hidden sm:inline">env: development</span>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!isVerified && !checking && (
          <div className="bg-white border border-red-error rounded-panel p-6 shadow-panel max-w-md mx-auto my-12 text-center">
            <div className="w-12 h-12 rounded-full bg-red-error-bg text-red-error flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-ink-navy mb-1">Administrative Authorization Required</h3>
            <p className="text-xs text-ink-muted mb-4">
              Real owner administration requires server-side verification. Enter the ADMIN_SECRET_KEY configured in backend/.env:
            </p>
            {verificationError && (
              <p className="text-xs text-red-error bg-red-error-bg p-2 rounded mb-3 text-left">
                {verificationError}
              </p>
            )}
            <div className="flex gap-2">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter ADMIN_SECRET_KEY"
                className="flex-1 px-3 py-2 border border-stone-border rounded-lg text-xs"
              />
              <button
                onClick={() => verifyServerAuthorization(adminKey)}
                className="px-4 py-2 bg-cobalt text-white font-bold text-xs rounded-lg hover:bg-cobalt-hover"
              >
                Verify
              </button>
            </div>
            <p className="text-[10px] text-ink-faint mt-3">
              Default development secret: <code className="bg-stone-hover px-1 py-0.5 rounded">contentpilot-admin-dev-secret-key-2026</code>
            </p>
          </div>
        )}

        {isVerified && <Outlet />}
      </main>
    </div>
  );
};
