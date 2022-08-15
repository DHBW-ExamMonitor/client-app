/* eslint-disable global-require */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {
      colors: {
        primary: '#D23225',
        secondary: '#6C757C',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
