/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1F2937",
          50: "#F3F4F6",
          100: "#E5E7EB",
          200: "#D1D5DB",
          300: "#9CA3AF",
          400: "#6B7280",
          500: "#4B5563",
          600: "#374151",
          700: "#1F2937",
          800: "#111827",
          900: "#0F172A",
        },
        secondary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        blue: {
          DEFAULT: "#2D6BEE",
          50: "#EFF4FF",
          100: "#DCE9FF",
          200: "#B8CFFF",
          300: "#94B5FF",
          400: "#709CFE",
          500: "#4C82FE",
          600: "#2D6BEE",
          700: "#1D57CC",
          800: "#0E42AA",
          900: "#032A88",
        },
      },
      boxShadow: {
        xl:
          "0 20px 25px -5px rgba(31, 41, 55, 0.1), 0 10px 10px -5px rgba(31, 41, 55, 0.04)",
      },
    },
  },
  plugins: [],
};
