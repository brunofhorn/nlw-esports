/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize:{
      label: '0.5rem',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {},
      backgroundImage: {
        galaxy: "url('/images/background.png')",
        'nlw-gradient':'linear-gradient(90deg, #9572FC 0%, #43E7AD 35%, #E1D55D 100%);',
        'galaxy-gradient':'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient':'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
};