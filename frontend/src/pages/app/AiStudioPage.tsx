import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Calendar,
  Save,
  Copy,
  Check,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowRight,
  Edit3,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { storage } from '../../services/storage';
import { apiClient } from '../../services/apiClient';
import { Platform, ContentFormat, ContentItem } from '../../types';
import { SocialPreviewCard } from '../../components/previews/SocialPreviewCard';
import { CarouselPreview } from '../../components/previews/CarouselPreview';

export const AiStudioPage: React.FC = () => {
  const brand = storage.getBrandProfile();
  const products = storage.getProducts();
  const navigate = useNavigate();

  // Generator inputs
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [formatType, setFormatType] = useState<ContentFormat>('feed_post');
  const [topic, setTopic] = useState('Why direct trade coffee changes everything');
  const [objective, setObjective] = useState('education');
  const [tone, setTone] = useState(brand.toneOfVoice || 'Warm, authentic');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '');
  const [targetAudience, setTargetAudience] = useState(brand.targetAudiences[0] || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Generated outputs
  const [results, setResults] = useState<Partial<ContentItem>[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [providerBadge, setProviderBadge] = useState<string>('');
  const [isMockBadge, setIsMockBadge] = useState(true);

  // Rewrite / Tone modifier state
  const [rewriteInstruction, setRewriteInstruction] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await apiClient.generateContent({
        platform,
        formatType,
        topicOrGoal: topic,
        objective,
        tone,
        targetAudience,
        productName: selectedProduct,
        brandContext: brand
      });
      setResults(res.items);
      setSelectedItemIndex(0);
      setProviderBadge(res.provider);
      setIsMockBadge(res.isMock);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentItem = results[selectedItemIndex];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!currentItem) return;
    const saved = storage.saveContentItem({
      title: currentItem.title || topic,
      platform: currentItem.platform || platform,
      formatType: currentItem.formatType || formatType,
      hook: currentItem.hook,
      bodyCaption: currentItem.bodyCaption || '',
      hashtags: currentItem.hashtags || [],
      callToAction: currentItem.callToAction,
      visualConcept: currentItem.visualConcept,
      scriptScenes: currentItem.scriptScenes,
      carouselSlides: currentItem.carouselSlides,
      status: 'draft'
    });
    alert(`Saved "${saved.title}" to Content Library!`);
  };

  const handleScheduleDirect = () => {
    if (!currentItem) return;
    const saved = storage.saveContentItem({
      title: currentItem.title || topic,
      platform: currentItem.platform || platform,
      formatType: currentItem.formatType || formatType,
      hook: currentItem.hook,
      bodyCaption: currentItem.bodyCaption || '',
      hashtags: currentItem.hashtags || [],
      callToAction: currentItem.callToAction,
      visualConcept: currentItem.visualConcept,
      scriptScenes: currentItem.scriptScenes,
      carouselSlides: currentItem.carouselSlides,
      status: 'draft'
    });
    // Redirect to calendar or score
    navigate(`/app/calendar?scheduleItem=${saved.id}`);
  };

  const handleSendToAnalyzer = () => {
    if (!currentItem) return;
    const saved = storage.saveContentItem({
      title: currentItem.title || topic,
      platform: currentItem.platform || platform,
      formatType: currentItem.formatType || formatType,
      hook: currentItem.hook,
      bodyCaption: currentItem.bodyCaption || '',
      hashtags: currentItem.hashtags || [],
      callToAction: currentItem.callToAction,
      visualConcept: currentItem.visualConcept,
      scriptScenes: currentItem.scriptScenes,
      carouselSlides: currentItem.carouselSlides,
      status: 'draft'
    });
    navigate(`/app/analyzer?item=${saved.id}`);
  };

  const handleQuickRewrite = async (instruction: string) => {
    if (!currentItem || !currentItem.bodyCaption) return;
    setIsRewriting(true);
    try {
      const res = await apiClient.rewriteContent({
        textContent: currentItem.bodyCaption,
        instruction,
        platform: currentItem.platform || platform,
        brandContext: brand
      });
      const updated = { ...currentItem, bodyCaption: res.rewrittenText };
      const newResults = [...results];
      newResults[selectedItemIndex] = updated;
      setResults(newResults);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Context-Grounded Creation Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">AI Content Studio</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Generates brand-tailored posts, hooks, carousels, reel scripts, and weekly batches with immediate packaging audit.
          </p>
        </div>

        {providerBadge && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-subtle border border-stone-border text-xs">
            <span className={`w-2 h-2 rounded-full ${isMockBadge ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span className="text-[11px] font-mono text-ink-muted">{providerBadge}</span>
          </div>
        )}
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameters & Brand Grounding */}
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-divider">
            <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cobalt" /> Creation Brief
            </h3>
            <span className="text-[10px] font-mono text-ink-faint">Brand: {brand.businessName}</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Platform & Format */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Target Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white"
                >
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Asset Format</label>
                <select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value as ContentFormat)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white"
                >
                  <option value="feed_post">Feed Post</option>
                  <option value="carousel">Carousel (5 Slides)</option>
                  <option value="reel_script">Reel / Video Script</option>
                  <option value="story">Story Sequence</option>
                  <option value="hook_list">Hook Variations List</option>
                  <option value="batch">Weekly Content Batch</option>
                </select>
              </div>
            </div>

            {/* Topic / Angle */}
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Topic, Campaign, or Hook Seed</label>
              <textarea
                rows={2}
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Why light roast beans taste sour if water is too cold"
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
              />
            </div>

            {/* Objective & Product Anchor */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Objective</label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white"
                >
                  <option value="education">Save / Education</option>
                  <option value="engagement">Comments / Discussion</option>
                  <option value="sales">Product Sales / Launch</option>
                  <option value="authority">Thought Leadership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Anchor Product (Brand Hub)</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs bg-white"
                >
                  <option value="">General Brand Awareness</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tone Override */}
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Tone & Voice</label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Generating Structured Output...' : 'Generate Grounded Content'}
            </button>
          </form>

          {/* Context Safeguard Note */}
          <div className="p-3 bg-surface-subtle border border-stone-border rounded-lg text-[11px] text-ink-muted leading-relaxed">
            <strong>Grounded Guardrails:</strong> Prohibits unverified claims (
            <em>{brand.prohibitedClaims[0] || 'No unverified health guarantees'}</em>). Reuses real price points from Brand Hub.
          </div>
        </div>

        {/* Right Output & Editor View */}
        <div className="lg:col-span-7 space-y-4">
          {results.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-stone-border rounded-panel p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-cobalt-light text-cobalt flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-ink-navy">Ready to Generate</h4>
              <p className="text-xs text-ink-muted max-w-sm mx-auto leading-relaxed">
                Configure your brief on the left and click Generate. Output will format with scannable hooks, CTAs, and visual concepts.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-stone-border rounded-panel shadow-soft overflow-hidden">
              {/* Output tabs and items selector */}
              <div className="p-4 bg-surface-subtle border-b border-stone-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {results.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedItemIndex(idx)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        idx === selectedItemIndex
                          ? 'bg-ink-navy text-white shadow-sm'
                          : 'bg-white border border-stone-border text-ink-muted hover:text-ink-navy'
                      }`}
                    >
                      Variation {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-border">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${activeTab === 'editor' ? 'bg-cobalt text-white' : 'text-ink-muted'}`}
                  >
                    Structured Editor
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${activeTab === 'preview' ? 'bg-cobalt text-white' : 'text-ink-muted'}`}
                  >
                    Social Mockup
                  </button>
                </div>
              </div>

              {/* View 1: Editor */}
              {activeTab === 'editor' && currentItem && (
                <div className="p-6 space-y-6">
                  {/* Hook */}
                  {currentItem.hook && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-ink-navy">Opening Hook (First 3s / Line 1)</label>
                        <span className="text-[10px] text-cobalt font-mono uppercase font-bold">High-Retention Anchor</span>
                      </div>
                      <input
                        type="text"
                        value={currentItem.hook}
                        onChange={(e) => {
                          const updated = { ...currentItem, hook: e.target.value };
                          const copy = [...results];
                          copy[selectedItemIndex] = updated;
                          setResults(copy);
                        }}
                        className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-semibold bg-surface-subtle"
                      />
                    </div>
                  )}

                  {/* Body Caption */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-navy">Body Copy & Formatting</label>
                    <textarea
                      rows={6}
                      value={currentItem.bodyCaption}
                      onChange={(e) => {
                        const updated = { ...currentItem, bodyCaption: e.target.value };
                        const copy = [...results];
                        copy[selectedItemIndex] = updated;
                        setResults(copy);
                      }}
                      className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs leading-relaxed font-sans"
                    />
                  </div>

                  {/* Quick Tone & Rewrite Controls */}
                  <div className="bg-surface-subtle p-3.5 rounded-lg border border-stone-border space-y-2">
                    <span className="text-[10px] font-mono uppercase text-ink-faint font-bold tracking-wider">
                      Quick Rewrite & Polishing Tools
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleQuickRewrite('make it punchier and cut filler')}
                        disabled={isRewriting}
                        className="px-2.5 py-1 rounded bg-white border border-stone-border hover:bg-stone-hover text-xs font-semibold text-ink-navy"
                      >
                        ⚡ Make Punchier
                      </button>
                      <button
                        onClick={() => handleQuickRewrite('rewrite with conversational witty humor')}
                        disabled={isRewriting}
                        className="px-2.5 py-1 rounded bg-white border border-stone-border hover:bg-stone-hover text-xs font-semibold text-ink-navy"
                      >
                        😄 Add Wit
                      </button>
                      <button
                        onClick={() => handleQuickRewrite('strengthen curiosity hook in line 1')}
                        disabled={isRewriting}
                        className="px-2.5 py-1 rounded bg-white border border-stone-border hover:bg-stone-hover text-xs font-semibold text-ink-navy"
                      >
                        🎣 Sharpen Hook
                      </button>
                      <button
                        onClick={() => handleQuickRewrite('shorten to 3 concise bullet points')}
                        disabled={isRewriting}
                        className="px-2.5 py-1 rounded bg-white border border-stone-border hover:bg-stone-hover text-xs font-semibold text-ink-navy"
                      >
                        ✂️ Shorten
                      </button>
                    </div>
                  </div>

                  {/* Hashtags and CTA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink-navy mb-1">Hashtags</label>
                      <input
                        type="text"
                        value={currentItem.hashtags?.join(' ') || ''}
                        onChange={(e) => {
                          const updated = { ...currentItem, hashtags: e.target.value.split(' ').filter(Boolean) };
                          const copy = [...results];
                          copy[selectedItemIndex] = updated;
                          setResults(copy);
                        }}
                        className="w-full px-3 py-1.5 border border-stone-border rounded text-xs text-cobalt font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink-navy mb-1">Call to Action (CTA)</label>
                      <input
                        type="text"
                        value={currentItem.callToAction || ''}
                        onChange={(e) => {
                          const updated = { ...currentItem, callToAction: e.target.value };
                          const copy = [...results];
                          copy[selectedItemIndex] = updated;
                          setResults(copy);
                        }}
                        className="w-full px-3 py-1.5 border border-stone-border rounded text-xs"
                      />
                    </div>
                  </div>

                  {/* Reel Script Scenes if present */}
                  {currentItem.scriptScenes && currentItem.scriptScenes.length > 0 && (
                    <div className="space-y-2 border-t border-stone-divider pt-4">
                      <span className="text-xs font-bold text-ink-navy block">Reel / Video Shot List</span>
                      <div className="space-y-2">
                        {currentItem.scriptScenes.map((sc, i) => (
                          <div key={i} className="p-2.5 rounded bg-surface-subtle border border-stone-border text-xs flex gap-3">
                            <span className="font-mono font-bold text-cobalt">{sc.scene}</span>
                            <div className="flex-1 space-y-0.5">
                              <p className="text-ink-navy font-semibold">{sc.visual}</p>
                              <p className="text-ink-muted italic">"{sc.audio}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-stone-divider flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => handleCopy(currentItem.bodyCaption || '', currentItem.id || '1')}
                      className="px-3 py-2 rounded-lg border border-stone-border text-xs font-bold text-ink-navy hover:bg-stone-hover flex items-center gap-1.5"
                    >
                      {copiedId === currentItem.id ? <Check className="w-3.5 h-3.5 text-teal-success" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === currentItem.id ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSendToAnalyzer}
                        className="px-4 py-2 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 fill-ink-navy" /> Audit in Analyzer
                      </button>
                      <button
                        onClick={handleScheduleDirect}
                        className="px-3.5 py-2 rounded-lg border border-stone-border hover:bg-stone-hover text-ink-navy text-xs font-bold flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Schedule
                      </button>
                      <button
                        onClick={handleSaveToLibrary}
                        className="px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Social Mockup Preview */}
              {activeTab === 'preview' && currentItem && (
                <div className="p-8 bg-background flex items-center justify-center">
                  {currentItem.carouselSlides && currentItem.carouselSlides.length > 0 ? (
                    <CarouselPreview
                      brandName={brand.businessName}
                      slides={currentItem.carouselSlides}
                    />
                  ) : (
                    <SocialPreviewCard
                      platform={currentItem.platform || platform}
                      authorName={brand.businessName}
                      authorHandle={`@${brand.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                      hook={currentItem.hook}
                      bodyCaption={currentItem.bodyCaption || ''}
                      hashtags={currentItem.hashtags}
                      visualConcept={currentItem.visualConcept}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
