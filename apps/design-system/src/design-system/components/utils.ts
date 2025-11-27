import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge class names with Tailwind conflict resolution
 * 
 * This is a bundled version of the cn utility for library use.
 * Components can import this directly without path aliases.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

