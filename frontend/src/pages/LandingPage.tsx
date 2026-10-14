import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Layers,
  Compass,
  Check,
  HelpCircle,
  TrendingUp,
  Bookmark,
  Share2,
  ChevronDown,
  ShieldCheck,
  Sliders,
  Eye,
  MessageSquare,
  Radio,
  Flame,
  ArrowUpRight,
  Activity,
  Layers3,
  FileCheck2,
  Clock,
  Sparkle
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SocialPreviewCard } from '../components/previews/SocialPreviewCard';
import { CarouselPreview } from '../components/previews/CarouselPreview';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { TrendRadialChart, TrendMetric } from '../components/ui/TrendRadialChart';
import { useAuth } from '../context/AuthContext';
import { SEED_PLANS } from '../services/mockData';

// Trend topics with pre-packaged forecasting signals
interface TrendTopicItem {
  id: string;
  topic: string;
  badge: string;
  velocity: string;
  category: string;
  score: number;
  format: string;
  metrics: TrendMetric[];
  preview: {
    instagram: {
      headline: string;
      slides: { slide: string; headline: string; subtext: string }[];
    };
    linkedin: {
      authorName: string;
      authorHandle: string;
      hook: string;
      body: string;
      hashtags: string[];
    };
    tiktok: {
      authorName: string;
      authorHandle: string;
      hook: string;
      body: string;
      hashtags: string[];
    };
  };
}

const TREND_TOPICS: TrendTopicItem[] = [
  {
    id: 'direct-trade',
    topic: 'Why Direct Trade Coffee Changes Everything',
    badge: '🚀 Breakout Signal',
    velocity: '+184% Velocity',
    category: 'Supply Chain Transparency',
    score: 94,
    format: 'Carousels & Longform Breakdown',
    metrics: [
      { id: 'velocity', label: 'Cultural Velocity', value: 94, color: '#3457F1', description: 'Surging conversation volume on supply chain honesty', icon: TrendingUp },
      { id: 'hook', label: 'Hook Disruption', value: 92, color: '#D9F078', description: 'High thumbstop rate on contrarian financial comparisons', icon: Zap },
      { id: 'retention', label: 'Format Pacing', value: 89, color: '#0E9F6E', description: 'Deep slide-by-slide completion on multi-image posts', icon: Eye },
      { id: 'shareability', label: 'Share Coefficient', value: 91, color: '#F59E0B', description: 'Strong peer sharing among conscious consumers', icon: Share2 },
      { id: 'brand', label: 'Brand Alignment', value: 98, color: '#8B5CF6', description: '100% anchored in Roast & Co. Guji Natural catalog', icon: ShieldCheck },
      { id: 'resonance', label: 'Audience Empathy', value: 90, color: '#EC4899', description: 'High positive comment sentiment and discussion', icon: Sparkles },
    ],
    preview: {
      instagram: {
        headline: 'Direct Trade Math',
        slides: [
          { slide: 'Slide 1', headline: 'The 14-Day Coffee Lie', subtext: 'Why supermarket bags taste flat before you even cut the seal.' },
          { slide: 'Slide 2', headline: 'Rule 1: Check Roast Date', subtext: 'Beans peak between days 7 and 21. After day 30, aromatics degrade.' },
          { slide: 'Slide 3', headline: 'Rule 2: The Bloom Test', subtext: 'Pour 60g hot water. If the bed does not swell, the CO2 is dead.' },
          { slide: 'Slide 4', headline: 'Rule 3: Degassing Valves', subtext: 'Store in airtight one-way valve pouches. Avoid the freezer.' }
        ]
      },
      linkedin: {
        authorName: 'Elena Vance',
        authorHandle: 'Founder at Roast & Co. • Specialty Coffee Importer',
        hook: "Direct trade isn't corporate charity. Here is the actual financial math:",
        body: "Commodity C-market coffee trades around $1.40/lb, leaving smallholder farms below subsistence.\n\nIn Ethiopia's Guji region, we contract directly at $4.20/lb.\n\nFair compensation is the only thing protecting agricultural craft.",
        hashtags: ['#DirectTrade', '#SupplyChain', '#SpecialtyCoffee', '#Sustainability']
      },
      tiktok: {
        authorName: 'Roast & Co.',
        authorHandle: '@roastandco_pdx',
        hook: "Stop buying coffee bags that don't stamp a roast date on the front:",
        body: "Supermarket expiration dates are 12 months out. Coffee goes stale in 4 weeks. Here is the 10-second bloom test you can do at home tomorrow morning! ☕✨",
        hashtags: ['#CoffeeTok', '#BaristaHacks', '#FreshRoast', '#EspressoTips']
      }
    }
  },
  {
    id: 'stale-coffee',
    topic: 'The 14-Day Supermarket Coffee Myth',
    badge: '🔥 High Discussion',
    velocity: '+220% Velocity',
    category: 'Consumer Education',
    score: 92,
    format: 'Short-Form Reel & Carousel',
    metrics: [
      { id: 'velocity', label: 'Cultural Velocity', value: 96, color: '#3457F1', description: 'Viral debate on roasted date vs expiration date', icon: TrendingUp },
      { id: 'hook', label: 'Hook Disruption', value: 95, color: '#D9F078', description: 'High curiosity gap: "The 14-Day Lie"', icon: Zap },
      { id: 'retention', label: 'Format Pacing', value: 87, color: '#0E9F6E', description: 'Crisp 4-slide carousel structure prevents dropoff', icon: Eye },
      { id: 'shareability', label: 'Share Coefficient', value: 93, color: '#F59E0B', description: 'Frequent DMs to friends and family', icon: Share2 },
      { id: 'brand', label: 'Brand Alignment', value: 94, color: '#8B5CF6', description: 'Positions Roast & Co. as transparent craft roaster', icon: ShieldCheck },
      { id: 'resonance', label: 'Audience Empathy', value: 88, color: '#EC4899', description: 'Sparks realization in everyday coffee drinkers', icon: Sparkles },
    ],
    preview: {
      instagram: {
        headline: 'Freshness Guide',
        slides: [
          { slide: 'Slide 1', headline: 'The Grocery Store Lie', subtext: 'How "Best By 2027" hides a 9-month-old stale bag of beans.' },
          { slide: 'Slide 2', headline: 'Why Degassing Matters', subtext: 'Coffee releases CO2 for 14 days after roast. That is where flavor lives.' },
          { slide: 'Slide 3', headline: 'Grind Just Before Brew', subtext: 'Pre-ground coffee loses 60% of volatile oils within 15 minutes.' },
          { slide: 'Slide 4', headline: 'Taste The Difference', subtext: 'Fresh roast is naturally sweet without adding pumps of sugar syrup.' }
        ]
      },
      linkedin: {
        authorName: 'Elena Vance',
        authorHandle: 'Founder at Roast & Co. • Specialty Coffee Importer',
        hook: "Most FMCG grocery shelf-life practices are built for distributors, not consumers.",
        body: "By labeling 'Best Before' dates 18 months in advance, industrial brands sell oxidized coffee.\n\nSpecialty coffee requires true transparent batch roasting and direct dispatch.",
        hashtags: ['#FoodPackaging', '#SpecialtyCoffee', '#ConsumerTruth']
      },
      tiktok: {
        authorName: 'Roast & Co.',
        authorHandle: '@roastandco_pdx',
        hook: "Here is why your expensive coffee beans still taste bitter and watery:",
        body: "Turn the bag around. If it says 'Best by December 2026', put it down. You want a 'Roasted On' stamp within the last 21 days! ☕👇",
        hashtags: ['#CoffeeTips', '#BaristaLife', '#SpecialtyCoffee']
      }
    }
  },
  {
    id: 'latte-art-hack',
    topic: 'Silky Microfoam With a $15 French Press',
    badge: '⚡ High Virality',
    velocity: '+310% Velocity',
    category: 'Tactile Home Hacks',
    score: 95,
    format: 'Reel Shot-List & Micro-Guide',
    metrics: [
      { id: 'velocity', label: 'Cultural Velocity', value: 98, color: '#3457F1', description: 'Massive organic bookmark velocity on budget coffee hacks', icon: TrendingUp },
      { id: 'hook', label: 'Hook Disruption', value: 96, color: '#D9F078', description: 'Immediate disruption: $15 tool beats $2,000 espresso machine', icon: Zap },
      { id: 'retention', label: 'Format Pacing', value: 94, color: '#0E9F6E', description: 'Fast-paced visual tutorial keeps viewers to final second', icon: Eye },
      { id: 'shareability', label: 'Share Coefficient', value: 95, color: '#F59E0B', description: 'Extremely high bookmark-to-view ratio', icon: Share2 },
      { id: 'brand', label: 'Brand Alignment', value: 92, color: '#8B5CF6', description: 'Pairs naturally with Roast & Co. espresso roast', icon: ShieldCheck },
      { id: 'resonance', label: 'Audience Empathy', value: 94, color: '#EC4899', description: 'Accessible to anyone with basic kitchen equipment', icon: Sparkles },
    ],
    preview: {
      instagram: {
        headline: 'French Press Latte Art',
        slides: [
          { slide: 'Slide 1', headline: 'The $15 Microfoam Secret', subtext: 'How to texture silky milk without a steam wand or espresso machine.' },
          { slide: 'Slide 2', headline: 'Heat to Exactly 60°C', subtext: 'Oat or whole milk. Warm, but never scalded or bubbling.' },
          { slide: 'Slide 3', headline: 'The Two-Phase Plunge', subtext: '10 deep pumps to incorporate air. 30 shallow micro-pumps to shear foam.' },
          { slide: 'Slide 4', headline: 'The Wet Paint Shine', subtext: 'Swirl the pitcher. When it looks like glossy wet paint, pour your tulip!' }
        ]
      },
      linkedin: {
        authorName: 'Elena Vance',
        authorHandle: 'Founder at Roast & Co. • Specialty Coffee Importer',
        hook: "Accessibility is what grows premium craft markets, not gatekeeping.",
        body: "When we teach customers how to froth silky microfoam with a $15 French press, our bean re-order rate triples.\n\nDemystify the ritual, and customers fall in love with the craft.",
        hashtags: ['#CustomerExperience', '#ProductEducation', '#BrandStrategy']
      },
      tiktok: {
        authorName: 'Roast & Co.',
        authorHandle: '@roastandco_pdx',
        hook: "You do NOT need a $2,000 espresso machine for silky latte art:",
        body: "Grab a $15 French press and warm oat milk. 10 deep plunges to aerate, then 30 micro-plunges to shear the foam into glossy wet paint. 🥛✨",
        hashtags: ['#CoffeeHacks', '#LatteArt', '#BaristaTips', '#HomeBarista']
      }
    }
  }
];

export const LandingPage: React.FC = () => {
  const { loginAsDemoCustomer } = useAuth();
  const navigate = useNavigate();

  // Active trend topic selected in interactive hero
  const [selectedTopic, setSelectedTopic] = useState<TrendTopicItem>(TREND_TOPICS[0]);
  const [demoPlatform, setDemoPlatform] = useState<'instagram' | 'linkedin' | 'tiktok'>('instagram');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [customPrompt, setCustomPrompt] = useState('Why direct trade pricing changes smallholder farming');
  const [isScoring, setIsScoring] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(88);

  const handleStartDemo = () => {
    loginAsDemoCustomer();
    navigate('/app');
  };

  const handleInteractiveScore = () => {
    setIsScoring(true);
    setTimeout(() => {
      setSimulatedScore((prev) => (prev === 88 ? 94 : 88));
      setIsScoring(false);
    }, 600);
  };

  const faqs = [
    {
      q: 'What does ContentPilot AI do that standard social schedulers do not?',
      a: 'Most social media tools (Buffer, Hootsuite, Later) are purely distribution pipelines: you bring finished copy and paste it into a calendar. ContentPilot AI is a proactive Trend Forecasting & Editorial Packaging Engine. We monitor real-time social conversation velocity, anchor content in your verified brand parameters, grade your copy across 10 packaging dimensions before you hit upload, and turn results into future experiment hypotheses.'
    },
    {
      q: 'How does the Trend Forecasting Radar predict what will resonate?',
      a: 'Our radar monitors conversation spikes, search intent shifts, and format resonance patterns across TikTok, Instagram, Reddit, and LinkedIn. It quantifies cultural velocity, curiosity gaps, and saturation levels so you create content around topics as they are breaking, rather than after they are oversaturated.'
    },
    {
      q: 'How does the Brand Hub prevent generic or hallucinated AI claims?',
      a: 'Every generation strictly references your Brand Hub: verified product specs, pricing, target buyer personas, tone guidelines, and forbidden claims. This guarantees your content never fabricates features, quotes incorrect pricing, or uses sterile corporate jargon.'
    },
    {
      q: 'What are the 10 dimensions in the Content Potential Analyzer?',
      a: 'The analyzer evaluates Hook Strength (first 3-second thumbstop), Audience Relevance, Retention Structure, Readability, CTA Clarity, Shareability, Visual Pacing, Emotional Resonance, Brand Anchor, and Tone Consistency. It provides editorial critique and instant one-click revisions.'
    },
    {
      q: 'Do I need live social media passwords or paid API keys to test?',
      a: 'No. ContentPilot AI comes equipped with a complete offline demo workspace pre-seeded with our artisan coffee brand (Roast & Co.). You can test the AI studio, trend radar, analyzer, calendar, and analytics with zero setup or credit cards.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-ink-navy flex flex-col selection:bg-chartreuse selection:text-ink-navy">
      <Navbar />

      {/* =========================================================================
          LIVE CULTURAL SIGNAL MARQUEE TICKER (High-Contrast Obsidian Bar)
         ========================================================================= */}
      <div className="bg-surface-navy text-white text-xs py-2.5 px-4 border-b border-white/10 overflow-hidden relative z-20">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          <span className="flex items-center gap-2 font-mono font-bold text-chartreuse text-[11px] tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse text-chartreuse" />
            LIVE MARKET SIGNALS
          </span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Flame className="w-3 h-3 text-amber-400" />
            <strong className="text-white">TIKTOK:</strong> 3-Second Disruption Hook +4.8x Thumbstop Rate
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <TrendingUp className="w-3 h-3 text-chartreuse" />
            <strong className="text-white">SPECIALTY COFFEE:</strong> Ethical Direct Trade Math +180% Saves
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Zap className="w-3 h-3 text-cobalt" />
            <strong className="text-white">LINKEDIN PULSE:</strong> Contrarian Unit Economics +320% Reposts
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Eye className="w-3 h-3 text-teal-success" />
            <strong className="text-white">INSTAGRAM:</strong> 5-Slide Tactical Carousels +68% Bookmarks
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <strong className="text-white">BRAND GUARD:</strong> Zero Hallucinated Pricing or Fabricated Claims
          </span>
          {/* Duplicate loop items for smooth marquee continuity */}
          <span className="flex items-center gap-2 font-mono font-bold text-chartreuse text-[11px] tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse text-chartreuse" />
            LIVE MARKET SIGNALS
          </span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Flame className="w-3 h-3 text-amber-400" />
            <strong className="text-white">TIKTOK:</strong> 3-Second Disruption Hook +4.8x Thumbstop Rate
          </span>
          <span className="text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <TrendingUp className="w-3 h-3 text-chartreuse" />
            <strong className="text-white">SPECIALTY COFFEE:</strong> Ethical Direct Trade Math +180% Saves
          </span>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION — Bold Editorial Typography, High-Contrast Motifs & Trend Studio
         ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden border-b border-stone-border hero-ambient-mesh-animated">
        {/* Subtle geometric grid overlay with soft radial mask */}
        <div className="absolute inset-0 pattern-grid-stone opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_15%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Ambient moving abstract orbs for motion depth */}
        <motion.div
          animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-[8%] w-80 h-80 rounded-full bg-chartreuse/25 blur-3xl pointer-events-none -z-0"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 right-[10%] w-96 h-96 rounded-full bg-cobalt/15 blur-3xl pointer-events-none -z-0"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Editorial Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-stone-border shadow-soft"
            >
              <span className="w-2 h-2 rounded-full bg-chartreuse border border-ink-navy/30 animate-pulse" />
              <span className="text-xs font-bold text-ink-navy tracking-tight">
                AI Trend Forecasting & Content Packaging Engine
              </span>
              <span className="text-[10px] font-mono text-cobalt font-bold px-2 py-0.5 rounded bg-cobalt-light">
                v2.4
              </span>
            </motion.div>

            {/* Oversized Authority Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-ink-navy tracking-tight leading-[1.08]"
            >
              Predict culture before it peaks.{' '}
              <span className="relative inline-block text-cobalt">
                Package before you post.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                  className="absolute left-0 bottom-1.5 w-full h-3.5 bg-chartreuse/60 -z-10 origin-left rounded-sm"
                />
              </span>
            </motion.h1>

            {/* Clear Value Proposition Explaining What The Website Does */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto font-normal"
            >
              ContentPilot AI turns real-time social conversation signals into high-converting content. We forecast breakout topics, ground them in your authentic brand parameters, and grade your packaging across 10 dimensions before you hit publish.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-panel bg-cobalt hover:bg-cobalt-hover text-white text-sm font-bold shadow-cobalt-glow flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Interactive Demo Workspace</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 rounded-panel bg-white border border-stone-border hover:bg-stone-hover text-ink-navy text-sm font-bold shadow-soft transition-colors text-center inline-block cursor-pointer"
              >
                How It Works ↓
              </motion.a>
            </motion.div>

            {/* Trust and Feature Bullets */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-xs text-ink-faint flex flex-wrap items-center justify-center gap-3 pt-1"
            >
              <span className="flex items-center gap-1.5 font-medium text-ink-muted">
                <Check className="w-3.5 h-3.5 text-teal-success" /> 52,000+ Daily Signals
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium text-ink-muted">
                <Check className="w-3.5 h-3.5 text-teal-success" /> Pre-Seeded Artisan Coffee Brand
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium text-ink-muted">
                <Check className="w-3.5 h-3.5 text-teal-success" /> 100% Offline Demo
              </span>
            </motion.p>
          </div>

          {/* =========================================================================
              THE INTERACTIVE TREND FORECASTING & PACKAGING WORKSPACE
              (Asymmetric Split Showcase with Trend Topics & Flower Geometry)
             ========================================================================= */}
          <div className="relative mt-14 max-w-6xl mx-auto">
            {/* Floating Live Signal Badge 1 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-border shadow-elevated absolute -top-6 -left-6 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-chartreuse/40 text-ink-navy flex items-center justify-center font-bold text-xs">
                <Flame className="w-4 h-4 fill-ink-navy" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-cobalt uppercase">Breakout Topic</p>
                <p className="text-xs font-bold text-ink-navy">+184% Conversation Lift</p>
              </div>
            </motion.div>

            {/* Floating Live Signal Badge 2 */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-border shadow-elevated absolute -top-5 -right-6 z-20"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-subtle text-teal-success flex items-center justify-center font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-ink-faint uppercase">Brand Anchor</p>
                <p className="text-xs font-bold text-ink-navy">100% Verified Products</p>
              </div>
            </motion.div>

            {/* Main Interactive Showcase Container */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
              className="bg-white border border-stone-border rounded-2xl shadow-elevated overflow-hidden card-tactile"
            >
              {/* Workspace Top Toolbar */}
              <div className="px-6 py-4 bg-surface-subtle border-b border-stone-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono font-bold text-ink-navy">
                    ContentPilot Trend Radar • Active Workspace: Roast & Co.
                  </span>
                </div>

                {/* Platform Selector */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-border shadow-2xs">
                  {(['instagram', 'linkedin', 'tiktok'] as const).map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setDemoPlatform(plat)}
                      className={`relative px-3 py-1 rounded text-xs font-bold transition-all capitalize cursor-pointer ${
                        demoPlatform === plat
                          ? 'bg-cobalt text-white shadow-sm'
                          : 'text-ink-muted hover:text-ink-navy'
                      }`}
                    >
                      {plat === 'instagram' ? 'Instagram Carousel' : plat === 'linkedin' ? 'LinkedIn Article' : 'TikTok Script'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid: 3 Interactive Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-border">
                {/* Column 1: Trend Radar Topic Ingestion (4 cols) */}
                <div className="lg:col-span-4 p-6 space-y-4 bg-surface-warm">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cobalt font-bold">
                      01 • Real-Time Trend Signals
                    </span>
                    <h3 className="text-base font-bold text-ink-navy mt-0.5">Select Emerging Angle</h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Click any forecasted cultural signal to simulate real-time AI packaging:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {TREND_TOPICS.map((topicItem) => {
                      const isSelected = selectedTopic.id === topicItem.id;
                      return (
                        <div
                          key={topicItem.id}
                          onClick={() => setSelectedTopic(topicItem)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-cobalt shadow-soft ring-2 ring-cobalt/10'
                              : 'bg-white/70 border-stone-border hover:bg-white hover:border-stone-hover'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-cobalt">{topicItem.badge}</span>
                            <span className="font-mono font-bold text-teal-success text-[10px]">{topicItem.velocity}</span>
                          </div>
                          <p className="text-xs font-bold text-ink-navy leading-snug">{topicItem.topic}</p>
                          <div className="flex items-center justify-between text-[10px] text-ink-faint mt-2 pt-2 border-t border-stone-divider">
                            <span>{topicItem.category}</span>
                            <span className="font-mono font-bold text-ink-navy">{topicItem.score}% Match</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Grounding Anchors Box */}
                  <div className="bg-white rounded-xl p-3 border border-stone-border text-xs space-y-2 shadow-2xs">
                    <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider block">
                      Brand Hub Anchors (Zero Hallucination)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-subtle border border-stone-border text-ink-navy">
                        Guji Natural ($22)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-subtle border border-stone-border text-ink-navy">
                        Direct Farm Trade
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-subtle border border-stone-border text-ink-navy">
                        Tone: Warm & Authoritative
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2: The Organic Trend Radial Geometry (4 cols) */}
                <div className="lg:col-span-4 p-5 bg-surface-navy flex flex-col justify-between">
                  <TrendRadialChart
                    metrics={selectedTopic.metrics}
                    activeTopic={selectedTopic.topic}
                    confidenceScore={selectedTopic.score}
                    className="h-full flex flex-col justify-between"
                  />
                </div>

                {/* Column 3: Live Output Preview Studio (4 cols) */}
                <div className="lg:col-span-4 p-6 bg-surface-subtle flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-teal-success font-bold">
                          02 • Packaged Output Preview
                        </span>
                        <h4 className="text-sm font-bold text-ink-navy">Ready-to-Publish Asset</h4>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-stone-border text-xs font-mono font-bold text-cobalt shadow-2xs">
                        <Zap className="w-3 h-3 fill-cobalt" />
                        <span>{selectedTopic.score}/100</span>
                      </div>
                    </div>

                    {/* Social Preview */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedTopic.id}-${demoPlatform}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        {demoPlatform === 'instagram' ? (
                          <CarouselPreview
                            brandName="Roast & Co."
                            slides={selectedTopic.preview.instagram.slides}
                          />
                        ) : demoPlatform === 'linkedin' ? (
                          <SocialPreviewCard
                            platform="linkedin"
                            authorName={selectedTopic.preview.linkedin.authorName}
                            authorHandle={selectedTopic.preview.linkedin.authorHandle}
                            hook={selectedTopic.preview.linkedin.hook}
                            bodyCaption={selectedTopic.preview.linkedin.body}
                            hashtags={selectedTopic.preview.linkedin.hashtags}
                            visualConcept="High-contrast photography of Ethiopian washing beds at dawn"
                          />
                        ) : (
                          <SocialPreviewCard
                            platform="tiktok"
                            authorName={selectedTopic.preview.tiktok.authorName}
                            authorHandle={selectedTopic.preview.tiktok.authorHandle}
                            hook={selectedTopic.preview.tiktok.hook}
                            bodyCaption={selectedTopic.preview.tiktok.body}
                            hashtags={selectedTopic.preview.tiktok.hashtags}
                            visualConcept="Dynamic macro shot of bloom water pouring over fresh grind"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStartDemo}
                      className="w-full py-2.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-soft cursor-pointer"
                    >
                      <span>Open In Full AI Studio →</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT THE WEBSITE DOES: THE 4-STEP INTELLIGENCE CYCLE
          (Editorial Process Grid explaining the complete value loop)
         ========================================================================= */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white border-b border-stone-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              The Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight">
              What ContentPilot AI actually does
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              Standard social schedulers only let you type and queue posts. ContentPilot AI powers the entire intelligence loop: from detecting raw conversation momentum to pre-publish packaging and hypothesis-driven learning.
            </p>
          </motion.div>

          {/* 4-Step Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -5 }}
              className="bg-surface-warm border border-stone-border rounded-2xl p-6 space-y-4 hover:shadow-card-hover transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-stone-border font-mono">01</span>
                <div className="w-10 h-10 rounded-xl bg-cobalt text-white flex items-center justify-center font-bold shadow-soft">
                  <Radio className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-ink-navy">Trend Radar & Signal Ingestion</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                We monitor breaking conversation velocity, search volume shifts, and comment debates across TikTok, Instagram, Reddit, and LinkedIn. Detect high-momentum angles before they become oversaturated.
              </p>
              <div className="pt-2 border-t border-stone-divider text-[11px] font-mono text-cobalt font-bold">
                ✓ 52,000+ Daily Ingested Signals
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-surface-warm border border-stone-border rounded-2xl p-6 space-y-4 hover:shadow-card-hover transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-stone-border font-mono">02</span>
                <div className="w-10 h-10 rounded-xl bg-ink-navy text-white flex items-center justify-center font-bold shadow-soft">
                  <ShieldCheck className="w-5 h-5 text-chartreuse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-ink-navy">Brand Hub Truth Anchoring</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Generic AI generates fake claims. ContentPilot locks your verified catalog, exact pricing, target personas, and compliance boundaries. Every post sounds like your brand’s best human editor.
              </p>
              <div className="pt-2 border-t border-stone-divider text-[11px] font-mono text-ink-navy font-bold">
                ✓ Zero Hallucinations Guard
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-surface-warm border-2 border-cobalt rounded-2xl p-6 space-y-4 shadow-elevated relative overflow-hidden bg-white ring-4 ring-cobalt/5"
            >
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-chartreuse text-ink-navy uppercase tracking-wider">
                Proprietary
              </span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-cobalt/30 font-mono">03</span>
                <div className="w-10 h-10 rounded-xl bg-chartreuse text-ink-navy flex items-center justify-center font-bold shadow-soft">
                  <Zap className="w-5 h-5 fill-ink-navy" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-ink-navy">10-Dimension Packaging Engine</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Top YouTubers diagnose thumbnails with vidIQ; we diagnose social copy before you hit upload. We evaluate hook strength, visual readability, and CTA clarity with one-click revision suggestions.
              </p>
              <div className="pt-2 border-t border-stone-divider text-[11px] font-mono text-cobalt font-bold">
                ✓ Pre-Publish Readiness Score
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-surface-warm border border-stone-border rounded-2xl p-6 space-y-4 hover:shadow-card-hover transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-stone-border font-mono">04</span>
                <div className="w-10 h-10 rounded-xl bg-teal-success text-white flex items-center justify-center font-bold shadow-soft">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-ink-navy">Hypothesis & Experiment Learning</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Post to the calendar, record observed engagement, and receive actionable experiment hypotheses. Turn every published post into compound knowledge for your next creative cycle.
              </p>
              <div className="pt-2 border-t border-stone-divider text-[11px] font-mono text-teal-success font-bold">
                ✓ Continuous Hypothesis Loop
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE PACKAGING DIAGNOSTIC SPOTLIGHT (Interactive Dimension Tester)
         ========================================================================= */}
      <section id="analyzer" className="py-20 md:py-32 bg-surface-tinted border-b border-stone-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-border text-xs font-bold text-cobalt shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-cobalt" /> Editorial Heuristic Engine
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight leading-tight">
                Stop publishing blind. Score your packaging first.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Great content fails when the packaging is weak. If the hook is passive, the typography dense, or the call-to-action confusing, the algorithm cuts distribution before anyone reads your message.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">First 3 Seconds Thumbstop:</strong> Grades whether the hook triggers immediate curiosity, contrarian tension, or utility.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">Transparent Scoring Reason:</strong> Clear qualitative feedback explaining why a score was assigned, with zero fake "virality promises."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">One-Click Revision Pairs:</strong> See before-and-after improvements and apply polished wording directly to your clipboard.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/app/analyzer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-navy text-white text-xs font-bold hover:bg-cobalt transition-colors shadow-soft"
                  >
                    Test Content Analyzer In App <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Interactive Diagnostic Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 bg-white border border-stone-border rounded-panel p-6 sm:p-7 shadow-elevated space-y-6 card-tactile"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-divider">
                <div>
                  <h4 className="font-bold text-sm text-ink-navy">Pre-Publish Diagnostic Telemetry</h4>
                  <p className="text-[11px] text-ink-faint">Evaluating: "Why Supermarket Coffee Stales in 14 Days"</p>
                </div>
                <ScoreGauge score={simulatedScore} size="md" />
              </div>

              {/* Progress Bars for Top Dimensions with Scroll Reveal */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>Hook Disruption (First 3-Second Thumbstop)</span>
                    <span className="text-teal-success font-bold font-mono">94%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '94%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-teal-success rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>Visual Formatting & Scanning Pacing</span>
                    <span className="text-teal-success font-bold font-mono">89%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '89%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                      className="h-full bg-teal-success rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>CTA Clarity & Bookmark Value</span>
                    <span className="text-cobalt font-bold font-mono">86%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '86%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                      className="h-full bg-cobalt rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Suggested Revision Box */}
              <div className="bg-surface-warm rounded-lg p-4 border border-stone-border space-y-2.5 text-xs">
                <span className="font-mono text-[10px] text-cobalt font-bold uppercase tracking-wider block">
                  Suggested Revision Demonstration
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-white border border-red-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-red-error uppercase block mb-1">Before (Passive)</span>
                    <p className="text-[11px] text-ink-muted italic leading-relaxed">
                      "In this post, I want to talk about how coffee beans get stale after roasting..."
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-teal-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-teal-success uppercase block mb-1">After (High Hook)</span>
                    <p className="text-[11px] text-ink-navy font-semibold leading-relaxed">
                      "Stop buying coffee bags without a roast date stamped on the front."
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-1 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInteractiveScore}
                  disabled={isScoring}
                  className="px-4 py-2 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-ink-navy" />
                  <span>{isScoring ? 'Recalculating...' : 'Re-Run Diagnostic'}</span>
                </motion.button>
                <span className="text-[11px] font-mono text-ink-faint">Heuristic Model: v2.4</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPETITIVE COMPARISON: WHY CONTENTPILOT AI IS DIFFERENT
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-stone-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              Market Positioning
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-navy">Why creators switch to ContentPilot</h2>
            <p className="text-xs text-ink-muted">A purpose-built intelligence engine versus generic posting tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-warm border border-stone-border space-y-3">
              <span className="text-xs font-bold font-mono text-ink-faint uppercase">Traditional Schedulers</span>
              <h4 className="font-bold text-base text-ink-navy">Buffer, Hootsuite, Later</h4>
              <ul className="space-y-2 text-xs text-ink-muted pt-2 border-t border-stone-divider">
                <li className="flex items-center gap-2 text-red-500">✕ Pure distribution pipelines only</li>
                <li className="flex items-center gap-2 text-red-500">✕ Zero pre-publish hook diagnostics</li>
                <li className="flex items-center gap-2 text-red-500">✕ Blind to cultural trend signals</li>
                <li className="flex items-center gap-2 text-red-500">✕ No brand compliance guarding</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-warm border border-stone-border space-y-3">
              <span className="text-xs font-bold font-mono text-ink-faint uppercase">Generic AI Writers</span>
              <h4 className="font-bold text-base text-ink-navy">ChatGPT, Jasper, Copy.ai</h4>
              <ul className="space-y-2 text-xs text-ink-muted pt-2 border-t border-stone-divider">
                <li className="flex items-center gap-2 text-red-500">✕ Hallucinates pricing & claims</li>
                <li className="flex items-center gap-2 text-red-500">✕ Sterile corporate tone of voice</li>
                <li className="flex items-center gap-2 text-red-500">✕ No native multi-platform previews</li>
                <li className="flex items-center gap-2 text-red-500">✕ Disconnected from your calendar</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface-navy text-white border-2 border-cobalt shadow-elevated space-y-3 relative overflow-hidden">
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold bg-chartreuse text-ink-navy uppercase">
                All-in-One
              </span>
              <span className="text-xs font-bold font-mono text-chartreuse uppercase">The Complete Loop</span>
              <h4 className="font-bold text-base text-white">ContentPilot AI</h4>
              <ul className="space-y-2 text-xs text-stone-200 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2 text-chartreuse">✓ Real-time cultural trend radar</li>
                <li className="flex items-center gap-2 text-chartreuse">✓ Strict Brand Hub truth anchor</li>
                <li className="flex items-center gap-2 text-chartreuse">✓ 10-dimension pre-publish scoring</li>
                <li className="flex items-center gap-2 text-chartreuse">✓ Hypothesis & learning feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING SECTION — Clean White Surface with Elevated Cobalt Accent
         ========================================================================= */}
      <section id="pricing" className="py-20 md:py-32 bg-surface-warm border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              Transparent Membership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight">
              Predictable pricing for creators and teams
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Start free with no credit card required. Upgrade as your content volume and team collaboration expand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {SEED_PLANS.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                className={`rounded-2xl border p-7 flex flex-col justify-between transition-all ${
                  plan.recommended
                    ? 'border-2 border-cobalt shadow-elevated relative bg-white ring-4 ring-cobalt/5'
                    : 'bg-white border-stone-border hover:shadow-card-hover'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-bold bg-chartreuse text-ink-navy uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <h3 className="font-bold text-lg text-ink-navy">{plan.name}</h3>
                  <div className="mt-3 mb-6 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-ink-navy">
                      ${plan.monthlyPriceUsd}
                    </span>
                    <span className="text-xs text-ink-faint">/ month</span>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-divider mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-ink-navy">
                        <Check className="w-4 h-4 text-teal-success flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartDemo}
                  className={`w-full py-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    plan.recommended
                      ? 'bg-cobalt hover:bg-cobalt-hover text-white shadow-cobalt-glow'
                      : 'bg-white border border-stone-border hover:bg-stone-hover text-ink-navy shadow-2xs'
                  }`}
                >
                  {plan.monthlyPriceUsd === 0 ? 'Start Free Now' : 'Choose ' + plan.name}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ SECTION — Expandable Accordion with Animated State
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-stone-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-12 space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-navy">Frequently Asked Questions</h2>
            <p className="text-xs text-ink-muted">Clear answers on how ContentPilot AI operates</p>
          </motion.div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-warm border border-stone-border rounded-panel overflow-hidden shadow-soft transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-ink-navy hover:text-cobalt transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-cobalt flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-ink-faint" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-0 text-xs text-ink-muted leading-relaxed pl-11 border-t border-stone-divider/50">
                          <p className="pt-3">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA SECTION — Deep Contrast Surface with Soft Ambient Glow
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-surface-navy text-white text-center relative overflow-hidden">
        {/* Soft radial glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cobalt/20 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-chartreuse/15 blur-3xl pointer-events-none -z-0" />
        <div className="absolute inset-0 pattern-dots-dark opacity-20 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 space-y-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Ready to forecast, package, and outperform?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-stone-border/80 max-w-xl mx-auto leading-relaxed"
          >
            Launch the interactive demo workspace with our pre-seeded specialty coffee brand. Test real-time trend signals, diagnose hooks with the packaging engine, and experience purposeful social media creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3.5 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartDemo}
              className="px-8 py-3.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy font-bold text-xs shadow-chartreuse-glow transition-all cursor-pointer"
            >
              Launch Free Demo Workspace
            </motion.button>
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all inline-block"
              >
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
