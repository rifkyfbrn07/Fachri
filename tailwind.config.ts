import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#481725",
        maroonDeep: "#3A1220",
        wine: "#72283B",
        rose: "#A66B76",
        ivory: "#F5EEE4",
        parchment: "#E9DDCB",
        gold: "#B69A70",
        ink: "#302521",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        sundanese: ["var(--font-sundanese)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      transitionTimingFunction: {
        "soft-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
