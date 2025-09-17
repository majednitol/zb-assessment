/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', 
        secondary: '#1e293b', 
        accent: '#f97316', 
        background: '#f9fafb' 
      },
      boxShadow: {
        soft: '0 6px 20px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: [],
}