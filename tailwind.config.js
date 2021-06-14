module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans JP'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
