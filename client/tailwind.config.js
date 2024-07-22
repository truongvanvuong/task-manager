/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {},
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#141414",
        dark: "#1f1f1f",
        gray: "#262626",
        textHeaddingDark: "#FFFFFFD9",
        textDark: "#FFFFFFD9",
        secondaryTextDark: "#FFFFFFA6",
        defaultBorderDark: "#424242FF",
        separatorDark: "#FDFDFD1F",
        primaryColor: "#fa8c16",
        headingColor: "#000000E0",
        textColor: "#000000E0",
        secondaryText: "#000000A6",
        defaultBorder: "#D9D9D9FF",
        separator: "#0505050F",
        layoutBackground: "#F5F5F5FF",
      },
      boxShadow: {
        "3xl": "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
      },
      screens: {
        sm: "600px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
