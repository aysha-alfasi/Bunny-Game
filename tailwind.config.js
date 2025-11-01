/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scale-bounce': 'scaleBounce 1.5s infinite',
      },
       keyframes: {
        scaleBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
        }
      },  
    },
  },
  plugins: [],
}
