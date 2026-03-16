/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional color palette
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#0B1220', // Deep Slate Navy - Primary Background
        },
        accent: {
          50: '#e6f0ff',
          100: '#b3d4ff',
          200: '#80b8ff',
          300: '#4d9cff',
          400: '#1a80ff',
          500: '#0066e6',
          600: '#0052b3',
          700: '#003d80',
          800: '#00294d',
          900: '#00141a',
        },
        surface: {
          primary: '#0B1220',    // Deep Slate Navy - Primary Background
          secondary: '#0F172A',  // Midnight Blue - Secondary Background
          elevated: '#111827',   // Soft Graphite - Elevated Surface
          card: '#1F2937',       // Muted Navy - Card Surface
          border: '#1E293B',     // Soft Slate Border
        },
        // Light theme colors
        light: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
          600: '#64748b',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Semantic colors
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        // Focus and interactive
        focus: '#a78bfa',
        // Scrollbar colors
        scrollbar: {
          track: '#0f172a',
          thumb: '#334155',
          thumbHover: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%) !important',
        'gradient-subtle': 'linear-gradient(180deg, #0B1220 0%, #0F172A 100%)',
      },
      // Add missing custom utilities
      backgroundColor: {
        'dark-900': '#0B1220',
        'dark-400': '#94a3b8',
        'dark-300': '#cbd5e1',
        'dark-200': '#e2e8f0',
        'dark-100': '#f1f5f9',
      },
      textColor: {
        'dark-900': '#0B1220',
        'dark-400': '#94a3b8',
      },
      borderColor: {
        'surface-border': '#1E293B',
      },
    },
  },
  plugins: [],
}
