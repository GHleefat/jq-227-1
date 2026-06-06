/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "pipe-bg": "#0f172a",
        "pipe-panel": "#1e293b",
        "pipe-border": "#334155",
        "pipe-metal": "#64748b",
        "pipe-metal-light": "#94a3b8",
        "pipe-water": "#38bdf8",
        "pipe-water-dark": "#0284c7",
        "pipe-source": "#f59e0b",
        "pipe-target": "#10b981",
        "pipe-danger": "#ef4444",
      },
      animation: {
        "water-flow": "waterFlow 1.5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "rotate-in": "rotateIn 0.3s ease-out",
        "pipe-spin": "pipeSpin 0.3s ease-out",
        "win-burst": "winBurst 0.6s ease-out",
      },
      keyframes: {
        waterFlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(56, 189, 248, 0.8)" },
        },
        rotateIn: {
          "0%": { transform: "scale(0.8) rotate(-10deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        pipeSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        winBurst: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
