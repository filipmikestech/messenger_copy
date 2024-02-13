/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBgColor: "white",
        sideBgColor: "#ececec",
        hoverColor: "#e3e3e3",
        unReadMessageColor: "#e3e3e3",
        darkTextColor: "#202e24",
        lightTextColor: "#919191",
        inputBgColor: "#e3e3e3",
        inputLightBgColor: "#f5f5f5",
        messengerColor: "#0098fe",
      },
    },
  },
  plugins: [],
};
