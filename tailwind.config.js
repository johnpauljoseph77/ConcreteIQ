/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080C14',
        panel: '#0D1420',
        card: '#1C2535',
        gold: '#C8A96E',
        blue: '#4A7FA5',
        parchment: '#E8E2D5',
        termbg: '#0A0F1A',
        termborder: '#1E2D42'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
