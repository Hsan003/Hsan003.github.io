import { FallbackImage } from "@/components/fallback-image"
import { cn } from "@/lib/utils"

interface Props {
  name: string
  logo?: string
  logoLight?: string
  logoDark?: string
  className?: string
}

/** Organization logo; light/dark variants are switched with CSS so there is no theme flash. */
export function OrgLogo({ name, logo, logoLight, logoDark, className }: Props) {
  const alt = `${name} logo`
  const imgClass = "w-full h-full object-contain"
  return (
    <div className={cn("w-12 h-12 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0", className)}>
      {logoLight && logoDark ? (
        <>
          <FallbackImage src={logoLight} alt={alt} className={cn(imgClass, "dark:hidden")} />
          <FallbackImage src={logoDark} alt={alt} className={cn(imgClass, "hidden dark:block")} />
        </>
      ) : (
        <FallbackImage src={logo || logoLight || logoDark} alt={alt} className={imgClass} />
      )}
    </div>
  )
}
