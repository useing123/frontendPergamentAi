/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
  ],
  darkMode: false, // или 'media' или 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
