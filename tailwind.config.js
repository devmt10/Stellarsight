// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nasa-blue': '#061f4a',
        'nasa-yellow': '#FFB81C',
      },
      fontFamily: {
        spaceMono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
