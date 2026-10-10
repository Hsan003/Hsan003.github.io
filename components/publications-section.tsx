import { Card, CardContent } from "@/components/ui/card"
import { PublicationCitation, ReadPaperButton } from "@/components/publication"
import { publications } from "@/data/publications"

export function PublicationsSection() {
  if (publications.length === 0) return null

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Publications</h2>
          <p className="text-lg text-muted-foreground">Research that grew out of my projects</p>
        </div>
        <ol className="space-y-4">
          {publications.map((p) => (
            <li key={p.id}>
              <Card>
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <PublicationCitation publication={p} />
                  </div>
                  <ReadPaperButton publication={p} />
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
