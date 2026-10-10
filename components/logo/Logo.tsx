"use client"
import { useState, type CSSProperties } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import styles from "./Logo.module.css"

type LogoAnimation =
  /** opens </> → <he/> on load, collapses and reopens on hover/focus (recommended for the navbar) */
  | "intro"
  /** loops forever: open, collapse, reopen (use in a hero or a 404 page, not the navbar) */
  | "loop"
  /** loops: <he/> → </> → <HsanEllouze/> → </> → <he/> */
  | "name-loop"
  /** static <he/> */
  | "none"

interface LogoProps {
  href?: string
  animation?: LogoAnimation
  /** show "Hsan Ellouze" next to the mark */
  showName?: boolean
  /** extra classes for the name, e.g. to hide it at some breakpoints */
  nameClassName?: string
  fullName?: string
  className?: string
}

export function Logo({ href = "/", animation = "intro", showName = true, fullName = "Hsan Ellouze", className }: LogoProps) {  // `cycle` remounts the "he" span so the CSS animation restarts on every hover
  const [cycle, setCycle] = useState(0)
  const [playing, setPlaying] = useState(animation === "intro")

  const replay = () => {
    if (animation !== "intro" || playing) return
    setCycle((c) => c + 1)
    setPlaying(true)
  }

  const heClass = cn(
    styles.he,
    animation === "loop" && styles.loop,
    animation === "name-loop" && styles.heNameLoop,
    animation === "intro" && playing && (cycle === 0 ? styles.intro : styles.pulse),
  )

  return (
    <Link
      href={href}
      aria-label="Hsan Ellouze — home"
      onMouseEnter={replay}
      onFocus={replay}
      className={cn(
        styles.root,
        "flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {/* Same font as the rest of the site (inherited); colors come from the theme tokens. */}
      <span aria-hidden="true" className={cn(styles.mark, "text-xl text-foreground")}>
        <span className="text-muted-foreground">&lt;</span>
        <span key={cycle} className={heClass} onAnimationEnd={() => setPlaying(false)}>
          he
        </span>
                {animation === "name-loop" && (
          <span
            className={cn(styles.name, styles.nameLoop)}
            style={{ "--name-w": `${fullName.length}ch` } as CSSProperties}
          >
            {fullName}
          </span>
        )}
        <span className="text-primary">/</span>
        <span className="text-muted-foreground">&gt;</span>
      </span>

      {showName && (
        <span className={cn("text-base font-semibold tracking-tight text-foreground whitespace-nowrap", nameClassName)}>
          Hsan Ellouze
        </span>
      )}
    </Link>
  )
}
