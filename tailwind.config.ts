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
        primary: "rgb(var(--color-primary))",
        "primary-hover": "rgb(var(--color-primary-hover))",
        accent: "rgb(var(--color-accent))",
        "accent-hover": "rgb(var(--color-accent-hover))",
        "textCol-main": "rgb(var(--color-text-main))",
        "textCol-2": "rgb(var(--color-text-2))",
        "textCol-3": "rgb(var(--color-text-3))",
        sidebar: "rgb(var(--color-sidebar))",
        card: "rgb(var(--color-card))",
        "card-2": "rgb(var(--color-card-2))",
        bg: "rgb(var(--color-bg))",

        "input-border": "rgb(var(--color-input-border))",
        "input-border-active": "rgb(var(--color-input-border-active))",
        "input-fill": "rgb(var(--color-input-fill))",
        "green-custom": "rgb(var(--color-green))",
        "orange-custom": "rgb(var(--color-orange))",
      },
      fontFamily: {
        primary: "var(--font-league-spartan)",
      },
    },
  },
  plugins: [],
} satisfies Config;
