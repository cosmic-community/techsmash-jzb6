/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00d26a',
          dark: '#00b85c',
          light: '#33dc88',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8f9fa',
          dark: '#1a1a2e',
          darker: '#16162a',
        },
        text: {
          primary: '#1a1a2e',
          secondary: '#6b7280',
          muted: '#9ca3af',
          inverse: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}