/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   // App router
    "./pages/**/*.{js,ts,jsx,tsx}", // Optional: for /pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
