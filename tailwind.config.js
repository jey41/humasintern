import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                'primary': '#abc7ff',
                'primary-container': '#062d5f',
                'on-primary': '#0a2f61',
                'on-primary-container': '#7996ce',
                'secondary': '#fbbc2a',
                'secondary-container': '#dca100',
                'on-secondary': '#412d00',
                'on-secondary-container': '#543b00',
                'tertiary': '#b3c7ee',
                'tertiary-container': '#1a2e4d',
                'on-tertiary': '#1d314f',
                'on-tertiary-container': '#8396ba',
                'background': '#101415',
                'surface': '#101415',
                'surface-dim': '#101415',
                'surface-bright': '#363a3b',
                'surface-container-lowest': '#0b0f10',
                'surface-container-low': '#191c1e',
                'surface-container': '#1d2022',
                'surface-container-high': '#272a2c',
                'surface-container-highest': '#323537',
                'on-background': '#e0e3e5',
                'on-surface': '#e0e3e5',
                'on-surface-variant': '#c4c6d1',
                'outline': '#8e909a',
                'outline-variant': '#43474f',
                'neo-navy': '#031A38',
                'neo-amber': '#DCA100',
                'neo-border': '#2A4A6B',
                'accent-lime': '#BFFF00',
            },
            boxShadow: {
                'cinematic-sm': '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                'cinematic-md': '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                'cinematic-lg': '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
                'cinematic-glow': '0 0 40px 0 rgba(251, 188, 42, 0.15)',
            },
            borderRadius: {
                'DEFAULT': '16px',
                'md': '16px',
                'lg': '24px',
                'xl': '32px',
                'full': '9999px',
            },
            spacing: {
                'xs': '8px',
                'sm': '16px',
                'md': '24px',
                'lg': '48px',
                'xl': '80px',
                'cinematic-padding': '160px',
                'cinematic-spacing': '200px',
                'gutter': '24px',
                'margin-mobile': '24px',
                'margin-desktop': '64px',
            }
        },
    },

    plugins: [forms],
};
