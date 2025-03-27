import { footerLinks } from '~/config/footer-links';
import { navbarLinks } from '~/config/navbar-links';
import { env } from '~/env';

/*
 * Define Environment
 */
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';

/*
 * Define Database URL
 */
export const DATABASE_URL = isProd
  ? env.DATABASE_URL_PRODUCTION
  : env.DATABASE_URL_DEVELOPMENT;

/*
 * Define Metadata Configuration
 */
export const BASE_URL = env.NEXT_PUBLIC_APP_URL;
export const APP_AUTHOR = env.NEXT_PUBLIC_APP_AUTHOR || 'App Author';
export const APP_DESCRIPTION =
  env.NEXT_PUBLIC_APP_DESCRIPTION || 'App Description';
export const APP_LOGO = env.NEXT_PUBLIC_APP_LOGO || '/logo.svg';
export const APP_NAME =
  process.env.NODE_ENV === 'development'
    ? `DEV - ${env.NEXT_PUBLIC_APP_NAME}`
    : env.NEXT_PUBLIC_APP_NAME;
export const OG_IMAGE_URL =
  env.NEXT_PUBLIC_OG_IMAGE_URL || 'https://example.com/og.png';

/*
 * Define Social Media Configuration
 */
export const GITHUB_REPO_URL =
  env.NEXT_PUBLIC_GITHUB_REPO_URL || 'https://github.com/jrmatherly';
export const GITHUB_HANDLE = env.NEXT_PUBLIC_GITHUB_HANDLE || 'jrmatherly';
export const LINKEDIN_HANDLE = env.NEXT_PUBLIC_LINKEDIN_HANDLE || 'jrmatherly';
export const TWITTER_HANDLE = env.NEXT_PUBLIC_TWITTER_HANDLE || '@jrmatherly';
export const TWITTER_ACCESS_TOKEN = env.TWITTER_ACCESS_TOKEN || 'optional';

/*
 * Define Logger Configuration
 * Show logger in local development or when explicitly enabled
 * Default log level is "info"
 */
export const loggerConfig = {
  enabled: isDev ? true : env.NEXT_PUBLIC_SHOW_LOGGER,
  level: env.NEXT_PUBLIC_LOG_LEVEL,
} as const;

export const showLogger = loggerConfig.enabled;

/*
 * Define Email Configuration
 */
export const emailConfig = {
  SMTP_EMAIL: env.NEXT_PUBLIC_EMAIL_USERNAME,
  CONTACT_EMAIL: env.NEXT_PUBLIC_APP_CONTACT_EMAIL,
  SUPPORT_EMAIL: env.NEXT_PUBLIC_APP_SUPPORT_EMAIL,
};

/*
 * Define SocialLinks
 */
export const socialLinks = {
  x: `https://x.com/${TWITTER_HANDLE}`,
  github: GITHUB_REPO_URL,
  githubAccount: `https://github.com/${GITHUB_HANDLE}`,
  linkedin: `https://linkedin.com/${LINKEDIN_HANDLE}`,
  /* discord: "https://discord.gg/xxxx", */
  /* calDotCom: "https://cal.com/xxxx", */
};

/*
 * Define SiteConfig
 */
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: BASE_URL,
  ogImage: OG_IMAGE_URL,
  socialLinks,
  mainNav: navbarLinks,
  footerNav: footerLinks,
};

/*
 * Define default viewport settings
 */
export type Viewport = typeof defaultViewport;

export const defaultViewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};
