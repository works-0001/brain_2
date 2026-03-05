// @ts-check

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './frontend/src/app/globals.css',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
};

export default config;
