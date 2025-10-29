/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Using CSS custom properties for better maintainability
        'primary-green': 'var(--color-primary-green)',
        'primary-green-hover': 'var(--color-primary-green-hover)',
        'primary-green-light': 'var(--color-primary-green-light)',
        'primary-green-dark': 'var(--color-primary-green-dark)',
        'secondary-yellow': 'var(--color-secondary-yellow)',
        'secondary-yellow-hover': 'var(--color-secondary-yellow-hover)',
        'secondary-yellow-border': 'var(--color-secondary-yellow-border)',
        'secondary-yellow-light': 'var(--color-secondary-yellow-light)',
        // Legacy colors for backward compatibility
        white: '#FFFFFF',
        black: '#000000',
        navbar: '#4BA742',
        'text-items': '#096800',
        yellow: '#FFC600',
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#4BA742',
          600: '#16a34a',
          700: '#096800',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FFC600',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['var(--font-gotham)'],
        'gotham': ['var(--font-gotham)'],
        'gotham-black': ['var(--font-gotham)'],
      },
      spacing: {
        'header': 'var(--header-height)',
      },
      borderRadius: {
        'custom': 'var(--border-radius)',
        'custom-lg': 'var(--border-radius-lg)',
      },
      boxShadow: {
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
        'custom-xl': 'var(--shadow-xl)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      maxWidth: {
        'container': 'var(--container-max-width)',
      }
    },
  },
  plugins: [],
}