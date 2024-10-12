/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      background: '#edeae9',
      links: '#be967d',
      btnColor: '#e9dfde',
      blackBG: '#2b2b2b',
      brownText: '#967159',
      white: '#ffffff',
    },
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(30%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
