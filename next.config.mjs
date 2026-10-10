/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for production builds only: in Next 14 `next dev` cannot serve app/sitemap.ts
  // while output is 'export' (it returns a 500), even though the exported build is correct.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: '',      // Leave empty if using custom domain
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig