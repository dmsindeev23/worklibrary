/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom design system colors
        paper: '#F7F3EE',
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#FBF8F4',
        },
        graphite: {
          DEFAULT: '#1F2328',
          secondary: '#5B616A',
        },
        forest: {
          DEFAULT: '#0E3B2E',
          hover: '#0B2E24',
          soft: '#E7F0EC',
        },
        lines: '#E6DED5',
        cover: {
          1: '#1F3A5F',
          2: '#0E3B2E',
          3: '#5A2E2A',
          4: '#3B3F46',
          5: '#7A5C3A',
          6: '#2E4A44',
          7: '#6E6A5E',
          8: '#4B3C63',
        },
        warning: '#B54B3A',
        success: '#1F6E4A',
      },
      fontFamily: {
        'heading': ['"Fraunces"', 'Georgia', 'serif'],
        'body': ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'h1': ['56px', { lineHeight: '110%', fontWeight: '600' }],
        'h2': ['40px', { lineHeight: '115%', fontWeight: '600' }],
        'h3': ['28px', { lineHeight: '120%', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '130%', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '160%', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '165%', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '150%', fontWeight: '400' }],
        'micro': ['12px', { lineHeight: '140%', fontWeight: '500' }],
        // Mobile sizes
        'h1-mobile': ['36px', { lineHeight: '110%', fontWeight: '600' }],
        'h2-mobile': ['28px', { lineHeight: '115%', fontWeight: '600' }],
        'h3-mobile': ['22px', { lineHeight: '120%', fontWeight: '600' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 8px 24px rgba(31, 35, 40, 0.08)',
        'card-hover': '0 12px 32px rgba(31, 35, 40, 0.12)',
        'header': '0 2px 8px rgba(31, 35, 40, 0.06)',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
