import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
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
  ChevronRight,
  ShieldCheck
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

  const handleStartDemo = () => {
    loginAsDemoCustomer();
    navigate('/app');
  };

  const handleInteractiveScore = () => {
    setIsScoring(true);
    setTimeout(() => {
      setSimulatedScore(prev => (prev === 88 ? 93 : 88));
      setIsScoring(false);
    }, 600);
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

  return (
    <div className="min-h-screen bg-background text-ink-navy flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-stone-border">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E8E7E1_1px,transparent_1px),linear-gradient(to_bottom,#E8E7E1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tag badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-border shadow-soft"
            >
              <span className="w-2 h-2 rounded-full bg-chartreuse border border-ink-navy/20" />
              <span className="text-xs font-bold text-ink-navy">The Creator Optimization & Planning Engine</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink-navy tracking-tight leading-[1.12]"
            >
              Stop guessing what to post.{' '}
              <span className="text-cobalt underline decoration-chartreuse decoration-4 underline-offset-8">
                Start creating with purpose.
              </span>
            </motion.h1>

            {/* Supporting message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto"
            >
              Understand your brand, create better social content, discover opportunities, and learn from your results — all in one workspace.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <button
                onClick={handleStartDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-panel bg-cobalt hover:bg-cobalt-hover text-white text-sm font-bold shadow-panel flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                Launch Live Demo Workspace <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-6 py-3.5 rounded-panel bg-white border border-stone-border hover:bg-stone-hover text-ink-navy text-sm font-bold shadow-soft transition-all text-center"
              >
                Get Started Free
              </Link>
            </motion.div>

            <p className="text-xs text-ink-faint">
              No credit card required • Instant access with seeded business data • Full offline demo
            </p>
          </div>

          {/* --- INTERACTIVE COMPOSITION SHOWCASE --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto bg-white border border-stone-border rounded-2xl shadow-elevated overflow-hidden"
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

              {/* Platform Selector Buttons */}
              <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-stone-border">
                <button
                  onClick={() => setDemoPlatform('instagram')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    demoPlatform === 'instagram' ? 'bg-white text-ink-navy shadow-sm' : 'text-ink-muted hover:text-ink-navy'
                  }`}
                >
                  Instagram Carousel
                </button>
                <button
                  onClick={() => setDemoPlatform('linkedin')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    demoPlatform === 'linkedin' ? 'bg-white text-ink-navy shadow-sm' : 'text-ink-muted hover:text-ink-navy'
                  }`}
                >
                  LinkedIn Article
                </button>
                <button
                  onClick={() => setDemoPlatform('tiktok')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    demoPlatform === 'tiktok' ? 'bg-white text-ink-navy shadow-sm' : 'text-ink-muted hover:text-ink-navy'
                  }`}
                >
                  TikTok Reel Script
                </button>
              </div>
            </div>

            {/* Split Screen Composition Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-border">
              {/* Left Column: Creator Studio Inputs & Score */}
              <div className="lg:col-span-6 p-6 space-y-5">
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
                  <label className="text-xs font-bold text-ink-navy">Core Topic or Angle</label>
                  <input
                    type="text"
                    value={demoTopic}
                    onChange={(e) => setDemoTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-border rounded-lg bg-surface-subtle focus:bg-white focus:outline-cobalt"
                  />
                </div>

                {/* Brand Grounding Pill List */}
                <div className="bg-background rounded-lg p-3 border border-stone-border space-y-2">
                  <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider">
                    Context Anchors Active
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy">
                      Tone: Warm & Educational
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy">
                      Product: Guji Natural ($22)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-stone-border text-ink-navy">
                      Pillar: Ethical Direct Trade
                    </span>
                  </div>
                </div>

                {/* Score Action Bar */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={handleInteractiveScore}
                    disabled={isScoring}
                    className="flex-1 py-2.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 fill-ink-navy" />
                    {isScoring ? 'Analyzing 10 Dimensions...' : 'Run Content Potential Analyzer'}
                  </button>

                  <button
                    onClick={handleStartDemo}
                    className="px-4 py-2.5 rounded-lg bg-cobalt text-white text-xs font-bold hover:bg-cobalt-hover transition-colors"
                  >
                    Open in App →
                  </button>
                </div>
              </div>

              {/* Right Column: Live Output Preview */}
              <div className="lg:col-span-6 p-6 bg-surface-subtle flex items-center justify-center">
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT-TO-INSIGHT WORKFLOW SECTION --- */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              The Intelligent Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight">
              From raw brand knowledge to validated growth
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Most tools only schedule. ContentPilot AI connects creation, pre-publish packaging, calendar execution, and hypothesis-driven learning into one cohesive loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-background border border-stone-border rounded-panel p-6 space-y-4 hover:shadow-soft transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-ink-navy text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-base text-ink-navy">Ground in Brand Hub</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Store your products, pricing, personas, tone guidelines, and forbidden claims. Every AI generation respects your authentic boundaries.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background border border-stone-border rounded-panel p-6 space-y-4 hover:shadow-soft transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-cobalt text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-base text-ink-navy">Generate Structured Copy</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Produce hooks, captions, reel shot-lists, carousels, and weekly batches with 1-click tone shifts and text expanders.
              </p>
            </div>

            {/* Step 3 (Key Differentiator) */}
            <div className="bg-background border-2 border-cobalt rounded-panel p-6 space-y-4 shadow-soft relative">
              <span className="absolute -top-3 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-chartreuse text-ink-navy uppercase">
                Unique
              </span>
              <div className="w-10 h-10 rounded-lg bg-chartreuse text-ink-navy flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-base text-ink-navy">Analyze Pre-Publish Score</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Critique 10 qualitative dimensions before publishing. Identify weak hooks, confusing CTAs, or dense text walls with instant revisions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-background border border-stone-border rounded-panel p-6 space-y-4 hover:shadow-soft transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-teal-success text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-base text-ink-navy">Execute & Learn</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Schedule to the content calendar, enter observed engagement metrics, and receive honest experiment hypotheses for your next batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT POTENTIAL ANALYZER SPOTLIGHT --- */}
      <section id="analyzer" className="py-20 md:py-28 bg-[#F6F5F1] border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-border text-xs font-bold text-cobalt">
                <Zap className="w-3.5 h-3.5" /> Key Differentiator
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight leading-tight">
                Evaluate content like an elite packaging editor
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Creators on YouTube rely on packaging diagnostics (like vidIQ and TubeBuddy) before hitting upload. ContentPilot AI brings this rigor to Instagram, LinkedIn, TikTok, and X.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-success flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-ink-navy">
                    <strong className="font-bold">10 Separate Dimensions:</strong> Hook Strength, Readability, Retention Structure, CTA Clarity, Audience Relevance, Shareability, and more.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-success flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-ink-navy">
                    <strong className="font-bold">Transparent Heuristic Reasoning:</strong> Clear explanation of why a score was assigned, without fake claims of "guaranteed virality."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-success flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-ink-navy">
                    <strong className="font-bold">One-Click Revision Application:</strong> Instantly review before-and-after pairs and adopt the improved draft with a single click.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/app/analyzer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink-navy text-white text-xs font-bold hover:bg-cobalt transition-colors"
                >
                  Test Content Analyzer Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Card Mockup */}
            <div className="lg:col-span-7 bg-white border border-stone-border rounded-panel p-6 shadow-panel space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-divider">
                <div>
                  <h4 className="font-bold text-sm text-ink-navy">Analysis Diagnostics Breakdown</h4>
                  <p className="text-[11px] text-ink-faint">Evaluating: "Why Grocery Store Coffee Stales Fast"</p>
                </div>
                <ScoreGauge score={89} size="md" />
              </div>

              {/* Progress Bars for Top Dimensions */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1">
                    <span>Hook Strength (First 3 Seconds)</span>
                    <span className="text-teal-success font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <div className="h-full bg-teal-success rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1">
                    <span>Readability & Visual Scanning</span>
                    <span className="text-teal-success font-bold">88%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <div className="h-full bg-teal-success rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-ink-navy mb-1">
                    <span>CTA Clarity & Save Utility</span>
                    <span className="text-cobalt font-bold">84%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-hover overflow-hidden">
                    <div className="h-full bg-cobalt rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              {/* Before & After Snippet */}
              <div className="bg-background rounded-lg p-3.5 border border-stone-border space-y-2 text-xs">
                <span className="font-mono text-[10px] text-cobalt font-bold uppercase tracking-wider">
                  Suggested Revision Demonstration
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded bg-white border border-red-200">
                    <span className="text-[10px] font-bold text-red-error uppercase block mb-1">Before (Passive)</span>
                    <p className="text-[11px] text-ink-muted italic">"In this post, I want to talk about how coffee beans get stale after roasting..."</p>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-teal-200">
                    <span className="text-[10px] font-bold text-teal-success uppercase block mb-1">After (High Hook)</span>
                    <p className="text-[11px] text-ink-navy font-semibold">"Stop buying coffee bags without a roast date stamped on the front."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-20 md:py-28 bg-white border-b border-stone-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt font-bold">
              Transparent Membership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-navy tracking-tight">
              Predictable pricing for creators and teams
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Start free with no credit card required. Upgrade as your content volume and team collaboration expand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SEED_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-background rounded-2xl border p-7 flex flex-col justify-between transition-all ${
                  plan.recommended
                    ? 'border-2 border-cobalt shadow-elevated relative bg-white'
                    : 'border-stone-border hover:shadow-soft'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-chartreuse text-ink-navy uppercase tracking-wider">
                    Most Popular
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

                  <div className="space-y-3 pt-2 border-t border-stone-divider mb-8">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-navy">
                        <Check className="w-4 h-4 text-teal-success flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartDemo}
                  className={`w-full py-3 rounded-lg text-xs font-bold transition-all text-center ${
                    plan.recommended
                      ? 'bg-cobalt hover:bg-cobalt-hover text-white shadow-soft'
                      : 'bg-white border border-stone-border hover:bg-stone-hover text-ink-navy'
                  }`}
                >
                  {plan.monthlyPriceUsd === 0 ? 'Start Free Now' : 'Choose ' + plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-background border-b border-stone-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-navy">Frequently Asked Questions</h2>
            <p className="text-xs text-ink-muted">Clear answers on how ContentPilot AI operates</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-stone-border rounded-panel p-5 shadow-soft">
                <h4 className="font-bold text-sm text-ink-navy mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-cobalt flex-shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-16 bg-ink-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to upgrade your social content engine?
          </h2>
          <p className="text-sm text-stone-border/80 max-w-xl mx-auto leading-relaxed">
            Experience the full customer dashboard with our pre-seeded artisan coffee brand, test the Content Potential Analyzer, and see how purposeful scheduling changes your workflow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={handleStartDemo}
              className="px-8 py-3.5 rounded-lg bg-chartreuse hover:bg-yellow-200 text-ink-navy font-bold text-xs shadow-md transition-all"
            >
              Open Instant Demo Workspace
            </button>
            <Link
              to="/signup"
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
