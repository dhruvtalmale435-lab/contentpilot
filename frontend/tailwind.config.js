/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F5F1', // warm ivory
        surface: '#FFFFFF', // pure white card/panel
        'surface-subtle': '#FAF9F6', // slightly lighter ivory
        'surface-warm': '#FAF8F4', // warm cream surface
        'surface-tinted': '#F3F2EC', // soft stone-tinted surface
        'surface-navy': '#151F32', // deep contrast section
        'surface-navy-card': '#1C283F', // elevated dark panel
        'ink-navy': '#202D46', // main text & dark accents
        'ink-muted': '#586782', // secondary body text
        'ink-faint': '#8E9BAE', // captions & subtle labels
        cobalt: {
          DEFAULT: '#3457F1', // primary action
          hover: '#2544D4',
          light: '#EEF2FF',
          muted: '#C7D2FE',
          subtle: '#F4F7FF',
        },
        chartreuse: {
          DEFAULT: '#D9F078', // rare highlight accent
          subtle: '#F6FCE3',
          glow: 'rgba(217, 240, 120, 0.25)',
        },
        stone: {
          border: '#E8E7E1', // soft stone borders
          divider: '#EFEFEA',
          hover: '#F0EFEA',
          subtle: '#F5F4EE',
        },
        teal: {
          success: '#0E9F6E',
          'success-bg': '#DEF7EC',
          subtle: '#F0FDF8',
        },
        amber: {
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          subtle: '#FEF9EE',
        },
        red: {
          error: '#DC2626',
          'error-bg': '#FEE2E2',
          subtle: '#FEF2F2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(32, 45, 70, 0.05), 0 1px 3px 0 rgba(32, 45, 70, 0.04)',
        'panel': '0 8px 30px -4px rgba(32, 45, 70, 0.06), 0 2px 6px -1px rgba(32, 45, 70, 0.03)',
        'elevated': '0 20px 40px -10px rgba(32, 45, 70, 0.1), 0 4px 12px -2px rgba(32, 45, 70, 0.05)',
        'cobalt-glow': '0 8px 28px -4px rgba(52, 87, 241, 0.28), 0 2px 8px -2px rgba(52, 87, 241, 0.15)',
        'chartreuse-glow': '0 8px 24px -4px rgba(217, 240, 120, 0.35)',
        'card-hover': '0 14px 34px -6px rgba(32, 45, 70, 0.09), 0 4px 12px -2px rgba(32, 45, 70, 0.04)',
      },
      borderRadius: {
        'panel': '14px',
        'subtle': '8px',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 1.5s',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
