// @ts-check
// import { envField } from 'astro/config';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

const STATIC = import.meta.env.VITE_STATIC || 'false';

console.log(
  '\n========== astro.config.js ==========\n',
  `import.meta.env.VITE_STATIC: ${import.meta.env.VITE_STATIC}\n`,
  `process.env.VITE_STATIC    : ${process.env.VITE_STATIC}`,
  '\n====================================');

const STATIC_BUILD = STATIC === 'true';

// https://astro.build/config
export default defineConfig({
  // env: {
  //   schema: {
  //     VITE_STATIC: envField.boolean({ context: 'client', access: 'public' }),
  //   },
  // },
  output: STATIC_BUILD ? 'static' : 'server',
  adapter: STATIC_BUILD ? undefined : cloudflare({
    platformProxy: {
      enabled: true,
      configPath: './wrangler.jsonc',
    },
  }),
});
