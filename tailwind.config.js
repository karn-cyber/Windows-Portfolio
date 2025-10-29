/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'ms-sans-serif': ['MS Sans Serif', 'Tahoma', 'sans-serif'],
        'segoe': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      colors: {
        'xp-blue': '#0054E3',
        'xp-taskbar': '#245EDC',
        'xp-start': '#3985FD',
        'xp-desktop': '#5A7FCC',
        'xp-window': '#ECE9D8',
        'xp-border': '#0054E3',
        'xp-green': '#73D216',
        'luna-silver': '#D4D0C8',
        'luna-blue': '#0054E3',
      },
      backgroundImage: {
        'xp-bliss': "url('/images/bliss.jpg')",
        'xp-gradient': 'linear-gradient(to bottom, #4080FF 0%, #0054E3 100%)',
        'xp-start-gradient': 'linear-gradient(to bottom, #3985FD 0%, #245EDC 100%)',
      },
      boxShadow: {
        'xp-window': '2px 2px 4px rgba(0,0,0,0.3)',
        'xp-button': 'inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(128,128,128,0.8)',
        'xp-pressed': 'inset -1px -1px 0px rgba(255,255,255,0.8), inset 1px 1px 0px rgba(128,128,128,0.8)',
      }
    },
  },
  plugins: [],
}
