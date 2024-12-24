/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#353535",
        secondary: "#faf7ff",
        accent: "#8685ef",
        ln: "#4c4a5a",
      },
    },
  },
  plugins: [],
};
