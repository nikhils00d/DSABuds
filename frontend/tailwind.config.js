/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode by class
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d',
          950: '#052e16',
        },
        dark: {
          bg: '#0f172a', // slate-900
          surface: '#1e293b', // slate-800
          border: '#334155', // slate-700
        }
      },
      animation: {
        'float':         'float 3s ease-in-out infinite',
        'float-slow':    'float 6s ease-in-out infinite',
        'float-medium':  'float 4.5s ease-in-out infinite',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora':        'aurora 12s ease-in-out infinite alternate',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'spin-slow':     'spin 20s linear infinite',
        'drift':         'drift 8s ease-in-out infinite alternate',
        'drift-reverse': 'driftReverse 10s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        aurora: {
          '0%':   { backgroundPosition: '0% 50%',   opacity: '0.5' },
          '50%':  { backgroundPosition: '100% 50%', opacity: '0.8' },
          '100%': { backgroundPosition: '0% 50%',   opacity: '0.5' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px 4px rgba(34,197,94,0.2)' },
          '50%':      { boxShadow: '0 0 40px 8px rgba(34,197,94,0.45)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drift: {
          '0%':   { transform: 'translateY(0px)   translateX(0px)  rotate(0deg)' },
          '100%': { transform: 'translateY(-20px) translateX(10px) rotate(8deg)'  },
        },
        driftReverse: {
          '0%':   { transform: 'translateY(0px)  translateX(0px)   rotate(0deg)' },
          '100%': { transform: 'translateY(18px) translateX(-8px)  rotate(-6deg)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
