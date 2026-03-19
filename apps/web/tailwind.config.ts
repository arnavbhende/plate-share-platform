import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        primaryDark: "#1B5E20",
        primaryLight: "#4CAF50",
        bgLight: "#E8F5E9",
      },
      fontFamily: {
        heading: ["var(--font-be-vietnam-pro)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
} satisfies Config;

export default config;
