module.exports = {
  purge: ['./src/pages/**/*.js', './src/components/**/*.js'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      'react-blue': '#61dafb',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
