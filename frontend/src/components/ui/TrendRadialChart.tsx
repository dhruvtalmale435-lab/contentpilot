import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, Zap, Shield, Share2, Eye } from 'lucide-react';

export interface TrendMetric {
  id: string;
  label: string;
  value: number; // 0 - 100
  color: string;
  description: string;
  icon: React.ElementType;
}

interface TrendRadialChartProps {
  metrics?: TrendMetric[];
  activeTopic?: string;
  confidenceScore?: number;
  className?: string;
}

const DEFAULT_METRICS: TrendMetric[] = [
  { id: 'velocity', label: 'Cultural Velocity', value: 94, color: '#3457F1', description: 'Real-time conversation surge across TikTok & Reddit', icon: TrendingUp },
  { id: 'hook', label: 'Hook Disruption', value: 91, color: '#D9F078', description: 'First 3-second thumbstop probability', icon: Zap },
  { id: 'retention', label: 'Format Pacing', value: 88, color: '#0E9F6E', description: 'Carousel slide-through & video completion rate', icon: Eye },
  { id: 'shareability', label: 'Share Coefficient', value: 85, color: '#F59E0B', description: 'Likelihood of bookmarking & peer DMs', icon: Share2 },
  { id: 'brand', label: 'Brand Alignment', value: 96, color: '#8B5CF6', description: 'Strict compliance with verified Brand Hub anchors', icon: Shield },
  { id: 'resonance', label: 'Audience Empathy', value: 89, color: '#EC4899', description: 'Comment sentiment & active debate potential', icon: Sparkles },
];

export const TrendRadialChart: React.FC<TrendRadialChartProps> = ({
  metrics = DEFAULT_METRICS,
  activeTopic = 'Ethical Direct Trade Pricing Math',
  confidenceScore = 92,
  className = '',
}) => {
  const [selectedMetric, setSelectedMetric] = useState<TrendMetric>(metrics[0]);
  const [hoveredMetric, setHoveredMetric] = useState<TrendMetric | null>(null);

  const active = hoveredMetric || selectedMetric;
  const size = 320;
  const center = size / 2;
  const maxRadius = 110;

  // Calculate petal/lobe coordinates in an organic flower geometry
  const numPoints = metrics.length;
  const angleStep = (Math.PI * 2) / numPoints;

  return (
    <div className={`relative bg-surface-navy text-white rounded-2xl p-6 border border-white/10 shadow-elevated overflow-hidden ${className}`}>
      {/* Background ambient radial glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cobalt/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-chartreuse/20 blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-chartreuse">
              Live Trend Radar Geometry
            </span>
          </div>
          <p className="text-xs font-bold text-white mt-0.5 truncate max-w-[200px] sm:max-w-xs">
            {activeTopic}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
          <Zap className="w-3.5 h-3.5 text-chartreuse fill-chartreuse" />
          <span className="text-xs font-mono font-bold text-white">{confidenceScore}%</span>
          <span className="text-[9px] uppercase tracking-wider text-stone-300">Resonance</span>
        </div>
      </div>

      {/* Center SVG Chart & Organic Petals */}
      <div className="relative flex items-center justify-center my-4 py-2">
        <svg
          width={size}
          height={size}
          className="overflow-visible"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Concentric Reference Rings */}
          {[0.35, 0.65, 0.95].map((factor, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={maxRadius * factor}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray={idx === 1 ? '3 3' : undefined}
            />
          ))}

          {/* Radial Axis Rays */}
          {metrics.map((_, idx) => {
            const angle = idx * angleStep - Math.PI / 2;
            const x = center + Math.cos(angle) * maxRadius;
            const y = center + Math.sin(angle) * maxRadius;
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth={1}
              />
            );
          })}

          {/* Organic Flower / Petal Lobes */}
          {metrics.map((metric, idx) => {
            const angle = idx * angleStep - Math.PI / 2;
            const currentRadius = (metric.value / 100) * maxRadius;
            const x = center + Math.cos(angle) * currentRadius;
            const y = center + Math.sin(angle) * currentRadius;
            const isHovered = active.id === metric.id;

            // Compute curved petal path from center out to point and back
            const perpAngle1 = angle + Math.PI / 2;
            const perpAngle2 = angle - Math.PI / 2;
            const widthOffset = isHovered ? 28 : 20;

            const c1x = center + Math.cos(angle) * (currentRadius * 0.45) + Math.cos(perpAngle1) * widthOffset;
            const c1y = center + Math.sin(angle) * (currentRadius * 0.45) + Math.sin(perpAngle1) * widthOffset;
            const c2x = center + Math.cos(angle) * (currentRadius * 0.45) + Math.cos(perpAngle2) * widthOffset;
            const c2y = center + Math.sin(angle) * (currentRadius * 0.45) + Math.sin(perpAngle2) * widthOffset;

            const pathD = `M ${center} ${center} Q ${c1x} ${c1y} ${x} ${y} Q ${c2x} ${c2y} ${center} ${center} Z`;

            return (
              <g key={metric.id} className="cursor-pointer" onClick={() => setSelectedMetric(metric)} onMouseEnter={() => setHoveredMetric(metric)} onMouseLeave={() => setHoveredMetric(null)}>
                <motion.path
                  d={pathD}
                  initial={{ opacity: 0.4, scale: 0.8 }}
                  animate={{
                    opacity: isHovered ? 0.85 : 0.45,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  fill={metric.color}
                />
                {/* Node Tip Indicator */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  animate={{ scale: isHovered ? 1.3 : 1 }}
                  fill="#FFFFFF"
                  stroke={metric.color}
                  strokeWidth={2}
                />
              </g>
            );
          })}

          {/* Central Core Pulse */}
          <circle cx={center} cy={center} r={22} fill="#1C283F" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={1.5} />
          <motion.circle
            cx={center}
            cy={center}
            r={14}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            fill="#D9F078"
          />
          <text
            x={center}
            y={center + 3}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#202D46"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            AI
          </text>
        </svg>

        {/* Floating Active Metric Card Overlay */}
        <div className="absolute bottom-1 right-2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-right shadow-elevated"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block" style={{ color: active.color }}>
                {active.label}
              </span>
              <span className="text-xl font-extrabold text-white font-mono">
                {active.value}%
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Metric Selector Pills / Breakdown */}
      <div className="pt-2 border-t border-white/10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {metrics.map((m) => {
            const isCurrent = active.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMetric(m)}
                onMouseEnter={() => setHoveredMetric(m)}
                onMouseLeave={() => setHoveredMetric(null)}
                className={`px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-white/20 border border-white/30 text-white'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[10px] font-mono font-bold">{m.value}%</span>
                </div>
                <p className="text-[10px] font-semibold truncate mt-0.5 leading-tight">{m.label.split(' ')[0]}</p>
              </button>
            );
          })}
        </div>

        {/* Detailed Explanation of Active Metric */}
        <p className="text-[11px] text-stone-300 mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5">
          <span className="text-chartreuse font-bold">●</span>
          <span>{active.description}</span>
        </p>
      </div>
    </div>
  );
};
