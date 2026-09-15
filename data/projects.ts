import projectsJson from './projects.json'

export interface ProjectTech {
  name: string
}

export interface ProjectSection {
  title: string
  content: string
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
  github: string
  demo: string
  hasDetailPage: boolean
  context?: string
  problem?: string
  architecture?: string[]
  sections?: ProjectSection[]
  metrics?: ProjectMetric[]
  challenges?: string[]
  learnings?: string[]
}

export const projects: Project[] = projectsJson as unknown as Project[]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getDetailProjects(): Project[] {
  return projects.filter((p) => p.hasDetailPage)
}
