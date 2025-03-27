import { productConfig } from '~/config/product';
import { slugify } from '~/server/utils';
import type { MainNavItem } from '~/types';

export const navbarLinks: MainNavItem[] = [
  {
    title: 'Lobby',
    href: '#',
    items: [
      {
        title: 'Products',
        href: '/products',
        description: 'All the products we have to offer.',
        icon: 'menu',
        items: [],
      },
      {
        title: 'Stores',
        href: '/stores',
        description: 'Discover our stores and their products',
        items: [],
      },
      {
        title: 'Build a Board',
        href: '/build-a-board',
        description: 'Build your own custom skateboard.',
        items: [],
      },
      {
        title: 'Blog',
        href: '/blog',
        description: 'Read our latest blog posts.',
        items: [],
      },
    ],
  },
  ...productConfig.categories.map(category => ({
    title: category.name,
    items: [
      {
        title: 'All',
        href: `/categories/${slugify(category.name)}`,
        description: `All ${category.name}.`,
        items: [],
      },
      ...category.subcategories.map(subcategory => ({
        title: subcategory.name,
        href: `/categories/${slugify(category.name)}/${slugify(subcategory.name)}`,
        description: subcategory.description,
        items: [],
      })),
    ],
  })),
] satisfies MainNavItem[];
