"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

export function AvatarShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Default Avatar</h4>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/avatar.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Different Sizes</h4>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="size-16">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

