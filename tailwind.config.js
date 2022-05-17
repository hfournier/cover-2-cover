const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.html'],
  important: true,
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
      ubuntu: ['Ubuntu', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'cloth-texture': "url('/static/img/cloth.png')",
        'lp-45-pattern': "url('/static/img/lp-background.png')",
        'album-covers': "url('/static/img/album-covers.jpg')"
      },
      gridTemplateRows: {
        'auto-fr': 'auto minmax(0, 1fr)',
        'fr-auto': 'minmax(0, 1fr) auto'
      },
      inset: {
        '1/8': '12.5%',
        '1/10': '10%'
      }
    },
    rotate: { 290: '290deg' }
  },
  plugins: [require('@tailwindcss/typography')]
};
