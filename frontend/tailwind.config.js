/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightLime: "#CFDF09",
        darkLime: "#098E0E",
        lightBlue: "#3C8DBC",
        darkBlue: "#222D31",
        logoutRed: "#AC1517",
      },
    },
  },
  plugins: [],
};
