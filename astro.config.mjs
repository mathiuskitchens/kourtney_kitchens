// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
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
    },
  },
});
