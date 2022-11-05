/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        m: '0.9rem',
      },
      boxShadow: {
        m: '0 1.5px 0.25rem rgba(30, 41, 59, 0.5)',
        'inner-m': 'inner 0 0 0.25rem 0.25rem rgba(30, 41, 59, 0.5)',
      },
      backgroundImage: {
        abstract: "url('./src/assets/abstract.jpg')",
        welcome: "url('./src/assets/welcome.jpg')",
        paper: "url('./src/assets/paper.png')",
      },
      fontFamily: {
        main: "'Glory', sans-serif",
      },
    },
  },
  plugins: [],
};
