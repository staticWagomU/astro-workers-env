// @ts-check
import { defineConfig, envField } from 'astro/config';
import { loadEnv } from 'vite';

import cloudflare from '@astrojs/cloudflare';

const { STATIC } = loadEnv('', process.cwd(), '');
console.log('========== astro.config.mjs ==========');
console.log(`STATIC: '${STATIC}'`);
console.log(`process.env.STATIC: ${process.env.STATIC}`);
console.log(`NO_INDEX: ${import.meta.env.NO_INDEX}`);
console.log('======================================')

const STATIC_BUILD = STATIC === 'true';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      STATIC: envField.boolean({ context: 'client', access: 'public' }),
    },
  },
  output: STATIC_BUILD ? 'static' : 'server',
  adapter: STATIC_BUILD ? undefined : cloudflare({
    platformProxy: {
      enabled: true,
      configPath: './wrangler.jsonc',
    },
  }),
});
