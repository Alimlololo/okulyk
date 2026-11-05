/** @type {import('tailwindcss').Config} */
// Design tokens — see DESIGN.md ("bright & playful" redesign).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Near-black — text, primary button, outlines
        ink: "#16161D",
        // Page grounds
        paper: "#FFFFFF",
        snow: "#F6F6FA",
        canvas: "#F1F2F8",
        // Secondary text (AA on white)
        muted: "#5F5F6B",

        // ---- Juicy accents (soft = 12–18% tint, ink = AA text on soft) ----
        berry: {
          soft: "#E6EAFF",
          DEFAULT: "#3D5AFE",
          ink: "#2236B8",
          50: "#EEF1FF",
          100: "#E0E6FF",
          200: "#C2CCFF",
          300: "#94A5FF",
          400: "#6A7EFF",
          500: "#3D5AFE",
          600: "#2E46E0",
          700: "#2236B8",
          800: "#1C2D91",
          900: "#1A2873",
        },
        leaf: { soft: "#DDF6E8", DEFAULT: "#3CC47C", ink: "#146B3F" },
        grape: { soft: "#EFE7FF", DEFAULT: "#8B5CF6", ink: "#5B2BC4" },
        bubble: { soft: "#FFE3EF", DEFAULT: "#FF6FA8", ink: "#9E1F57" },
        // Legacy names kept so existing components pick up the new palette
        butter: { soft: "#FFF3CC", DEFAULT: "#FFC530", ink: "#7A5600" },
        mint: { soft: "#DDF6E8", DEFAULT: "#3CC47C", ink: "#146B3F" },
        blush: { soft: "#FFE3EF", DEFAULT: "#FF6FA8", ink: "#9E1F57" },
        sky: { soft: "#E3EEFF", DEFAULT: "#8EC5FF", ink: "#1D3FB8" },

        brand: {
          DEFAULT: "#3D5AFE",
          50: "#EEF1FF",
          100: "#E0E6FF",
          200: "#C2CCFF",
          300: "#94A5FF",
          400: "#6A7EFF",
          500: "#3D5AFE",
          600: "#2E46E0",
          700: "#2236B8",
          800: "#1C2D91",
          900: "#1A2873",
        },
        sea: {
          DEFAULT: "#10A192",
          50: "#E7FBF7",
          100: "#C6F4EB",
          200: "#93E8D9",
          300: "#5AD6C2",
          400: "#2BBCA8",
          500: "#10A192",
          600: "#0A8074",
          700: "#0C665E",
          800: "#0D514B",
          900: "#0C433F",
        },
        // "Fire" — reserved for streak
        fire: {
          DEFAULT: "#FF7A1A",
          50: "#FFF2E8",
          100: "#FFE0CC",
          200: "#FFC199",
          300: "#FF9F66",
          400: "#FF8A3D",
          500: "#FF7A1A",
          600: "#F25C00",
          700: "#C24A00",
          800: "#963A05",
          900: "#7A3208",
        },
        sun: "#FFC530",
      },
      fontFamily: {
        // Soft rounded grotesque for UI and body text
        sans: ['"Nunito"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        // Chunky display face for headings and big numbers
        display: ['"Rubik"', '"Nunito"', "system-ui", "sans-serif"],
        parent: ['"Nunito"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      borderRadius: {
        widget: "20px",
        card: "28px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 22, 29, 0.04), 0 12px 32px -18px rgba(22, 22, 29, 0.18)",
        float: "0 22px 48px -20px rgba(22, 22, 29, 0.28)",
        pop: "0 28px 60px -24px rgba(22, 22, 29, 0.32)",
        // Glossy "knob" — inner highlight + soft drop shadow
        knob: "inset 0 2px 3px rgba(255,255,255,0.9), inset 0 -6px 12px rgba(22,22,29,0.08), 0 10px 22px -8px rgba(22,22,29,0.35)",
        lift: "0 14px 30px -14px rgba(61, 90, 254, 0.45)",
      },
      keyframes: {
        flame: {
          "0%, 100%": { transform: "scale(1) rotate(-2deg)" },
          "50%": { transform: "scale(1.12) rotate(2deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(0.7) rotate(20deg)", opacity: "0.7" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        "slide-knob": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(var(--knob-travel, 24px))" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        flame: "flame 1.6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(.2,.8,.2,1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        twinkle: "twinkle 3.2s ease-in-out infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
        "slide-knob": "slide-knob 5s ease-in-out infinite",
        pop: "pop 0.45s cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
  plugins: [],
};
