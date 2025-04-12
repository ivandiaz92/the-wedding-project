import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geologica: ['var(--font-geologica)'],
        romans: ['var(--font-romans)'],
        honya: ['var(--font-honya)'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          rgb: 'var(--primary-rgb)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          rgb: 'var(--secondary-rgb)',
        },
        background: {
          DEFAULT: 'var(--background)',
          rgb: 'var(--background-rgb)',
        },
      },
    },
  },
  plugins: [],
}

export default config 