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
        'background-5': '#00668c',
        // temat ovan, sorterat som det skall vara
        // --primary-100:#d4eaf7;
        // --primary-200:#b6ccd8;
        // --primary-300:#3b3c3d;
        // --accent-100:#71c4ef;
        // --accent-200:#00668c;
        // --text-100:#1d1c1c;
        // --text-200:#313d44;
        // --bg-100:#fffefb;
        // --bg-200:#f5f4f1;
        // --bg-300:#cccbc8;



        // Grön, svart tema
        // --primary-100:#2E8B57;
        // --primary-200:#61bc84;
        // --primary-300:#c6ffe6;
        // --accent-100:#8FBC8F;
        // --accent-200:#345e37;
        // --text-100:#FFFFFF;
        // --text-200:#e0e0e0;
        // --bg-100:#1E1E1E;
        // --bg-200:#2d2d2d;
        // --bg-300:#454545;


      },
    },
  },
  plugins: [],
}