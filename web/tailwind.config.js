/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

      },
      colors: {
        'background': '#fffefb',
        'component-background': '#f5f4f1',
        'component-border-black': '#cccbc8',
        'component-active': '#71c4ef',
        'primary-text': '#1E2022',
        'secondary-text': '#313d44',
        'svg-bg-gray': '#e1e4e6',
        'svg-bg-white': '#F0F5F9',
        'background-3': '#d4eaf7',
        'background-4': '#b6ccd8',
      },
    },
  },
  plugins: [],
}