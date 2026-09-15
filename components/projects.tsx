"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import Link from "next/link"
import { projects } from "@/data/projects"

export function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollFade()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            headerVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">A selection of my academic and personal projects</p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.slug}
              className={`overflow-hidden hover:shadow-lg transition-all duration-600 group hover:scale-105 transform ${
                projectsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: projectsVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="animate-pulse-glow">
                        {project.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.period}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.github ? (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="hover:animate-scale-in transition-all duration-300 bg-transparent"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        disabled
                        className="opacity-50 cursor-not-allowed bg-transparent"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}

                    {project.demo ? (
                      <Button
                        asChild
                        size="icon"
                        variant="outline"
                        className="hover:animate-scale-in transition-all duration-300 bg-transparent"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        disabled
                        className="opacity-50 cursor-not-allowed bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs hover:animate-scale-in transition-all duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.hasDetailPage && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button asChild size="sm" className="gap-2">
                      <Link href={`/projects/${project.slug}`}>
                        <BookOpen className="w-3.5 h-3.5" />
                        View case study
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
