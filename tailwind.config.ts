import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text': 'hsl(223, 89%, 7%)',
        'background': 'hsl(13, 70%, 96%)',
        'primary': 'hsl(43, 88%, 80%)',
        'secondary': 'hsl(13, 88%, 90%)',
        'accent': 'hsl(223, 65%, 47%)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],


}
export default config
