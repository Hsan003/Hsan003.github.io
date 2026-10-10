import type { Project } from "@/data/projects"
import { getVideoEmbed } from "@/lib/video"

export function ProjectVideo({ project }: { project: Project }) {
  const embed = getVideoEmbed(project.demoVideoUrl)
  if (!embed) return null

  return (
    <section id="demo" className="pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          {embed.kind === "iframe" ? (
            <iframe
              src={embed.src}
              title={`${project.title} demo video`}
              className="w-full h-full"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <video src={embed.src} controls preload="metadata" className="w-full h-full" aria-label={`${project.title} demo video`}>
              Your browser does not support embedded videos.
            </video>
          )}
        </div>
      </div>
    </section>
  )
}
