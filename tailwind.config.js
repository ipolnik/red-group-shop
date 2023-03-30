/** @type {import('tailwindcss').Config} */
const twColors = require('tailwindcss/colors')

const colors = {
  transparent: twColors.transparent,
  black: twColors.black,
  white: twColors.white
}

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors,
    extend: {
      fontsize: {
        xs: '0.82rem',
        sm: '0.98rem',
        base: '1.15rem',
        lg: '1.22rem',
        xl: '1.36rem'
      },
      keyframes: {
        animationOpacity: {
          from: {opacity: 0.2},
          to: {opacity: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
        }
      }
    },
    animation: {
      opacity: 'animationOpacity .5s ease-in-out',
      scaleIn: 'scaleIn .35s ease-in-out'
    }
  },
  plugins: [],
}}