import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      Inter: "var(--inter)",
    },
    colors: {
      main: 'white',
      dark: '#37352F',
      vista: '#9065AF',
      grey: '#3f3f3f',
      ghost: '#FBFBFB'
    },
    extend: {
      screens: {
        phone: { max: "810px" },
        desktop: { min: "810px" },
      },
      fontSize: {
        "MBody-L": ["15px", "120%"],
        "MHeading-S": ["18px", "120%"],
        "MHeading-M": ["20px", "120%"],
        "MHeading-L": ["24px", "120%"],
        "MTitle-S": ["32px", "120%"],
        "MTitle-L": ["40px", "120%"],

        "DBody-L": ["16px", "120%"],
        "DHeading-S": ["18px", "120%"],
        "DHeading-M": ["24px", "120%"],
        "DHeading-L": ["28px", "120%"],
        "DTitle-S": ["40px", "120%"],
        "DTitle-L": ["48px", "120%"],
      },
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    borderRadius: {
      none: "0px",
      s: "4px",
      m: "8px",
      full: "50%",
    },
    borderWidth: {
      xs: "0.3px",
      s: "0.5px",
      m: "1px",
      l: "2px",
    },
    boxShadow: {
      lg: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
    }
  },
  plugins: [],
};
export default config;
