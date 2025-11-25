import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
} from "next/font/google"
import { cn } from "@/lib/utils"

// Font Configuration
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable
)

// Site Configuration
export const siteConfig = {
  name: "design system",
  url: "https://www.designsystem.com",
  ogImage: "https://www.designsystem.com/og.jpg",
  description:
    "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own..",
  links: {
    twitter: "https://twitter.com/designsystem",
    github: "https://github.com/designsystem/designsystem",
  },
  navItems: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/design-system",
      label: "Design System",
    },
  ],
}

// Meta Theme Colors
export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

