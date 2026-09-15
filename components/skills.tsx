"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollFade } from "@/hooks/use-scroll-animation"
import skillsData from "@/data/skills.json"

type SkillLevel = "Expert" | "Advanced" | "Intermediate"
interface Skill { name: string; level: SkillLevel }
interface SkillCategory { title: string; icon: string; skills: Skill[] }

const levelDots: Record<SkillLevel, number> = { Expert: 3, Advanced: 2, Intermediate: 1 }

export function Skills() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: gridRef, isVisible: gridVisible } = useScrollFade()

  const categories: SkillCategory[] = skillsData as unknown as SkillCategory[]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            headerVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Skills</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Technical expertise across the full development stack
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {(["Expert", "Advanced", "Intermediate"] as SkillLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${dot <= levelDots[level] ? "bg-primary" : "bg-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{level}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.02] transform ${
                gridVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 150}ms` : "0ms" }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full ${dot <= levelDots[skill.level] ? "bg-primary" : "bg-muted-foreground/25"}`}
                          />
                        ))}
                      </div>
                      <span className="text-foreground">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
