import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-bg-color)",
        textPrimary: "var(--primary-text-color)",
        secondary: "var(--secondary-bg-color)",
        textSecondary: "var(--secondary-text-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
