import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Layout,
  Film,
  Download,
  Sliders,
  Type,
  Image as ImageIcon,
  Check,
  Eye,
  Sparkles
} from 'lucide-react';
import { storage } from '../../services/storage';
import { CarouselPreview } from '../../components/previews/CarouselPreview';
import { SocialPreviewCard } from '../../components/previews/SocialPreviewCard';

export const VisualStudioPage: React.FC = () => {
  const brand = storage.getBrandProfile();

  const [visualFormat, setVisualFormat] = useState<'quote_card' | 'carousel' | 'storyboard'>('quote_card');
  const [headline, setHeadline] = useState('Roasted coffee peaks between 7 and 21 days.');
  const [subtext, setSubtext] = useState('Stop brewing stale supermarket beans. Check the stamp.');
  const [accentColor, setAccentColor] = useState(brand.brandColors[1] || '#3457F1');
  const [exported, setExported] = useState(false);

  // Storyboard scenes
  const [scenes, setScenes] = useState([
    { scene: '0:00 - 0:03', visual: 'High-speed close-up of water blooming ground coffee in glass dripper', shot: 'Macro Close-Up', duration: '3s' },
    { scene: '0:03 - 0:12', visual: 'Graphic comparison: fresh vs stale CO2 gas release bubble curve', shot: 'Infographic Overlay', duration: '9s' },
    { scene: '0:12 - 0:25', visual: 'Hand holding bag pointing directly at the roasted-on stamp', shot: 'POV Medium Shot', duration: '13s' },
    { scene: '0:25 - 0:30', visual: 'End title card with brand logo & Save post prompt', shot: 'Title Card', duration: '5s' }
  ]);

  const handleExportMock = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
            Layouts, Mockups & Storyboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Visual Studio</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Craft editorial visual assets, design text-overlay cards, and build structured shot-lists for Reels and TikToks.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportMock}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-cobalt-glow transition-all cursor-pointer"
        >
          {exported ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          <span>{exported ? 'Asset Exported!' : 'Export Visual Asset'}</span>
        </motion.button>
      </div>

      {/* Visual Format Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-border pb-3">
        {(['quote_card', 'carousel', 'storyboard'] as const).map((fmt) => {
          const Icon = fmt === 'quote_card' ? Type : fmt === 'carousel' ? Layout : Film;
          const label = fmt === 'quote_card' ? 'Quote / Text Card' : fmt === 'carousel' ? 'Multi-Slide Carousel' : 'Reel Video Storyboard';
          return (
            <button
              key={fmt}
              onClick={() => setVisualFormat(fmt)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                visualFormat === fmt ? 'bg-ink-navy text-white shadow-soft font-bold' : 'bg-white border border-stone-border text-ink-muted hover:text-ink-navy'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-5 card-tactile">
          <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cobalt" /> Visual Customization
          </h3>

          {visualFormat !== 'storyboard' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Headline Text</label>
                <textarea
                  rows={2}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Supporting Subtext</label>
                <textarea
                  rows={2}
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1.5">Brand Accent Color</label>
                <div className="flex items-center gap-2">
                  {brand.brandColors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAccentColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                        accentColor === color ? 'scale-110 border-ink-navy shadow-xs' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-bold text-ink-navy block">Shot List Planner</span>
              <p className="text-xs text-ink-muted">
                Pre-visualize the 4 critical beats: Hook (0-3s), Conflict/Friction, Demonstration, and Resolution CTA.
              </p>
              <div className="space-y-2">
                {scenes.map((sc, i) => (
                  <div key={i} className="p-2.5 rounded bg-surface-warm border border-stone-border text-xs space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-cobalt font-bold">
                      <span>{sc.scene}</span>
                      <span>{sc.shot}</span>
                    </div>
                    <p className="text-ink-navy text-[11px] leading-tight font-medium">{sc.visual}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-surface-warm border border-stone-border rounded-lg text-[11px] text-ink-muted leading-relaxed">
            <strong>Architecture Notice:</strong> MVP uses CSS canvas rendering & mock export. Prepared for direct integration with DALL-E / Imagen API when activated.
          </div>
        </div>

        {/* Live Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-surface-warm border border-stone-border rounded-panel p-8 shadow-soft flex items-center justify-center min-h-[460px] card-tactile">
          <AnimatePresence mode="wait">
            {visualFormat === 'quote_card' && (
              <motion.div
                key="quote_card"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-stone-border rounded-2xl shadow-elevated p-8 max-w-sm w-full aspect-square flex flex-col justify-between text-center select-none relative overflow-hidden card-tactile"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-ink-faint uppercase font-bold tracking-wider">
                  <span>{brand.businessName}</span>
                  <span style={{ color: accentColor }} className="font-semibold">#SpecialtyCoffee</span>
                </div>

                <div className="my-auto space-y-3 px-2">
                  <h3 className="text-xl font-extrabold text-ink-navy leading-snug tracking-tight">
                    "{headline}"
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-medium">{subtext}</p>
                </div>

                <div className="pt-4 border-t border-stone-divider flex items-center justify-between text-[10px] text-ink-faint">
                  <span>Roast & Co. Editorial</span>
                  <span className="font-semibold text-cobalt">Save for later 📌</span>
                </div>
              </motion.div>
            )}

            {visualFormat === 'carousel' && (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <CarouselPreview
                  brandName={brand.businessName}
                  slides={[
                    { slide: 'Slide 1 (Cover)', headline, subtext },
                    { slide: 'Slide 2 (The Lie)', headline: 'Why Store Coffee Stales', subtext: 'Oxidized beans lose 60% of aromatics within 14 days.' },
                    { slide: 'Slide 3 (The Rule)', headline: 'The 60g Bloom Test', subtext: 'Watch for CO2 bubbles when water hits grounds.' },
                    { slide: 'Slide 4 (Action)', headline: 'Always Check The Stamp', subtext: 'Never buy bags without a stamped roast date.' }
                  ]}
                />
              </motion.div>
            )}

            {visualFormat === 'storyboard' && (
              <motion.div
                key="storyboard"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-stone-border rounded-2xl shadow-elevated p-6 max-w-md w-full space-y-4 card-tactile"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-divider">
                  <span className="text-xs font-bold text-ink-navy">Reel Production Shot-List</span>
                  <span className="text-[10px] font-mono text-ink-faint">Total: 30 Seconds</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {scenes.map((sc, idx) => (
                    <div key={idx} className="bg-surface-warm rounded-lg p-3 border border-stone-border space-y-1 text-xs">
                      <span className="text-[10px] font-mono font-bold text-cobalt block">{sc.scene}</span>
                      <p className="font-bold text-ink-navy text-[11px] leading-tight">{sc.shot}</p>
                      <p className="text-[10px] text-ink-muted leading-tight line-clamp-2">{sc.visual}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
