import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7cb5258b844d4f3f90bfe227aaca3b50"}'></script>
      <Navigation />
      <Hero />
      <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
      <Contact />
    </main>
  )
}
