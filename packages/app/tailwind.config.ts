import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

/**
 * Tailwind CSS Configuration
 * 
 * Configures Tailwind CSS v4 with DaisyUI plugin and custom theme extensions.
 * 
 * @see https://tailwindcss.com/docs/configuration
 * @see https://daisyui.com/docs/config/
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      /**
       * Font families
       */
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },

      /**
       * Custom color palette
       * Matches CSS custom properties in globals.css
       */
      colors: {
        brand: {
          primary: 'rgb(99 102 241)', // indigo-500
          secondary: 'rgb(139 92 246)', // violet-500
          accent: 'rgb(56 189 248)', // cyan-400
        },
        bg: {
          DEFAULT: 'rgb(15 23 42)', // slate-900
          panel: 'rgb(30 41 59)', // slate-800
          card: 'rgb(15 23 42)', // slate-900
        },
      },

      /**
       * Custom background gradients
       */
      backgroundImage: {
        'app': 'radial-gradient(1200px 600px at 50% -20%, rgba(99, 102, 241, 0.08), transparent 60%), radial-gradient(800px 400px at 80% 120%, rgba(139, 92, 246, 0.06), transparent 60%), linear-gradient(to bottom, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 1))',
        'grid': 'linear-gradient(rgba(51, 65, 85, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 65, 85, 0.2) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      /**
       * Custom background sizes
       */
      backgroundSize: {
        'grid': '24px 24px',
      },

      /**
       * Custom animations
       */
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      /**
       * Keyframe definitions
       */
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      /**
       * Custom box shadows for glassmorphism effect
       */
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.5)',
      },

      /**
       * Custom backdrop blur values
       */
      backdropBlur: {
        'xs': '2px',
      },
    },
  },

  /**
   * Plugins
   */
  plugins: [
    // DaisyUI plugin for UI components
    daisyui,
  ],

  /**
   * Safelist classes that might be generated dynamically
   * Prevents Tailwind from purging them in production
   */
  safelist: [
    // Loading spinner sizes
    'loading-xs',
    'loading-sm',
    'loading-md',
    'loading-lg',
    'loading-xl',

    // Alert variants (if using dynamic class generation)
    'bg-indigo-900/20',
    'bg-emerald-900/20',
    'bg-rose-900/20',
    'bg-amber-900/20',
    'border-indigo-800/50',
    'border-emerald-800/50',
    'border-rose-800/50',
    'border-amber-800/50',
  ],
} as Config & {
  /**
   * DaisyUI Configuration
   * @see https://daisyui.com/docs/config/
   */
  daisyui?: {
    themes?: unknown[]
    logs?: boolean
    darkTheme?: string
    base?: boolean
    styled?: boolean
    utils?: boolean
    rtl?: boolean
    themeRoot?: string
  }
}

  // Add DaisyUI configuration
  ; (config as Config & { daisyui?: unknown }).daisyui = {
    themes: [
      'business', // Use default business theme
    ],

    // Disable DaisyUI logs in production
    logs: process.env.NODE_ENV === 'development',

    // Enable dark mode
    darkTheme: 'business',

    // Base theme (used when no theme is specified)
    base: true,

    // Styled components
    styled: true,

    // Include utility classes
    utils: true,

    // RTL support
    rtl: false,

    // Add responsive variant for theme
    themeRoot: ':root',
  }

export default config
