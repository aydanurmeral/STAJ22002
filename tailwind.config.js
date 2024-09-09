
module.exports = {
  content: [
    './src/**/*.{html,js,ts,vue,scss}',
  ],
  theme: {
    extend: {
      spacing: {
        '-4': '-1rem', 
        '20':'7rem',
        '30':'13rem',
        '50':'12rem',
        '70':'20rem',
        '120': '25rem', 
        '144': '36rem', 
        '160':'40rem',
        '200':'60rem',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
