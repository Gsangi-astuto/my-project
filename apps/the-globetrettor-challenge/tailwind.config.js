const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const tokens = require('../../libs/tokens.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        xs: ['0.625rem', { lineHeight: '1rem' }],
        sm: ['0.75rem', { lineHeight: '1.125rem' }],
        base: ['0.875rem', { lineHeight: '1.25rem' }],
        md: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      lineHeight: {
        tight: '140%',
        snug: '120%',
        none: '100%',
      },
      colors: {
        ...tokens.FIGMA_TOKENS.theme.colors.light,
        //add when dark mode is implemented
        // ...tokens.FIGMA_TOKENS.theme.colors.dark,
      },
      // boxShadow: {
      //   ...tokens.theme.styles.effect,
      // },
    },
  },
  plugins: [],
};
