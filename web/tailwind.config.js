/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif;",
      },
      colors: {
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          800: "#202024",
          600: "#323238",
          900: "#121214",
        },
        ignite: {
          500: "#129E57",
        },
        nlw: {
          500: "#F7DD43",
          700: "#E5CD3D",
        },
      },
      backgroundImage: {
        app: "url(/app-bg.png)",
      },
    },
  },
  plugins: [],
};
