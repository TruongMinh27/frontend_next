/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    // fontFamily: {
    //   display: ["REM", "sans-serif"],
    // },
    extend: {
      colors: {
        black: "#131740",
        primary: "#3ec2d4",
        smoke: "#3b3b3b",
      },
      backgroundColor: {
        jacata: "#101436",
      },
      keyframes: {
        fly: {
          "0%": {
            transform: "translateY(5%)",
          },
          "100%": {
            transform: "translateY(5%)",
          },
          "50%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fly: "fly 6s cubic-bezier(.75,.02,.31,.87) infinite",
      },
    },
  },
  plugins: [],
};
