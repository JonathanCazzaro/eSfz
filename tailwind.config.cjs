/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.6rem',
        m: '0.9rem',
      },
      boxShadow: {
        m: '0 1.5px 0.25rem rgba(30, 41, 59, 0.5)',
        'inner-m': 'inner 0 0 0.25rem 0.25rem rgba(30, 41, 59, 0.5)',
        bright: '0 0 0.5rem 0.5rem rgba(255, 255, 255, 0.2)',
        center: '0 0 0.1rem 0.1rem #000'
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
  plugins: [
    function ({ addVariant }) {
      addVariant('scrollbar', '&::-webkit-scrollbar');
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
    },
  ],
};
