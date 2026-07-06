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
          ink: "#1f2937",
          coal: "#12345f",
          paper: "#f5f8ff",
          bone: "#ffffff",
          clay: "#64748b",
          teal: "#28aee4",
          indigo: "#0f3f78",
          saffron: "#38bdf8",
          leaf: "#5b7fb8",
          line: "#dbeafe"
        }
      },
      boxShadow: {
        hard: "10px 10px 0 rgba(15, 63, 120, 0.12)",
        lift: "0 22px 60px rgba(15, 63, 120, 0.12)",
        soft: "0 14px 36px rgba(15, 63, 120, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;