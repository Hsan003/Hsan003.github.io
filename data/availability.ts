// Internship availability: single source for the hero panel, the Contact line and the JSON-LD description.
// Any value starting with "TODO_" is hidden everywhere until it is filled.

export type AvailabilityIcon = "status" | "start" | "duration" | "location" | "agreement" | "visa"

export interface AvailabilityItem {
  icon: AvailabilityIcon
  label: string
  value: string
  /** Shorter wording for the one-line versions (Contact, JSON-LD). Omit to leave the item out of them. */
  short?: string
}

export const availability = {
  status: {
    icon: "status",
    label: "Status",
    value: "Open to an end-of-studies internship (PFE)",
    short: "Open to an end-of-studies internship (PFE)",
  },
  details: [
    { icon: "start", label: "Start", value: "February 2027", short: "from February 2027" },
    { icon: "duration", label: "Duration", value: "4–6 months", short: "4–6 months" },
    {
      icon: "location",
      label: "Location",
      value: "Europe - open to relocation",
      short: "Europe ",
    },
    { icon: "agreement", label: "Agreement", value: "Internship agreement provided by INSAT" },
    { icon: "visa", label: "Visa", value: "Internship visa via the INSAT agreement - Work authorization required" },
  ],
} satisfies { status: AvailabilityItem; details: AvailabilityItem[] }

const isTodo = (value: string) => value.startsWith("TODO_")

/** Items to display (TODO placeholders removed). */
export function getAvailabilityDetails(): AvailabilityItem[] {
  return availability.details.filter((item) => !isTodo(item.value))
}

/** One-line summary, e.g. "Open to an end-of-studies internship (PFE) · from February 2027 · 4–6 months · …". */
export function getAvailabilityLine(separator = " · "): string {
  return [availability.status, ...availability.details]
    .filter((item: AvailabilityItem) => item.short && !isTodo(item.value))
    .map((item: AvailabilityItem) => item.short)
    .join(separator)
}
