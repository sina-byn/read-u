import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        info: {
          DEFAULT: '#4493F8',
          dark: '#164b94',
        },
        neutral: '#30363D',
        primary: {
          light: '#161B22',
          DEFAULT: '#0D1117',
          dark: '#010409',
        },
      },
    },
  },
  plugins: [],
};
export default config;
