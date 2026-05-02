/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./fitness-app/src/**/*.{html,ts}",
    "./apps/shop/src/**/*.{html,ts}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

