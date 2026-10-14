import React, { useState } from 'react';
import {
  Flag,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Layers,
  Sparkles
} from 'lucide-react';
import { storage } from '../../services/storage';
import { Campaign, ContentItem } from '../../types';

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => storage.getCampaigns());
  const items = storage.getContentItems();
  const brand = storage.getBrandProfile();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [targetAudience, setTargetAudience] = useState(brand.targetAudiences[0] || '');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-11-05');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([brand.contentPillars[0] || 'Product Launch']);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    storage.saveCampaign({
      name,
      objective,
      targetAudience,
      startDate,
      endDate,
      contentPillars: selectedPillars,
      status: 'active'
    });
    setCampaigns(storage.getCampaigns());
    setModalOpen(false);
    setName('');
    setObjective('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Goal-Oriented Content Waves
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Campaigns</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Group scheduled posts into focused launches, thematic masterclasses, and seasonal promotions.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-soft transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Campaign
        </button>
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        {campaigns.map((camp) => {
          // Attached posts
          const attachedItems = items.filter(
            (i) => i.campaignId === camp.id || (camp.attachedPostIds && camp.attachedPostIds.includes(i.id))
          );

          return (
            <div
              key={camp.id}
              className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-divider">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cobalt-light text-cobalt uppercase">
                      {camp.status}
                    </span>
                    <span className="text-xs text-ink-faint font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {camp.startDate} to {camp.endDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-navy">{camp.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink-navy bg-surface-subtle px-3 py-1.5 rounded-lg border border-stone-border">
                    {attachedItems.length} Content Assets Attached
                  </span>
                </div>
              </div>

              {/* Goal & Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-ink-faint uppercase font-mono block mb-1">Campaign Goal</span>
                  <p className="text-ink-navy leading-relaxed font-medium">{camp.objective}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-ink-faint uppercase font-mono block mb-1">Target Persona</span>
                  <p className="text-ink-navy leading-relaxed font-medium">{camp.targetAudience}</p>
                </div>
              </div>

              {/* Pillars tag list */}
              <div>
                <span className="text-[10px] font-bold text-ink-faint uppercase font-mono block mb-1.5">Associated Pillars</span>
                <div className="flex flex-wrap gap-1.5">
                  {camp.contentPillars.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-background border border-stone-border text-ink-navy">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attached Assets Row */}
              {attachedItems.length > 0 && (
                <div className="pt-2 border-t border-stone-divider">
                  <span className="text-[10px] font-bold text-ink-navy uppercase font-mono block mb-2">Campaign Content Roster</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {attachedItems.map((asset) => (
                      <div
                        key={asset.id}
                        className="p-2.5 rounded bg-surface-subtle border border-stone-border text-xs flex items-center justify-between"
                      >
                        <div className="truncate pr-2">
                          <span className="font-semibold text-ink-navy block truncate">{asset.title}</span>
                          <span className="text-[10px] text-ink-faint uppercase">{asset.platform} • {asset.status}</span>
                        </div>
                        {asset.readinessScore && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-teal-50 text-teal-success border border-teal-200">
                            {asset.readinessScore}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Campaign Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-navy/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-border shadow-elevated p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-base text-ink-navy">Create New Marketing Campaign</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Warmth Single-Origin Launch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Primary Objective</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pre-orders & educating pour-over coffee hobbyists"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-stone-border text-xs font-bold text-ink-navy rounded-lg hover:bg-stone-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cobalt text-white text-xs font-bold rounded-lg hover:bg-cobalt-hover shadow-soft"
                >
                  Initialize Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
