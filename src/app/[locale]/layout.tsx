import type { Metadata, Viewport } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { Locale } from "~/i18n/locales";

import { app, META_THEME_COLORS } from "~/app";
import AppFooter from "~/components/app-footer";
import AppHeader from "~/components/app-header";
import { ThemeProvider } from "~/components/providers";
import { TailwindIndicator } from "~/components/tailwind";
import { Toaster as SonnerToaster } from "~/components/ui/sonner";
import { Toaster as ShadcnToaster } from "~/components/ui/toaster";
import { routing } from "~/i18n/routing";
import { getCachedUser } from "~/lib/queries/user";
import "~/styles/globals.css";
import { cn } from "~/utils";

// import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

const fontSans = GeistSans;
const fontMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: app.name,
    template: `%s - ${app.name}`,
  },
  metadataBase: new URL(app.url),
  description: app.description,
  keywords: [
    "Reliverse",
    "Bleverse",
    "Relivator",
    "Versator",
    "Template",
    "Starter",
    "Next.js",
    "React",
    "Tailwind",
    "Shadcn",
  ],
  authors: [
    {
      name: "Bleverse",
      url: "https://agency.bleverse.com",
    },
    {
      name: "Reliverse",
      url: "https://reliverse.org",
    },
  ],
  creator: "Bleverse",
  openGraph: {
    type: "website",
    locale: "en",
    url: app.url,
    title: app.name,
    description: app.description,
    siteName: app.name,
    images: [
      {
        url: app.ogImage,
        width: 1200,
        height: 630,
        alt: app.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: app.name,
    description: app.description,
    images: [app.ogImage],
    creator: "@reliverse_org",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${app.url}/site.webmanifest`,
};

export const viewport: Viewport = {
  //   themeColor: META_THEME_COLORS.light,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// modal: React.ReactNode;
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// modal,
export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const user = await getCachedUser();

  // Await the params object
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Fetch and provide all messages to the client
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={cn(
            "bg-background text-foreground font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <NuqsAdapter>
              <div className="flex flex-col min-h-screen">
                <NextIntlClientProvider messages={messages}>
                  <AppHeader user={user} />
                  <main className="flex flex-1 flex-col gap-4 px-2 items-center mt-2">
                    {children}
                    {/* {modal} */}
                  </main>
                  <AppFooter />
                  <TailwindIndicator />
                  <ShadcnToaster />
                  <SonnerToaster />
                </NextIntlClientProvider>
              </div>
            </NuqsAdapter>
          </ThemeProvider>
          {/* <VercelAnalytics /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
