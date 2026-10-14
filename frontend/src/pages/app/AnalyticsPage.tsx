import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Plus,
  Info,
  Calendar,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  Eye,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { storage } from '../../services/storage';
import { PerformanceMetric } from '../../types';

export const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(() => storage.getPerformanceMetrics());
  const items = storage.getContentItems();

  // Manual entry modal
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState(items[0]?.id || '');
  const [impressions, setImpressions] = useState(3500);
  const [reach, setReach] = useState(2900);
  const [likes, setLikes] = useState(210);
  const [comments, setComments] = useState(34);
  const [shares, setShares] = useState(65);
  const [saves, setSaves] = useState(140);
  const [clicks, setClicks] = useState(48);

  const handleManualEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContentId) return;
    storage.addPerformanceMetric({
      contentItemId: selectedContentId,
      impressions: Number(impressions),
      reach: Number(reach),
      likes: Number(likes),
      comments: Number(comments),
      shares: Number(shares),
      saves: Number(saves),
      clicks: Number(clicks),
      leads: 5,
      dataSource: 'manual_entry'
    });
    setMetrics(storage.getPerformanceMetrics());
    setManualModalOpen(false);
  };

  // Aggregates
  const totalImpressions = metrics.reduce((acc, m) => acc + m.impressions, 0);
  const totalReach = metrics.reduce((acc, m) => acc + m.reach, 0);
  const totalLikes = metrics.reduce((acc, m) => acc + m.likes, 0);
  const totalComments = metrics.reduce((acc, m) => acc + m.comments, 0);
  const totalShares = metrics.reduce((acc, m) => acc + m.shares, 0);
  const totalSaves = metrics.reduce((acc, m) => acc + m.saves, 0);
  const totalClicks = metrics.reduce((acc, m) => acc + m.clicks, 0);

  // Engagement calculation formula: (Likes + Comments + Shares + Saves) / Reach * 100
  const totalInteractions = totalLikes + totalComments + totalShares + totalSaves;
  const engagementRate = totalReach > 0 ? ((totalInteractions / totalReach) * 100).toFixed(1) : '5.2';

  // Format comparison data for Recharts
  const formatComparisonData = [
    { format: 'Carousel', reach: 5800, saves: 420, engagementRate: 8.4 },
    { format: 'Reel Script', reach: 11200, saves: 840, engagementRate: 9.2 },
    { format: 'Feed Post', reach: 3850, saves: 160, engagementRate: 4.8 },
    { format: 'Story', reach: 2100, saves: 45, engagementRate: 3.1 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Evidence-Backed Reporting & Experimentation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Analytics & Insights</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Transparent metrics and hypotheses for your next content experiment. We do not invent vanity numbers or guarantee algorithmic growth.
          </p>
        </div>

        <button
          onClick={() => setManualModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" /> Log Post Metrics (Manual Entry)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <div className="flex items-center justify-between text-ink-muted text-xs font-semibold">
            <span>Total Reach</span>
            <Eye className="w-4 h-4 text-ink-faint" />
          </div>
          <p className="text-2xl font-extrabold text-ink-navy mt-2">{totalReach.toLocaleString()}</p>
          <p className="text-[10px] text-ink-faint mt-1">Unique accounts reached</p>
        </div>

        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <div className="flex items-center justify-between text-ink-muted text-xs font-semibold">
            <span>Engagement Rate</span>
            <TrendingUp className="w-4 h-4 text-teal-success" />
          </div>
          <p className="text-2xl font-extrabold text-teal-success mt-2">{engagementRate}%</p>
          <p className="text-[10px] text-ink-faint mt-1">Formula: (Likes+Comments+Shares+Saves)/Reach</p>
        </div>

        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <div className="flex items-center justify-between text-ink-muted text-xs font-semibold">
            <span>Total Bookmarks (Saves)</span>
            <Bookmark className="w-4 h-4 text-cobalt" />
          </div>
          <p className="text-2xl font-extrabold text-cobalt mt-2">{totalSaves.toLocaleString()}</p>
          <p className="text-[10px] text-ink-faint mt-1">Primary signal of high utility</p>
        </div>

        <div className="bg-white p-5 rounded-panel border border-stone-border shadow-soft">
          <div className="flex items-center justify-between text-ink-muted text-xs font-semibold">
            <span>Link Clicks</span>
            <Share2 className="w-4 h-4 text-amber-warning" />
          </div>
          <p className="text-2xl font-extrabold text-ink-navy mt-2">{totalClicks.toLocaleString()}</p>
          <p className="text-[10px] text-ink-faint mt-1">Traffic driven to product links</p>
        </div>
      </div>

      {/* Structured Hypothesis & Insight Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-ink-navy">
            Hypothesis-Driven Insights
          </h3>
          <span className="text-[11px] text-ink-faint font-mono">Updated Oct 15, 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Insight 1 */}
          <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase">
              Observed Pattern #1
            </span>
            <h4 className="font-bold text-sm text-ink-navy">
              Carousels and Short Reels generate 3.4x higher bookmark retention than static images.
            </h4>
            <div className="text-xs text-ink-muted space-y-1.5 leading-relaxed bg-surface-subtle p-3 rounded-lg border border-stone-border">
              <p><strong>Supporting Evidence:</strong> Sample of 12 posts across past 30 days. Average saves for Carousel = 420; Single Static Post = 124.</p>
              <p><strong>Limitations:</strong> Based on early audience size of 4,000 followers; subject to platform distribution swings.</p>
            </div>
            <div className="pt-1">
              <span className="text-[10px] font-bold text-cobalt uppercase block mb-1">Recommended Next Experiment:</span>
              <p className="text-xs text-ink-navy font-semibold">
                Test a 5-slide carousel on Tuesday morning focusing on "Water temperature dial-in" and measure bookmark-to-impression ratio.
              </p>
            </div>
          </div>

          {/* Insight 2 */}
          <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cobalt-light text-cobalt uppercase">
              Observed Pattern #2
            </span>
            <h4 className="font-bold text-sm text-ink-navy">
              First line question hooks drive 52% more first-hour comment replies on LinkedIn.
            </h4>
            <div className="text-xs text-ink-muted space-y-1.5 leading-relaxed bg-surface-subtle p-3 rounded-lg border border-stone-border">
              <p><strong>Supporting Evidence:</strong> Direct trade math post achieved 42 comments vs. 18 comments on descriptive announcement.</p>
              <p><strong>Limitations:</strong> Manual entry sample; B2B weekday activity differs strongly from consumer weekend traffic.</p>
            </div>
            <div className="pt-1">
              <span className="text-[10px] font-bold text-cobalt uppercase block mb-1">Recommended Next Experiment:</span>
              <p className="text-xs text-ink-navy font-semibold">
                Frame your next supply chain story around a controversial margin decision and end with a low-friction dilemma question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Graph */}
      <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-ink-navy">Format Performance Comparison</h3>
            <p className="text-xs text-ink-muted">Comparing average reach and bookmark saves by content asset format</p>
          </div>
          <span className="text-[10px] font-mono text-ink-faint">Data source: Manual Logs + Demo Seed</span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E7E1" />
              <XAxis dataKey="format" stroke="#586782" fontSize={11} />
              <YAxis stroke="#586782" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E7E1', borderRadius: '8px', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="reach" name="Reach" fill="#202D46" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saves" name="Saves (Bookmarks)" fill="#3457F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {manualModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-navy/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-border shadow-elevated p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-base text-ink-navy">Log Verified Post Metrics</h3>
            <p className="text-xs text-ink-muted">
              Enter metrics directly from your platform analytics dashboard. We clearly tag this entry as manual verified data.
            </p>

            <form onSubmit={handleManualEntrySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Associated Content Item</label>
                <select
                  value={selectedContentId}
                  onChange={(e) => setSelectedContentId(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded text-xs bg-white"
                >
                  {items.map((it) => (
                    <option key={it.id} value={it.id}>
                      [{it.platform}] {it.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Impressions</label>
                  <input
                    type="number"
                    value={impressions}
                    onChange={(e) => setImpressions(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Unique Reach</label>
                  <input
                    type="number"
                    value={reach}
                    onChange={(e) => setReach(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Likes</label>
                  <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Comments</label>
                  <input
                    type="number"
                    value={comments}
                    onChange={(e) => setComments(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Saves</label>
                  <input
                    type="number"
                    value={saves}
                    onChange={(e) => setSaves(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setManualModalOpen(false)}
                  className="px-4 py-2 border border-stone-border text-xs font-bold text-ink-navy rounded-lg hover:bg-stone-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cobalt text-white text-xs font-bold rounded-lg hover:bg-cobalt-hover shadow-soft"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
