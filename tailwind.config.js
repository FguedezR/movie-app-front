/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "disney-dark": "#040714",
        "disney-blue": "#1a1d29",
      },
    },
  },
  plugins: [],
};
