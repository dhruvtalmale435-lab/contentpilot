import React, { useState } from 'react';
import {
  Settings,
  Bell,
  User,
  Shield,
  Key,
  Globe,
  Save,
  CheckCircle2,
  Trash2,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../services/storage';

export const SettingsPage: React.FC = () => {
  const { user, workspace, updateWorkspaceName } = useAuth();
  const [workspaceName, setWorkspaceName] = useState(workspace.name);
  const [timezone, setTimezone] = useState('America/Los_Angeles (Pacific Time)');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [publishReminders, setPublishReminders] = useState(true);
  const [highPotentialAlerts, setHighPotentialAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkspaceName(workspaceName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetDemoData = () => {
    if (confirm('Reset workspace and seed data to defaults? All test changes will revert to the original Roast & Co. state.')) {
      storage.resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Preferences & Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Workspace Settings</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Manage workspace identity, timezone, notifications, and reset demo data.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-success text-xs font-bold rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Workspace settings updated successfully.
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Workspace Identity */}
        <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
            <Layers className="w-4 h-4 text-cobalt" /> Workspace Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white"
              >
                <option value="America/Los_Angeles (Pacific Time)">America/Los_Angeles (Pacific Time)</option>
                <option value="America/New_York (Eastern Time)">America/New_York (Eastern Time)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
            <Bell className="w-4 h-4 text-cobalt" /> Notification Preferences
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publishReminders}
                onChange={(e) => setPublishReminders(e.target.checked)}
                className="w-4 h-4 text-cobalt rounded"
              />
              <span className="text-xs text-ink-navy font-semibold">
                Publishing Reminders (1 hour prior to scheduled slot)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={highPotentialAlerts}
                onChange={(e) => setHighPotentialAlerts(e.target.checked)}
                className="w-4 h-4 text-cobalt rounded"
              />
              <span className="text-xs text-ink-navy font-semibold">
                High Content Potential Alerts (When post scores 85+)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-cobalt rounded"
              />
              <span className="text-xs text-ink-navy font-semibold">
                Weekly Content Performance Email Digest
              </span>
            </label>
          </div>
        </div>

        {/* Subscription Tier Details */}
        <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-3">
          <h3 className="font-bold text-sm text-ink-navy">Current Plan & Usage Entitlements</h3>
          <div className="flex items-center justify-between p-3.5 bg-surface-subtle border border-stone-border rounded-lg">
            <div>
              <span className="font-bold text-xs text-ink-navy block">Pro Creator Membership ($29/mo)</span>
              <span className="text-[10px] text-ink-muted">150 AI generations • 100 Content Potential Scans • 3 Workspaces</span>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-teal-50 text-teal-success border border-teal-200">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleResetDemoData}
            className="text-xs font-semibold text-red-error hover:underline flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset Demo Workspace Data
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
