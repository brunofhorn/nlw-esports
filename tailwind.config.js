/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {},
      backgroundImage: {
        galaxy: "url('/images/background.png')",
        'nlw-gradient':
          'linear-gradient(90deg, #9572FC 0%, #43E7AD 35%, #E1D55D 100%);',
      },
    },
  },
  plugins: [],
};