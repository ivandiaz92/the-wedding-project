/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geologica: ['var(--font-geologica)'],
        cormorant: ['var(--font-cormorant)'],
        romans: ['"Romans Story"', 'serif'],
        'serif-italic': ['"Source Serif 4"', 'serif'],
        figtree: ['var(--font-figtree)'],
        degular: ['var(--font-degular)', 'sans-serif'],
      },
      colors: {
        primary: '#C4A484',
        secondary: '#1E1E1E',
        background: {
          DEFAULT: 'var(--background)',
          rgb: 'var(--background-rgb)',
        },
      },
      padding: {
        clamp: 'clamp(3rem, 8vw, 8rem)',
      },
      margin: {
        clamp: 'clamp(3rem, 8vw, 8rem)',
      },
    },
  },
  plugins: [],
}
