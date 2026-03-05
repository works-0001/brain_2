/** @type {import('lint-staged').Config} */
const config = {
  '*.{ts,tsx,js,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,yaml,yml}': ['prettier --write'],
};

export default config;
