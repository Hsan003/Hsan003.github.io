import Link from "next/link"
import { ArrowRight, Calendar, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FallbackImage } from "@/components/fallback-image"
import { OrgLogo } from "@/components/org-logo"
import type { MissionWithPhotos } from "@/lib/volunteering-photos"

export function CoverPlaceholder({ mission }: { mission: MissionWithPhotos }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/15 via-muted to-accent/15 flex items-center justify-center">
      <OrgLogo {...mission} name={mission.organization} className="w-20 h-20 opacity-80" />
    </div>
  )
}

export function VolunteeringCard({ mission }: { mission: MissionWithPhotos }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden bg-muted">
        <FallbackImage
          src={mission.cover}
          alt={`${mission.event} — cover photo`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallback={<CoverPlaceholder mission={mission} />}
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-4">
          <OrgLogo {...mission} name={mission.organization} />
          <div>
            <h4 className="font-semibold text-lg leading-snug">{mission.role}</h4>
            <p className="text-primary font-medium">{mission.organization}</p>
          </div>
        </div>
        <p className="font-medium mb-2">{mission.event}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>{mission.period}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-5">
          <Users className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{mission.impact}</span>
        </div>
        <Link
          href={`/volunteering/${mission.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 group/link"
          aria-label={`View mission: ${mission.event}`}
        >
          View mission
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
