"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowLeft, Calendar, CirclePlay } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/data/projects"
import { ConfidentialBadge } from "@/components/confidential-badge"
import { isPlaceholder } from "@/lib/utils"
import { getVideoEmbed } from "@/lib/video"
import { getPublicationForProject } from "@/data/publications"
import { PublicationBadge } from "@/components/publication"

interface Props {
  project: Project
}

export function ProjectHero({ project }: Props) {
  const publication = getPublicationForProject(project.slug)
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {project.category && <Badge variant="secondary">{project.category}</Badge>}
          {project.period && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </div>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-balance mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-primary font-medium mb-4">{project.tagline}</p>
        <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-3xl">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {project.confidential && <ConfidentialBadge className="text-sm px-3 py-2" />}
          {!project.confidential && project.githubUrl && (
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild className="gap-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Live demo
              </a>
            </Button>
          )}
          {project.demoVideoUrl && (
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <a
                href={getVideoEmbed(project.demoVideoUrl) ? "#demo" : project.demoVideoUrl}
                {...(getVideoEmbed(project.demoVideoUrl) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              >
                <CirclePlay className="w-4 h-4" />
                Watch demo
              </a>
            </Button>
          )}
          {publication && <PublicationBadge publication={publication} />}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.filter((tech) => !isPlaceholder(tech)).map((tech, i) => (
            <Badge key={i} variant="outline" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
