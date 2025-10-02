/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export
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