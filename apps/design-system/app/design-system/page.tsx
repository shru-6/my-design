import { DesignSystemPage } from "@/src/design-system/components/ui/DesignSystemPage"

// Force dynamic rendering to avoid SSR hydration issues with Radix UI
export const dynamic = 'force-dynamic'

export default function Page() {
  return <DesignSystemPage />
}
