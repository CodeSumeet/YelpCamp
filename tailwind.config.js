/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#f9f6f1",
        gray: "#5f5c57",
        grayish: "#585858",
        lightGray: "#dedede",
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [],
};
