
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
          DEFAULT: "#005ED1", // tang-blue as primary
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FDBA00", // selective-yellow as secondary
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
          purple: "#FD98DD", // plum as accent
          blue: "#005ED1", // tang-blue
          green: "#009B40", // pigment-green
          orange: "#FE6000", // orange-pantone
          yellow: "#FDBA00", // selective-yellow
          red: "#FD0000", // off-red
        },
        'selective-yellow': {
          DEFAULT: '#FDBA00',
          100: '#332500',
          200: '#664b00',
          300: '#997000',
          400: '#cc9600',
          500: '#fdba00',
          600: '#ffc933',
          700: '#ffd666',
          800: '#ffe499',
          900: '#fff1cc'
        },
        'champagne': {
          DEFAULT: '#F9E9CD',
          100: '#51370a',
          200: '#a26e13',
          300: '#e6a12a',
          400: '#f0c57c',
          500: '#f9e9cd',
          600: '#faedd7',
          700: '#fbf2e1',
          800: '#fdf6eb',
          900: '#fefbf5'
        },
        'off-red': {
          DEFAULT: '#FD0000',
          100: '#330000',
          200: '#660000',
          300: '#990000',
          400: '#cc0000',
          500: '#fd0000',
          600: '#ff3333',
          700: '#ff6666',
          800: '#ff9999',
          900: '#ffcccc'
        },
        'tang-blue': {
          DEFAULT: '#005ED1',
          100: '#00132a',
          200: '#002654',
          300: '#00387d',
          400: '#004ba7',
          500: '#005ed1',
          600: '#0e7bff',
          700: '#4a9cff',
          800: '#87bdff',
          900: '#c3deff'
        },
        'plum': {
          DEFAULT: '#FD98DD',
          100: '#4f0236',
          200: '#9e036d',
          300: '#ed05a3',
          400: '#fb47c2',
          500: '#fd98dd',
          600: '#fdabe3',
          700: '#fec0ea',
          800: '#fed5f1',
          900: '#ffeaf8'
        },
        'pigment-green': {
          DEFAULT: '#009B40',
          100: '#001f0d',
          200: '#003d1a',
          300: '#005c26',
          400: '#007a33',
          500: '#009b40',
          600: '#00e05e',
          700: '#29ff82',
          800: '#70ffac',
          900: '#b8ffd5'
        },
        'orange-pantone': {
          DEFAULT: '#FE6000',
          100: '#331400',
          200: '#662700',
          300: '#993b00',
          400: '#cc4e00',
          500: '#fe6000',
          600: '#ff8133',
          700: '#ffa166',
          800: '#ffc099',
          900: '#ffe0cc'
        }
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
