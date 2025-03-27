import { siteConfig } from '~/config/site';
import { socialLinks } from '~/config/site';

export const app = {
  shortName: siteConfig.name,
  name: siteConfig.name,
  url: siteConfig.url,
  ogImage: siteConfig.ogImage,
  description: siteConfig.description,
  links: {
    twitter: socialLinks.x,
    github: socialLinks.github,
    linkedin: socialLinks.linkedin,
  },
};

export type AppConfig = typeof app;

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};
