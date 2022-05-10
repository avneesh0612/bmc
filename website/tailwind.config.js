module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ClashDisplay: ["ClashDisplay-Variable"],
      },
      colors: {
        accent: "#52DEE5",
        darkBlue: "#222E50",
        darkerBlue: "#172241",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
