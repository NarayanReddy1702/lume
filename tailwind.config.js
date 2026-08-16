/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07040d',
        ink: '#0c0815',
        haze: '#9c96ad',
        lume: {
          violet: '#7c5cff',
          lilac: '#b9a6ff',
          coral: '#ff6b57',
          cyan: '#4fd6d0',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 120px 40px rgba(124,92,255,0.25)',
      },
    },
  },
  plugins: [],
}
