/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      background: '#edeae9',
      links: '#be967d',
      btnColor: '#e9dfde',
      darkerBtnColor: '#c3a387',
      blackBG: '#2b2b2b',
      brownText: '#967159',
      white: '#ffffff',
    },
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
    },
  },
  plugins: [],
};
