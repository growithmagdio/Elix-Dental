/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1420',
          dark: '#070D15',
          light: '#142132',
          surface: '#121E2E',
        },
        ivory: {
          DEFAULT: '#F6F1E7',
          light: '#FCF9F3',
          dark: '#EBE4D5',
        },
        gold: {
          DEFAULT: '#B8975A',
          light: '#CBA86B',
          dark: '#967941',
          muted: 'rgba(184, 151, 90, 0.25)',
          glow: 'rgba(184, 151, 90, 0.15)',
        },
        champagne: {
          DEFAULT: '#E6D5B8',
          subtle: '#F2E8D8',
        },
        parchment: '#EFE9DF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(184, 151, 90, 0.2)',
        'gold-border': '0 0 0 1px rgba(184, 151, 90, 0.4)',
        'luxury': '0 20px 50px rgba(11, 20, 32, 0.08)',
      },
    },
  },
  plugins: [],
}
