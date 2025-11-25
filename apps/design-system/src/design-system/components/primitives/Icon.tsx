"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon, SearchIcon } from "lucide-react"

export interface IconProps {
  icon: LucideIcon
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
}

export function Icon({
  icon: IconComponent,
  size = "md",
  className,
}: IconProps) {
  return (
    <IconComponent
      data-slot="primitive-icon"
      className={cn(sizeClasses[size], className)}
    />
  )
}

export function IconShowcase() {
  const sizes = ["sm", "md", "lg", "xl"] as const
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Icon Sizes</h4>
        <div className="flex items-center gap-4">
          {sizes.map((size) => (
            <Icon key={size} icon={SearchIcon} size={size} />
          ))}
        </div>
      </div>
    </div>
  )
}

