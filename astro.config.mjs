// @ts-check
import { envField } from 'astro/config';
import { defineConfig } from 'astro/config';
/* [vite] (ssr) Error when evaluating SSR module /home/beige/dev/github.com/wagomu-no-sunaba/etude-astro-workers-env/astro.config.mjs: Cannot find module 'astro:env/server' imported from '/home/beige/dev/github.com/wagomu-no-sunaba/etude-astro-workers-env/astro.config.mjs' */
// import  { VITE_STATIC } from 'astro:env/server';

import cloudflare from '@astrojs/cloudflare';

const STATIC = String(import.meta.env.VITE_STATIC);

console.log(
  '\n========== astro.config.js ==========\n',
  `import.meta.env.VITE_STATIC : ${import.meta.env.VITE_STATIC}\n`,
  `process.env.VITE_STATIC     : ${process.env.VITE_STATIC}\n`,
  // `astro:env/server VITE_STATIC: ${VITE_STATIC}\n`,
  '======================================');

const STATIC_BUILD = STATIC === 'true';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      VITE_STATIC: envField.string({ context: 'server', access: 'public' }),
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
