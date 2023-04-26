const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "100%": {
            opacity: "1",
          },
          "0%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-in",
        "fade-out": "fade-out 3s ease-out",
      },
      colors: {
        green: "#97FF73",
      },
      fontFamily: {
        ibmPlex: ["var(--font-ibmPlex)", ...fontFamily.sans],
        carbon: ["var(--font-carbon)", ...fontFamily.sans],
        compressed: ["var(--font-compressed)", ...fontFamily.sans],
        condensed: ["var(--font-condensed)", ...fontFamily.sans],
        expanded: ["var(--font-expanded)", ...fontFamily.sans],
        extended: ["var(--font-extended)", ...fontFamily.sans],
        extraCondensed: ["var(--font-extraCondensed)", ...fontFamily.sans],
        normal: ["var(--font-normal)", ...fontFamily.sans],
        semiCondensed: ["var(--font-semiCondensed)", ...fontFamily.sans],
        wide: ["var(--font-wide)", ...fontFamily.sans],
        xCompressed: ["var(--font-xCompressed)", ...fontFamily.sans],
        xxCompressed: ["var(--font-xxCompressed)", ...fontFamily.sans],
        xxxCompressed: ["var(--font-xxxCompressed)", ...fontFamily.sans],
        xxxxCompressed: ["var(--font-xxxxCompressed)", ...fontFamily.sans],
      },
      backgroundImage: {
        applyPattern: "url('/background1.jpg')",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
