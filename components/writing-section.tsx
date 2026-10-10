import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatArticleDate, type ArticleMeta } from "@/lib/writing"

/** Home "Writing" list. Renders nothing while there are no published articles. */
export function WritingSection({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null

  return (
    <section id="writing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Writing</h2>
          <p className="text-lg text-muted-foreground">Technical notes on what I build</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card key={article.slug} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                {article.date && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2 text-balance">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">{article.summary}</p>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Link
                  href={`/writing/${article.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                  aria-label={`Read article: ${article.title}`}
                >
                  Read article
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
