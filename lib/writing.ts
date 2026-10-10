import fs from "node:fs"
import path from "node:path"
import { marked } from "marked"
import { isPlaceholder } from "@/lib/utils"

const WRITING_DIR = path.join(process.cwd(), "content", "writing")

export interface ArticleMeta {
  slug: string
  title: string
  /** ISO date (YYYY-MM-DD); empty while it is still a TODO. */
  date: string
  summary: string
  tags: string[]
  draft: boolean
}

export interface Article extends ArticleMeta {
  html: string
}

type FrontmatterValue = string | boolean | string[]

/** Minimal frontmatter parser: `key: value`, quoted strings, booleans and `[a, b]` lists. */
function parseFrontmatter(source: string): { data: Record<string, FrontmatterValue>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) return { data: {}, body: source }
  const unquote = (v: string) => v.trim().replace(/^(["'])(.*)\1$/, "$2")
  const data: Record<string, FrontmatterValue> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":")
    if (i === -1 || line.trimStart().startsWith("#")) continue
    const key = line.slice(0, i).trim()
    const raw = line.slice(i + 1).trim()
    if (raw === "true" || raw === "false") data[key] = raw === "true"
    else if (raw.startsWith("[") && raw.endsWith("]"))
      data[key] = raw.slice(1, -1).split(",").map(unquote).filter(Boolean)
    else data[key] = unquote(raw)
  }
  return { data, body: source.slice(match[0].length) }
}

function readArticle(file: string): Article {
  const slug = file.replace(/\.md$/, "")
  const { data, body } = parseFrontmatter(fs.readFileSync(path.join(WRITING_DIR, file), "utf8"))
  const str = (v: FrontmatterValue | undefined) => (typeof v === "string" ? v : "")
  return {
    slug,
    title: str(data.title) || slug,
    date: isPlaceholder(str(data.date)) ? "" : str(data.date),
    summary: str(data.summary),
    tags: Array.isArray(data.tags) ? data.tags : [],
    // Anything other than an explicit `draft: false` is treated as a draft.
    draft: data.draft !== false,
    html: marked.parse(body, { async: false }) as string,
  }
}

function readAll(): Article[] {
  let files: string[] = []
  try {
    files = fs.readdirSync(WRITING_DIR).filter((f) => f.endsWith(".md"))
  } catch {
    return []
  }
  // Newest first; undated articles last.
  return files.map(readArticle).sort((a, b) => (b.date || "").localeCompare(a.date || ""))
}

/** Drafts are never listed. They can be previewed by URL in `next dev`, and are absent from production builds. */
const SHOW_DRAFTS_BY_URL = process.env.NODE_ENV !== "production"

export function getPublishedArticles(): ArticleMeta[] {
  return readAll()
    .filter((a) => !a.draft)
    .map(({ html: _html, ...meta }) => meta)
}

export function getArticleSlugsToBuild(): string[] {
  return readAll()
    .filter((a) => !a.draft || SHOW_DRAFTS_BY_URL)
    .map((a) => a.slug)
}

export function getArticle(slug: string): Article | undefined {
  const article = readAll().find((a) => a.slug === slug)
  if (!article || (article.draft && !SHOW_DRAFTS_BY_URL)) return undefined
  return article
}

export function formatArticleDate(date: string): string {
  if (!date) return ""
  const d = new Date(`${date}T00:00:00Z`)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
}
