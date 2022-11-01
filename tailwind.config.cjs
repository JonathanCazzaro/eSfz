/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        abstract: "url('./src/assets/abstract.jpg')",
        welcome: "url('./src/assets/welcome.jpg')",
      },
      fontFamily: {
        main: "'Glory', sans-serif",
      },
    },
  },
  plugins: [],
};
