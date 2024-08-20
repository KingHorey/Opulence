/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "320px",
      },
      colors: {
        offWhite: "#f1f1e6",
        offBlue: "#def2f0",
        deepBlue: "#417A9F",
        lightBlue: "#B0E0E6",
      },
    },
    fontFamily: {
      cerotta: ["Cerotta", "sans-serif"],
      grames: ["Grames", "sans-serif"],
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
