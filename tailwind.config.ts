import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'pl-35': '35%',
        'pl-60': '60%',
        'pl-50': '50%',
        'pl-40': '40%',
        'pl-70': '70%',
        'pl-25': '25%',
        'pl-10': '10%',
      },
      margin:{
'ml-40':'35%',
'mx-25': '20%',
'mr-25':'25%',

      },
      borderColor:{
        'cool':'  bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'
      },
      fontFamily : {
        sans: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
}
export default config
