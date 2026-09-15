"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import { useTheme } from "next-themes"
import Image from "next/image"
import experienceData from "@/data/experience.json"

export function Experience() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: experiencesRef, isVisible: experiencesVisible } = useScrollFade()
  const { ref: volunteeringRef, isVisible: volunteeringVisible } = useScrollFade()
  const { theme } = useTheme()
  const experiences = experienceData.experiences

  const associativeExperience = experienceData.associativeExperience.map((item: any) => ({
    ...item,
    logo: item.logoDark && theme === "dark" ? item.logoDark : item.logoLight || item.logo,
  }))

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
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
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

        <div ref={volunteeringRef}>
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-all duration-600 transform ${
              volunteeringVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            Volunteering Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {associativeExperience.map((exp, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-600 hover:scale-105 transform ${
                  volunteeringVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: volunteeringVisible ? `${(index + 1) * 200}ms` : "0ms",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
                      <Image
                        src={exp.logo || "/placeholder.svg"}
                        alt={`${exp.organization} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.organization}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
