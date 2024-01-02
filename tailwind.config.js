/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {    
          '50': '#FEF8F1',
          '100': '#FEF8F1',
          '200': '#ceb8af',
          '300': '#ceb8af',
          '400': '#AF8771',
          '500': '#AD7A5B',
          '600': '#AD7A5B',
          '700': '#533434',
          '800': '#1d476f',
          '900': '#1d3d5d',
          '950': '#13273e',
        }
      },
    },
  },
  plugins: [],
}