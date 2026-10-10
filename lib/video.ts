export type VideoEmbed = { kind: "iframe"; src: string } | { kind: "file"; src: string }

const LOCAL_VIDEO = /\.(mp4|webm|ogg|mov)(\?.*)?$/i

/**
 * Turns a demo video URL into something embeddable, using privacy-friendly players
 * (youtube-nocookie, Vimeo with dnt=1). Returns null for URLs it does not recognise.
 */
export function getVideoEmbed(url?: string): VideoEmbed | null {
  if (!url) return null
  if (url.startsWith("/") || LOCAL_VIDEO.test(url)) return { kind: "file", src: url }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  const host = parsed.hostname.replace(/^www\.|^m\./, "")
  const parts = parsed.pathname.split("/").filter(Boolean)

  if (host === "youtu.be" && parts[0]) return youtube(parts[0])
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = parsed.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : undefined)
    if (id) return youtube(id)
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = parts.find((p) => /^\d+$/.test(p))
    if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}?dnt=1` }
  }
  if (host === "loom.com" && (parts[0] === "share" || parts[0] === "embed") && parts[1]) {
    return { kind: "iframe", src: `https://www.loom.com/embed/${parts[1]}` }
  }
  return null
}

function youtube(id: string): VideoEmbed {
  return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0` }
}
