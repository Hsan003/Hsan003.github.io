"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"
import { Code, Server, Cpu, Users, Languages, Microscope, type LucideIcon } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import aboutData from "@/data/about.json"

export function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollFade()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollFade()

  const highlights = aboutData.highlights
  const icons: Record<string, typeof Code> = { Code, Server, Cpu, Users }

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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty text-left sm:text-center leading-relaxed">
            {aboutData.intro}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {highlights.map((item, index) => {
            const Icon = icons[item.icon] ?? Code
            return (
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
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>

        <div className="space-y-4">
          <InfoRow icon={Microscope} label="Research interests" items={aboutData.researchInterests} />
          <InfoRow
            icon={Languages}
            label="Languages"
            items={aboutData.languages.map((lang) => (
              <>
                <span className="text-foreground font-medium">{lang.name}</span> — {lang.level}
              </>
            ))}
          />
        </div>
      </div>
    </section>
  )
}

/** Label + chips row, shared by "Research interests" and "Languages". */
function InfoRow({ icon: Icon, label, items }: { icon: LucideIcon; label: string; items: ReactNode[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
      <span className="flex items-center gap-2 font-semibold whitespace-nowrap">
        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
        {label}
      </span>
      <ul className="flex flex-wrap justify-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="px-3 py-1.5 rounded-md border border-border text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
