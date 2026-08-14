/** @type {import('tailwindcss').Config} */

/*
 * DESIGN TOKENS — the single place colors/fonts/shadows are defined.
 * (Constitution, Article VIII: components use token names, never raw hex.)
 *
 * TWO LAYERS, on purpose:
 *
 *   1. LITERAL palette  (ink / sunshine / mist / signal / syntax)
 *      Named after the COLOR. `ink-900` is always #0B0E14, in every theme.
 *      Kept so existing components keep working while we migrate.
 *
 *   2. SEMANTIC palette (canvas / surface / fg / line / accent / data)
 *      Named after the ROLE. `bg-canvas` means "the page background",
 *      and it resolves to cream in light mode and midnight in dark mode.
 *      These read their value from CSS custom properties defined in index.css.
 *
 * Write NEW components against layer 2 only. That is what makes one
 * component work in both themes without a single `dark:` class.
 *
 * Palettes: "Midnight Terminal + Sunshine" (dark) · "Lab Paper" (light)
 */

// Helper: our CSS variables hold bare RGB triplets ("251 249 243"), not
// "rgb(...)" strings. That lets Tailwind inject its own alpha value, so
// `bg-canvas/80` still works. This is the standard Tailwind-theming trick.
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  // Theme is driven by a `.dark` class on <html>, NOT by the OS setting alone.
  // 'class' is what lets a user override their system preference with our toggle.
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        /* ---------- Layer 2: semantic, theme-aware ---------- */
        canvas: {
          DEFAULT: withAlpha('--c-bg'),
          soft: withAlpha('--c-bg-soft'),
        },
        surface: withAlpha('--c-surface'),
        fg: {
          DEFAULT: withAlpha('--c-text'),
          muted: withAlpha('--c-text-muted'),
          faint: withAlpha('--c-text-faint'),
        },
        line: {
          DEFAULT: withAlpha('--c-line'),
          strong: withAlpha('--c-line-strong'),
        },
        accent: {
          DEFAULT: withAlpha('--c-accent'),
          soft: withAlpha('--c-accent-soft'),
          ink: withAlpha('--c-accent-ink'), // text that sits ON accent
        },
        data: {
          DEFAULT: withAlpha('--c-data'),
          alt: withAlpha('--c-data-alt'),
          dim: withAlpha('--c-data-dim'),
        },

        /* ---------- Layer 1: literal, fixed values ---------- */
        ink: {
          950: '#07090E',
          900: '#0B0E14',
          850: '#0D1119',
          800: '#10141D',
          700: '#151B26',
          600: '#1E2431',
          500: '#2A3242',
        },
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
        mist: {
          100: '#E9EEF6',
          300: '#C3CBD8',
          400: '#A6B0C0',
          600: '#707A8A',
          700: '#525C6B',
        },
        // "Lab Paper" light-mode neutrals — the ai-2027 parchment family.
        paper: {
          50: '#FFFDF8',
          100: '#FBF9F3',
          200: '#F4F1E8',
          300: '#EAE6D9',
          400: '#D6D0C2',
          600: '#8A8478',
          700: '#5A554B',
          900: '#1A1814',
        },
        signal: '#3FB950',
        moss: '#3F7D58', // the muted forest green used in light-mode charts
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
        // Long-form reading voice — the "research paper" feel.
        serif: ['"IBM Plex Serif"', 'Iowan Old Style', 'Georgia', 'Cambria', 'serif'],
      },

      boxShadow: {
        glow: '0 0 32px rgba(255, 214, 10, 0.16)',
        'glow-sm': '0 0 16px rgba(255, 214, 10, 0.12)',
        'glow-lg': '0 0 64px rgba(255, 214, 10, 0.22)',
        card: '0 8px 24px rgba(0, 0, 0, 0.35)',
        // Light mode needs a much softer shadow — deep shadows read as dirt on paper.
        paper: '0 1px 2px rgba(26, 24, 20, 0.05), 0 8px 24px rgba(26, 24, 20, 0.06)',
      },

      borderRadius: { xl2: '14px' },
      spacing: { 18: '4.5rem', 30: '7.5rem' },
      maxWidth: { content: '72rem' },

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
        // Panel graphics: a dot/tile popping into existence.
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.6)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        'pop-in': 'pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
    },
  },

  plugins: [],
}
