import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#FBA14D",
        "custom-grey": "#656565",
        "custom-blue": "#4285F4",
        "custom-white": "#F6F6F6",
      },
      screens: {
        "xs": '420px', 
       "medium-xs":"500px"
      },
    },
  },
  plugins: [], 
} satisfies Config;
