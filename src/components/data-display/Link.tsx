import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { focusRing, focusRingOffset } from "../inputs/fieldPieces"

const linkVariants = cva(
  "inline-flex items-center rounded-sm transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "text-foreground hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        underline: "text-foreground underline underline-offset-4 hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">,
    VariantProps<typeof linkVariants> {
  href: string
  external?: boolean
  className?: string
  children?: React.ReactNode
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, target, rel, external, variant, className, children, ...props }, ref) => {
    const resolvedTarget = target ?? (external ? "_blank" : undefined)
    const resolvedRel =
      rel ?? (external || resolvedTarget === "_blank" ? "noopener noreferrer" : undefined)

    return (
      <a
        ref={ref}
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        className={cn(linkVariants({ variant }), focusRing, focusRingOffset, className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = "Link"
export { linkVariants }
