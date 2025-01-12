import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "text-main": "var(--color-text-main)",
        "text-sm": "var(--color-text-sm)",
        sidebar: "var(--color-sidebar)",
        card: "var(--color-card)",
        "card-2": "var(--color-card-2)",
        bg: "var(--color-bg)",

        "input-border": "var(--color-input-border)",
        "input-border-active": "var(--color-input-border-active)",
        "input-fill": "var(--color-input-fill)",
        "green-custome": "var(--color-green)",
        "orange-custom": "var( --color-orange)",
      },
      fontFamily: {
        primary: "var(--font-league-spartan)",
      },
    },
  },
  plugins: [],
} satisfies Config;
