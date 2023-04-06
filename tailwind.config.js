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
      colors: {
        green: "#97FF73",
      },
      fontFamily: {
        ibmPlex: ["IBM Plex Mono", "sans-serif"],
        carbon: ["Carbon", "sans-serif"],
        compressed: ["Compressed", "sans-serif"],
        condensed: ["Condensed", "sans-serif"],
        expanded: ["Expanded", "sans-serif"],
        extended: ["Extended", "sans-serif"],
        extraCondensed: ["ExtraCondensed", "sans-serif"],
        normal: ["Normal", "sans-serif"],
        semiCondensed: ["SemiCondensed", "sans-serif"],
        wide: ["Wide", "sans-serif"],
        xCompressed: ["XCompressed", "sans-serif"],
        xxCompressed: ["xxCompressed", "sans-serif"],
        xxxCompressed: ["xxxCompressed", "sans-serif"],
        xxxxCompressed: ["xxxxCompressed", "sans-serif"],
      },
      backgroundImage: {
        aboutPattern: "url('/assets/background.svg')",
      },
    },
  },
  plugins: [],
};
