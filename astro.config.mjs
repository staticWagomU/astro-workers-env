// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

const STATIC = process.env.STATIC || 'false';

const STATIC_BUILD = STATIC === 'true';

// https://astro.build/config
export default defineConfig({
  // env: {
  //   schema: {
  //     STATIC: envField.boolean({ context: 'client', access: 'public' }),
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
