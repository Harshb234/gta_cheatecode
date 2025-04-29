/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00f0ff',
        secondary: '#ff00e5',
        accent: '#ffcc00',
        success: '#00ff8c',
        warning: '#ff9500',
        error: '#ff0033',
        background: '#0a0a0a',
        card: '#111111',
        surface: '#1a1a1a',
        border: '#333333',
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Oswald', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '1',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 240, 255, 0.7), 0 0 10px rgba(0, 240, 255, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 1), 0 0 30px rgba(0, 240, 255, 0.8)'
          }
        }
      },
    },
  },
  plugins: [],
};