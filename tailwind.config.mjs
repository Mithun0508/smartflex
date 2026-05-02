import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        smartflex: {
          primary: "#22c55e",
          secondary: "#6366f1",
          accent: "#0ea5e9",
          neutral: "#334155",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#eef2f7",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};

export default config;
