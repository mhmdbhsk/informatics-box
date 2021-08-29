const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-100': '#BCDDFC',
        'brand-200': '#92C9FB',
        'brand-300': '#68B4F9',
        'brand-400': '#49A4F8',
        'brand-500': '#3095F6',
        'brand-600': '#2E87E8', // main
        'brand-700': '#2A75D5',
        'brand-800': '#2764C3',
        'brand-900': '#2145A4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
