/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custcolor: "#767157",
        gracolor : "#4D4939",
        backgroundgray :"#F6F6F6",
        backgroundgrayM : "#F5F5F5"
      },
      boxShadow: {
        bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // Ombre uniquement en bas
      },
    },
  },
  plugins: [],
};
