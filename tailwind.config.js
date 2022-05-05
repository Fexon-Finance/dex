module.exports = {
  purge: [ './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './sections/**/*.{js,ts,jsx,tsx}' ],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'hero-img': "url('/public/hero-bg.jpeg')",
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      0.5: '0.5px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
    },
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   white: '#ffffff',
    //   black: '#000',
    //   grin: {
    //     500: 'ACD8C8',
    //   },
    // },
  },
  variants: {
    extend: { cursor: [ 'hover', 'focus' ] },
  },
  plugins: [],
};
