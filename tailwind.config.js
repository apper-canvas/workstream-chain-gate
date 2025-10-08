/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          dark: "#1e40af",
          light: "#3b82f6"
        },
        secondary: {
          DEFAULT: "#64748B",
          dark: "#475569",
          light: "#94a3b8"
        },
        accent: {
          DEFAULT: "#F97316",
          dark: "#ea580c",
          light: "#fb923c"
        },
        surface: "#FFFFFF",
        background: "#F8FAFC",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.12)"
      }
    },
  },
  plugins: [],
};