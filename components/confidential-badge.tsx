import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export function ConfidentialBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground whitespace-nowrap",
        className,
      )}
      title="Client project — source code is not public"
    >
      <Lock className="w-3 h-3" aria-hidden="true" />
      Confidential — client project
    </span>
  )
}
