export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
   theme: {
    extend: {
      keyframes: {
        colorChange: {
          '0%, 100%': { color: '#8458B3' },
          '80%': { color: '#B98DD6' },
          '76%': { color: '#B98DD6' },
          '65%': { color: '#5B397F' },
        },
      },
      animation: {
        colorChange: 'colorChange 4s infinite',
      },
    },
  },
  plugins: [],
}
 