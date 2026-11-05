/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Near-black — editorial headings + primary button
        ink: "#0B0B0C",
        // Almost-white page ground (public site)
        paper: "#FBFBFA",
        // Muted lavender-grey — dashboard page ground, behind the white panel
        canvas: "#E7E6F1",
        // Muted grey — subheads / secondary text
        muted: "#6B6B70",

        // ---- Pastel accents — point use only, inside small widgets ----
        butter: { soft: "#FBF1C7", DEFAULT: "#F4DE84", ink: "#6B5711" },
        mint: { soft: "#E1F3E6", DEFAULT: "#A7E0B8", ink: "#1E5A38" },
        blush: { soft: "#FBE4F0", DEFAULT: "#F1C4DE", ink: "#7A2E5A" },
        sky: { soft: "#E2ECFC", DEFAULT: "#AECBF5", ink: "#1E4A80" },

        // ---- Existing app-area scales, kept intact ----
        brand: {
          DEFAULT: "#6C4CF1",
          50: "#F2EFFE",
          100: "#E6E0FD",
          200: "#CFC3FB",
          300: "#B3A0F7",
          400: "#9376F3",
          500: "#6C4CF1",
          600: "#5A38DC",
          700: "#4A2DB8",
          800: "#3C2694",
          900: "#332477",
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
        // "Fire" accent — reserved for streak only
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
        sun: "#FFC53D",
      },
      fontFamily: {
        // Interface + body — clean grotesque
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        // Bold geometric display — headings, big numbers
        display: ['"Space Grotesk"', '"Inter"', "system-ui", "sans-serif"],
        // Parent area keeps a calm grotesque
        parent: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      borderRadius: {
        widget: "16px",
        card: "20px",
        pill: "9999px",
      },
      boxShadow: {
        // Soft, low-contrast — no visual weight
        card: "0 1px 2px rgba(11, 11, 12, 0.04), 0 10px 26px -14px rgba(11, 11, 12, 0.12)",
        float: "0 20px 50px -22px rgba(11, 11, 12, 0.22)",
        pop: "0 26px 64px -26px rgba(11, 11, 12, 0.28)",
      },
      keyframes: {
        flame: {
          "0%, 100%": { transform: "scale(1) rotate(-2deg)" },
          "50%": { transform: "scale(1.12) rotate(2deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        flame: "flame 1.6s ease-in-out infinite",
        "fade-up": "fade-up 0.4s ease-out both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
