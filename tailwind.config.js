/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',        // near-black background
        charcoal: '#17171A',   // panel background
        line: '#2A2A2E',       // hairline borders on dark
        ivory: '#F6F4EF',      // warm off-white
        gold: '#C9A24B',       // primary brand accent (muted antique gold, not neon)
        goldbright: '#E4C976', // hover/highlight gold
        graytext: '#9B9BA1',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        facet: 'linear-gradient(135deg, rgba(201,162,75,0.14) 0%, rgba(201,162,75,0) 40%)',
      },
    },
  },
  plugins: [],
};
