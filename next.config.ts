import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from '~/env';

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  reactStrictMode: true,
  output: 'standalone',
  staticPageGenerationTimeout: 300,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '*.spoonsofsalt.org' },
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'imagedelivery.net' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'avatar.vercel.sh' },
      { protocol: 'https', hostname: 'startup-template-sage.vercel.app' },
      { protocol: 'https', hostname: 'qpdwualqgmqaxfgoapyc.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'html.tailus.io' },
    ],
    // Optimize image quality and formats
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configure the Next.js server to trust the Traefik proxy
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Access-Control-Expose-Headers', value: 'X-Retry-Attempt' },
      ],
    },
    // Cache configurations for static assets
    {
      source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/(.*).(js|css)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
  transpilePackages: ['react-tweet'],
  // Optimize production builds
  compiler: {
    removeConsole: env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/github',
        destination: env.NEXT_PUBLIC_GITHUB_REPO_URL || '',
        permanent: false,
      },
    ];
  },
  // Improve webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Only run bundle analyzer in production build
    if (!dev && !isServer && env.ANALYZE === 'true') {
      // Add bundle analyzer in production when ANALYZE env var is set
      const { withBundleAnalyzer } = require('@next/bundle-analyzer');
      config.plugins.push(
        new withBundleAnalyzer({
          analyzerMode: 'static',
          reportFilename: './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }
    // Optimize webpack for better performance
    if (!config.infrastructureLogging) {
      config.infrastructureLogging = {};
    }
    config.infrastructureLogging.level = 'warn';

    // Reduce the number of logs in the console
    if (!config.stats) {
      config.stats = {};
    }
    config.stats.loggingDebug = false;
    config.stats.cached = false;

    return config;
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: [
      'framer-motion',
      '@heroui/react',
      'tailwind-merge',
      'zod',
    ],
    // Improve page loading performance
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

// Configure the Next.js server to trust the Traefik proxy
const serverConfig = {
  poweredByHeader: false,
};

// Merge config with server settings
const mergedConfig = {
  ...nextConfig,
  ...serverConfig,
};

// Sentry configuration
export default withSentryConfig(mergedConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'spoons-of-salt',
  project: 'spoonsofsalt-website',

  // Only print logs for uploading source maps in CI
  silent: !env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

/* import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // done manually using bun check
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withNextIntl(nextConfig); */
