export interface VolunteeringFigure {
  label: string
  value: string
}

export interface VolunteeringResponsibility {
  title: string
  content: string
}

export interface VolunteeringMission {
  slug: string
  role: string
  organization: string
  event: string
  period: string
  /** One-line impact shown on the home page thumbnail. */
  impact: string
  /** Single logo, or a light/dark pair (light is used on light backgrounds). */
  logo?: string
  logoLight?: string
  logoDark?: string
  /**
   * Photo folder under /public/images/volunteering/. Every .jpg/.jpeg/.png/.webp file in it is
   * picked up at build time. A file named "cover.*" is used as the cover; otherwise the first photo is.
   */
  photoFolder: string
  summary: string
  context: string
  responsibilities: VolunteeringResponsibility[]
  figures: VolunteeringFigure[]
  /** Hidden while it is still a TODO_ placeholder. */
  website: string
}

export const volunteering: VolunteeringMission[] = [
  {
    slug: "insat-enterprise-forum-6",
    role: "Event Mission Leader",
    organization: "Junior Enterprise INSAT",
    event: "INSAT Enterprise Forum 6.0",
    period: "August 2024 - June 2025",
    impact: "30+ companies and 1500+ participants",
    logoLight: "/je-insat-logo-light.png",
    logoDark: "/je-insat-logo-dark.png",
    // TODO: add photos to /public/images/volunteering/forum/*.jpg (optional cover.jpg)
    photoFolder: "forum",
    summary:
      "Led the organization of the INSAT Enterprise Forum 6.0 for Junior Enterprise INSAT, an event with 30+ companies and 1500+ participants.",
    context:
      "The INSAT Enterprise Forum is organized by Junior Enterprise INSAT. Its 6th edition brought together 30+ companies and 1500+ participants. I led the event mission from August 2024 to June 2025.",
    responsibilities: [
      {
        title: "Leading the organizing team",
        content:
          "As Event Mission Leader, I coordinated and managed the team in charge of organizing the forum, keeping everyone aligned on the same plan.",
      },
      {
        title: "Planning, follow-up and documentation",
        content:
          "I led the strategic planning of the event, monitored the progress of the organizing activities, and managed the mission's documentation.",
      },
    ],
    figures: [
      { label: "Companies", value: "30+" },
      { label: "Participants", value: "1500+" },
      { label: "Edition", value: "6.0" },
    ],
    website: "https://jeinsat.com/",
  },
  {
    slug: "wintercup-7",
    role: "Operations Manager",
    organization: "ACM INSAT",
    event: "WinterCup 7.0",
    period: "February 2025 - March 2025",
    impact: "Programming competition with 150+ participants",
    logo: "/acm-logo.png",
    // TODO: add photos to /public/images/volunteering/wintercup/*.jpg (optional cover.jpg)
    photoFolder: "wintercup",
    summary: "Managed operations for WinterCup 7.0, ACM INSAT's programming competition with 150+ participants.",
    context:
      "WinterCup is a programming competition organized by ACM INSAT. Its 7th edition gathered 150+ participants. I served as Operations Manager from February to March 2025.",
    responsibilities: [
      {
        title: "Teams and event logistics",
        content:
          "I coordinated the teams involved in running the competition and handled the event logistics so the contest could run as planned.",
      },
      {
        title: "Operational procedures",
        content:
          "I implemented the operational procedures for the competition and monitored them throughout the event.",
      },
    ],
    figures: [
      { label: "Participants", value: "150+" },
      { label: "Edition", value: "7.0" },
    ],
    website: "https://www.facebook.com/INSATWinterCup/?locale=fr_FR",
  },
]

export function getMissionBySlug(slug: string): VolunteeringMission | undefined {
  return volunteering.find((m) => m.slug === slug)
}
