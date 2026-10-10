import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Calendar, ExternalLink, Users, ListChecks, Images } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FallbackImage } from "@/components/fallback-image"
import { OrgLogo } from "@/components/org-logo"
import { MetricsGrid } from "@/components/project-detail/ProjectMetrics"
import { PageCta } from "@/components/page-cta"
import { PhotoGallery } from "@/components/volunteering/photo-gallery"
import { CoverPlaceholder } from "@/components/volunteering/volunteering-card"
import { getMissionBySlug, volunteering } from "@/data/volunteering"
import { getMissionPhotos } from "@/lib/volunteering-photos"
import { isPlaceholder } from "@/lib/utils"
import { OG_IMAGE } from "@/lib/site"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return volunteering.map((m) => ({ slug: m.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const mission = getMissionBySlug(params.slug)
  if (!mission) return {}
  const title = `${mission.role} — ${mission.event}`
  const url = `/volunteering/${mission.slug}`
  const { cover } = getMissionPhotos(mission)
  return {
    title,
    description: mission.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: mission.summary,
      siteName: "Hsan Ellouze",
      locale: "en_US",
      images: [cover ? { url: cover, alt: `${mission.event} — cover photo` } : OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: mission.summary, images: [cover ?? OG_IMAGE.url] },
  }
}

export default function VolunteeringPage({ params }: Props) {
  const found = getMissionBySlug(params.slug)
  if (!found) notFound()
  const mission = { ...found, ...getMissionPhotos(found) }
  const hasWebsite = !isPlaceholder(mission.website)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#volunteering"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to volunteering
          </Link>

          <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted mb-8">
            <FallbackImage
              src={mission.cover}
              alt={`${mission.event} — cover photo`}
              className="w-full h-full object-cover"
              fallback={<CoverPlaceholder mission={mission} />}
            />
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="secondary">Volunteering</Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {mission.period}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-balance mb-4">{mission.role}</h1>
          <div className="flex items-center gap-3 mb-4">
            <OrgLogo {...mission} name={mission.organization} className="w-10 h-10" />
            <p className="text-xl text-primary font-medium">
              {mission.organization} · {mission.event}
            </p>
          </div>
          <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-3xl">{mission.summary}</p>

          {hasWebsite && (
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <a href={mission.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Event website
              </a>
            </Button>
          )}
        </div>
      </section>

      <MetricsGrid metrics={mission.figures} />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm text-pretty leading-relaxed">{mission.context}</p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" />
              My responsibilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mission.responsibilities.map((item) => (
                <Card key={item.title}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {mission.photos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Images className="w-5 h-5 text-primary" />
                Gallery
              </h2>
              <PhotoGallery photos={mission.photos} label={mission.event} />
            </div>
          )}
        </div>
      </section>

      <PageCta backHref="/#volunteering" backLabel="View all missions" />
    </main>
  )
}
