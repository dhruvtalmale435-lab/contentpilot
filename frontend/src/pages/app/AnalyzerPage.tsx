import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Edit2,
  Calendar,
  Save,
  Info,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCheck
} from 'lucide-react';
import { ScoreGauge } from '../../components/ui/ScoreGauge';
import { storage } from '../../services/storage';
import { apiClient } from '../../services/apiClient';
import { AnalyzerResult, Platform, ContentItem } from '../../types';

export const AnalyzerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const brand = storage.getBrandProfile();

  const itemId = searchParams.get('item');
  const existingItem = itemId ? storage.getContentItemById(itemId) : undefined;

  // Analysis form inputs
  const [platform, setPlatform] = useState<Platform>(existingItem?.platform || 'instagram');
  const [contentType, setContentType] = useState(existingItem?.formatType || 'caption');
  const [textContent, setTextContent] = useState(
    existingItem?.bodyCaption ||
    "Stop buying coffee bags without a roast date stamped on the front.\n\n" +
    "Roasted beans lose 60% of their aromatic compounds within 14 days of roasting.\n" +
    "Supermarket bags sit on shelves for months in oxidized packaging.\n\n" +
    "Here is our 3-step test to check freshness at home:\n" +
    "1. The bloom test with 60g water\n" +
    "2. The dry aroma check\n" +
    "3. Surface oil balance\n\n" +
    "Save this post 📌 and comment 'FRESH' for our free dial-in brew guide!"
  );
  const [visualDescription, setVisualDescription] = useState(existingItem?.visualConcept || 'High contrast editorial quote card with warm ivory texture');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzerResult | null>(null);
  const [expandedDimension, setExpandedDimension] = useState<string | null>(null);
  const [appliedImproved, setAppliedImproved] = useState(false);
  const [dimensionFilter, setDimensionFilter] = useState<'all' | 'high' | 'needs_work'>('all');

  // Auto-run analysis when landing with an item
  useEffect(() => {
    runAudit();
  }, [itemId]);

  const runAudit = async () => {
    if (!textContent.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await apiClient.analyzeContent({
        contentType,
        platform,
        textContent,
        visualConceptDescription: visualDescription,
        brandContext: brand
      });
      setAnalysisResult(res);

      if (existingItem) {
        storage.saveContentItem({
          ...existingItem,
          readinessScore: res.contentReadinessScore
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyImprovedDraft = () => {
    if (!analysisResult) return;
    setTextContent(analysisResult.improvedDraft);
    setAppliedImproved(true);
    setTimeout(() => setAppliedImproved(false), 2000);
  };

  const handleSaveUpdatedContent = () => {
    if (!analysisResult) return;
    const item = storage.saveContentItem({
      id: existingItem?.id,
      title: existingItem?.title || `Optimized ${platform} post`,
      platform,
      formatType: (contentType as any) || 'feed_post',
      bodyCaption: textContent,
      hashtags: existingItem?.hashtags || ['#ContentStrategy', '#CreatorEconomy'],
      readinessScore: analysisResult.contentReadinessScore,
      status: 'approved'
    });
    alert(`Saved post with readiness rating ${analysisResult.contentReadinessScore}/100!`);
    navigate('/app/library');
  };

  const filteredDimensions = analysisResult?.dimensionScores.filter(dim => {
    if (dimensionFilter === 'high') return dim.score >= 80;
    if (dimensionFilter === 'needs_work') return dim.score < 80;
    return true;
  }) || [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
              Pre-Publish Diagnostic Engine
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase shadow-2xs">
              Key Differentiator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">
            Content Potential Analyzer
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Inspired by packaging diagnostics in creator tools like vidIQ and TubeBuddy. Evaluates 10 qualitative dimensions before hitting publish.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runAudit}
          disabled={isAnalyzing || !textContent.trim()}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-cobalt-glow transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{isAnalyzing ? 'Scoring 10 Dimensions...' : 'Run Packaging Critique'}</span>
        </motion.button>
      </div>

      {/* Main Grid: Input Workspace on Left (5 cols) & Full Diagnostic Report on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Content to Analyze */}
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4 card-tactile">
          <div className="flex items-center justify-between pb-3 border-b border-stone-divider">
            <h3 className="font-bold text-sm text-ink-navy">Asset Content & Context</h3>
            <span className="text-[10px] font-mono text-ink-faint capitalize">{platform}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full px-3 py-1.5 border border-stone-border rounded text-xs bg-white"
              >
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">X (Twitter)</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Format</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-border rounded text-xs bg-white"
              >
                <option value="caption">Caption & Post</option>
                <option value="reel_script">Reel / Video Script</option>
                <option value="carousel">Carousel Text</option>
                <option value="hook">Opening Hook</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-ink-navy">Copy / Script / Idea</label>
              <span className="text-[10px] text-ink-faint font-mono">
                {textContent.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={9}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-border rounded-lg text-xs leading-relaxed font-sans focus:outline-cobalt"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-navy mb-1">
              Visual Concept / Accompanying Graphic
            </label>
            <input
              type="text"
              value={visualDescription}
              onChange={(e) => setVisualDescription(e.target.value)}
              placeholder="e.g. 5-slide carousel on warm ivory paper with bold typography"
              className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={runAudit}
              disabled={isAnalyzing}
              className="flex-1 py-2 rounded-lg bg-surface-warm hover:bg-stone-hover border border-stone-border text-ink-navy text-xs font-bold transition-colors cursor-pointer"
            >
              Re-score Draft
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleSaveUpdatedContent}
              disabled={!analysisResult}
              className="px-4 py-2 rounded-lg bg-ink-navy text-white text-xs font-bold hover:bg-cobalt transition-colors shadow-soft cursor-pointer"
            >
              Save to Library
            </motion.button>
          </div>

          <div className="p-3 bg-surface-warm border border-stone-border rounded text-[11px] text-ink-muted leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-cobalt flex-shrink-0 mt-0.5" />
            <span>
              <strong>Editorial Estimate:</strong> Scores are based on creator psychology heuristics, retention dropoff points, and clarity criteria. We do not claim an unverified "probability of virality."
            </span>
          </div>
        </div>

        {/* Right Column: Diagnostic Assessment & Suggested Revisions */}
        <div className="lg:col-span-7 space-y-6">
          {!analysisResult ? (
            <div className="bg-white border-2 border-dashed border-stone-border rounded-panel p-12 text-center text-xs text-ink-muted card-tactile">
              Click "Run Packaging Critique" to evaluate your content across all 10 dimensions.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Score Overview Card */}
              <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6 card-tactile">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider">
                    Content Readiness Assessment
                  </span>
                  <h3 className="text-xl font-extrabold text-ink-navy">
                    {analysisResult.statusLabel}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed max-w-md">
                    {analysisResult.assessmentExplanation}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <ScoreGauge score={analysisResult.contentReadinessScore} size="lg" />
                </div>
              </div>

              {/* Strengths & Weaknesses Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-2.5 card-tactile">
                  <span className="text-[10px] font-mono text-teal-success uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Observed Strengths
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink-navy">
                    {analysisResult.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-success font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-2.5 card-tactile">
                  <span className="text-[10px] font-mono text-amber-warning uppercase font-bold tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Improvement Opportunities
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink-navy">
                    {analysisResult.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-warning font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 10 Separate Dimensions Breakdown with Filter Chips */}
              <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4 card-tactile">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-divider">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">
                      10-Dimension Breakdown
                    </h4>
                    <span className="text-[10px] text-ink-faint font-mono">Weighted Packaging Heuristic</span>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-surface-warm p-1 rounded-lg border border-stone-border">
                    <button
                      onClick={() => setDimensionFilter('all')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${dimensionFilter === 'all' ? 'bg-white text-ink-navy shadow-2xs' : 'text-ink-muted'}`}
                    >
                      All (10)
                    </button>
                    <button
                      onClick={() => setDimensionFilter('high')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${dimensionFilter === 'high' ? 'bg-white text-teal-success shadow-2xs' : 'text-ink-muted'}`}
                    >
                      Strong (≥80)
                    </button>
                    <button
                      onClick={() => setDimensionFilter('needs_work')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${dimensionFilter === 'needs_work' ? 'bg-white text-amber-warning shadow-2xs' : 'text-ink-muted'}`}
                    >
                      Improve (&lt;80)
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-stone-divider">
                  {filteredDimensions.map((dim) => {
                    const isExpanded = expandedDimension === dim.key;
                    return (
                      <div key={dim.key} className="py-3">
                        <div
                          onClick={() => setExpandedDimension(isExpanded ? null : dim.key)}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-ink-navy group-hover:text-cobalt transition-colors">
                              {dim.name}
                            </span>
                            <span className="text-[10px] font-bold text-ink-muted bg-surface-warm px-1.5 py-0.2 rounded border border-stone-border">
                              {dim.rating}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-extrabold font-mono ${dim.score >= 80 ? 'text-teal-success' : dim.score >= 65 ? 'text-cobalt' : 'text-amber-warning'}`}>
                              {dim.score}/100
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-ink-faint" /> : <ChevronDown className="w-3.5 h-3.5 text-ink-faint" />}
                          </div>
                        </div>

                        {/* Progress meter with animated bar */}
                        <div className="w-full h-1.5 bg-stone-hover rounded-full overflow-hidden mt-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dim.score}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full ${dim.score >= 80 ? 'bg-teal-success' : dim.score >= 65 ? 'bg-cobalt' : 'bg-amber-warning'}`}
                          />
                        </div>

                        {/* Feedback text */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-ink-muted mt-2 pl-1 leading-relaxed bg-surface-warm p-3 rounded-lg border border-stone-border">
                                {dim.feedback}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Before-and-After Concrete Demonstrations */}
              {analysisResult.beforeAfterExamples.length > 0 && (
                <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4 card-tactile">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy">
                    Before & After Revisions
                  </h4>

                  <div className="space-y-3">
                    {analysisResult.beforeAfterExamples.map((ex, idx) => (
                      <div key={idx} className="bg-surface-warm rounded-lg p-4 border border-stone-border text-xs space-y-2">
                        <span className="font-bold text-ink-navy block">{ex.aspect}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded bg-white border border-red-200 shadow-2xs">
                            <span className="text-[9px] font-bold text-red-error uppercase block mb-1">Before</span>
                            <p className="text-[11px] text-ink-muted italic leading-relaxed">{ex.before}</p>
                          </div>
                          <div className="p-3 rounded bg-white border border-teal-200 shadow-2xs">
                            <span className="text-[9px] font-bold text-teal-success uppercase block mb-1">After</span>
                            <p className="text-[11px] text-ink-navy font-semibold leading-relaxed">{ex.after}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-cobalt font-medium pt-1">
                          💡 Why it works: {ex.whyItWorks}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improved Ready-to-Use Draft */}
              <div className="bg-white border-2 border-cobalt rounded-panel p-6 shadow-panel space-y-4 card-tactile">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase shadow-2xs">
                      Recommended Rewrite
                    </span>
                    <h4 className="font-bold text-sm text-ink-navy">Polished Ready Draft</h4>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyImprovedDraft}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold transition-all shadow-cobalt-glow cursor-pointer"
                  >
                    {appliedImproved ? <CheckCheck className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                    <span>{appliedImproved ? 'Adopted in Editor!' : 'Adopt in Editor'}</span>
                  </motion.button>
                </div>

                <div className="p-4 bg-surface-warm border border-stone-border rounded-lg text-xs text-ink-navy leading-relaxed font-sans whitespace-pre-wrap">
                  {analysisResult.improvedDraft}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
