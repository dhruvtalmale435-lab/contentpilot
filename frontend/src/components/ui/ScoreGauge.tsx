import React from 'react';
import { motion } from 'motion/react';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true
}) => {
  // Determine color based on readiness tier
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#0E9F6E', bg: '#DEF7EC', text: 'text-teal-success', label: 'Ready to Publish' };
    if (s >= 65) return { stroke: '#3457F1', bg: '#EEF2FF', text: 'text-cobalt', label: 'Minor Polish' };
    if (s >= 50) return { stroke: '#D97706', bg: '#FEF3C7', text: 'text-amber-warning', label: 'Needs Improvement' };
    return { stroke: '#DC2626', bg: '#FEE2E2', text: 'text-red-error', label: 'Rethink Hook' };
  };

  const style = getColor(score);
  const radius = size === 'lg' ? 44 : (size === 'md' ? 32 : 22);
  const strokeWidth = size === 'lg' ? 8 : (size === 'md' ? 6 : 4);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="#E8E7E1"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground progress circle with Motion */}
          <motion.circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={style.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <motion.span
          key={score}
          initial={{ scale: 0.85, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className={`absolute font-extrabold text-ink-navy font-mono ${size === 'lg' ? 'text-2xl' : (size === 'md' ? 'text-lg' : 'text-xs')}`}
        >
          {score}
        </motion.span>
      </div>

      {showLabel && (
        <div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold shadow-2xs ${style.text}`} style={{ backgroundColor: style.bg }}>
            {style.label}
          </span>
          <p className="text-[11px] text-ink-faint mt-0.5 font-medium">Readiness Score</p>
        </div>
      )}
    </div>
  );
};
