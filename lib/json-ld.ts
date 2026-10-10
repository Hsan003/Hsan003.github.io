import { getAvailabilityLine } from "@/data/availability"
import { publications } from "@/data/publications"
import { SITE_URL } from "@/lib/site"
import { isPlaceholder } from "@/lib/utils"

const PERSON_ID = `${SITE_URL}/#person`

/** Person + ScholarlyArticle graph for the home page. Papers are added only once their title is filled. */
export function getHomeJsonLd() {
  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Hsan Ellouze",
    jobTitle: "Software Engineer (Full-stack, AI, DevOps)",
    description: `Final-year software engineering student at INSAT. ${getAvailabilityLine(", ")}.`,
    url: SITE_URL,
    email: "mailto:hsanellouz@gmail.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National Institute of Applied Sciences and Technology (INSAT)",
    },
    sameAs: ["https://github.com/Hsan003", "https://linkedin.com/in/hsanellouze"],
  }

  const articles = publications
    .filter((p) => !isPlaceholder(p.title))
    .map((p) => ({
      "@type": "ScholarlyArticle",
      headline: p.title,
      name: p.title,
      author: { "@id": PERSON_ID },
      ...(!isPlaceholder(p.authors) ? { creditText: p.authors } : {}),
      publisher: { "@type": "Organization", name: p.venue },
      ...(!isPlaceholder(p.year) ? { datePublished: p.year } : {}),
      ...(!isPlaceholder(p.url) ? { url: p.url, sameAs: p.url } : {}),
    }))

  return { "@context": "https://schema.org", "@graph": [person, ...articles] }
}
