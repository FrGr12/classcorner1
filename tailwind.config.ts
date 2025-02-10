
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#141413",
          foreground: "#FAFAF8",
        },
        secondary: {
          DEFAULT: "#6E44FF",
          foreground: "#141413",
        },
        neutral: {
          100: "#FAFAF8",
          200: "#F0EFEA",
          300: "#E6E4DD",
          400: "#C4C3BB",
          500: "#A3A299",
          600: "#828179",
          700: "#605F5B",
          800: "#3A3935",
        },
        accent: {
          purple: "#6E44FF",
          pink: "#FF90B3",
          lavender: "#B892FF",
          rose: "#FFC2E2",
          coral: "#EF7A85",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Bangers", "cursive"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
