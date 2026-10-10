import { Fragment } from "react"
import { Award, BookOpen, CalendarDays, ExternalLink, FileText, Lock, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPublicationForProject, type Publication } from "@/data/publications"
import { cn, isPlaceholder } from "@/lib/utils"

const MY_NAME = /(Hsan Ellouze|H\. Ellouze)/

const filled = (value?: string) => !isPlaceholder(value)

type Tone = "published" | "pending" | "neutral"

/** Derives a short label and a tone from the free-text status. */
function statusMeta(status?: string): { tone: Tone; short: string } | null {
  if (!filled(status)) return null
  const s = status!.toLowerCase()
  if (s.includes("published")) return { tone: "published", short: "Published" }
  if (s.includes("final")) return { tone: "pending", short: "Finalist" }
  if (s.includes("accepted")) return { tone: "pending", short: "Accepted" }
  return { tone: "neutral", short: status! }
}

const toneStyles: Record<Tone, { pill: string; dot: string }> = {
  published: {
    pill: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  pending: {
    pill: "border-primary/30 bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  neutral: {
    pill: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

function Authors({ authors }: { authors: string }) {
  return (
    <>
      {authors.split(MY_NAME).map((part, i) =>
        MY_NAME.test(part) ? (
          <strong
            key={i}
            className="font-semibold text-foreground underline decoration-primary/40 decoration-2 underline-offset-4"
          >
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Status pill with a soft pulsing dot while the paper is pending. */
function StatusPill({ status, className }: { status?: string; className?: string }) {
  const meta = statusMeta(status)
  if (!meta) return null
  const tone = toneStyles[meta.tone]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tone.pill,
        className,
      )}
    >
      {meta.tone === "pending" ? (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", tone.dot)} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", tone.dot)} />
        </span>
      ) : (
        <Award className="w-3 h-3" aria-hidden="true" />
      )}
      {meta.short}
    </span>
  )
}

/** Shown instead of the button while the paper URL is not public yet. */
function PaperPendingNote() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
      Paper available after the competition
    </span>
  )
}

/** Small badge for project cards. Label follows the status, so it never overclaims. */
export function PublicationBadge({ publication: p }: { publication: Publication }) {
  const meta = statusMeta(p.status)
  const year = filled(p.year) ? ` ${p.year}` : ""
  const label =
    meta?.short === "Finalist"
      ? `${p.venue}${year} · Finalist`
      : meta?.short === "Accepted"
        ? `${p.venue}${year} · Accepted`
        : `${p.venue} publication`
  const Icon = meta?.short === "Finalist" ? Trophy : Award

  return (
    <Badge
      variant="outline"
      className="gap-1.5 rounded-full border-primary/40 bg-primary/5 text-primary px-2.5 py-0.5"
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      {label}
    </Badge>
  )
}

/** Publication badge for a project, or nothing if the project has no paper. */
export function ProjectPublicationBadge({ slug, className }: { slug: string; className?: string }) {
  const publication = getPublicationForProject(slug)
  if (!publication) return null
  return (
    <div className={className}>
      <PublicationBadge publication={publication} />
    </div>
  )
}

/**
 * Entry for the home "Publications" section.
 * Renders a <div>: don't wrap it in a <p>.
 */
export function PublicationCitation({ publication: p }: { publication: Publication }) {
  return (
    <div className="group relative flex gap-4 rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <BookOpen className="w-5 h-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {p.venue}
            {filled(p.year) && <> · {p.year}</>}
          </span>
          <StatusPill status={p.status} />
        </div>

        <p className="font-semibold leading-snug text-foreground text-balance">
          {filled(p.title) ? p.title : "Title to be announced"}
        </p>

        {filled(p.authors) && (
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed text-pretty">
            <Authors authors={p.authors} />
          </p>
        )}

        <div className="mt-3">
          {filled(p.url) ? <ReadPaperButton publication={p} /> : <PaperPendingNote />}
        </div>
      </div>
    </div>
  )
}

export function ReadPaperButton({ publication, size = "sm" }: { publication: Publication; size?: "sm" | "default" }) {
  if (!filled(publication.url)) return null
  return (
    <Button asChild size={size} className="gap-2">
      <a href={publication.url} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        Read the paper
      </a>
    </Button>
  )
}

/** "Publication" block for a case-study page. */
export function PublicationBlock({ publication: p }: { publication: Publication }) {
  const meta = [
    { label: "Venue", value: p.venue, icon: BookOpen },
    { label: "Year", value: p.year, icon: CalendarDays },
  ].filter((m) => filled(m.value))

  return (
    <section className="pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden border-primary/30 py-0">
          {/* accent bar + soft header tint */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.06] to-transparent"
          />

          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">Publication</span>
              </div>
              <StatusPill status={p.status} />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-balance">
              {filled(p.title) ? p.title : "Title to be announced"}
            </h3>

            {filled(p.authors) && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                <Authors authors={p.authors} />
              </p>
            )}

            {(meta.length > 0 || filled(p.status)) && (
              <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                {meta.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-lg border bg-muted/40 px-4 py-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium">{value}</dd>
                  </div>
                ))}
                {filled(p.status) && (
                  <div className="rounded-lg border bg-muted/40 px-4 py-3 sm:col-span-1">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                      Status
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-pretty">{p.status}</dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
              {filled(p.url) ? <ReadPaperButton publication={p} size="default" /> : <PaperPendingNote />}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}