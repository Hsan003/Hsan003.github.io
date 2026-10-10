"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { FallbackImage } from "@/components/fallback-image"

interface Props {
  photos: string[]
  label: string
}

export function PhotoGallery({ photos, label }: Props) {
  const [index, setIndex] = useState<number | null>(null)
  const count = photos.length

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, step])

  if (count === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
            aria-label={`Open photo ${i + 1} of ${count}`}
          >
            <FallbackImage
              src={src}
              alt={`${label} — photo ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="max-w-5xl sm:max-w-5xl w-[calc(100%-2rem)] p-2 sm:p-4 bg-background">
          <DialogTitle className="sr-only">
            {label} — photo {(index ?? 0) + 1} of {count}
          </DialogTitle>
          {index !== null && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[index]}
                alt={`${label} — photo ${index + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-md"
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 border border-border p-2 hover:bg-background"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 border border-border p-2 hover:bg-background"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <p className="text-center text-xs text-muted-foreground mt-2">
                {index + 1} / {count}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
