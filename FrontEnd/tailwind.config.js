/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
      },
    },

    colors: {
      gray: {
        50: '#eaeaea',
        100: '#bdbdbf',
        200: '#9d9da0',
        300: '#707074',
        400: '#555559',
        500: '#2a2a30',
        600: '#26262c',
        700: '#1e1e22',
        800: '#17171a',
        900: '#121214',
      },
      red: {
        50: '#f9e9e9',
        100: '#ecbaba',
        200: '#e29898',
        300: '#d56969',
        400: '#cd4c4c',
        500: '#c11f1f',
        600: '#b01c1c',
        700: '#891616',
        800: '#6a1111',
        900: '#510d0d',
      },
    },
  },
  plugins: [],
}
