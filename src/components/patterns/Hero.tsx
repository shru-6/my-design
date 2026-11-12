import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button, type ButtonProps } from "../actions/Button"
import { Image } from "../data-display/Image"
import { Pill } from "../data-display/Pill"
import { Text } from "../data-display/Text"
import { Stack } from "../layout/Stack"

export const heroVariants = cva("w-full", {
  variants: {
    variant: {
      default: "rounded-surface-lg border border-border bg-card/40 p-8",
      centered: "rounded-surface-lg border border-border bg-card/40 px-8 py-12 text-center",
      split:
        "grid gap-8 rounded-surface-lg border border-border bg-card/40 p-8 md:grid-cols-2 md:items-center",
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

export const Hero = React.forwardRef<HTMLElement, HeroProps>(function Hero(
  { title, description, image, badge, actions, variant = "default", className, children, ...props },
  ref
) {
  const actionButtons = [
    actions?.secondary ? { key: "secondary", variant: "outline" as const, props: actions.secondary } : null,
    actions?.primary ? { key: "primary", variant: "primary" as const, props: actions.primary } : null,
  ].filter(Boolean) as { key: string; variant: ButtonProps["variant"]; props: ButtonProps }[]

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
      {actionButtons.length ? (
        <Stack
          direction="row"
          gap="sm"
          wrap
          justify={variant === "centered" ? "center" : "start"}
          items={actionButtons}
          getItemKey={(action) => action.key}
          renderItem={(action) => <Button variant={action.variant} {...action.props} />}
        />
      ) : null}
      {children}
    </div>
  )

  if (variant === "split" && image) {
    return (
      <section ref={ref} data-slot="hero" className={cn(heroVariants({ variant }), className)} {...props}>
        <div className="flex flex-col gap-4">{content}</div>
        <Image src={image} alt="" className="h-56 w-full rounded-surface-md md:h-72" fit="cover" variant="soft" />
      </section>
    )
  }

  const effectiveVariant = variant === "split" && !image ? "default" : variant

  return (
    <section
      ref={ref}
      data-slot="hero"
      className={cn(heroVariants({ variant: effectiveVariant }), "space-y-4", className)}
      {...props}
    >
      {image && variant !== "split" ? (
        <Image src={image} alt="" className="mb-4 h-40 w-full rounded-surface-md" fit="cover" variant="soft" />
      ) : null}
      {content}
    </section>
  )
})

Hero.displayName = "Hero"
