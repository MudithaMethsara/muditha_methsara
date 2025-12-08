/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          red: '#ff2a6d',
          dark: '#0d0221',
          blue: '#05d9e8',
          purple: '#d300c5',
          pink: '#ff2a6d',
          yellow: '#f9d423',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        'blink-caret': 'blink-caret .75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff2a6d, 0 0 20px #ff2a6d' },
          'to': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff2a6d, 0 0 40px #ff2a6d' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#ff2a6d' },
        },
      },
    },
  },
  plugins: [],
}
