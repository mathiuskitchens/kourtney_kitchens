// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kourtneykitchens.com',
  integrations: [tailwind(), icon(), sitemap()],
  adapter: netlify(),
  env: {
    schema: {
      MAILCHIMP_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      MAILCHIMP_SERVER_PREFIX: envField.string({
        context: 'server',
        access: 'secret',
      }),
      MAILCHIMP_LIST_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      PUBLIC_STRIPE_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});
