/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Homemade Apple"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFCF7',
          100: '#FAF7EE',
          200: '#F4EEDC',
          300: '#EDE4C9',
          400: '#DFD1AA',
        },
        rosepastel: {
          50: '#FFF5F6',
          100: '#FFE8EB',
          200: '#FFD1D7',
          300: '#FFA8B5',
          400: '#FF7088',
          500: '#F43F64',
        },
        peach: {
          50: '#FFF8F2',
          100: '#FFEDE0',
          200: '#FED8BF',
          300: '#FDBE96',
        },
        lavender: {
          50: '#FAF7FD',
          100: '#F2EDFB',
          200: '#E4D6F6',
          300: '#CCAFF0',
        },
        craft: {
          paper: '#EFE7DA',
          card: '#FBF8F2',
          line: '#E3D8C6',
          ink: '#3D352E',
          muted: '#7A6F64',
        }
      },
      boxShadow: {
        'scrapbook': '0 10px 25px -5px rgba(115, 85, 75, 0.12), 0 8px 10px -6px rgba(115, 85, 75, 0.08)',
        'polaroid': '0 15px 35px -5px rgba(90, 70, 60, 0.18), 0 5px 15px rgba(0,0,0,0.06)',
        'envelope': '0 20px 40px -10px rgba(180, 110, 120, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
