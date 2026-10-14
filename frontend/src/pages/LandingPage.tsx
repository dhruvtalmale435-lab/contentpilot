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
  ChevronRight,
  ShieldCheck,
  MousePointerClick,
  Sliders,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SocialPreviewCard } from '../components/previews/SocialPreviewCard';
import { CarouselPreview } from '../components/previews/CarouselPreview';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { useAuth } from '../context/AuthContext';
import { SEED_PLANS } from '../services/mockData';

export const LandingPage: React.FC = () => {
  const { loginAsDemoCustomer } = useAuth();
  const navigate = useNavigate();

  // Interactive Live Composition Demo State
  const [demoPlatform, setDemoPlatform] = useState<'instagram' | 'linkedin' | 'tiktok'>('instagram');
  const [demoTopic, setDemoTopic] = useState('Why direct trade coffee changes everything');
  const [isScoring, setIsScoring] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(88);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStartDemo = () => {
    loginAsDemoCustomer();
    navigate('/app');
  };

  const handleInteractiveScore = () => {
    setIsScoring(true);
    setTimeout(() => {
      setSimulatedScore(prev => (prev === 88 ? 94 : 88));
      setIsScoring(false);
    }, 500);
  };

  const faqs = [
    {
      q: 'How does the Content Potential Analyzer evaluate my content?',
      a: 'The analyzer evaluates 10 qualitative dimensions including hook strength, audience relevance, retention pacing, and CTA clarity. It uses documented heuristics and AI critiques to provide editorial improvement suggestions, not a guaranteed virality promise.'
    },
    {
      q: 'Does ContentPilot AI require my social media passwords or live API keys to test?',
      a: 'No. ContentPilot AI includes a full offline demo mode with seeded business data so you can evaluate the entire workflow without connecting live social accounts or credit cards.'
    },
    {
      q: 'How does the Brand Hub prevent generic AI output?',
      a: 'Every generation references your Brand Hub: verified products, tone guidelines, content pillars, target personas, and prohibited claims. This prevents hallucinated benefits and keeps your messaging consistent.'
    },
    {
      q: 'Can I export my content calendar or scheduled posts?',
      a: 'Yes. You can organize posts across calendar views, export ready-to-publish assets and copy, or sync through supported channels.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Ground in Brand Hub',
      desc: 'Store your products, pricing, personas, tone guidelines, and forbidden claims. Every AI generation respects your authentic boundaries.',
      icon: Layers,
      color: 'bg-ink-navy text-white',
      accent: 'border-stone-border'
    },
    {
      step: '02',
      title: 'Generate Structured Copy',
      desc: 'Produce hooks, captions, reel shot-lists, carousels, and weekly batches with 1-click tone shifts and text expanders.',
      icon: Sparkles,
      color: 'bg-cobalt text-white',
      accent: 'border-cobalt/30'
    },
    {
      step: '03',
      title: 'Analyze Pre-Publish Score',
      desc: 'Critique 10 qualitative dimensions before publishing. Identify weak hooks, confusing CTAs, or dense text walls with instant revisions.',
      icon: Zap,
      color: 'bg-chartreuse text-ink-navy',
      accent: 'border-cobalt shadow-soft',
      badge: 'Key Differentiator'
    },
    {
      step: '04',
      title: 'Execute & Learn',
      desc: 'Schedule to the content calendar, enter observed engagement metrics, and receive honest experiment hypotheses for your next batch.',
      icon: BarChart3,
      color: 'bg-teal-success text-white',
      accent: 'border-stone-border'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-ink-navy flex flex-col selection:bg-chartreuse selection:text-ink-navy">
      <Navbar />

      {/* =========================================================================
          HERO SECTION — Rich Animated Mesh, Expressive Typography & Layered UI
         ========================================================================= */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden border-b border-stone-border hero-ambient-mesh-animated">
        {/* Subtle geometric grid overlay with soft mask */}
        <div className="absolute inset-0 pattern-grid-stone opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Ambient moving abstract orbs for motion depth */}
        <motion.div
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-[10%] w-72 h-72 rounded-full bg-chartreuse/25 blur-3xl pointer-events-none -z-0"
        />
        <motion.div
          animate={{
            y: [12, -12, 12],
            x: [8, -8, 8],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 right-[12%] w-80 h-80 rounded-full bg-cobalt/15 blur-3xl pointer-events-none -z-0"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag badge with subtle pulse */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-stone-border shadow-soft"
            >
              <span className="w-2 h-2 rounded-full bg-chartreuse border border-ink-navy/30 animate-pulse" />
              <span className="text-xs font-bold text-ink-navy tracking-tight">
                The Creator Packaging & Planning Engine
              </span>
              <span className="text-[10px] font-mono text-cobalt font-semibold px-1.5 py-0.2 rounded bg-cobalt-light">
                v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink-navy tracking-tight leading-[1.12]"
            >
              Stop guessing what to post.{' '}
              <span className="relative inline-block text-cobalt">
                Start creating with purpose.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                  className="absolute left-0 bottom-1.5 w-full h-3 bg-chartreuse/60 -z-10 origin-left rounded-sm"
                />
              </span>
            </motion.h1>

            {/* Supporting message */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto"
            >
              Understand your brand, create better social content, discover opportunities, and learn from your results — all in one coherent workspace.
            </motion.p>

            {/* CTA Buttons with Spring Interactions */}
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
                <span>Launch Live Demo Workspace</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-panel bg-white border border-stone-border hover:bg-stone-hover text-ink-navy text-sm font-bold shadow-soft transition-colors text-center inline-block"
                >
                  Get Started Free
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-xs text-ink-faint flex items-center justify-center gap-2"
            >
              <span>No credit card required</span>
              <span>•</span>
              <span>Instant pre-seeded artisan coffee brand</span>
              <span>•</span>
              <span>100% offline-ready</span>
            </motion.p>
          </div>

          {/* =========================================================================
              LAYERED INTERACTIVE COMPOSITION WORKSPACE
             ========================================================================= */}
          <div className="relative mt-14 max-w-5xl mx-auto">
            {/* Floating Decorative Badge 1: Top Left */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-border shadow-elevated absolute -top-6 -left-8 z-20"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-subtle text-teal-success flex items-center justify-center font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-ink-faint uppercase">Brand Anchor</p>
                <p className="text-xs font-bold text-ink-navy">100% Verified Claims</p>
              </div>
            </motion.div>

            {/* Floating Decorative Badge 2: Top Right */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-border shadow-elevated absolute -top-5 -right-8 z-20"
            >
              <div className="w-7 h-7 rounded-lg bg-chartreuse/40 text-ink-navy flex items-center justify-center font-bold text-xs">
                <Zap className="w-4 h-4 fill-ink-navy" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-cobalt uppercase">Readiness Score</p>
                <p className="text-xs font-bold text-ink-navy">94 / 100 • Peak Packaging</p>
              </div>
            </motion.div>

            {/* Floating Decorative Badge 3: Bottom Right */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-border shadow-elevated absolute -bottom-6 -right-6 z-20"
            >
              <div className="w-7 h-7 rounded-lg bg-cobalt-light text-cobalt flex items-center justify-center font-bold text-xs">
                <Bookmark className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-ink-faint uppercase">Observed Signal</p>
                <p className="text-xs font-bold text-ink-navy">+3.4x Bookmark Retention</p>
              </div>
            </motion.div>

            {/* Main Interactive Showcase Card */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
              className="bg-white border border-stone-border rounded-2xl shadow-elevated overflow-hidden card-tactile"
            >
              {/* Top Workspace Chrome */}
              <div className="px-5 py-3.5 bg-surface-subtle border-b border-stone-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-ink-muted">
                    Workspace: Roast & Co. Artisanal Coffee
                  </span>
                </div>

                {/* Platform Selector Buttons with glide indicator */}
                <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-stone-border">
                  {(['instagram', 'linkedin', 'tiktok'] as const).map((plat) => (
                    <button
                      key={plat}
                      onClick={() => setDemoPlatform(plat)}
                      className={`relative px-3 py-1 rounded text-xs font-bold transition-all capitalize ${
                        demoPlatform === plat
                          ? 'bg-white text-ink-navy shadow-sm'
                          : 'text-ink-muted hover:text-ink-navy'
                      }`}
                    >
                      {plat === 'instagram' ? 'Instagram Carousel' : plat === 'linkedin' ? 'LinkedIn Article' : 'TikTok Reel Script'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Screen Composition Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-border">
                {/* Left Column: Creator Studio Inputs & Score */}
                <div className="lg:col-span-6 p-6 space-y-5 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cobalt font-bold">
                        Creative Studio Engine
                      </span>
                      <h3 className="text-base font-bold text-ink-navy">Ground Content in Brand Truth</h3>
                    </div>
                    <ScoreGauge score={simulatedScore} size="sm" />
                  </div>

                  {/* Simulated Topic Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink-navy flex items-center justify-between">
                      <span>Core Topic or Angle</span>
                      <span className="text-[10px] font-mono text-ink-faint">Editable prompt</span>
                    </label>
                    <input
                      type="text"
                      value={demoTopic}
                      onChange={(e) => setDemoTopic(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-border rounded-lg bg-surface-subtle focus:bg-white focus:outline-cobalt font-medium transition-colors"
                    />
                  </div>

                  {/* Brand Grounding Pill List */}
                  <div className="bg-surface-warm rounded-lg p-3.5 border border-stone-border space-y-2">
                    <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider block">
                      Active Brand Context Anchors
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy shadow-2xs">
                        Tone: Warm & Educational
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy shadow-2xs">
                        Product: Guji Natural ($22)
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy shadow-2xs">
                        Pillar: Ethical Direct Trade
                      </span>
                    </div>
                  </div>

                  {/* Score Action Bar */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleInteractiveScore}
                      disabled={isScoring}
                      className="flex-1 py-2.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-ink-navy" />
                      <span>{isScoring ? 'Analyzing 10 Dimensions...' : 'Run Packaging Diagnostic'}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStartDemo}
                      className="px-4 py-2.5 rounded-lg bg-cobalt text-white text-xs font-bold hover:bg-cobalt-hover transition-colors shadow-soft cursor-pointer"
                    >
                      Open in App →
                    </motion.button>
                  </div>
                </div>

                {/* Right Column: Live Output Preview with Smooth Platform Transitions */}
                <div className="lg:col-span-6 p-6 bg-surface-subtle flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={demoPlatform}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                      className="w-full flex justify-center"
                    >
                      {demoPlatform === 'instagram' ? (
                        <CarouselPreview
                          brandName="Roast & Co."
                          slides={[
                            { slide: 'Slide 1', headline: 'The 14-Day Coffee Lie', subtext: 'Why supermarket bags taste flat before you even open them.' },
                            { slide: 'Slide 2', headline: 'Rule 1: Check Roast Date', subtext: 'Beans peak between days 7 and 21 after roasting.' },
                            { slide: 'Slide 3', headline: 'Rule 2: The Bloom Test', subtext: 'Pour 60g water. If the crust doesn\'t expand, CO2 is gone.' },
                            { slide: 'Slide 4', headline: 'Rule 3: Store In Valves', subtext: 'Keep away from freezer moisture and direct light.' }
                          ]}
                        />
                      ) : demoPlatform === 'linkedin' ? (
                        <SocialPreviewCard
                          platform="linkedin"
                          authorName="Elena Vance"
                          authorHandle="Founder at Roast & Co. • Specialty Coffee"
                          hook="Direct trade isn't corporate charity. Here is the math behind it:"
                          bodyCaption="Most smallholder farmers earn less than $1.40/lb on the open exchange. In the Guji region, we contract directly at $4.20/lb.\n\nFair compensation protects agricultural heritage."
                          hashtags={['#DirectTrade', '#SupplyChain', '#Sustainability']}
                          visualConcept="Documentary photo of high-altitude washing beds at sunset"
                        />
                      ) : (
                        <SocialPreviewCard
                          platform="tiktok"
                          authorName="Roast & Co."
                          authorHandle="@roastandco_pdx"
                          hook="You do NOT need a $2,000 espresso machine for silky latte art:"
                          bodyCaption="Grab a $15 French press and heated oat milk. 10 deep plunges to aerate, then 30 micro-plunges to shear the foam into glossy wet paint. 🥛✨"
                          hashtags={['#CoffeeHacks', '#LatteArt', '#BaristaTips']}
                          visualConcept="Macro top-down angle pouring crisp heart pattern"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTENT-TO-INSIGHT WORKFLOW SECTION — Tinted Surface with Staggered Motion
         ========================================================================= */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white border-b border-stone-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              The Intelligent Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight">
              From raw brand knowledge to validated growth
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Most tools only schedule. ContentPilot AI connects creation, pre-publish packaging, calendar execution, and hypothesis-driven learning into one cohesive loop.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {workflowSteps.map((stepItem, idx) => {
              const Icon = stepItem.icon;
              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                  className={`bg-surface-warm border rounded-panel p-6 space-y-4 transition-shadow hover:shadow-card-hover relative ${stepItem.accent}`}
                >
                  {stepItem.badge && (
                    <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-chartreuse text-ink-navy uppercase tracking-wider shadow-2xs">
                      {stepItem.badge}
                    </span>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-soft ${stepItem.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-ink-faint uppercase block mb-1">
                      Step {stepItem.step}
                    </span>
                    <h3 className="font-bold text-base text-ink-navy">{stepItem.title}</h3>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{stepItem.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTENT POTENTIAL ANALYZER SPOTLIGHT — Soft Stone Tinted Surface
         ========================================================================= */}
      <section id="analyzer" className="py-20 md:py-32 bg-surface-tinted border-b border-stone-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-border text-xs font-bold text-cobalt shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-cobalt" /> Key Differentiator
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight leading-tight">
                Evaluate content like an elite packaging editor
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Top YouTube creators rely on packaging diagnostics (like vidIQ and TubeBuddy) before hitting upload. ContentPilot AI brings this exact rigor to Instagram, LinkedIn, TikTok, and X.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">10 Separate Dimensions:</strong> Hook Strength, Readability, Retention Structure, CTA Clarity, Audience Relevance, Shareability, and more.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">Transparent Heuristic Reasoning:</strong> Clear explanation of why a score was assigned, without fake claims of "guaranteed virality."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-subtle text-teal-success flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-ink-navy leading-relaxed">
                    <strong className="font-bold">One-Click Revision Application:</strong> Review before-and-after pairs and adopt improved copy directly into your editor with a single tap.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/app/analyzer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-navy text-white text-xs font-bold hover:bg-cobalt transition-colors shadow-soft"
                  >
                    Test Content Analyzer Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Card Mockup with Animated Meters */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 bg-white border border-stone-border rounded-panel p-6 sm:p-7 shadow-elevated space-y-6 card-tactile"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-divider">
                <div>
                  <h4 className="font-bold text-sm text-ink-navy">Diagnostic Dimension Scores</h4>
                  <p className="text-[11px] text-ink-faint">Evaluating: "Why Supermarket Coffee Stales Fast"</p>
                </div>
                <ScoreGauge score={89} size="md" />
              </div>

              {/* Progress Bars for Top Dimensions with Scroll Reveal */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>Hook Strength (First 3 Seconds)</span>
                    <span className="text-teal-success font-bold font-mono">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-teal-success rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>Readability & Visual Scanning</span>
                    <span className="text-teal-success font-bold font-mono">88%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '88%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                      className="h-full bg-teal-success rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1.5">
                    <span>CTA Clarity & Save Utility</span>
                    <span className="text-cobalt font-bold font-mono">84%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '84%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                      className="h-full bg-cobalt rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Before & After Snippet */}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING SECTION — Clean White Surface with Elevated Cobalt Accent
         ========================================================================= */}
      <section id="pricing" className="py-20 md:py-32 bg-white border-b border-stone-border">
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
                    : 'bg-surface-warm border-stone-border hover:shadow-card-hover'
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
      <section className="py-20 md:py-28 bg-surface-warm border-b border-stone-border">
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
                  className="bg-white border border-stone-border rounded-panel overflow-hidden shadow-soft transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-ink-navy hover:text-cobalt transition-colors"
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
            Ready to upgrade your social content engine?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-stone-border/80 max-w-xl mx-auto leading-relaxed"
          >
            Experience the full customer dashboard with our pre-seeded artisan coffee brand, test the Content Potential Analyzer, and see how purposeful scheduling changes your workflow.
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
              Open Instant Demo Workspace
            </motion.button>
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all inline-block"
              >
                Create Free Account
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
