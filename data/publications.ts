// Publications: single source for the project card badge, the case-study block, the home
// "Publications" section and the JSON-LD. Fields still set to "TODO_..." are hidden.

export interface Publication {
  id: string
  /** Project this paper came out of (adds the badge and the block on its case study). */
  projectSlug?: string
  title: string
  /** Comma-separated, in citation order. "Hsan Ellouze" / "H. Ellouze" is shown in bold. */
  authors: string
  venue: string
  year: string
  /** e.g. "Published" or "Accepted" */
  status: string
  /** DOI (https://doi.org/...) or IEEE Xplore link */
  url: string
}

export const publications: Publication[] = [
  {
    id: "asksahera-ieee-sime",
    projectSlug: "asksahera",
    title:
      "AskSaHera: A Bilingual 3D-Visualized Retrieval-Augmented Chatbot for Auricular Acupressure Education in Perimenopause Care",
    authors: "Mariem Abid, Lamia Guellif, Amine Chalbi, Hsan Ellouze",
    venue: "IEEE SIME Conference",
    year: "2026",
    status: "Accepted to the final competition (November 2026)",
    url: "TODO_PAPER_URL",
  },
]

export function getPublicationForProject(slug: string): Publication | undefined {
  return publications.find((p) => p.projectSlug === slug)
}
