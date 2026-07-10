import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#166534',
          light: '#f0fdf4'
        }
      }
    },
  },
  plugins: [],
};
export default config;
