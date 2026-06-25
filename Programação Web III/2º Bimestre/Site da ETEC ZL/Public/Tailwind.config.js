/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f2',
          100: '#fbe6e6',
          200: '#f5c4c4',
          300: '#ec9999',
          400: '#e06666',
          500: '#cc3333',
          600: '#b30000',
          700: '#800000',
          800: '#660000',
          900: '#4d0000',
        }
      }
    },
  },
  plugins: [],
}