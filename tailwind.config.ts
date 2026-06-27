import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0d3f8c",
          blue: "#1f7eea",
          sky: "#49b7f5",
          ink: "#102037",
          mint: "#2bbf8a",
          gold: "#f4b63f"
        }
      },
      boxShadow: {
        glow: "0 24px 80px rgba(31, 126, 234, 0.18)",
        soft: "0 18px 60px rgba(16, 32, 55, 0.12)"
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 15% 20%, rgba(73,183,245,.28), transparent 30%), radial-gradient(circle at 90% 10%, rgba(244,182,63,.22), transparent 24%), radial-gradient(circle at 75% 75%, rgba(43,191,138,.20), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
