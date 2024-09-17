import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gray-to-transparent":
          "linear-gradient(180deg, rgba(255,255,255,0.6432948179271709) 70%, rgba(2,0,36,0) 98%)",
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
