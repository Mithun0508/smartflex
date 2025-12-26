/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        smartflex: {
          primary: "#22c55e",     // smooth green
          secondary: "#6366f1",   // indigo
          accent: "#0ea5e9",      // sky blue
          neutral: "#334155",     // slate
          "base-100": "#ffffff",  // white
          "base-200": "#f8fafc",  // subtle background
          "base-300": "#eef2f7",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
}
