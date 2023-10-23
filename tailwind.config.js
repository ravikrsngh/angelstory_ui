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
          '50': '#f3f7fc',
          '100': '#e5eef9',
          '200': '#c6dcf1',
          '300': '#93c0e6',
          '400': '#599fd7',
          '500': '#3b8bcb',
          '600': '#2468a5',
          '700': '#1e5386',
          '800': '#1d476f',
          '900': '#1d3d5d',
          '950': '#13273e',
        }
      },
    },
  },
  plugins: [],
}