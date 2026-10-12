/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Forest Night (Primary brand dark background)
        navy: {
          DEFAULT: '#071710',
          dark: '#030E0A',
          light: '#0D2319',
          surface: '#0A1E16',
        },
        // Forest Green Palette (Brand identity primary)
        forest: {
          DEFAULT: '#0E3622',
          deep: '#021B0F',
          dark: '#061D12',
          surface: '#0D2D1E',
          light: '#185437',
          emerald: '#1C6B45',
          muted: 'rgba(14, 54, 34, 0.3)',
        },
        // Warm Ivory Palette (Brand identity light)
        ivory: {
          DEFAULT: '#F7F3EA',
          light: '#FCF9F3',
          dark: '#ECE4D4',
        },
        // Metallic Gold Palette (Brand identity accent)
        gold: {
          DEFAULT: '#C5A059',
          light: '#D8B875',
          dark: '#9C7A39',
          bright: '#DFC17B',
          muted: 'rgba(197, 160, 89, 0.25)',
          glow: 'rgba(197, 160, 89, 0.18)',
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
        'gold-glow': '0 0 30px rgba(197, 160, 89, 0.2)',
        'gold-border': '0 0 0 1px rgba(197, 160, 89, 0.4)',
        'forest-glow': '0 0 30px rgba(14, 54, 34, 0.35)',
        'luxury': '0 20px 50px rgba(3, 14, 10, 0.12)',
      },
    },
  },
  plugins: [],
}
