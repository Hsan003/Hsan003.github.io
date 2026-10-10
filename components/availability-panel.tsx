import { Briefcase, CalendarDays, Clock, FileCheck, MapPin, Plane, type LucideIcon } from "lucide-react"
import { availability, getAvailabilityDetails, getAvailabilityLine, type AvailabilityIcon } from "@/data/availability"
import { cn } from "@/lib/utils"

const icons: Record<AvailabilityIcon, LucideIcon> = {
  status: Briefcase,
  start: CalendarDays,
  duration: Clock,
  location: MapPin,
  agreement: FileCheck,
  visa: Plane,
}

/** Small pulsing "available" dot in the accent color. */
export function AvailabilityDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2.5 w-2.5 flex-shrink-0", className)} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
    </span>
  )
}

/** Hero panel: status headline plus a 2-column grid of logistics. */
export function AvailabilityPanel({ className }: { className?: string }) {
  const details = getAvailabilityDetails()
  return (
    <section
      aria-label="Internship availability"
      className={cn("rounded-xl border border-border bg-card/70 backdrop-blur-sm p-4 sm:p-5 text-left shadow-sm", className)}
    >
      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-border">
        <AvailabilityDot />
        <p className="font-semibold text-foreground leading-snug">{availability.status.value}</p>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {details.map((item) => {
          const Icon = icons[item.icon]
          return (
            <div key={item.label} className="flex items-start gap-2.5">
              <Icon className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0 ml-1">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</dt>
                <dd className="text-sm text-foreground leading-snug">{item.value}</dd>
              </div>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

/** One-line version, used in the Contact section. */
export function AvailabilityLine({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-2.5 text-sm text-muted-foreground", className)}>
      <AvailabilityDot className="mt-1" />
      <span>{getAvailabilityLine()}</span>
    </p>
  )
}
