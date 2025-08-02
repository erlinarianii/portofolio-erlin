/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // TAMBAHKAN INI
  theme: {
    extend: {
      fontFamily: {
        Outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}