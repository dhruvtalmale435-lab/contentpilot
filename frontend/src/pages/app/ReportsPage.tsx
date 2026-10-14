import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  Share2,
  ArrowRight
} from 'lucide-react';
import { storage } from '../../services/storage';

export const ReportsPage: React.FC = () => {
  const brand = storage.getBrandProfile();
  const metrics = storage.getPerformanceMetrics();
  const campaigns = storage.getCampaigns();
  const items = storage.getContentItems();

  const [dateRange, setDateRange] = useState('Last 30 Days (Sep 15 - Oct 15, 2026)');
  const [downloaded, setDownloaded] = useState(false);

  const totalImpressions = metrics.reduce((acc, m) => acc + m.impressions, 0);
  const totalReach = metrics.reduce((acc, m) => acc + m.reach, 0);
  const totalSaves = metrics.reduce((acc, m) => acc + m.saves, 0);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Executive Summaries & Client Delivery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Performance Reports</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Structured summaries connecting creative output to audience retention evidence.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-soft transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{downloaded ? 'Report Exported (JSON)!' : 'Export PDF / JSON Brief'}</span>
        </button>
      </div>

      {/* Date Filter Bar */}
      <div className="bg-white p-4 rounded-panel border border-stone-border shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-ink-navy">
          <Calendar className="w-4 h-4 text-cobalt" />
          <span>Reporting Window:</span>
          <span className="bg-surface-subtle px-2.5 py-1 rounded border border-stone-border text-ink-muted font-mono">
            {dateRange}
          </span>
        </div>
        <span className="text-[10px] font-mono text-ink-faint">Data Freshness: Synchronized Today</span>
      </div>

      {/* Main Report Card */}
      <div className="bg-white border border-stone-border rounded-panel p-8 shadow-soft space-y-8">
        {/* Report Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-divider">
          <div>
            <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider">
              Monthly Social Growth Brief
            </span>
            <h2 className="text-xl font-extrabold text-ink-navy mt-1">{brand.businessName}</h2>
            <p className="text-xs text-ink-muted">Prepared via ContentPilot AI Executive Generator</p>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-teal-50 text-teal-success border border-teal-200">
              Health Status: Strong Momentum
            </span>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-background p-4 rounded-lg border border-stone-border">
            <span className="text-[10px] font-bold text-ink-faint uppercase">Cumulative Reach</span>
            <p className="text-2xl font-extrabold text-ink-navy mt-1">{totalReach.toLocaleString()}</p>
            <p className="text-[10px] text-teal-success font-semibold mt-1">↑ +24% vs prior 30 days</p>
          </div>

          <div className="bg-background p-4 rounded-lg border border-stone-border">
            <span className="text-[10px] font-bold text-ink-faint uppercase">Utility Saves</span>
            <p className="text-2xl font-extrabold text-cobalt mt-1">{totalSaves.toLocaleString()}</p>
            <p className="text-[10px] text-teal-success font-semibold mt-1">↑ +42% bookmark velocity</p>
          </div>

          <div className="bg-background p-4 rounded-lg border border-stone-border">
            <span className="text-[10px] font-bold text-ink-faint uppercase">Pillars Covered</span>
            <p className="text-2xl font-extrabold text-ink-navy mt-1">{brand.contentPillars.length} / 4</p>
            <p className="text-[10px] text-ink-faint font-semibold mt-1">100% adherence to voice</p>
          </div>
        </div>

        {/* Key Findings Narrative */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-ink-navy uppercase tracking-wider">Key Findings & Analysis</h3>
          <div className="space-y-3 text-xs text-ink-navy leading-relaxed">
            <p className="p-3.5 bg-surface-subtle rounded-lg border border-stone-border">
              <strong>1. Educational Carousels Outperformed Static Image Posts:</strong> Posts breaking down home brewing water temperatures and supermarket roast freshness generated 88% of all saved bookmarks. Users treat this brand as an educational reference manual.
            </p>
            <p className="p-3.5 bg-surface-subtle rounded-lg border border-stone-border">
              <strong>2. Direct Trade Narrative Established High B2B Credibility:</strong> The LinkedIn supply chain breakdown post drove 42 thoughtful comments from founders and sustainability officers, validating the authority pillar.
            </p>
          </div>
        </div>

        {/* Campaign Roster */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-ink-navy uppercase tracking-wider">Active Campaign Status</h3>
          <div className="space-y-2">
            {campaigns.map((c) => (
              <div key={c.id} className="p-3.5 bg-surface-subtle rounded-lg border border-stone-border text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-ink-navy block">{c.name}</span>
                  <span className="text-[10px] text-ink-muted">{c.objective}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cobalt-light text-cobalt uppercase">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
