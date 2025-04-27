import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createHash } from 'crypto';

import { MAILCHIMP_API_KEY } from 'astro:env/server';
import { MAILCHIMP_LIST_ID } from 'astro:env/server';
import { MAILCHIMP_SERVER_PREFIX } from 'astro:env/server';

export const server = {
  addEmailSubscriber: defineAction({
    accept: 'form',
    input: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    }),
    handler: async ({ firstName, lastName, email }) => {
      if (
        !MAILCHIMP_API_KEY ||
        !MAILCHIMP_LIST_ID ||
        !MAILCHIMP_SERVER_PREFIX
      ) {
        console.error('Mailchimp credentials not set up correctly');
        return {
          message: 'Failed to subscribe. Please contact website administrator',
          status: 500,
        };
      }

      const subscriberHash = createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');
      const apiUrl = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${subscriberHash}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
          },
          body: JSON.stringify({
            email_address: email,
            status_if_new: 'subscribed',
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          }),
        });

        const data = await response.json();

        if (response.ok || response.status === 400) {
          // 400 can indicate the user is already subscribed
          if (
            data.status === 'subscribed' ||
            (response.status === 400 && data.title?.includes('Member Exists'))
          ) {
            return {
              message: 'You have been successfully subscribed!',
              status: 200,
            };
          } else if (data.status === 'pending') {
            return {
              message: 'Please check your email to confirm your subscription.',
              status: 200,
            };
          } else {
            console.error('Mailchimp API Error:', data);
            return {
              message: 'Failed to subscribe. Please try again later.',
              status: response.status,
            };
          }
        } else {
          console.error('Mailchimp API Error:', data);
          return {
            message: 'Failed to subscribe. Please try again later.',
            status: response.status,
          };
        }
      } catch (error) {
        console.error('Error sending request to Mailchimp:', error);
        return {
          message: 'Failed to subscribe. Please try again later.',
          status: 500,
        };
      }
    },
  }),
};
