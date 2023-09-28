const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,jsx,tsx,ts,js,css,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'monserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundColor: {
        'app': '#f0f0f0',
      },
      colors: {
        primary: {
          DEFAULT: "#00a9e0",
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

