/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#008847',
        primary: '#D65600',
        light: '#fff',
        gray: 'gray',
        dark: '#000',
      },
      fontFamily: {
        Bold: 'Poppins-Bold',
        Medium: 'Poppins-Medium',
        Regular: 'Poppins-Regular',
        SemiBold: 'Poppins-SemiBold',
      },
    },
  },
  plugins: [],
};
