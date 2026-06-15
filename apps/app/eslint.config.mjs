import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig } from 'eslint/config';

import baseConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...baseConfig,
  expoConfig,
  {
    ignores: ['dist/**', 'plugins/**'],
  },
]);
