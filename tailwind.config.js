module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          high: '#ef4444',
          medium: '#f59e0b',
          low: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
