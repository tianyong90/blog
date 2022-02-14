module.exports = {
  content: [
    './app.html',
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '1400px',
            color: '#2b2b2b',
            strong: {
              fontWeight: '800',
            },
            p: {
              marginTop: 0,
              marginBottom: '1.25rem',
              textAlign: 'justify',
              hyphens: 'auto',
            },
            h1: {
              fontSize: '24px',
              fontWeight: '600',
            },
            h2: {
              fontSize: '22px',
              margin: '1rem 0',
            },
            h3: {
              fontSize: '20px',
              margin: '0.5rem 0',
            },
            h4: {
              fontSize: '18px',
            },
            a: {
            },
            figure: {
              margin: '1rem 0',
            },
            img: {
              margin: '1.25rem auto',
            },
            figcaption: {
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#1c1c1c',
            },
            // ...
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
