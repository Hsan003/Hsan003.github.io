import type React from "react"
import type { Metadata } from "next"
import { Ubuntu, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-ubuntu",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Hsan Ellouze - Portfolio",
  description: "Portfolio of Hsan Ellouze, Software Engineering student and fullstack developer",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${ubuntu.variable} ${dancing.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
