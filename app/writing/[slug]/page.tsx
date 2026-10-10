import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { PageCta } from "@/components/page-cta"
import { formatArticleDate, getArticle, getArticleSlugsToBuild } from "@/lib/writing"
import { OG_IMAGE } from "@/lib/site"

interface Props {
  params: { slug: string }
}

// Only the slugs returned below exist; drafts are left out of production builds.
export const dynamicParams = false

// Next 14's static export rejects an empty list, so while every article is a draft a single
// placeholder slug is emitted; it is not a real article and renders the 404 page.
const NO_ARTICLES = "_none"

export function generateStaticParams() {
  const slugs = getArticleSlugsToBuild()
  return (slugs.length > 0 ? slugs : [NO_ARTICLES]).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}
  const url = `/writing/${article.slug}`
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    robots: article.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.summary,
      siteName: "Hsan Ellouze",
      locale: "en_US",
      ...(article.date ? { publishedTime: article.date } : {}),
      tags: article.tags,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [OG_IMAGE.url] },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article>
        <header className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/#writing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to writing
            </Link>

            {article.draft && (
              <p className="mb-6 rounded-md border border-dashed border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                Draft preview — only visible in development, never in production builds.
              </p>
            )}

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {article.date && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                </div>
              )}
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-balance mb-4">{article.title}</h1>
            {article.summary && <p className="text-lg text-muted-foreground text-pretty">{article.summary}</p>}
          </div>
        </header>

        <div className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="article-body max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </article>

      <PageCta backHref="/#writing" backLabel="More writing" />
    </main>
  )
}
