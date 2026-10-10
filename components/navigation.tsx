import navigationData from "@/data/navigation.json"
import { NavigationClient } from "@/components/navigation-client"
import { getPublishedArticles } from "@/lib/writing"

/** Server wrapper: adds "Writing" to the menu only once at least one article is published. */
export function Navigation() {
  const items = [...(navigationData as { href: string; label: string }[])]
  if (getPublishedArticles().length > 0) {
    const after = items.findIndex((item) => item.href === "#projects")
    items.splice(after + 1, 0, { href: "#writing", label: "Writing" })
  }
  return <NavigationClient items={items} />
}
