"use client"

import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from "react"

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  /** Rendered instead of the image when it fails to load (missing file). */
  fallback?: ReactNode
}

/** <img> that swaps to a fallback (or nothing) when the file is missing, even if it failed before hydration. */
export function FallbackImage({ fallback = null, onError, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [props.src])

  if (failed || !props.src) return <>{fallback}</>

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      ref={ref}
      {...props}
      onError={(e) => {
        setFailed(true)
        onError?.(e)
      }}
    />
  )
}
