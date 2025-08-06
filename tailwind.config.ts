/** @type {import('tailwindcss').Config} */
const toRem = (px: number) => `${px / 16}rem`;

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    screens: {
      base: "0px",
      xxs: "376px",
      xs: "480px",
      "2xs": "576px",
      sm: "640px",
      md: "768px",
      lg: "992px",
      "2lg": "1064px",
      xl: "1200px",
      xxl: "1320px",
      xxxl: "1729px",
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      brand: {
        lavender: {
          100: "#B592FF",
          80: "#C1A5FF",
          60: "#CFB9FD",
          40: "#E2D4FF",
          20: "#F7F2FF",
        },
        carnation: {
          100: "#FDA5D6",
          80: "#FFB4DE",
          60: "#FFD2EB",
          40: "#FFE1F2",
          20: "#FFF1F9",
        },
        minion: {
          100: "#FFE76C",
          80: "#FFEF9C",
          60: "#FFF6C5",
          40: "#FFF9DA",
          20: "#FFFCEF",
        },
        smithApple: {
          100: "#A8EB9E",
          80: "#B7F7AE",
          60: "#D3FACD",
          40: "#E9FFE5",
          20: "#F6FFF5",
        },
      },
      secondary: {
        dark: {
          100: "#191A23",
          80: "#686A79",
          60: "#868893",
          40: "#B7B8C1",
          20: "#D6D7E0",
        },
        white: "#FFFFFF",
      },
      background: "#FBFAFF",
      oranye: "#F68533",
    },
    fontFamily: {
      hanken: ["var(--font-hanken)", "sans-serif"],
      syne: ["var(--font-syne)", "sans-serif"],
      sans: ["var(--font-hanken)", "sans-serif"],
      display: ["var(--font-hanken)", "sans-serif"],
    },
    fontSize: {
      "heading-1": [
        toRem(72),
        { lineHeight: toRem(88), fontWeight: "700", letterSpacing: "-0.04em" },
      ],
      "heading-2": [toRem(48), { lineHeight: toRem(56), fontWeight: "700" }],
      "heading-3": [toRem(40), { lineHeight: toRem(40), fontWeight: "700" }],
      "heading-4": [toRem(32), { lineHeight: toRem(40), fontWeight: "700" }],
      "heading-5": [toRem(24), { lineHeight: toRem(32), fontWeight: "600" }],
      "heading-6": [toRem(20), { lineHeight: toRem(28), fontWeight: "700" }],
      "xl-bold": [toRem(20), { lineHeight: toRem(28), fontWeight: "700" }],
      "xl-medium": [toRem(20), { lineHeight: toRem(28), fontWeight: "500" }],
      "xl-regular": [toRem(20), { lineHeight: toRem(30), fontWeight: "300" }],
      "lg-bold": [toRem(18), { lineHeight: toRem(26), fontWeight: "700" }],
      "lg-medium": [toRem(18), { lineHeight: toRem(26), fontWeight: "500" }],
      "lg-regular": [toRem(18), { lineHeight: toRem(26), fontWeight: "300" }],
      "normal-bold": [toRem(16), { lineHeight: toRem(20), fontWeight: "700" }],
      "normal-medium": [toRem(16), { lineHeight: toRem(20), fontWeight: "500" }],
      "normal-regular": [toRem(16), { lineHeight: toRem(26), fontWeight: "300" }],
      "sm-bold": [toRem(14), { lineHeight: toRem(20), fontWeight: "700" }],
      "sm-medium": [toRem(14), { lineHeight: toRem(20), fontWeight: "500" }],
      "sm-regular": [toRem(14), { lineHeight: toRem(20), fontWeight: "300" }],
      "xs-bold": [toRem(12), { lineHeight: toRem(16), fontWeight: "700" }],
      "xs-medium": [toRem(12), { lineHeight: toRem(16), fontWeight: "500" }],
      "xs-regular": [toRem(12), { lineHeight: toRem(16), fontWeight: "300" }],
    },
    extend: {
      spacing: {
        // ... spacing values from your config
        96: toRem(96),
        100: toRem(100),
        120: toRem(120),
        140: toRem(140),
        160: toRem(160),
        180: toRem(180),
        200: toRem(200),
      },
      borderRadius: {
        xs: toRem(2),
        sm: toRem(4),
        8: toRem(8),
        10: toRem(10),
        15: toRem(15),
        20: toRem(20),
        26: toRem(26),
        32: toRem(32),
        40: toRem(40),
        48: toRem(48),
      },
      boxShadow: {
        DEFAULT: "0px 0px 16px 0px rgba(0, 0, 0, 0.065)",
        ribbon: "0px 1px 4px 0px #0000003D",
        lg: "0px 0px 24px 0px #0A182C52",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utils: Record<string, any>) => void }) {
      addUtilities({
        ".no-scrollbar": {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};