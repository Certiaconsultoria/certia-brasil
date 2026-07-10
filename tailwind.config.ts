import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        brand: {
          navy: "#0F1F36",
          "navy-deep": "#091321",
          cream: "#F5F5F0",
          gold: "#C9A961",
          "gold-soft": "#D4AF37",
          line: "rgba(201, 169, 97, 0.24)",
          "green-deep": "#1B3A2D",
        },
      },
      backgroundImage: {
        "site-gradient":
          "radial-gradient(circle at top left, rgba(27, 58, 45, 0.35), transparent 35%), linear-gradient(180deg, #0F1F36 0%, #091321 100%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(15, 31, 54, 0.98) 0%, rgba(9, 19, 33, 0.96) 55%, rgba(27, 58, 45, 0.88) 100%)",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
