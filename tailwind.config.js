/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "pastel-blue": "#AEC6CF",
        sage: "#97A97C",
      },
    },
    layers: {
      utilities: ["sm"],
    },
  },
  plugins: [],
};
