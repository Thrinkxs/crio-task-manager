/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        lime: "#B0EB18",
        purple: "#3D308F",
        fav1: "#0B2C2F",
      },
    },
  },
  plugins: [],
};
