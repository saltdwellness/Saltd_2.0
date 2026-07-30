import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'saltd-lime':        '#A8E63D',
        'saltd-purple':      '#6C2BD9',
        'saltd-orange':      '#F97316',
        'saltd-black':       '#0D0D0D',
        'saltd-cream':       '#F5F2EB',
        'saltd-pale-lime':   '#E8F5DC',
        'saltd-pale-purple': '#EDE8FD',
        'saltd-pale-orange': '#FEF0E6',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(64px, 10vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'section': ['clamp(40px, 6vw, 72px)',   { lineHeight: '1.0' }],
        'card':    ['clamp(24px, 3vw, 32px)',   { lineHeight: '1.1' }],
      },
      animation: {
        marquee:         'marquee 25s linear infinite',
        float:           'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'blob-drift':    'blob-drift 8s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-8deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(-8deg)' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(20px, -15px) scale(1.05)' },
          '66%':      { transform: 'translate(-10px, 10px) scale(0.97)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
