/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      "200%": "200%",
      right: "right",
    },
    extend: {
      boxShadow: {
        "3xl": "0 25px 50px -12px rgba(241, 0, 39, 0.4)",
        "4xl": "0 25px 50px -12px rgba(280, 0, 39, 0.4)",
      },
      screens: {
        lg: { max: "1025px" },
        md: { max: "900px" },
      },
      gridTemplateColumns: {
        "16": "7% 93%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFF",
        black: "#000",
        gray: {
          100: "#D9D9D9",
          200: "#363636",
          300: "#C9C9C9",
          400: "#808080",
          500: "#8E8E8E",
          600: "#7C7D80",
          700: "#5C5C5C",
        },
        brown: {
          500: "#674736"
        },
        yellow: {
          500: "#FFC42E",
          600: "#FF9012",
        },

        red: {
          500: "#d40b03",
          400: "#F10027",
        },
        slate: {500: "#6a5acd", 700: "#463a97",},
        zinc: {500: "#7b7b7b",   700: "#696969",},
        neutral: {500: "#a8a8a8",   700: "#919191",},
        stone: {500: "#a0522d",   700: "#8c3e1f",},
        orange: {500: "#ffa500",   700: "#ff8000",},
        amber: {500: "#ffbf00",   700: "#ff9e00",},
        lime: {500: "#77dd77",   700: "#00cc00",},
        emerald: {500: "#50c878",   700: "#3d9c60",},
        teal: {500: "#008080",   700: "#006666",},
        cyan: {500: "#00ffff",   700: "#00cccc",},
        sky: {500: "#87ceeb",   700: "#6fa9cc",},
        indigo: {500: "#9370db",   700: "#2d0054",},
        violet: {500: "#9400d3",   700: "#7b008d",},
        purple: {500: "#800080",   700: "#660066",},
        fuchsia: {500: "#ff00ff",   700: "#cc00cc",},
        pink: {500: "#ffc0cb",   700: "#ff99aa",},
        rose: {500: "#ff007f",   700: "#ff0040"},

        green: {
          500: "#32CD70",
          600: "#425C5A",
          700: "#3C5654",
        },
      },
      fontSize: {
        xxs: "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.25rem",
        "6xl": "3rem",
        "7xl": "4rem",
        "8xl": "4.5rem",
        "9xl": "6rem",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      fontFamily: {
        default: "Montserrat, sans-serif",
        code: "monospace",
      },
      lineHeight: {
        shorter: "125%",
        short: "140%",
        base: "160%",
        tall: "180%",
      },
      borderRadius: {
        px: "1px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "16px",
        full: "99999px",
      },
      space: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        40: "10rem",
        64: "16rem",
        80: "20rem",
      },
    },
  },
  plugins: [],
})
