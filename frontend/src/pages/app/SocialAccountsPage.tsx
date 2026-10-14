import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { storage } from '../../services/storage';
import { SocialAccountConnection } from '../../types';

export const SocialAccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccountConnection[]>(() => storage.getSocialAccounts());

  const handleToggle = (platform: string) => {
    const updated = storage.toggleSocialAccountConnection(platform);
    setAccounts(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Channel Management & Integrations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Social Accounts</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Connect eligible publishing channels and manage authorization permissions.
          </p>
        </div>
      </div>

      {/* Honest Integration Notice */}
      <div className="bg-surface-subtle p-4 rounded-panel border border-stone-border text-xs text-ink-muted space-y-1.5 leading-relaxed">
        <div className="flex items-center gap-2 text-ink-navy font-bold">
          <Info className="w-4 h-4 text-cobalt" />
          <span>Integration Transparency Status</span>
        </div>
        <p>
          In Demo Mode, social account connections are <strong>safe simulations</strong> demonstrating profile syncing, status indicators, and channel routing. Live automatic publishing and live token exchanges require official Meta, LinkedIn, and TikTok developer app credentials configured on the server.
        </p>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.platform}
            className="bg-white border border-stone-border rounded-panel p-5 shadow-soft hover:shadow-panel transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-subtle border border-stone-border text-ink-navy">
                  {acc.platform}
                </span>

                {acc.connected ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-success bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    <CheckCircle2 className="w-3 h-3" /> Connected (Simulated)
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-ink-faint bg-stone-hover px-2 py-0.5 rounded-full">
                    Disconnected
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-ink-navy">{acc.name}</h3>
                <p className="text-xs text-ink-muted font-mono">{acc.handle}</p>
              </div>

              {acc.connected && acc.lastSynced && (
                <p className="text-[10px] text-ink-faint font-mono">Last synced: {acc.lastSynced}</p>
              )}
            </div>

            <div className="pt-3 border-t border-stone-divider flex items-center justify-between">
              <button
                onClick={() => handleToggle(acc.platform)}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-colors text-center ${
                  acc.connected
                    ? 'border border-stone-border text-red-error hover:bg-red-error-bg'
                    : 'bg-cobalt text-white hover:bg-cobalt-hover shadow-soft'
                }`}
              >
                {acc.connected ? 'Disconnect Channel' : 'Connect Channel'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
