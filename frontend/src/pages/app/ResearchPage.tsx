import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  TrendingUp,
  Plus,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Trash2,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { storage } from '../../services/storage';
import { CompetitorItem, TrendItem } from '../../types';

export const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [trends, setTrends] = useState<TrendItem[]>(() => storage.getTrends());
  const [competitors, setCompetitors] = useState<CompetitorItem[]>(() => storage.getCompetitors());

  // Add trend modal / form state
  const [newTopic, setNewTopic] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newAdapted, setNewAdapted] = useState('');

  // Add competitor state
  const [newCompName, setNewCompName] = useState('');
  const [newCompHandle, setNewCompHandle] = useState('');
  const [newCompNotes, setNewCompNotes] = useState('');
  const [newCompStrengths, setNewCompStrengths] = useState('');
  const [newCompGaps, setNewCompGaps] = useState('');

  const handleAddTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    storage.addTrend({
      topic: newTopic,
      platform: 'instagram',
      keyword: newKeyword,
      notes: 'Observed surge in community curiosity.',
      sourceLink: newSource,
      adaptedIdea: newAdapted || `Create a 5-slide educational post adapting ${newTopic} for our audience.`
    });
    setTrends(storage.getTrends());
    setNewTopic('');
    setNewKeyword('');
    setNewSource('');
    setNewAdapted('');
  };

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;
    storage.addCompetitor({
      name: newCompName,
      platform: 'instagram',
      handle: newCompHandle,
      notes: newCompNotes,
      observedStrengths: newCompStrengths,
      observedGaps: newCompGaps
    });
    setCompetitors(storage.getCompetitors());
    setNewCompName('');
    setNewCompHandle('');
    setNewCompNotes('');
    setNewCompStrengths('');
    setNewCompGaps('');
  };

  const handleAdaptToStudio = (trend: TrendItem) => {
    // Navigate to studio with prefilled topic
    navigate(`/app/studio?topic=${encodeURIComponent(trend.adaptedIdea)}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Market Signals & Topic Discovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Research & Trend Explorer</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Monitor real-world creator conversations, competitor blindspots, and adapt trending angles directly for your brand.
          </p>
        </div>
      </div>

      {/* Safety Policy Notice */}
      <div className="p-3.5 bg-surface-subtle border border-stone-border rounded-panel text-xs text-ink-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cobalt flex-shrink-0" />
          <span>
            <strong>Authentic Research Principles:</strong> We strictly avoid unauthorized scraping or fabricated viral metrics. All competitor benchmarks are verified user notes.
          </span>
        </div>
        <span className="text-[10px] font-mono text-ink-faint">TOS Compliant</span>
      </div>

      {/* Split Sections: Trending Topic Signals & Competitor Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Saved Trends & 'Adapt for My Brand' */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-ink-navy flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cobalt" /> Monitored Topics & Viral Angles
            </h3>
            <span className="text-xs text-ink-faint">{trends.length} active monitors</span>
          </div>

          <div className="space-y-4">
            {trends.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-hover text-ink-navy uppercase">
                        {t.platform}
                      </span>
                      <span className="text-xs font-mono font-bold text-cobalt">{t.keyword}</span>
                    </div>
                    <h4 className="font-bold text-sm text-ink-navy pt-1">{t.topic}</h4>
                  </div>

                  <button
                    onClick={() => {
                      storage.deleteTrend(t.id);
                      setTrends(storage.getTrends());
                    }}
                    className="text-ink-faint hover:text-red-error p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">{t.notes}</p>

                {/* Adapted Angle Box */}
                <div className="bg-background rounded-lg p-3 border border-stone-border text-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-cobalt uppercase font-mono tracking-wider">
                    Adapted for Our Brand
                  </span>
                  <p className="font-semibold text-ink-navy leading-relaxed">{t.adaptedIdea}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-divider">
                  {t.sourceLink ? (
                    <a
                      href={t.sourceLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-ink-faint hover:text-cobalt flex items-center gap-1"
                    >
                      <span>Source Link</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : <span />}

                  <button
                    onClick={() => handleAdaptToStudio(t)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3 h-3 fill-ink-navy" /> Adapt in AI Studio
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Trend Box */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">Add Trend or Topic Signal</h4>
            <form onSubmit={handleAddTrend} className="space-y-3">
              <input
                type="text"
                placeholder="Topic or Viral Theme (e.g. Sustainable at-home composting for spent espresso grounds)"
                required
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Keyword / Tag (e.g. #ZeroWaste)"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Source URL (e.g. https://...)"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Custom brand adaptation idea (optional)"
                value={newAdapted}
                onChange={(e) => setNewAdapted(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
              />
              <button
                type="submit"
                className="w-full py-2 bg-ink-navy hover:bg-cobalt text-white text-xs font-bold rounded-lg transition-colors"
              >
                + Track New Topic
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (5 cols): Competitor Profiles & Observations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-ink-navy flex items-center gap-2">
              <Search className="w-4 h-4 text-cobalt" /> Competitor Benchmarks
            </h3>
            <span className="text-xs text-ink-faint">{competitors.length} profiles</span>
          </div>

          <div className="space-y-4">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-ink-navy">{comp.name}</h4>
                    <p className="text-[11px] text-ink-faint font-mono">{comp.handle} • {comp.platform}</p>
                  </div>
                  <button
                    onClick={() => {
                      storage.deleteCompetitor(comp.id);
                      setCompetitors(storage.getCompetitors());
                    }}
                    className="text-ink-faint hover:text-red-error p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">{comp.notes}</p>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-teal-50 border border-teal-200 text-teal-800">
                    <span className="text-[9px] font-bold text-teal-success uppercase block">Their Strength</span>
                    <p className="text-[11px]">{comp.observedStrengths}</p>
                  </div>
                  <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-800">
                    <span className="text-[9px] font-bold text-amber-warning uppercase block">Our Opportunity (Their Gap)</span>
                    <p className="text-[11px] font-semibold">{comp.observedGaps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Competitor */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">Add Competitor Profile</h4>
            <form onSubmit={handleAddCompetitor} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Competitor Name"
                  required
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Social Handle"
                  value={newCompHandle}
                  onChange={(e) => setNewCompHandle(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Observed Content Mix / Frequency"
                value={newCompNotes}
                onChange={(e) => setNewCompNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
              />
              <input
                type="text"
                placeholder="What they do well (Strength)"
                value={newCompStrengths}
                onChange={(e) => setNewCompStrengths(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
              />
              <input
                type="text"
                placeholder="What they lack / ignore (Our Gap to attack)"
                value={newCompGaps}
                onChange={(e) => setNewCompGaps(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs"
              />
              <button
                type="submit"
                className="w-full py-2 bg-ink-navy hover:bg-cobalt text-white text-xs font-bold rounded-lg transition-colors"
              >
                + Save Competitor Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
