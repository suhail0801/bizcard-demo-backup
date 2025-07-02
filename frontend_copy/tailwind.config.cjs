const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx,js,jsx}", "components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      colors: {
        // Onfra branding
        onfra: {
          green: '#20C997', // primary
          greenDark: '#169c74',
          grayBg: '#F8F9FA', // light background
          grayBorder: '#E9ECEF',
          dark: '#212529',
        },
        visit_desk_green: 'rgb(40, 213, 122)',
        visit_desk_green_variant: 'rgb(16,220,210)',
        visit_desk_white: 'rgb(255,255,255)',
        gray1:'#6C6C6E',
        gray2:'#434041',
        gray3:'#58585A',
        gray4:'#5E6061',
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },
      fontFamily: {
        // Onfra uses Inter and modern sans fonts
        sans: ['Inter', 'ui-sans-serif', 'system-ui', ...fontFamily.sans],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto_light: ['Roboto', 'sans-serif'],
        roboto_medium: ['Roboto', 'sans-serif'],
        cursive: ['Cedarville Cursive', 'cursive'],
        merriweather: ['Merriweather', 'serif'],
      },
      borderRadius: {
        lg: '1rem', // more rounded for modern look
        md: '0.5rem',
        sm: '0.25rem',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
