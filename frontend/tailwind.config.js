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
        'ink-navy': '#202D46', // main text & dark accents
        'ink-muted': '#586782', // secondary body text
        'ink-faint': '#8E9BAE', // captions & subtle labels
        cobalt: {
          DEFAULT: '#3457F1', // primary action
          hover: '#2544D4',
          light: '#EEF2FF',
          muted: '#C7D2FE',
        },
        chartreuse: {
          DEFAULT: '#D9F078', // rare highlight accent
          subtle: '#F4FBD6',
        },
        stone: {
          border: '#E8E7E1', // soft stone borders
          divider: '#EFEFEA',
          hover: '#F0EFEA',
        },
        teal: {
          success: '#0E9F6E',
          'success-bg': '#DEF7EC',
        },
        amber: {
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
        },
        red: {
          error: '#DC2626',
          'error-bg': '#FEE2E2',
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
        'cobalt-glow': '0 4px 20px -2px rgba(52, 87, 241, 0.3)',
      },
      borderRadius: {
        'panel': '14px',
        'subtle': '8px',
      }
    },
  },
  plugins: [],
}
