/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      boxShadow: {
        xl: "0 5px rgba(0, 0, 0)",
      },
    },
  },
  plugins: [],
};
