import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                primary: {
                    DEFAULT: '#14213D',
                    50: '#E8EBF0',
                    100: '#D1D7E1',
                    200: '#A3AFC3',
                    300: '#7587A5',
                    400: '#475F87',
                    500: '#14213D',
                    600: '#101A31',
                    700: '#0C1425',
                    800: '#080D18',
                    900: '#04070C',
                },
                accent: {
                    DEFAULT: '#FCA311',
                    50: '#FEF3DC',
                    100: '#FDE7B9',
                    200: '#FCCF73',
                    300: '#FBB72D',
                    400: '#FCA311',
                    500: '#D68A0E',
                    600: '#B0710B',
                    700: '#8A5809',
                    800: '#643F06',
                    900: '#3E2704',
                },
                surface: {
                    DEFAULT: '#E5E5E5',
                    50: '#FFFFFF',
                    100: '#FAFAFA',
                    200: '#F2F2F2',
                    300: '#E5E5E5',
                    400: '#D4D4D4',
                    500: '#A3A3A3',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                display: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '4.5xl': ['2.5rem', { lineHeight: '1.15' }],
                '5.5xl': ['3.25rem', { lineHeight: '1.1' }],
            },
            borderRadius: {
                DEFAULT: '8px',
                soft: '6px',
                medium: '10px',
            },
            boxShadow: {
                'subtle': '0 2px 4px rgba(0, 0, 0, 0.04)',
                'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
                'elevated': '0 8px 16px rgba(0, 0, 0, 0.08)',
                'float': '0 12px 24px rgba(0, 0, 0, 0.12)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
