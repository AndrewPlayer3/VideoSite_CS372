module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))'
      }
    },
  },
  plugins: [],
}
