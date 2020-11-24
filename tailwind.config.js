module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    // ������������ʱʹ�� purgecss
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './app.html',
      './components/**/*.vue',
      './pages/**/*.vue',
    ],

    safelist: {
      standard: [/^el-/],
      deep: [],
      greedy: [],
    },
  },

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#ab633f',
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
