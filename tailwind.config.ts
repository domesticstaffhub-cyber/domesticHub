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
          ink: "#082e8a",
          coal: "#061a55",
          paper: "#f5f8ff",
          bone: "#ffffff",
          clay: "#0b4ea2",
          teal: "#1495d3",
          indigo: "#061f75",
          saffron: "#2bb7f0",
          leaf: "#4f78bd",
          line: "#d9e6f7"
        }
      },
      boxShadow: {
        hard: "10px 10px 0 rgba(8, 46, 138, 0.15)",
        lift: "0 22px 60px rgba(8, 46, 138, 0.14)",
        soft: "0 14px 36px rgba(8, 46, 138, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
