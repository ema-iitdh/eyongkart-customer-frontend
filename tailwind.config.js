/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f42c37",
        secondary: "#f42c37",
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        draw: {
          "0%": { width: "0", height: "0" },
          "100%": { width: "1.25rem", height: "2.5rem" },
        },
      },
      animation: {
        pop: "pop 0.6s ease-in-out",
        draw: "draw 0.6s ease-in-out 0.3s forwards",
      },
    },
  },

  plugins: [],
};
