import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Lightbulb, Code2, AlertTriangle } from "lucide-react"
import type { Project } from "@/data/projects"

interface Props {
  project: Project
}

export function ProjectBody({ project }: Props) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Context + Problem */}
        {(project.context || project.problem) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.context && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    Context
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-pretty leading-relaxed">
                    {project.context}
                  </p>
                </CardContent>
              </Card>
            )}
            {project.problem && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary" />
                    Problem statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-pretty leading-relaxed italic">
                    "{project.problem}"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Architecture */}
        {project.architecture && project.architecture.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Architecture
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {project.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feature sections */}
        {project.sections && project.sections.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Key features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.sections.map((section, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Technical challenges
            </h2>
            <div className="space-y-4">
              {project.challenges.map((challenge, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {challenge}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              What I learned
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {project.learnings.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </section>
  )
}
