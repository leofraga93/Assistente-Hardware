/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          50: 'rgb(var(--palette-slate-50) / <alpha-value>)',
          100: 'rgb(var(--palette-slate-100) / <alpha-value>)',
          200: 'rgb(var(--palette-slate-200) / <alpha-value>)',
          300: 'rgb(var(--palette-slate-300) / <alpha-value>)',
          400: 'rgb(var(--palette-slate-400) / <alpha-value>)',
          500: 'rgb(var(--palette-slate-500) / <alpha-value>)',
          600: 'rgb(var(--palette-slate-600) / <alpha-value>)',
          700: 'rgb(var(--palette-slate-700) / <alpha-value>)',
          800: 'rgb(var(--palette-slate-800) / <alpha-value>)',
          900: 'rgb(var(--palette-slate-900) / <alpha-value>)',
          950: 'rgb(var(--palette-slate-950) / <alpha-value>)',
        },
        brand: {
          50: 'rgb(var(--palette-brand) / <alpha-value>)',
          100: 'rgb(var(--palette-brand) / <alpha-value>)',
          200: 'rgb(var(--palette-brand) / <alpha-value>)',
          300: 'rgb(var(--palette-brand) / <alpha-value>)',
          400: 'rgb(var(--palette-brand) / <alpha-value>)',
          500: 'rgb(var(--palette-brand) / <alpha-value>)',
          600: 'rgb(var(--palette-brand) / <alpha-value>)',
          700: 'rgb(var(--palette-brand) / <alpha-value>)',
          800: 'rgb(var(--palette-brand) / <alpha-value>)',
          900: 'rgb(var(--palette-brand) / <alpha-value>)',
        },
        value: 'rgb(var(--palette-value) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
