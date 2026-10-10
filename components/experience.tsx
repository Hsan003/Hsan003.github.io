"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import experienceData from "@/data/experience.json"
import { VolunteeringCard } from "@/components/volunteering/volunteering-card"
import type { MissionWithPhotos } from "@/lib/volunteering-photos"
import { isPlaceholder } from "@/lib/utils"

export function Experience({ volunteering }: { volunteering: MissionWithPhotos[] }) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: experiencesRef, isVisible: experiencesVisible } = useScrollFade()
  const { ref: volunteeringRef, isVisible: volunteeringVisible } = useScrollFade()
  const experiences = experienceData.experiences

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            headerVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Professional Experience</h2>
          <p className="text-lg text-muted-foreground">My professional and associative journey</p>
        </div>

        <div ref={experiencesRef} className="space-y-8 mb-16">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-600 hover:scale-[1.02] transform ${
                experiencesVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : `opacity-0 scale-95 ${index % 2 === 0 ? "translate-x-[-50px]" : "translate-x-[50px]"}`
              }`}
              style={{
                transitionDelay: experiencesVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span>{exp.company}</span>
                      <Badge variant="secondary" className="animate-pulse-glow">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    {!isPlaceholder(exp.location) && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="hover:animate-scale-in transition-all duration-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={volunteeringRef} id="volunteering">
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-all duration-600 transform ${
              volunteeringVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            Volunteering Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteering.map((mission, index) => (
              <div
                key={mission.slug}
                className={`transition-all duration-600 transform ${
                  volunteeringVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: volunteeringVisible ? `${(index + 1) * 200}ms` : "0ms",
                }}
              >
                <VolunteeringCard mission={mission} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
