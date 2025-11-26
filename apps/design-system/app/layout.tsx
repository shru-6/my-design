import type { Metadata } from "next"

import { META_THEME_COLORS, siteConfig, fontVariables } from "@/config"
import { cn } from "@/lib/utils"
import { Toaster } from "@/src/design-system/components/molecules"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "design system"],
  authors: [
    {
      name: "design system",
      url: "https://www.designsystem.com",
    },
  ],
  creator: "design system",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [], // OG images removed - not needed for design system
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [], // OG images removed - not needed for design system
    creator: "@designsystem",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
        suppressHydrationWarning
      >
          {children}
          <Toaster position="top-center" />
      </body>
    </html>
  )
}
