"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Database, Server, Cpu } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"

export function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFade()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollFade()

  const highlights = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Building modern, responsive user interfaces",
      skills: ["React", "Vue.js", "Next.js", "JavaScript", "HTML5", "CSS3"],
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Creating robust server-side applications",
      skills: ["FastAPI", "NestJS", "PHP", "ASP.NET Core", "Python"],
    },
    {
      icon: Database,
      title: "Database & DevOps",
      description: "Managing data and deployment workflows",
      skills: ["MySQL", "MongoDB", "SQL Server", "Docker", "Git"],
    },
    {
      icon: Cpu,
      title: "AI & Innovation",
      description: "Integrating artificial intelligence solutions",
      skills: ["Python", "RAG", "Pinecone", "Text Embedding", "WebSocket"],
    },
  ]



  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            I am a fourth-year Software Engineering student at the National Institute of Applied Sciences and Technology
            (INSAT) in Tunisia. Passionate about technology and innovation, I combine technical expertise in fullstack
            development with strong leadership skills gained through active participation in associative activities.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-500 hover:scale-105 transform ${
                cardsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: cardsVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 text-pretty">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs hover:animate-scale-in transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
