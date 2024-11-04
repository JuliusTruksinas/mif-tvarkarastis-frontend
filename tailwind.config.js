/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        bugBustersTheme: {
          primary: '#273469',
          primaryDark: '#1E2749',
          creamy: '#FAFAFF',
          grey: '#30343F',
          pink: '#E4D9FF',
          lightGrey: 'BFB6D4',
          secondary: '#3b82f6',
          accent: '#00ffff',
          neutral: '#4b5563',
          'base-100': '#ffffff',
          info: '#38bdf8',
          success: '#4ade80',
          warning: '#fbbf24',
          error: '#f43f5e',
        },
      },
      'light',
    ],
    logs: false,
  },
};
