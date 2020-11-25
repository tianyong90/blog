module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    // 仅在生产构建时使用 purgecss
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './app.html',
      './components/**/*.vue',
      './pages/**/*.vue',
    ],

    safelist: {
      standard: [
        /^token/,
        /^pre/,
        /^code/,
        /^line-numbers-wrapper/,
        /^line-number/,
        /^grayscale/,
      ],
      deep: [],
      greedy: [],
    },
  },

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            strong: {
              fontWeight: '800',
            },
            // ...
          },
        },
      },
    },

    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
