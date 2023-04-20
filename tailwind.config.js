/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-main" : "#041320",
        "app-gray": "#363636"
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}