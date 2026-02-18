import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6EC",
        sand: "#F5EADB",
        teal: {
          DEFAULT: "#0D7377",
          light: "#14919B",
          dark: "#0A5C5F",
        },
        gold: {
          DEFAULT: "#C8A951",
          light: "#E0C97A",
          dark: "#A88B3A",
        },
        bark: "#3D2C1E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["1.125rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      boxShadow: {
        card: "0 2px 8px rgba(61, 44, 30, 0.06), 0 12px 32px rgba(61, 44, 30, 0.04)",
        cardHover: "0 4px 16px rgba(61, 44, 30, 0.08), 0 20px 48px rgba(61, 44, 30, 0.06)",
        soft: "0 1px 3px rgba(61, 44, 30, 0.04)",
        inner: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal": "reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "breathe": "breathe 4s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "float": "float 20s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "scale(0.97) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.008)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 2px 8px rgba(61, 44, 30, 0.06), 0 12px 32px rgba(61, 44, 30, 0.04)" },
          "50%": { boxShadow: "0 2px 12px rgba(13, 115, 119, 0.08), 0 14px 36px rgba(61, 44, 30, 0.05)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(1px, -1px) rotate(0.5deg)" },
          "50%": { transform: "translate(-1px, 1px) rotate(-0.5deg)" },
          "75%": { transform: "translate(1px, 1px) rotate(0.5deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.035" },
          "50%": { opacity: "0.055" },
        },
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
