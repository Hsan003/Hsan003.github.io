"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Calendar } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import educationData from "@/data/education.json"

export function Education() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: eduRef, isVisible: eduVisible } = useScrollFade()

  const education = educationData as any[]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            headerVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Education</h2>
          <p className="text-lg text-muted-foreground">My academic background</p>
        </div>

        <div ref={eduRef} className="space-y-6">
          {education.map((item: any, index: number) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.02] transform ${
                eduVisible
                  ? "opacity-100 translate-x-0 scale-100"
                  : `opacity-0 scale-95 ${index % 2 === 0 ? "translate-x-[-50px]" : "translate-x-[50px]"}`
              }`}
              style={{ transitionDelay: eduVisible ? `${index * 200}ms` : "0ms" }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-lg">{item.degree}</h3>
                        <Badge variant={item.status === "In progress" ? "default" : "secondary"} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-primary font-medium mb-1">
                        {item.field}{item.short && ` — ${item.short}`}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">{item.institution}</p>
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-1">
                          {item.highlights.map((h: string, i: number) => (
                            <li key={i} className="text-sm text-muted-foreground">• {h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{item.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{item.location}</span>
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
