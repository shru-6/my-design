"use client"

import Link from "next/link"
import { Button } from "@/src/design-system/components/atoms/Button"
import { Card } from "@/src/design-system/components/layout/Card"
import { Container } from "@/src/design-system/components/layout/Container"

export function HomePage() {
  return (
    <Container className="flex flex-1 flex-col py-12">
      <div className="flex flex-col items-center gap-6 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          The Foundation for your Design System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A set of beautifully designed components that you can customize, extend, and build on. 
          Start here then make it your own. Open Source. Open Code.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/design-system">Explore Components</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/design-system">View Design System</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">72+ Components</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive component library organized by atomic design principles
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Fully Customizable</h3>
          <p className="text-sm text-muted-foreground">
            All components are in your codebase - modify and extend as needed
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Token-based Theming</h3>
          <p className="text-sm text-muted-foreground">
            Flexible theming system with support for multiple theme categories
          </p>
        </Card>
      </div>
    </Container>
  )
}

