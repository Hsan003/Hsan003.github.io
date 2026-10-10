import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { getMissionsWithPhotos } from "@/lib/volunteering-photos"
import { getHomeJsonLd } from "@/lib/json-ld"
import { PublicationsSection } from "@/components/publications-section"
import { WritingSection } from "@/components/writing-section"
import { getPublishedArticles } from "@/lib/writing"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7cb5258b844d4f3f90bfe227aaca3b50"}'></script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeJsonLd()) }} />
      <Navigation />
      <Hero />
      <About />
        <Skills />
        <Education />
        <Projects />
        <PublicationsSection />
        <WritingSection articles={getPublishedArticles()} />
        <Experience volunteering={getMissionsWithPhotos()} />
      <Contact />
    </main>
  )
}
