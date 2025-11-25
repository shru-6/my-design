import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/src/design-system/components/atoms/Button"

// RootComponents removed - demo components deleted

const title = "The Foundation for your Design System"
const description =
  "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
          <Button asChild size="sm">
            <Link href="/docs/installation">Get Started</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/docs/components">View Components</Link>
          </Button>
      <div className="container-wrapper section-soft flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]">
            {/* Dashboard images removed - registry files deleted */}
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <p>Design System Showcase</p>
            </div>
          </section>
          <section className="theme-container hidden md:block">
            {/* RootComponents removed - demo components deleted */}
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <p>Component demos removed - see <a href="/design-system">design-system</a> for component showcase</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
