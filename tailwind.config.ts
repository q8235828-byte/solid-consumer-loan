import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sterling: {
          navy: {
            DEFAULT: "#002D62",
            dark: "#001D40",
            light: "#0A3D80",
            deep: "#001530",
          },
          gold: {
            DEFAULT: "#C89D35",
            light: "#DFC065",
            dark: "#A37C20",
            accent: "#E5C058",
          },
          slate: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            800: "#1E293B",
            900: "#0F172A",
          },
          green: {
            DEFAULT: "#00875A",
            light: "#E3FCEF",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
