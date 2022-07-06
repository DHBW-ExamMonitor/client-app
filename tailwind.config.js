/* eslint-disable global-require */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
