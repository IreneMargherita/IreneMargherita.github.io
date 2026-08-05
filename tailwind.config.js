/** @type {import('tailwindcss').Config} */

/*
 * DESIGN TOKENS — the single place colors/fonts/shadows are defined.
 * (Constitution, Article VIII: components use token names, never raw hex.)
 * Palette: "Midnight Terminal + Sunshine" — see specs/001-mvp/plan.md §3
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark neutrals (backgrounds → borders)
        ink: {
          950: '#07090E',
          900: '#0B0E14',
          850: '#0D1119',
          800: '#10141D',
          700: '#151B26',
          600: '#1E2431',
          500: '#2A3242',
        },
        // Signature sunshine yellow scale
        sunshine: {
          100: '#FFF6C2',
          200: '#FFEE8A',
          300: '#FFE566',
          400: '#FFDB2E',
          500: '#FFD60A', // ★ the yellow
          600: '#D9B400',
          700: '#A38700',
          800: '#806B00',
          900: '#3D3300',
        },
        // Text neutrals
        mist: {
          100: '#E9EEF6',
          300: '#C3CBD8',
          400: '#A6B0C0',
          600: '#707A8A',
          700: '#525C6B',
        },
        // Status green (online dot, shipped badges, heatmap alt)
        signal: '#3FB950',
        // Decorative syntax colors (GitHub-dark inspired)
        syntax: {
          blue: '#79C0FF',
          violet: '#BC8CFF',
          orange: '#FFA657',
          green: '#7EE787',
          red: '#FF7B72',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 32px rgba(255, 214, 10, 0.16)',
        'glow-sm': '0 0 16px rgba(255, 214, 10, 0.12)',
        'glow-lg': '0 0 64px rgba(255, 214, 10, 0.22)',
        card: '0 8px 24px rgba(0, 0, 0, 0.35)',
      },
      borderRadius: {
        xl2: '14px',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(63, 185, 80, 0.55)' },
          '70%': { boxShadow: '0 0 0 6px rgba(63, 185, 80, 0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
