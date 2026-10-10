import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True for empty values and "TODO_*" placeholders that must not be rendered. */
export function isPlaceholder(value?: string | null): boolean {
  return !value || value.trim() === "" || value.startsWith("TODO_")
}
