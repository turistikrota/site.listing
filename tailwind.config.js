const { withTouristicUI } = require('@turistikrota/ui/config')

module.exports = withTouristicUI({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        75: '18.8125rem',
        76: '19rem',
        102: '26rem',
        104: '28rem',
        106: '30rem',
        156: '39rem',
        158: '41rem',
        160: '43rem',
        162: '45rem',
        164: '47rem',
      },
      width: {
        75: '18.8125rem',
        76: '19rem',
      },
      backgroundImage: {
        watermark: 'var(--background-url)',
      },
    },
  },
})
