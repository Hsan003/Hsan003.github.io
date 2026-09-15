import { notFound } from "next/navigation"
import { getProjectBySlug, getDetailProjects } from "@/data/projects"
import { ProjectHero } from "@/components/project-detail/ProjectHero"
import { ProjectMetrics } from "@/components/project-detail/ProjectMetrics"
import { ProjectBody } from "@/components/project-detail/ProjectBody"
import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

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
  return {
    title: `${project.title} — Hsan Ellouze`,
    description: project.tagline,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project || !project.hasDetailPage) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProjectHero project={project} />
      <ProjectMetrics project={project} />
      <ProjectBody project={project} />

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Interested in working together?</h2>
          <p className="text-muted-foreground mb-6">
            I am open to an end-of-year internship opportunity starting February 2027.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get in touch
            </a>
            <a
              href="/#projects"
              className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              View all projects
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
