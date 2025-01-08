/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        light_blue: 'var(--main-light-blue)',
        neutral_blue: 'var(--main-neutral-blue)',
        dark_blue: 'var(--main-dark-blue)',
        light_brown: 'var(--main-light-brown)',
        neutral_brown: 'var(--main-neutral-brown)',
        dark_brown: 'var(--main-dark-brown)',
        neutral_grey: 'var(--main-neutral-grey)',
        letter_dark: 'var(--text-dark-color)',
      },
    },
  },
  plugins: [],
}

