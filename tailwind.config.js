/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      lightred: '#e6766e',
      text: {
        light: '#90939e',
        lighter: '#edf1fa',
        dark: '#747a82',
        darker: '#121314',
        link: '#a0aceb',
      },
      bg: {
        light: {
          light: '#4f5770',
          lighter: '#aeb6d1',
          dark: '#2e3447',
          darker: '#181c29',
          black: 'black',
        },
        dark: {
          light: '#4f5770',
          lighter: '#aeb6d1',
          dark: '#2e3447',
          darker: '#181c29',
          white: 'white',
        },
      },
    },
  },
  plugins: [],
}
