import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'button-dark': '#6355F0', // Define custom background color
        'button-dark-hover': '#5043d1', // Define hover background color
      },
    },
  },
  plugins: [],
}

export default config
