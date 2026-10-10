import Link from "next/link"

/** Closing call-to-action shared by the case-study and volunteering pages. */
export function PageCta({ backHref, backLabel }: { backHref: string; backLabel: string }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">Interested in working together?</h2>
        <p className="text-muted-foreground mb-6">
          I am open to an end-of-studies internship opportunity starting February 2027.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get in touch
          </Link>
          <Link
            href={backHref}
            className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
