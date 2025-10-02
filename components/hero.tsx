"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary/5 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-8">
          <div
            className={`flex-shrink-0 transition-all duration-1000 ${
              isVisible ? "animate-slide-up opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl animate-float">
                <Image
                  src="/professional-photo.jpeg"
                  alt="Hsan Ellouze - Professional Photo"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse-glow"></div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1
              className={`text-4xl sm:text-6xl font-bold text-balance mb-6 font-serif transition-all duration-1000 ${
                isVisible ? "animate-slide-up opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-foreground animate-float">Hsan</span>{" "}
              <span className="text-primary animate-float" style={{ animationDelay: "0.5s" }}>
                Ellouze
              </span>
            </h1>
            <p
              className={`text-xl sm:text-2xl text-muted-foreground mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? "animate-slide-up opacity-100" : "opacity-0"
              }`}
            >
              Software Engineering Student | Fullstack Developer
            </p>
            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-pretty transition-all duration-1000 delay-300 ${
                isVisible ? "animate-slide-up opacity-100" : "opacity-0"
              }`}
            >
              Passionate about technological innovation, I combine technical expertise in fullstack web development with
              experience in leadership and event organization.
            </p>
          </div>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-400 ${isVisible ? "animate-slide-up opacity-100" : "opacity-0"}`}
        >
          <Button
            size="lg"
            className="text-lg px-8 animate-pulse-glow"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Projects
            <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hover:animate-pulse-glow transition-all duration-300 bg-transparent"
            >
              <a href="https://github.com/Hsan003" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hover:animate-pulse-glow transition-all duration-300 bg-transparent"
            >
              <a href="https://linkedin.com/in/hsanellouze" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="hover:animate-pulse-glow transition-all duration-300 bg-transparent"
            >
              <a href="mailto:hsanellouz@gmail.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-8 text-center transition-all duration-1000 delay-500 ${isVisible ? "animate-slide-up opacity-100" : "opacity-0"}`}
        >
          <div className="hover:animate-scale-in transition-all duration-300">
            <div className="text-3xl font-bold text-primary mb-2 font-serif">3+</div>
            <div className="text-muted-foreground">Years of Experience</div>
          </div>
          <div className="hover:animate-scale-in transition-all duration-300">
            <div className="text-3xl font-bold text-primary mb-2 font-serif">10+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
