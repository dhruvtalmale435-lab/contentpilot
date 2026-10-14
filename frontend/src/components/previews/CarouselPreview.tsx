import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CarouselSlide } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselPreviewProps {
  slides: CarouselSlide[];
  brandName?: string;
}

export const CarouselPreview: React.FC<CarouselPreviewProps> = ({
  slides,
  brandName = 'ContentPilot Brand'
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-white border border-stone-border rounded-panel p-6 text-center text-xs text-ink-muted">
        No carousel slides defined for this post.
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="bg-white border border-stone-border rounded-panel shadow-soft overflow-hidden max-w-md w-full card-tactile">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-divider bg-surface-subtle">
        <span className="text-[11px] font-semibold text-ink-navy">{brandName}</span>
        <span className="text-[10px] font-mono text-ink-muted bg-white border border-stone-border px-2 py-0.5 rounded-full shadow-2xs">
          Slide {currentSlide + 1} of {slides.length}
        </span>
      </div>

      {/* Main Slide Card Area with Animated Slide Transition */}
      <div className="aspect-square bg-surface-warm p-6 flex flex-col justify-between border-b border-stone-divider relative select-none overflow-hidden">
        {/* Top Slide Meta */}
        <div className="flex items-center justify-between text-[10px] text-ink-faint uppercase font-bold tracking-wider relative z-10">
          <span>{slide.slide}</span>
          <span className="text-cobalt font-mono">#ContentPilot</span>
        </div>

        {/* Headline & Body with Animated Entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="my-auto text-center space-y-3 px-3 relative z-10"
          >
            <h4 className="text-lg md:text-xl font-extrabold text-ink-navy leading-snug tracking-tight">
              {slide.headline}
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed max-w-xs mx-auto">
              {slide.subtext}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Footer Swipe Hint */}
        <div className="text-center text-[10px] text-ink-faint font-medium relative z-10">
          {currentSlide < slides.length - 1 ? 'Swipe for next rule →' : 'Save this carousel 📌'}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between p-3 bg-white">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded text-ink-navy hover:bg-stone-hover disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'bg-cobalt w-5' : 'bg-stone-border hover:bg-ink-faint w-2'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded text-ink-navy hover:bg-stone-hover disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
