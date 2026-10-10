import { notFound } from "next/navigation"
import { getProjectBySlug, getDetailProjects } from "@/data/projects"
import { ProjectHero } from "@/components/project-detail/ProjectHero"
import { ProjectMetrics } from "@/components/project-detail/ProjectMetrics"
import { ProjectBody } from "@/components/project-detail/ProjectBody"
import { Navigation } from "@/components/navigation"
import { PageCta } from "@/components/page-cta"
import { ProjectVideo } from "@/components/project-detail/ProjectVideo"
import { PublicationBlock } from "@/components/publication"
import { getPublicationForProject } from "@/data/publications"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/site"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = getDetailProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  const url = `/projects/${project.slug}`
  const title = `${project.title} — Case Study`
  return {
    title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: project.tagline,
      siteName: "Hsan Ellouze",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: project.tagline, images: [OG_IMAGE.url] },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project || !project.hasDetailPage) notFound()
  const publication = getPublicationForProject(project.slug)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectHero project={project} />
      <ProjectVideo project={project} />
      {publication && <PublicationBlock publication={publication} />}
      <ProjectMetrics project={project} />
      <ProjectBody project={project} />

      <PageCta backHref="/#projects" backLabel="View all projects" />
    </main>
  )
}
