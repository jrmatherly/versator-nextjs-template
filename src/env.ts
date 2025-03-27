// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    /** Database URLs */
    DATABASE_URL_DEVELOPMENT: z
      .string()
      .url()
      .refine(
        url =>
          url.startsWith('postgres://') ||
          url.startsWith('postgresql://') ||
          url.startsWith('mysql://') ||
          url.startsWith('sqlite://'),
        {
          message:
            'DATABASE_URL_DEVELOPMENT must be a valid database connection string',
        }
      ),
    DATABASE_URL_PRODUCTION: z
      .string()
      .url()
      .refine(
        url =>
          url.startsWith('postgres://') ||
          url.startsWith('postgresql://') ||
          url.startsWith('mysql://') ||
          url.startsWith('sqlite://'),
        {
          message:
            'DATABASE_URL_PRODUCTION must be a valid database connection string',
        }
      ),

    /** Redis Configuration */
    REDIS_HOST: z.string().default('localhost').optional(),
    REDIS_PORT: z.coerce.number().default(6379).optional(),
    REDIS_USER: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_NAMESPACE: z.string().default('cache').optional(),

    /** Authentication Credentials */
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_ENCRYPTION_KEY: z.string().min(1),

    /** Payment Credentials */
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_PRO_MONTHLY_PRICE_ID: z.string().min(1),

    /** Social Media Configuration */
    TWITTER_ACCESS_TOKEN: z.string().optional(),

    /** Uploadthing Credentials */
    UPLOADTHING_TOKEN: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),

    /** Email Configuration */
    RESEND_API_KEY: z.string().min(1),
    EMAIL_APP_PASSWORD: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),

    /** Application Monitoring */
    NEXT_RUNTIME: z.string().default('nodejs'),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_DSN: z.string().optional(),
    ANALYZE: z.string().optional(),
    CI: z.string().optional(),

    /** Open Graph Configuration */
    OG_IMAGE_SECRET: z.string(),

    /** Node.js Configuration */
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    PORT: z.coerce.number().default(3000),
    IGNORE_SSL_VERIFICATION: z
      .string()
      .transform(val => val.toLowerCase() === 'false')
      .default('false')
      .optional(),
    NODE_TLS_REJECT_UNAUTHORIZED: z.string().default('1').optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    /** Contact Information */
    NEXT_PUBLIC_APP_CONTACT_EMAIL: z
      .string()
      .email()
      .default('email@example.com'),
    NEXT_PUBLIC_APP_SUPPORT_EMAIL: z
      .string()
      .email()
      .default('email@example.com'),

    /** Email Configuration */
    NEXT_PUBLIC_EMAIL_USERNAME: z.string().email().default('email@example.com'),

    /** Authentication Configuration */
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/auth/sign-in'),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/auth/sign-up'),
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z
      .string()
      .default('/')
      .optional(),
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z
      .string()
      .default('/')
      .optional(),
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z
      .string()
      .default('/')
      .optional(),
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z
      .string()
      .default('/')
      .optional(),

    /** Payment Provider Configuration */
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),

    /** Logging Configuration */
    NEXT_PUBLIC_LOG_LEVEL: z
      .enum(['debug', 'info', 'warn', 'error'])
      .default('info'),
    NEXT_PUBLIC_SHOW_LOGGER: z
      .string()
      .transform(val => val.toLowerCase() === 'true')
      .default('false'),

    /** Analytics Configuration */
    NEXT_PUBLIC_POSTHOG_API_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),

    /** Metadata Configuration */
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APP_AUTHOR: z.string().default('App Author'),
    NEXT_PUBLIC_APP_DESCRIPTION: z.string().default('App Description'),
    NEXT_PUBLIC_APP_LOGO: z.string().default('/logo.svg'),
    NEXT_PUBLIC_APP_NAME: z.string().default('App Name'),
    NEXT_PUBLIC_OG_IMAGE_URL: z
      .string()
      .url()
      .default('https://example.com/og.png'),

    /** Social Media Configuration */
    NEXT_PUBLIC_GITHUB_REPO_URL: z
      .string()
      .url()
      .default('https://github.com/jrmatherly'),
    NEXT_PUBLIC_TWITTER_HANDLE: z.string().default('@twitteruser'),
    NEXT_PUBLIC_GITHUB_HANDLE: z.string().default('githubuser'),
    NEXT_PUBLIC_LINKEDIN_HANDLE: z.string().default('linkedinuser'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    /** Server Side Configuration */

    /** Database URLs */
    DATABASE_URL_DEVELOPMENT: process.env.DATABASE_URL_DEVELOPMENT,
    DATABASE_URL_PRODUCTION: process.env.DATABASE_URL_PRODUCTION,

    /** Redis Configuration */
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USER: process.env.REDIS_USER,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_NAMESPACE: process.env.REDIS_NAMESPACE,

    /** Authentication credentials */
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_ENCRYPTION_KEY: process.env.CLERK_ENCRYPTION_KEY,

    /** Payment Credentials */
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,

    /** Social Media Configuration */
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,

    /** Uploadthing Credentials */
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,

    /** Email Configuration */
    NEXT_PUBLIC_EMAIL_USERNAME: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    /** Application Monitoring */
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_DSN: process.env.SENTRY_DSN,
    ANALYZE: process.env.ANALYZE,
    CI: process.env.CI,

    /** Open Graph Image Configuration */
    OG_IMAGE_SECRET: process.env.OG_IMAGE_SECRET,

    /** Node.js Configuration */
    NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    IGNORE_SSL_VERIFICATION: process.env.IGNORE_SSL_VERIFICATION,

    /** Client Side Configuration */

    /** Contact Information */
    NEXT_PUBLIC_APP_CONTACT_EMAIL: process.env.NEXT_PUBLIC_APP_CONTACT_EMAIL,
    NEXT_PUBLIC_APP_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_APP_SUPPORT_EMAIL,

    /** Authentication Credentials */
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,

    /** Payment Provider Configuration */
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    /** Logging Configuration */
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    NEXT_PUBLIC_SHOW_LOGGER: process.env.NEXT_PUBLIC_SHOW_LOGGER,

    /** Analytics Configuration */
    NEXT_PUBLIC_POSTHOG_API_KEY: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    /** Metadata Configuration */
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NEXT_PUBLIC_APP_AUTHOR: process.env.NEXT_PUBLIC_APP_AUTHOR,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_LOGO: process.env.NEXT_PUBLIC_APP_LOGO,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_OG_IMAGE_URL: process.env.NEXT_PUBLIC_OG_IMAGE_URL,

    /** Social Media Configuration */
    NEXT_PUBLIC_GITHUB_REPO_URL: process.env.NEXT_PUBLIC_GITHUB_REPO_URL,
    NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    NEXT_PUBLIC_GITHUB_HANDLE: process.env.NEXT_PUBLIC_GITHUB_HANDLE,
    NEXT_PUBLIC_LINKEDIN_HANDLE: process.env.NEXT_PUBLIC_LINKEDIN_HANDLE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
