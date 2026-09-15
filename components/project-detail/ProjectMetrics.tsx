import type { Project } from "@/data/projects"

interface Props {
  project: Project
}

export function ProjectMetrics({ project }: Props) {
  if (!project.metrics || project.metrics.length === 0) return null

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors"
            >
              <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
