import type { FooterItem } from '~/types';
import { socialLinks } from './site';

export const footerLinks: FooterItem[] = [
  {
    title: 'Help',
    items: [
      {
        title: 'About',
        href: '/about',
        external: false,
      },
      {
        title: 'Contact',
        href: '/contact',
        external: false,
      },
      {
        title: 'Terms',
        href: '/terms',
        external: false,
      },
      {
        title: 'Privacy',
        href: '/privacy',
        external: false,
      },
    ],
  },
  {
    title: 'Social',
    items: [
      {
        title: 'X',
        href: socialLinks.x,
        external: true,
      },
      {
        title: 'GitHub',
        href: socialLinks.githubAccount,
        external: true,
      },
      /* {
        title: "Discord",
        href: links.discord,
        external: true,
      },
      {
        title: "cal.com",
        href: links.calDotCom,
        external: true,
      }, */
    ],
  },
] satisfies FooterItem[];
