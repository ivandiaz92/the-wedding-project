/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        romans: ['Romans Story', 'serif'],
        honya: ['Honya', 'sans-serif'],
        geologica: ['Geologica', 'sans-serif'],
      },
      colors: {
        primary: '#E4C7A3',
        secondary: '#333333',
      },
    },
  },
  plugins: [],
} 