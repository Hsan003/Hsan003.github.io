import projectsJson from './projects.json'

export interface ProjectTech {
  name: string
}

export interface ProjectSection {
  title: string
  content: string
}

export interface ProjectSectionGroup {
  title: string
  sections: ProjectSection[]
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  category: string
  period: string
  image: string
  /*
   * Links (all optional; leave "" to hide the matching button — nothing empty is ever rendered):
   * - githubUrl:    public repository, e.g. "https://github.com/Hsan003/kubemind"
   * - liveUrl:      deployed app, shown as a "Live demo" button, e.g. "https://kubemind.example.com"
   * - demoVideoUrl: demo video, shown as a "Watch demo" button and embedded on the case study.
   *                 YouTube, Vimeo or Loom share links (e.g. "https://youtu.be/VIDEO_ID"), or a local
   *                 file under /public/videos (e.g. "/videos/kubemind-demo.mp4").
   */
  githubUrl?: string
  liveUrl?: string
  demoVideoUrl?: string
  /** Client project without a public repository: shows a "Confidential" badge instead of the repo link. */
  confidential?: boolean
  hasDetailPage: boolean
  context?: string
  problem?: string
  architecture?: string[]
  sections?: ProjectSection[]
  sectionGroups?: ProjectSectionGroup[]
  metrics?: ProjectMetric[]
  challenges?: string[]
  learnings?: string[]
  outcome?: string
}

export const projects: Project[] = projectsJson as unknown as Project[]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getDetailProjects(): Project[] {
  return projects.filter((p) => p.hasDetailPage)
}
