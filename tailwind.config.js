const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
    theme: {
        extend: {
          screens: {
            xs: '480px',
          },
          height: {
            'user-table-container': 'calc(100vh - 56px)',
            'user-form-mobile': 'calc(100vh - 10px)'
          }
        },
    },
    darkMode: "class",
  plugins: [heroui()],
};