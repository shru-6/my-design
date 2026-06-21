import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Image } from "../data-display/Image"
import { Pill } from "../data-display/Pill"
import { Text } from "../data-display/Text"

export const heroVariants = cva("w-full", {
  variants: {
    variant: {
      default: "rounded-xl border border-border bg-card/40 p-8",
      centered: "rounded-xl border border-border bg-card/40 px-8 py-12 text-center",
      split: "grid gap-8 rounded-xl border border-border bg-card/40 p-8 md:grid-cols-2 md:items-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type HeroActions = {
  primary?: ButtonProps
  secondary?: ButtonProps
}

export interface HeroProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof heroVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  image?: string
  badge?: React.ReactNode
  actions?: HeroActions
  children?: React.ReactNode
  className?: string
}

export function Hero({
  title,
  description,
  image,
  badge,
  actions,
  variant = "default",
  className,
  children,
  ...props
}: HeroProps) {
  const content = (
    <div className={cn("flex flex-col gap-4", variant === "centered" && "items-center text-center")}>
      {badge ? (
        typeof badge === "string" ? (
          <Pill appearance="subtle" tone="info" className="self-start">
            {badge}
          </Pill>
        ) : (
          badge
        )
      ) : null}
      {title ? (
        <Text as="div" size="2xl" weight="bold" className={variant === "centered" ? "mx-auto max-w-2xl" : undefined}>
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text
          as="p"
          size="md"
          variant="muted"
          className={cn("max-w-2xl", variant === "centered" && "mx-auto")}
        >
          {description}
        </Text>
      ) : null}
      {actions?.primary || actions?.secondary ? (
        <div className={cn("flex flex-wrap gap-2", variant === "centered" && "justify-center")}>
          {actions.secondary ? <Button variant="outline" {...actions.secondary} /> : null}
          {actions.primary ? <Button variant="primary" {...actions.primary} /> : null}
        </div>
      ) : null}
      {children}
    </div>
  )

  if (variant === "split" && image) {
    return (
      <section className={cn(heroVariants({ variant }), className)} {...props}>
        <div className="flex flex-col gap-4">{content}</div>
        <Image src={image} alt="" className="h-56 w-full rounded-lg md:h-72" fit="cover" variant="rounded" />
      </section>
    )
  }

  const effectiveVariant = variant === "split" && !image ? "default" : variant

  return (
    <section className={cn(heroVariants({ variant: effectiveVariant }), "space-y-4", className)} {...props}>
      {image && variant !== "split" ? (
        <Image src={image} alt="" className="mb-4 h-40 w-full rounded-lg" fit="cover" variant="rounded" />
      ) : null}
      {content}
    </section>
  )
}

Hero.displayName = "Hero"
